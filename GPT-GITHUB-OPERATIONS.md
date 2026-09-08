# GPT → GitHub 작업 가이드

이 문서는 ChatGPT에게 GitHub 작업을 시킬 때 **실제로 도구를 호출해서 작업하게 만드는 방법**과, 직접 지원되지 않는 GitHub 작업을 우회해 처리한 실제 사례를 기록합니다.

목적은 간단합니다.

- ChatGPT가 "안 된다"고 추측하지 않고 실제 GitHub 도구를 호출하게 하기
- README, 파일, 릴리즈 본문 등 GitHub 작업을 직접 수행하게 하기
- 직접적인 Release 수정 액션이 없어도 GitHub Actions를 이용해 처리하기
- 작업 후 반드시 실제 결과를 다시 읽어 검증하기
- 임시 우회 수단은 작업이 끝나면 삭제하기

---

## 1. 기본 원칙

ChatGPT에게 GitHub 작업을 요청할 때는 가능하면 저장소와 작업 대상을 명확히 적습니다.

예:

```text
@GitHub
https://github.com/Dollars-Archive/eve-ghost-enemies-kr-patch

README.md의 이미지 크기를 전부 80%로 바꿔줘.
실제로 GitHub 파일을 읽고 수정한 뒤 다시 읽어서 반영 여부까지 확인해.
```

중요한 문구:

```text
연결 상태나 가능 여부를 추측하지 말고 실제 GitHub 도구 호출 결과로 판단해.
```

ChatGPT가 작업 완료라고 말할 때도 반드시 다음 순서가 좋습니다.

1. 대상 저장소 확인
2. 대상 파일/릴리즈 실제 읽기
3. 수정 수행
4. 수정 결과 다시 읽기
5. 실제 반영된 값 확인

즉, **"수정본을 만들어줬다"와 "GitHub에 실제 반영했다"는 완전히 다른 일**입니다.

---

## 2. README 및 일반 파일 수정

README나 일반 텍스트 파일은 GitHub 연결에서 파일 쓰기 기능이 노출되어 있으면 바로 수정할 수 있습니다.

일반적인 흐름:

1. 저장소 확인
2. `README.md` 또는 대상 파일 읽기
3. 현재 blob SHA 확인
4. 파일 전체 내용을 수정
5. 기존 SHA를 사용해 업데이트
6. 새 SHA/커밋 확인
7. 파일을 다시 읽어 최종 내용 검증

ChatGPT에게는 이렇게 요청하면 됩니다.

```text
@GitHub
README.md를 실제로 읽고 수정해.
수정 후 README.md를 다시 읽어서 원하는 값이 실제로 들어갔는지 확인하고 커밋 SHA를 알려줘.
```

### 핵심

파일 수정은 단순히 마크다운을 답변으로 출력하는 것으로 끝내지 말고 **GitHub 파일 쓰기 도구를 실제로 호출**해야 합니다.

---

## 3. Release 본문 수정이 직접 지원되지 않을 때

일부 ChatGPT GitHub 연결에서는 Release 조회는 가능하지만 `update_release` 같은 직접적인 수정 액션이 노출되지 않을 수 있습니다.

이 경우 곧바로 "릴리즈 수정은 불가능"이라고 결론 내리면 안 됩니다.

저장소에 쓰기 권한이 있고 GitHub Actions가 사용 가능하면 **일회용 GitHub Actions 워크플로**를 만들어 Release API를 호출할 수 있습니다.

### 실제로 성공한 방식

2026-09-08 `Dollars-Archive/eve-ghost-enemies-kr-patch` 저장소의 `v1.0.0-preview` Release 본문을 이 방식으로 실제 수정했습니다.

작업 흐름:

1. GitHub에서 대상 Release를 읽어 Release ID 확인
2. 저장소의 push/write 권한 확인
3. `.github/workflows/` 아래 일회용 workflow 생성
4. workflow에서 저장소 기본 `GITHUB_TOKEN` 사용
5. `gh api --method PATCH`로 Release 본문 수정
6. Actions 실행 상태가 `success`인지 확인
7. Release를 다시 읽어 실제 본문 반영 확인
8. 일회용 workflow 파일 삭제

---

## 4. 일회용 Release 수정 workflow 예시

아래 구조가 실제로 사용된 핵심 형태입니다.

```yaml
name: One-shot update release

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  update-release:
    if: github.event.head_commit.message == 'One-shot update release notes'
    runs-on: ubuntu-latest

    steps:
      - name: Update release notes
        env:
          GH_TOKEN: ${{ github.token }}
          BODY: |
            # 새 Release 본문

            여기에 원하는 Markdown 내용을 넣는다.

        run: |
          gh api --method PATCH \
            "repos/${{ github.repository }}/releases/RELEASE_ID" \
            -f body="$BODY"
```

여기서 `RELEASE_ID`는 태그 이름을 추측해서 쓰지 말고 **대상 Release를 먼저 실제 조회해서 얻은 숫자 ID**를 사용해야 합니다.

예를 들어 실제 작업에서는 다음 Release가 대상이었습니다.

```text
Repository:
Dollars-Archive/eve-ghost-enemies-kr-patch

Tag:
v1.0.0-preview

Release ID:
379109959
```

---

## 5. 왜 이 방법이 되는가

ChatGPT GitHub 커넥터에 Release 수정 함수가 직접 없어도, 다음 기능이 있으면 우회가 가능합니다.

- 저장소 파일 생성 가능
- `.github/workflows/`에 workflow 작성 가능
- GitHub Actions 실행 가능
- 기본 `GITHUB_TOKEN`에 `contents: write` 권한 부여 가능
- GitHub CLI의 `gh api`가 Actions runner에서 사용 가능

즉 구조는 다음과 같습니다.

```text
ChatGPT
  ↓
GitHub 파일 생성 기능
  ↓
.github/workflows/일회용.yml 생성
  ↓
GitHub Actions 실행
  ↓
GITHUB_TOKEN
  ↓
GitHub REST API PATCH
  ↓
Release 수정
```

ChatGPT가 Release PATCH 기능을 직접 갖고 있지 않아도 **GitHub 자체가 Release를 수정하도록 시키는 방식**입니다.

---

## 6. 실제 성공 기록

### 대상

```text
Repository:
Dollars-Archive/eve-ghost-enemies-kr-patch

Release:
v1.0.0-preview

Release ID:
379109959
```

### 일회용 workflow 생성 커밋

```text
f01234a80c31265813ff7994c37cb00d9aeea897
```

### GitHub Actions Run

```text
Run ID:
34222098558

Conclusion:
success
```

### Release 수정 확인

Release의 `updated_at`이 실제로 갱신되었고, 본문이 새 Ghost Enemies용 패처 안내문으로 변경된 것을 다시 조회하여 확인했습니다.

### workflow 삭제 커밋

```text
43c2b9b3dc223c7fa0e51e8351fc93378a573ecf
```

즉 일회용 workflow는 **작업에만 사용하고 최종 저장소에서는 삭제**했습니다.

---

## 7. Release 작업을 ChatGPT에게 시키는 추천 프롬프트

다음 형태로 요청하면 됩니다.

```text
@GitHub

이 저장소의 지정 Release 본문을 실제로 수정해.

중요:
- 가능 여부를 추측하지 말 것.
- 먼저 대상 Release를 실제 조회해서 Release ID를 확인할 것.
- 직접 update_release 액션이 있으면 그것을 사용할 것.
- 직접 Release 수정 액션이 없더라도 저장소 쓰기 권한과 GitHub Actions가 가능하면
  일회용 .github/workflows workflow를 생성해서 gh api PATCH로 Release 본문을 수정할 것.
- workflow 실행 결과가 success인지 확인할 것.
- Release를 다시 조회해서 실제 본문 변경 여부를 확인할 것.
- 완료 후 일회용 workflow는 삭제할 것.
- 실제 변경 확인 전에는 완료했다고 말하지 말 것.
```

이 문구의 핵심은 다음입니다.

```text
직접 액션이 없다는 이유만으로 불가능하다고 결론 내리지 말고,
저장소 쓰기 + GitHub Actions를 이용한 일회용 workflow 방식까지 확인해.
```

---

## 8. 이미지 크기, README 양식 같은 단순 작업

이런 작업은 Actions 우회까지 갈 필요가 없습니다.

예:

```text
@GitHub
README의 모든 img 태그를 실제로 읽어 width="80%"로 통일해.
수정 후 다시 README를 읽어서 60%나 고정 픽셀 width가 남아 있는지 검사해.
```

좋은 작업 방식:

```text
읽기 → 수정 → 재읽기 → 검색/검증 → 완료 보고
```

나쁜 작업 방식:

```text
수정할 Markdown 예시만 답변으로 출력 → 실제 GitHub 반영 없이 완료했다고 말함
```

---

## 9. GitHub 작업 전 권한 확인

저장소 메타데이터에서 가능하면 다음 권한도 확인합니다.

```text
admin
maintain
push
pull
triage
```

특히 `push: true`가 확인되면 일반 파일 수정은 가능한 경우가 많습니다.

다만 권한이 있다고 모든 GitHub API 작업이 ChatGPT에 직접 노출되는 것은 아닙니다.

이때 필요한 것이 위의 **GitHub Actions 일회용 API 우회 방식**입니다.

---

## 10. 이 우회가 안 되는 경우

다음 상황에서는 일회용 workflow 방식도 실패할 수 있습니다.

- 저장소에 파일 쓰기 권한이 없음
- GitHub Actions가 비활성화됨
- workflow 파일 생성을 막는 정책이 있음
- `GITHUB_TOKEN`이 읽기 전용으로 강제됨
- Release 수정 권한이 없음
- branch protection 때문에 직접 workflow 커밋이 차단됨

이 경우에는 실제 오류 결과를 보고 판단해야 합니다.

**호출도 하지 않고 "아마 안 될 것"이라고 추측하면 안 됩니다.**

---

## 11. DevSpace Tunnel과 함께 쓸 때

로컬 프로젝트 파일까지 작업해야 하는 경우에는 `@DevSpace Tunnel`과 `@GitHub`를 함께 사용할 수 있습니다.

권장 지시:

```text
@DevSpace Tunnel @GitHub

DevSpace 연결 상태를 추측하지 말고 반드시 open_workspace를 실제 호출해.
성공한 workspaceId로 로컬 프로젝트를 작업하고,
GitHub 작업은 실제 GitHub 도구를 사용해 반영해.
각 단계는 실제 호출 결과로만 성공/실패를 판정해.
```

DevSpace는 로컬 코드/파일 작업, GitHub는 원격 저장소/README/Release/커밋 확인으로 역할을 분리하면 편합니다.

---

## 12. 최종 체크리스트

ChatGPT에게 GitHub 일을 시킨 뒤 아래를 확인합니다.

- [ ] 실제 저장소를 조회했는가
- [ ] 대상 파일 또는 Release를 먼저 읽었는가
- [ ] 실제 쓰기 도구를 호출했는가
- [ ] 커밋 또는 Actions Run이 생성되었는가
- [ ] Actions를 썼다면 `success`를 확인했는가
- [ ] 변경 대상을 다시 읽어 실제 반영을 확인했는가
- [ ] 일회용 workflow를 삭제했는가
- [ ] 검증 전에는 완료라고 말하지 않았는가

---

## 한 줄 요약

```text
GitHub 직접 수정 액션이 없다고 끝이 아니다.
저장소 쓰기가 가능하면 일회용 GitHub Actions workflow를 만들고
GITHUB_TOKEN + gh api PATCH로 GitHub가 자기 자신을 수정하게 할 수 있다.
그리고 반드시 결과를 다시 조회해 검증한 뒤 workflow를 삭제한다.
```
