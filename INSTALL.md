# EVE ghost enemies 한국어 패치 설치 가이드

현재 기준 버전은 **v1.2.0**입니다.

이 문서는 **Nintendo Switch 실기 적용 방법만** 안내합니다.

> [!IMPORTANT]
> v1.2.0은 실행 파일을 직접 교체하는 **direct-main 방식**입니다.  
> 구버전 패치 위에 덮어쓰기보다 아래 순서대로 기존 패치 파일을 정리한 뒤 새로 적용하는 것을 권장합니다.

---

## 0. 지원 원본 확인

- Base Title ID: `01007BE0160D6000`
- 본편 버전: `v0`
- Update Title ID: `01007BE0160D6800`
- 업데이트 버전: `v131072`
- RomForge 표시 버전: `1.01`
- 게임 내 표시 버전: `1.02`
- 본편 MD5: `149E2F86F4A5DCE6196622A9F8B92C1B`
- 업데이트 MD5: `A7F1BAD62D2423236F8C2DDF6C94C54F`

> [!NOTE]
> 같은 업데이트가 **RomForge에서는 1.01**, 실제 게임 화면에서는 **1.02**로 표시됩니다.  
> 패치 기준은 게임 내 표시 버전 **1.02**입니다.

> [!WARNING]
> **Base만 언팩한 결과는 사용할 수 없습니다.**  
> 반드시 **Base v0 + Update v131072가 함께 반영된 깨끗한 원본**을 사용하세요.

---

## 1. RomForge로 원본 준비

> [!TIP]
> Base + Update가 함께 반영된 정상 원본이 이미 준비되어 있다면 이 단계는 건너뛰어도 됩니다.

1. RomForge 1.7.0을 실행합니다.
2. 본인이 보유한 **EVE ghost enemies Base 파일**과 **Update v131072 파일**을 함께 불러옵니다.
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
> 한글패치에 사용하는 폴더는 반드시 **`01007BE0160D6000`**입니다.  
> `01007BE0160D6001`은 업데이트 데이터가 아니라 **DESIRE remaster 특전용 별도 프로그램**입니다.

패처에서는 아래 둘 중 하나를 선택할 수 있습니다.

- `unpacked` 폴더
- `unpacked` 안의 `01007BE0160D6000` 폴더

---

## 2. v1.2.0 패처 실행

1. 배포 ZIP을 원하는 위치에 **완전히 압축 해제**합니다.
2. `EVE-Ghost-Enemies-KR-Patcher.exe`를 실행합니다.
3. **원본 폴더 선택**에서 RomForge의 `unpacked` 또는 `01007BE0160D6000` 폴더를 선택합니다.
4. 패처가 Title ID와 원본 파일을 정상적으로 인식하는지 확인합니다.
5. **출력 위치**를 선택합니다.
6. `한국어 패치 시작`을 누릅니다.
7. 원본 검사 → 패치 적용 → 결과 검사가 끝날 때까지 기다립니다.

패처는 지원 Title ID, 원본 파일, xdelta 패치 파일 및 완성 결과의 SHA-256을 자동으로 검사합니다.

**Nintendo Switch 적용에는 아래 결과물을 사용합니다.**

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

---

## 3. Nintendo Switch 적용 방법

> [!CAUTION]
> **기존 Switch 한글패치 위에 그대로 덮어쓰지 마세요.**  
> 구버전 IPS나 RomFS 파일이 남아 있으면 새 direct-main 파일과 충돌할 수 있습니다.

### 방법 A. SD 카드를 PC에 연결해서 설치

1. 실행 중인 `EVE ghost enemies`를 완전히 종료합니다.
2. SD 카드를 분리해서 작업할 경우 Switch 전원을 끈 뒤 SD 카드를 PC에 연결합니다.
3. 아래 기존 모드 폴더가 있다면 **삭제하거나 내부를 완전히 비웁니다.**

```text
SD:/atmosphere/contents/01007BE0160D6000
```

4. 기존 v1.1.1 IPS 패치셋이 있다면 아래 경로도 백업 후 비활성화하거나 제거합니다.

```text
SD:/atmosphere/exefs_patches/EVE-Ghost-Enemies-KR-v1.1.1
```

5. 패처가 생성한 Switch 결과물 안의 `atmosphere` 폴더를 SD 카드 **최상위 루트**에 복사합니다.
6. 복사가 끝난 뒤 아래 경로를 확인합니다.

```text
SD:/atmosphere/contents/01007BE0160D6000/exefs/main
SD:/atmosphere/contents/01007BE0160D6000/romfs/data_eve3/...
```

7. SD 카드를 Switch에 다시 넣고 부팅한 뒤 게임을 실행해 한국어 적용 여부를 확인합니다.

### 방법 B. DBI MTP로 SD 카드 분리 없이 설치

1. 실행 중인 `EVE ghost enemies`를 완전히 종료합니다.
2. Switch에서 **DBI**를 실행합니다.
3. **`Run MTP responder`**를 실행합니다.
4. 데이터 전송이 가능한 USB 케이블로 Switch와 PC를 연결합니다.
5. Windows 파일 탐색기에서 **`1: SD Card`**를 엽니다.
6. 아래 기존 모드 폴더가 있다면 삭제하거나 내부를 완전히 비웁니다.

```text
1: SD Card/atmosphere/contents/01007BE0160D6000
```

7. 기존 v1.1.1 IPS 패치셋이 있다면 아래 경로도 백업 후 비활성화하거나 제거합니다.

```text
1: SD Card/atmosphere/exefs_patches/EVE-Ghost-Enemies-KR-v1.1.1
```

8. 패처가 생성한 Switch 결과물 안의 `atmosphere` 폴더를 **`1: SD Card` 최상위 루트**에 복사합니다.
9. 복사가 끝나면 MTP responder를 종료하고 게임을 실행합니다.

> [!TIP]
> 정상적으로 적용되면 별도 재부팅은 필요하지 않습니다.  
> 한글패치가 적용되지 않을 때만 Switch 본체를 재부팅한 뒤 다시 확인해 보세요.

> [!WARNING]
> `01007BE0160D6000` 폴더를 SD 카드 루트에 바로 넣는 것이 아닙니다.  
> 반드시 `SD:/atmosphere/contents/01007BE0160D6000/` 구조가 되어야 합니다.

---

## 4. 패치가 적용되지 않을 때 확인

아래 항목을 순서대로 확인해 주세요.

1. **게임 내 표시 버전이 1.02인지 확인**
2. RomForge 원본에 **Base + Update v131072가 함께 반영**되어 있는지 확인
3. 패처 입력으로 `romfs`만 선택하지 않았는지 확인
4. 다른 한글패치 또는 모드가 섞인 원본을 사용하지 않았는지 확인
5. 기존 `SD:/atmosphere/contents/01007BE0160D6000` 폴더를 먼저 정리했는지 확인
6. 기존 v1.1.1 IPS가 남아 있지 않은지 확인
7. 게임을 완전히 종료한 뒤 다시 실행하고, 필요할 때만 본체를 재부팅해 확인

패처가 원본 검사 단계에서 중단된다면 파일을 억지로 바꾸기보다 **깨끗한 Base + Update 원본부터 다시 준비하는 것을 권장**합니다.

---

## 5. v1.2.0 주요 변경 사항

- 저장·불러오기 목록의 문자열 처리 프리징 수정
- 일반 저장 실패 사례 수정
- 30·36번 세이브에서 확인된 목록 이동 프리징 수정
- 저장·삭제·복사·사이트 변경 관련 시스템 문구 번역
- Nintendo Switch용 direct-main 방식 적용

패치는 세이브 파일 자체를 수정하지 않습니다. 기존 세이브의 원본 백업은 계속 보관하는 것을 권장합니다.

---

## 확인된 호환성

- **Nintendo Switch 실기:** 정상 작동 확인

---

## 주의사항

- 본인이 소유한 게임과 키로 준비한 원본을 사용하세요.
- 이미 다른 번역 패치나 모드가 적용된 RomFS 또는 `main`은 사용하지 마세요.
- 패처는 기존 결과 폴더를 덮어쓰지 않습니다.
- 배포물에는 원본 게임, 원본 RomFS, `prod.keys`, 완성된 게임 파일이 포함되지 않습니다.
