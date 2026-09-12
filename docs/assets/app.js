const RAW_URL = 'https://raw.githubusercontent.com/Dollars-Archive/eve-ghost-enemies-kr-patch/main/INSTALL.md';
const BLOB_BASE = 'https://github.com/Dollars-Archive/eve-ghost-enemies-kr-patch/blob/main/';

const reader = document.getElementById('reader');
const statusEl = document.getElementById('status');
const toc = document.getElementById('toc');
const pageTitle = document.getElementById('page-title');
const versionBadge = document.getElementById('version-badge');

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section';
}

function decorateCallouts(root) {
  const labelMap = {
    IMPORTANT: '중요',
    TIP: '팁',
    WARNING: '주의',
    CAUTION: '경고',
    NOTE: '참고',
  };

  root.querySelectorAll('blockquote').forEach((blockquote) => {
    const first = blockquote.querySelector('p');
    if (!first) return;
    const match = first.textContent.trim().match(/^\[!(IMPORTANT|TIP|WARNING|CAUTION|NOTE)\]/i);
    if (!match) return;

    const type = match[1].toUpperCase();
    blockquote.classList.add('callout', type.toLowerCase());
    first.innerHTML = first.innerHTML.replace(/^\[!(IMPORTANT|TIP|WARNING|CAUTION|NOTE)\]\s*/i, '');

    const label = document.createElement('div');
    label.className = 'callout-label';
    label.textContent = labelMap[type] || type;
    blockquote.prepend(label);

    if (!first.textContent.trim()) first.remove();
  });
}

function buildToc(root) {
  const used = new Map();
  const headings = [...root.querySelectorAll('h2, h3')];
  toc.innerHTML = '';

  headings.forEach((heading) => {
    let id = slugify(heading.textContent);
    const n = (used.get(id) || 0) + 1;
    used.set(id, n);
    if (n > 1) id = `${id}-${n}`;
    heading.id = id;

    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    if (heading.tagName === 'H3') link.classList.add('sub');
    toc.appendChild(link);
  });

  if ('IntersectionObserver' in window && headings.length) {
    const links = new Map([...toc.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.remove('active'));
      links.get(visible.target.id)?.classList.add('active');
    }, { rootMargin: '-90px 0px -70% 0px', threshold: 0 });
    headings.forEach((heading) => observer.observe(heading));
  }
}

function enhanceLinks(root) {
  root.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) return;
    a.href = BLOB_BASE + href.replace(/^\.\//, '');
  });

  root.querySelectorAll('a[href^="http"]').forEach((a) => {
    a.target = '_blank';
    a.rel = 'noreferrer';
  });
}

function addCopyButtons(root) {
  root.querySelectorAll('pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-btn';
    button.textContent = '복사';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = '완료';
        setTimeout(() => { button.textContent = '복사'; }, 1200);
      } catch {
        button.textContent = '실패';
      }
    });
    pre.appendChild(button);
  });
}

function extractMeta(markdown) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    pageTitle.textContent = title.replace(/\s*설치 가이드\s*$/i, '').trim() || '설치 가이드';
    document.title = title;
  }

  const versionMatch = markdown.match(/현재 기준 버전은\s*\*\*(v[^*]+)\*\*/i);
  versionBadge.textContent = versionMatch ? versionMatch[1].trim() : '최신 버전';
}

async function loadGuide() {
  try {
    const response = await fetch(`${RAW_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();

    if (!window.marked) throw new Error('Markdown renderer unavailable');
    extractMeta(markdown);
    marked.setOptions({ gfm: true, breaks: false, mangle: false, headerIds: false });
    reader.innerHTML = marked.parse(markdown);

    decorateCallouts(reader);
    enhanceLinks(reader);
    addCopyButtons(reader);
    buildToc(reader);

    statusEl.hidden = true;
    reader.hidden = false;
  } catch (error) {
    console.error(error);
    statusEl.innerHTML = `설치 가이드를 불러오지 못했습니다.<br><a href="${BLOB_BASE}INSTALL.md" target="_blank" rel="noreferrer">GitHub 원문에서 보기 ↗</a>`;
  }
}

loadGuide();
