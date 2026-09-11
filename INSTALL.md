# EVE ghost enemies 한국어 패치 설치 가이드

현재 기준 버전은 **v1.2.0**입니다.

이 문서는 처음 설치하는 분도 그대로 따라 할 수 있도록 **원본 준비 → 패처 실행 → PC / Android / Nintendo Switch 적용 → 문제 발생 시 확인할 항목** 순서로 정리했습니다.

> [!IMPORTANT]
> **PC는 Eden Windows v0.2.1 Standard, Android는 Eden Android Nightly 최신 빌드 사용을 권장합니다.**
>
> v1.2.0은 실행 파일을 직접 교체하는 **direct-main 방식**입니다. 구버전 패치 위에 덮어쓰기보다 아래 순서대로 깨끗하게 새로 적용하는 것을 권장합니다.

---

## 0. 지원 원본 확인

- Base Title ID: `01007BE0160D6000`
- 본편 버전: `v0`
- Update Title ID: `01007BE0160D6800`
- 업데이트 버전: `v131072`
- RomForge 표시 버전: `1.01`
- 게임 내 표시 버전: `1.02`

> [!NOTE]
> 같은 업데이트가 **RomForge에서는 1.01**, 실제 게임 화면에서는 **1.02**로 표시됩니다.
>
> 패치 기준은 게임 내 표시 버전 **1.02**입니다.

> [!WARNING]
> **Base만 언팩한 결과는 사용할 수 없습니다.**
>
> 반드시 **Base v0 + Update v131072가 함께 반영된 깨끗한 원본**을 사용하세요. 이미 다른 한글패치나 모드가 적용된 RomFS 또는 `main`도 사용하지 않는 것을 권장합니다.

---

## 1. RomForge로 원본 준비

> [!TIP]
> RomFS 언팩 방법을 이미 알고 있고 Base + Update가 합쳐진 정상 원본이 준비되어 있다면 이 단계는 건너뛰어도 됩니다.

1. RomForge 1.7.0을 실행합니다.
2. 본인이 소유한 **EVE ghost enemies Base 파일**과 **Update v131072 파일**을 함께 불러옵니다.
3. Base와 Update가 모두 적용된 상태로 언팩합니다.
4. 언팩이 끝난 폴더의 `unpacked` 폴더를 확인합니다.

정상적으로 준비되면 아래 구조가 존재해야 합니다.

```text
unpacked
├─ 01007BE0160D6000
│  ├─ exefs
│  │  └─ main
│  └─ romfs
│     └─ data_eve3
└─ 01007BE0160D6001
   └─ DESIRE remaster 특전 데이터
```

> [!WARNING]
> EVE ghost enemies는 언팩 시 **두 개의 Title ID 폴더가 생성될 수 있습니다.**
>
> 한글패치에 사용하는 폴더는 반드시 **`01007BE0160D6000`**입니다.
>
> `01007BE0160D6001`은 업데이트 데이터가 아니라 **DESIRE remaster 특전용 별도 프로그램**입니다.

> [!IMPORTANT]
> 패처에서는 아래 둘 중 하나를 선택할 수 있습니다.
>
> - `unpacked` 폴더
> - `unpacked` 안의 `01007BE0160D6000` 폴더

예전처럼 `romfs` 폴더만 따로 선택하는 방식이 아니라 **본편 폴더 또는 unpacked 폴더 전체를 기준으로 검사**합니다.

---

## 2. v1.2.0 패처 실행

1. 배포 ZIP을 원하는 위치에 **완전히 압축 해제**합니다.
2. `EVE-Ghost-Enemies-KR-Patcher.exe`를 실행합니다.
3. **원본 폴더 선택**에서 RomForge의 `unpacked` 또는 `01007BE0160D6000` 폴더를 선택합니다.
4. 패처가 Title ID와 원본 파일을 정상적으로 인식하는지 확인합니다.
5. **출력 위치**를 선택합니다.
6. `한국어 패치 시작`을 누릅니다.
7. 원본 검사 → 패치 적용 → 결과 검사가 끝날 때까지 기다립니다.

패처는 다음 항목을 자동으로 검사합니다.

- 지원 Title ID
- 원본 `exefs/main` 크기·SHA-256·Build ID
- RomFS 대상 135개 파일의 크기와 SHA-256
- xdelta 패치 파일 무결성
- 생성된 결과 파일의 최종 SHA-256

검사에 실패하면 원본을 수정하지 않고 중단합니다.

정상 완료 시 다음 세 폴더가 만들어집니다.

```text
EVE-Ghost-Enemies-KR-v1.2.0-PC
EVE-Ghost-Enemies-KR-v1.2.0-Android
EVE-Ghost-Enemies-KR-v1.2.0-Switch
```

각 폴더는 **용도가 다르므로 사용하는 환경에 맞는 결과물만 적용**하면 됩니다.

---

## 3. 결과물 구조

### PC용

```text
EVE-Ghost-Enemies-KR-v1.2.0-PC
├─ exefs
│  └─ main
└─ romfs
   └─ data_eve3
```

### Android용

```text
EVE-Ghost-Enemies-KR-v1.2.0-Android
└─ 01007BE0160D6000
   ├─ exefs
   │  └─ main
   └─ romfs
      └─ data_eve3
```

### Nintendo Switch용

```text
EVE-Ghost-Enemies-KR-v1.2.0-Switch
└─ atmosphere
   └─ contents
      └─ 01007BE0160D6000
         ├─ exefs
         │  └─ main
         └─ romfs
            └─ data_eve3
```

> [!NOTE]
> v1.2.0은 실행 파일을 직접 교체하는 **direct-main 방식**입니다. 별도의 IPS 설치는 필요하지 않습니다.

---

# 4. PC 적용 방법

## Eden Windows

> [!TIP]
> **권장 버전: Eden Windows v0.2.1 Standard**

사용하는 폴더:

```text
EVE-Ghost-Enemies-KR-v1.2.0-PC
```

### 적용 순서

1. Eden에서 `EVE ghost enemies`를 찾습니다.
2. 게임을 **우클릭**합니다.
3. `Open Mod Data Location` 또는 **모드 데이터 위치 열기**를 선택합니다.
4. 열린 게임 모드 폴더에 PC 결과물의 아래 두 폴더를 함께 복사합니다.

```text
exefs
romfs
```

5. 복사 후 게임 모드 위치 바로 아래에 `exefs`와 `romfs`가 보여야 합니다.
6. 기존 v1.1.x 모드나 같은 게임 파일을 수정하는 다른 모드가 있다면 비활성화하거나 제거합니다.
7. Eden을 다시 실행하거나 게임 목록을 새로고침한 뒤 게임을 시작합니다.
8. 타이틀 화면과 게임 내 대사가 한국어로 표시되는지 확인합니다.

<img width="170" height="262" alt="Eden Windows 모드 데이터 위치 열기" src="https://github.com/user-attachments/assets/6eb8b78b-362e-4e1d-a952-1a6feced8c5e" />

> [!WARNING]
> `EVE-Ghost-Enemies-KR-v1.2.0-PC` 폴더 자체를 한 단계 더 안쪽에 넣지 마세요.
>
> Eden이 읽는 게임 모드 위치에서 **`exefs`와 `romfs`가 바로 보여야 합니다.**

---

# 5. Android 적용 방법

## Eden Android Nightly

> [!TIP]
> **권장 버전: Eden Android Nightly 최신 빌드**

사용하는 폴더:

```text
EVE-Ghost-Enemies-KR-v1.2.0-Android
└─ 01007BE0160D6000
```

### 방법 A. Eden의 Add-ons 기능으로 적용

Android 11 이상에서는 파일 관리 앱으로 `Android/data` 내부를 직접 수정하는 것보다 **Eden의 Add-ons 설치 기능을 사용하는 것을 권장**합니다.

1. Eden에서 `EVE ghost enemies`의 게임 설정 또는 속성을 엽니다.
2. `Add-ons` 메뉴로 이동합니다.
3. `+` 또는 **설치** 버튼을 누릅니다.
4. 콘텐츠 종류에서 **모드 및 치트 / Mod**를 선택합니다.
5. 패처가 만든 Android 결과물의 `01007BE0160D6000` 폴더를 지정합니다.
6. Android의 폴더 접근 권한 창이 나타나면 해당 폴더 사용을 허용합니다.
7. 설치가 끝나면 Add-ons 목록에서 EVE ghost enemies용 모드가 활성화되어 있는지 확인합니다.
8. 게임을 실행해 한국어 적용 여부를 확인합니다.

<img width="80%" alt="Eden Android Add-ons 모드 설치 화면" src="https://github.com/user-attachments/assets/e236f5cb-fe09-4818-ba54-23e6edf5416c" />

<img width="80%" alt="Eden Android 01007BE0160D6000 폴더 선택 화면" src="https://github.com/user-attachments/assets/0f348138-0837-416f-9030-e7eb38dfb7ab" />

### 방법 B. 모드 폴더에 직접 복사

직접 복사가 가능한 환경에서는 Android 결과물 안의 `01007BE0160D6000` 폴더를 Eden의 `load` 위치에 넣어도 됩니다.

최종 구조는 다음과 같아야 합니다.

```text
01007BE0160D6000
├─ exefs
│  └─ main
└─ romfs
   └─ data_eve3
```

최종적으로 아래 두 경로가 함께 존재해야 합니다.

```text
01007BE0160D6000/exefs/main
01007BE0160D6000/romfs/data_eve3
```

> [!IMPORTANT]
> **v1.2.0 direct-main 결과는 Android에서 검증되었습니다.**
>
> 현재 **Odin2 Portal에서 정상 작동을 확인**했습니다.

> [!WARNING]
> 기존 v1.1.x Android 모드 또는 예전 설정 파일이 남아 있다면 먼저 제거하고 v1.2.0 결과물만 적용하는 것을 권장합니다.

### Custom Settings 관련

v1.1.1에서 사용하던 `Custom Settings for EVE.zip`과 `01007BE0160D6000.ini` 안내는 **구버전용 안내**입니다.

v1.2.0 direct-main 패치에서는 우선 **Eden Android Nightly 최신 빌드 + v1.2.0 결과물만으로 실행**해 주세요.

---

# 6. Nintendo Switch 실기 적용 방법

## Atmosphere

사용하는 폴더:

```text
EVE-Ghost-Enemies-KR-v1.2.0-Switch
└─ atmosphere
```

> [!CAUTION]
> **기존 Switch 한글패치 위에 그대로 덮어쓰지 마세요.**
>
> 구버전 IPS나 RomFS 파일이 남아 있으면 새 direct-main 파일과 충돌해 오류가 발생할 수 있습니다.

### 적용 순서

1. Switch의 전원을 끄고 SD 카드를 PC에 연결합니다.
2. 아래 기존 모드 폴더가 있다면 **삭제하거나 내부를 완전히 비웁니다.**

```text
SD:/atmosphere/contents/01007BE0160D6000
```

3. 기존 v1.1.1 IPS 패치셋이 있다면 아래 경로도 백업 후 비활성화하거나 제거합니다.

```text
SD:/atmosphere/exefs_patches/EVE-Ghost-Enemies-KR-v1.1.1
```

4. 패처가 생성한 Switch 결과물 안의 `atmosphere` 폴더를 SD 카드 **최상위 루트**에 복사합니다.
5. 기존 `atmosphere` 폴더가 있다면 정상적으로 병합합니다.
6. 복사가 끝난 뒤 아래 경로를 확인합니다.

```text
SD:/atmosphere/contents/01007BE0160D6000/exefs/main
SD:/atmosphere/contents/01007BE0160D6000/romfs/data_eve3/...
```

7. SD 카드를 Switch에 다시 넣습니다.
8. **Switch 본체를 완전히 재부팅**합니다.
9. 게임을 실행해 한국어 적용 여부를 확인합니다.

> [!WARNING]
> `01007BE0160D6000` 폴더를 SD 카드 루트에 바로 넣는 것이 아닙니다.
>
> 반드시 `SD:/atmosphere/contents/01007BE0160D6000/` 구조가 되어야 합니다.

---

# 7. 패치가 적용되지 않을 때 확인

아래 항목을 순서대로 확인해 주세요.

1. **게임 내 표시 버전이 1.02인지 확인**
2. RomForge 원본에 **Base + Update v131072가 함께 반영**되어 있는지 확인
3. 패처 입력으로 `romfs`만 선택하지 않았는지 확인
4. 다른 한글패치 또는 모드가 섞인 원본을 사용하지 않았는지 확인
5. PC에서는 게임 모드 위치 바로 아래에 `exefs`와 `romfs`가 있는지 확인
6. Android에서는 `01007BE0160D6000/exefs/main`과 `romfs/data_eve3`가 함께 있는지 확인
7. Android에서는 **Eden Android Nightly 최신 빌드**를 사용 중인지 확인
8. Switch에서는 구버전 `01007BE0160D6000` 모드와 v1.1.1 IPS를 먼저 제거했는지 확인
9. Switch 적용 후 **완전 재부팅**했는지 확인

패처가 원본 검사 단계에서 중단된다면 파일을 억지로 바꾸기보다 **깨끗한 Base + Update 원본부터 다시 준비하는 것을 권장**합니다.

---

# 8. v1.2.0 주요 변경 사항

- 저장·불러오기 목록의 문자열 처리 프리징 수정
- 일반 저장 실패 사례 수정
- 30·36번 세이브에서 확인된 목록 이동 프리징 수정
- 저장·삭제·복사·사이트 변경 관련 시스템 문구 번역
- PC·Android·Nintendo Switch direct-main 출력 통합

패치는 세이브 파일 자체를 수정하지 않습니다. 기존 세이브의 원본 백업은 계속 보관하는 것을 권장합니다.

---

# 확인된 호환성

- **PC:** Eden Windows에서 정상 작동 확인
- **Android:** Odin2 Portal에서 정상 작동 확인
- **Nintendo Switch 실기:** 정상 작동 확인

---

# 주의사항

- 본인이 소유한 게임과 키로 준비한 원본을 사용하세요.
- 이미 다른 번역 패치나 모드가 적용된 RomFS 또는 `main`은 사용하지 마세요.
- 패처는 기존 결과 폴더를 덮어쓰지 않습니다.
- 패처는 원본 NSP·XCI를 재팩하지 않으며 완성 게임 파일을 배포하지 않습니다.
- 배포물에는 원본 게임, 원본 RomFS, `prod.keys`, 완성된 `main`이 포함되지 않습니다.
