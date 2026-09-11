# EVE ghost enemies 한국어 패치 설치 가이드

이 문서는 EVE ghost enemies 한국어 패치의 공용 설치 가이드입니다.  
현재 기준 버전은 **v1.2.0**이며, 패처는 사용자가 준비한 RomForge 언팩 원본에서 PC·Android·Nintendo Switch용 direct-main 결과를 생성합니다.

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
> 본편만 언팩한 결과는 사용할 수 없습니다.  
> 반드시 **Base v0 + Update v131072**가 함께 반영된 RomForge 언팩 결과를 준비해야 합니다.

---

## 1. RomForge로 원본 언팩

1. RomForge 1.7.0을 실행합니다.
2. 본인이 소유한 EVE ghost enemies Base와 Update v131072 파일을 불러옵니다.
3. Base와 Update가 함께 적용된 상태로 언팩합니다.
4. 언팩이 끝난 폴더의 `unpacked` 폴더를 확인합니다.

EVE ghost enemies를 언팩하면 다음과 같이 두 개의 Title ID 폴더가 생길 수 있습니다.

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
> 패치에 사용하는 폴더는 반드시 **`01007BE0160D6000`**입니다.  
> `01007BE0160D6001`은 DESIRE remaster 특전용 별도 프로그램입니다.

---

## 2. v1.2.0 패처 실행

1. 배포 ZIP을 완전히 압축 해제합니다.
2. `EVE-Ghost-Enemies-KR-Patcher.exe`를 실행합니다.
3. RomForge 결과의 **`unpacked` 폴더**를 선택합니다.

예시:

```text
unpacked
└─ 01007BE0160D6000
   ├─ exefs
   │  └─ main
   └─ romfs
      └─ data_eve3
```

`01007BE0160D6000` 폴더 자체를 선택해도 자동으로 인식합니다.  
예전처럼 `romfs` 폴더만 선택하면 안 됩니다.

4. 결과물을 저장할 위치를 선택합니다.
5. **한국어 패치 시작**을 누릅니다.

패처는 다음을 자동으로 검사합니다.

- 지원 Title ID
- 원본 `exefs/main` 크기·SHA-256·Build ID
- RomFS 대상 135개 파일의 크기와 SHA-256
- xdelta 패치 파일의 무결성
- 생성된 결과 파일의 최종 SHA-256

검사에 실패하면 원본을 수정하지 않고 중단합니다.

---

## 3. 생성되는 결과 폴더

패처는 세 플랫폼 결과를 한 번에 생성합니다.

```text
EVE-Ghost-Enemies-KR-v1.2.0-PC
├─ exefs
│  └─ main
└─ romfs
   └─ data_eve3

EVE-Ghost-Enemies-KR-v1.2.0-Android
└─ 01007BE0160D6000
   ├─ exefs
   │  └─ main
   └─ romfs
      └─ data_eve3

EVE-Ghost-Enemies-KR-v1.2.0-Switch
└─ atmosphere
   └─ contents
      └─ 01007BE0160D6000
         ├─ exefs
         │  └─ main
         └─ romfs
            └─ data_eve3
```

v1.2.0은 실행 파일을 직접 교체하는 **direct-main 방식**입니다.  
이 버전의 배포물에는 실행 파일용 IPS가 포함되지 않습니다.

---

## 4. PC Eden 설치

PC 결과 폴더를 Eden의 게임 모드 데이터 위치에 새 모드로 등록합니다.

최종 구조:

```text
모드 폴더
├─ exefs
│  └─ main
└─ romfs
   └─ data_eve3
```

Eden에서 게임을 우클릭한 뒤 `Open Mod Data Location`을 열고, 위 구조가 유지되도록 복사합니다.

기존 v1.1.x 모드나 같은 게임 파일을 수정하는 모드는 비활성화해야 합니다.

---

## 5. Android Eden 설치

Android 결과의 `01007BE0160D6000` 폴더를 Eden의 게임 모드 경로에 설치합니다.

최종 구조:

```text
01007BE0160D6000
├─ exefs
│  └─ main
└─ romfs
   └─ data_eve3
```

Eden의 `Add-ons` → `Mod` 설치 기능을 사용하거나, 해당 Title ID 폴더를 Eden의 `load` 경로에 복사할 수 있습니다.

v1.2.0 direct-main 결과는 **Android(Odin2 Portal)에서 검증**되었습니다.  
다른 Android 기기에서는 에뮬레이터 버전과 기기별 호환성이 다를 수 있습니다.

---

## 6. Nintendo Switch 실기 설치

기존 Switch 모드 위에 결과물을 그대로 덮어쓰지 마세요. 이전 패치 파일이 남아 있으면
direct-main과 RomFS가 충돌하여 오류가 발생할 수 있습니다. 반드시 기존 모드를 먼저 삭제하고,
SD 카드의 다음 폴더를 내용물이 없는 상태로 만든 뒤 새 패치 결과를 설치합니다.

```text
SD:/atmosphere/contents/01007BE0160D6000
```

그 다음 Switch 결과의 `atmosphere` 폴더를 SD 카드 루트에 새로 복사합니다.

최종 경로:

```text
SD:/atmosphere/contents/01007BE0160D6000/exefs/main
SD:/atmosphere/contents/01007BE0160D6000/romfs/data_eve3/...
```

복사 후 Switch를 완전히 재부팅하고 게임을 실행합니다.

> [!IMPORTANT]
> v1.2.0은 direct-main 방식이므로 다음 IPS 경로는 사용하지 않습니다.
>
> ```text
> SD:/atmosphere/exefs_patches/EVE-Ghost-Enemies-KR-v1.1.1
> ```
>
> 기존 v1.1.1 IPS 패치셋은 백업한 뒤 비활성화하거나 제거해야 합니다.

---

## 7. v1.2.0 변경 사항

v1.2.0에는 다음 수정이 포함됩니다.

- 저장·불러오기 목록의 문자열 처리 프리징 수정
- 일반 저장 실패 사례 수정
- 30·36번 세이브에서 확인된 목록 이동 프리징 수정
- 저장·삭제·복사·사이트 변경 관련 시스템 문구 번역
- PC·Android·Nintendo Switch direct-main 출력 통합

패치는 세이브 파일 자체를 수정하지 않습니다.  
기존 세이브의 원본 백업은 계속 보관하는 것을 권장합니다.

---

## 주의사항

- 본인이 소유한 게임과 키로 준비한 원본을 사용하세요.
- 이미 다른 번역 패치나 모드가 적용된 RomFS·main은 사용할 수 없습니다.
- 패처는 기존 결과 폴더를 덮어쓰지 않습니다.
- 패처는 원본 NSP·XCI를 재팩하지 않으며, 완성 게임 파일을 배포하지 않습니다.
- 배포물에는 원본 게임, 원본 RomFS, prod.keys, 완성된 main이 포함되지 않습니다.
