# EVE ghost enemies 한국어 패치 설치 가이드

이 문서는 **설치 방법을 한곳에서 관리하기 위한 공용 설치 가이드**입니다.

앞으로 각 Release에는 해당 버전의 변경 사항과 호환성만 간단히 적고, 실제 설치 방법은 이 문서를 기준으로 안내합니다.

---

## 지원 원본

- Base Title ID: `01007BE0160D6000`
- 본편 버전: `v0`
- Update Title ID: `01007BE0160D6800`
- 업데이트 버전: `v131072`
- RomForge 표시 버전: `1.01`
- 게임 내 표시 버전: `1.02`

> [!NOTE]
> 동일한 지원 업데이트가 **RomForge에서는 1.01**, 실제 게임 화면에서는 **1.02**로 표시됩니다.  
> 패치 기준은 게임 내 표시 버전 **1.02**입니다.

> [!IMPORTANT]
> **본편만 추출한 RomFS는 사용할 수 없습니다.**  
> 반드시 **본편 + 지원 업데이트(RomForge 1.01 / 게임 내 1.02)가 함께 적용된 RomFS**가 필요합니다.

---

## 1. RomForge로 RomFS 준비

> [!TIP]
> **RomFS 덤프 방법을 이미 알고 계신다면 이 과정은 건너뛰셔도 됩니다.**

1. RomForge를 실행합니다.
2. 상단 메뉴에서 `Switch` → `리팩` → `파일`로 이동합니다.
3. **EVE ghost enemies 본편 파일과 지원 업데이트 파일**을 RomForge 창으로 드래그합니다.
4. 우측 하단의 **폴더 아이콘**을 눌러 Output 위치를 지정합니다.
5. 하단의 **`언팩`** 버튼을 누릅니다.
6. 언팩이 완료될 때까지 기다립니다.

정상적으로 불러왔다면 RomForge에 아래 두 항목이 표시됩니다.

```text
Base   : 01007BE0160D6000 / 1.0.0
Update : 01007BE0160D6800 / 1.01
```

> 게임 실행 후에는 업데이트 버전이 **1.02**로 표시됩니다.

> [!WARNING]
> ### RomFS 언팩 시 생성되는 2개의 타이틀 폴더
>
> EVE ghost enemies를 RomForge로 언팩하면 아래와 같이 **2개의 타이틀 폴더가 생성됩니다.**
>
> ```text
> 01007BE0160D6000
> └─ EVE Ghost Enemies 본편
>
> 01007BE0160D6001
> └─ DESIRE remaster 특전
> ```
>
> **이는 언팩 오류가 아니라 정상적인 구조입니다.**  
> 한글패치를 적용할 때는 반드시 **EVE Ghost Enemies 본편인 `01007BE0160D6000` 폴더**를 사용해 주세요.  
> `01007BE0160D6001`은 업데이트 데이터가 아니라 **DESIRE remaster 특전용 별도 프로그램**입니다.

---

## 2. 한국어 패치 적용

1. 배포 ZIP을 완전히 압축 해제합니다.
2. `EVE-Ghost-Enemies-KR-Patcher.exe`를 실행합니다.
3. `[폴더 선택]`을 누릅니다.
4. RomForge에서 언팩한 아래 `romfs` 폴더를 선택합니다.

```text
unpacked\01007BE0160D6000\romfs
```

5. 화면에 `패치를 시작할 수 있습니다.`가 표시되는지 확인합니다.
6. `[한국어 패치 시작]`을 누릅니다.
7. 원본 검증 → 패치 적용 → 결과 검증이 자동으로 진행됩니다.

패치가 완료되면 패처 폴더 안에 PC용과 Switch·Android용 결과 폴더가 생성됩니다.

```text
EVE-Ghost-Enemies-KR-vX.Y.Z-Patcher
├─ EVE-Ghost-Enemies-KR-vX.Y.Z-PC
└─ EVE-Ghost-Enemies-KR-vX.Y.Z-Switch-Android
```

`vX.Y.Z` 부분은 설치한 패치 버전에 따라 달라집니다.

---

## 3. PC 설치

### Eden Windows

> [!TIP]
> **권장 버전: Eden Windows v0.2.1 Standard**

패처가 생성한 **PC용 결과 폴더**를 사용합니다.

게임 우클릭 → `Open Mod Data Location`을 연 뒤 해당 패치 폴더를 적용합니다.

---

## 4. Android 설치

### Eden Android Nightly

> [!WARNING]
> ### Android판 실행 관련 중요 안내
> 현재 Android 환경은 **Lenovo Legion Y700 3세대에서만 게임 실행을 확인**했습니다.  
> 그 외 Android 기기에서는 **게임이 실행되지 않는 문제가 있어 현재 원인을 조사 중**입니다.
>
> **Android에서 플레이하실 분들은 현재 버전 적용을 기다려 주시고, 수정된 다음 패치가 배포된 뒤 이용해 주세요.**

> [!CAUTION]
> **아래 Android 에뮬레이터 설치 안내는 현재 사용 중지 상태입니다.**  
> 호환성 문제가 해결되면 다시 안내할 예정이며, 아래 내용은 기존 설치 방법 보존용으로 남겨둡니다.

~~**Eden Android Nightly 사용을 권장합니다.**~~

~~패처가 생성한 `EVE-Ghost-Enemies-KR-vX.Y.Z-Switch-Android` 폴더를 사용합니다.~~

~~게임 속성 → `Add-ons` → 설치 또는 `+` → `Mod`에서 해당 폴더를 선택합니다.~~

~~게임 실행 중 튕김이나 프리징이 발생하면 릴리즈에 함께 첨부된 `Custom Settings for EVE.zip`의 Android용 Eden 설정 파일 `01007BE0160D6000.ini`를 적용한 뒤 다시 실행해 주세요.~~

~~Android 11 이상에서는 직접 경로에 복사하는 것보다 Eden의 **Add-ons 설치 기능** 사용을 권장합니다.~~

---

## 5. Nintendo Switch 실기 설치

### Atmosphere

> [!IMPORTANT]
> ## Switch 설치는 폴더 2개를 각각 다른 위치에 복사합니다
>
> 패처 실행이 끝나면 **Switch·Android용 결과 폴더** 안의 아래 두 폴더를 사용합니다.
>
> ```text
> 01007BE0160D6000
> atmosphere
> ```
>
> **`01007BE0160D6000` 폴더와 `atmosphere` 폴더는 복사 위치가 서로 다릅니다.**

### 1단계: `01007BE0160D6000` 폴더 복사

결과물의 **`01007BE0160D6000` 폴더를 통째로** 아래 위치에 복사합니다.

```text
SD:/atmosphere/contents/
```

복사가 끝나면 아래처럼 되어 있어야 합니다.

```text
SD카드
└─ atmosphere
   └─ contents
      └─ 01007BE0160D6000
```

### 2단계: `atmosphere` 폴더 복사

결과물의 **`atmosphere` 폴더를 SD카드 최상위(루트)에 복사**합니다.

```text
SD:/
```

이미 SD카드에 `atmosphere` 폴더가 있다면 **기존 폴더와 병합해서 복사**하면 됩니다.

### 3단계: 한글패치 적용 여부 확인

두 폴더를 모두 복사했으면 **먼저 재부팅하지 말고 게임을 실행해서 한글패치가 적용됐는지 확인**해 주세요.

정상적으로 한글이 표시된다면 **추가 재부팅 없이 그대로 사용하면 됩니다.**

> [!TIP]
> 한글패치가 적용되지 않거나 변경 내용이 반영되지 않는 경우에만 **Switch 본체를 재부팅한 뒤 다시 실행**해 주세요.

> [!WARNING]
> - `01007BE0160D6000` 폴더를 SD카드 루트에 바로 넣으면 안 됩니다.
> - `atmosphere` 폴더를 `contents` 안에 넣으면 안 됩니다.
> - 최종적으로 `01007BE0160D6000`은 반드시 `SD:/atmosphere/contents/` 아래에 있어야 합니다.

정리하면 아래 두 줄만 기억하면 됩니다.

```text
01007BE0160D6000  →  SD:/atmosphere/contents/
atmosphere        →  SD:/
```

---

## 주의사항

- 본인이 소유한 게임에서 직접 준비한 원본을 사용하세요.
- 이미 다른 패치나 모드가 적용된 RomFS는 사용할 수 없습니다.
- 기존 결과 폴더가 존재하면 패처가 덮어쓰지 않고 중단합니다.

본 배포본에는 **게임 본편 및 원본 게임 데이터, 원본 RomFS, 키 파일 또는 완성 게임 파일이 포함되어 있지 않습니다.**
