# 📱 LogStream UI/UX Design Requirements

이 문서는 제공된 목업 이미지를 기반으로 **LogStream** 앱의 주요 화면 구성 및 UI/UX 요구사항을 정의합니다.

목업 이미지 참조: `uploaded_image_1764987041059.png`

---

## 1. ADB 권한 설정 화면 (ADB Permission Setup)

앱 실행 시 `READ_LOGS` 권한이 없을 경우 표시되는 최초 진입 화면입니다.

### 1.1 레이아웃
- **Header:**
    - 좌측: '뒤로가기' 아이콘 (`<`)
    - 중앙: "ADB 권한 설정" 타이틀
    - 우측: 도움말 아이콘 (`?`)
- **Body:**
    - **Headline:** "ADB 권한이 필요합니다" (Bold, Large)
    - **Sub-headline:** "앱의 핵심 기능인 실시간 로그 분석을 사용하려면 ADB 권한이 필요합니다."
    - **Instruction:** "PC에 기기를 연결하고 터미널에서 아래 명령어를 실행하세요."
    - **Code Snippet Box:**
        - 명령어 텍스트: `adb shell pm grant com.yourcompany.logcatviewer android.permission.READ_LOGS`
        - 배경: 옅은 회색 (Light Gray)
        - **Copy Button:** 우측 하단에 '복사' 아이콘과 텍스트가 포함된 버튼.
    - **Manual Action Area:**
        - **Status Button (Primary):** "권한 없음" 텍스트와 'X' 아이콘이 포함된 붉은색(Salmon/Red) 상태 표시 바. (터치 시 재확인 로직 동작 예상)
        - **Check Button (Action):** "권한 상태 확인" 텍스트의 검은색(Dark) 버튼.
        - **Footer Link:** "자세한 설정 방법 보기" (Underlined Text Button)

### 1.2 UX Flow
1. 사용자가 화면 진입.
2. PC 연결 후 터미널에서 ADB 명령어 실행.
3. '권한 상태 확인' 버튼 클릭.
4. 권한 획득 성공 시 **Main Screen**으로 이동. 실패 시 토스트 메시지 또는 버튼 상태 애니메이션(Shake 등) 제공.

---

## 2. 로그 스트림 (Main Screen)

실시간 로그를 확인하고 필터링하는 메인 화면입니다.

### 2.1 레이아웃
- **Header:**
    - 중앙: "Logcat Stream" 타이틀
- **Control Bar (Top):**
    - **Buffer Selector:** 3-Tab Segmented Control (Main / Events / Radio). 선택된 탭은 흰색 배경+그림자, 비선택은 투명.
- **Search & Filter Area:**
    - **Search Input:** 돋보기 아이콘이 포함된 "태그 또는 메시지 검색" 입력 필드.
    - **Level Filters:** 가로 스크롤 가능한 칩(Chip) 목록.
        - `Verbose`, `Debug`, `Info`, `Warning`, `Error`
        - 선택 시 반전(검은 배경, 흰 텍스트), 비선택 시(검은 테두리, 흰 배경).
- **Log Control Buttons:**
    - **Stop/Start Capture:** "Stop Capture" / "Start Capture" 토글 버튼. (Dark Theme)
    - **Clear Logs:** "Clear Logs" 버튼 (Light/Gray Theme).
- **Log List (Body):**
    - 로그 아이템들이 리스트 형태로 나열.
    - **Color Coding:** 로그 레벨에 따라 텍스트 색상 구분.
        - Debug (D): Blue
        - Info (I): Green
        - Warning (W): Orange
        - Error (E): Red
    - **Item Structure:** `[Timestamp] [Level Char] [Tag]: [Message]` 형태의 텍스트.

### 2.2 UX Details
- **List Performance:** 대량의 로그(수천 줄)가 쌓여도 스크롤 버벅임이 없어야 함 (`FlashList` 사용 권장).
- **Auto-scroll:** 새 로그 수신 시 리스트 최하단으로 자동 스크롤. 사용자가 스크롤을 올리면 자동 스크롤 일시 정지.

---

## 3. 로그 상세 (Log Detail Screen)

리스트에서 특정 로그 아이템을 터치했을 때 나타나는 상세 화면입니다.

### 3.1 레이아웃
- **Header:**
    - 좌측: '뒤로가기' 아이콘 (`<`)
    - 중앙: "로그 상세" 타이틀
    - 우측: 공유 아이콘 (Share)
- **Content Area (List Style Form):**
    - **Timestamp:** `10-27 10:30:15.123`
    - **Level:** `Error` (Red Badge)
    - **Tag:** `MainActivity`
    - **PID:** `24510`
    - **Message:**
        - 별도의 섹션으로 분리.
        - 긴 텍스트를 모두 보여주는 스크롤 가능한 영역 또는 확장된 텍스트 뷰.
        - 우측 상단에 '복사' 아이콘 버튼 포함 (Code Block 스타일).

---

## 4. 설정 및 저장 (Settings & Save Screen)

로그를 파일로 저장하고 관리하는 화면입니다.

### 4.1 레이아웃
- **Header:**
    - 좌측: 닫기 아이콘 (`X`) - 모달 형태임을 암시.
    - 중앙: "설정 및 저장" 타이틀
- **Section 1: 현재 로그 저장하기**
    - **Label:** "파일 이름"
    - **Input Field:** `log-2023-10-27-1.txt` (Default Name Pre-filled)
    - **Save Button:** "로그 파일로 저장" (Full Width, Black, High Emphasis)
- **Section 2: 저장된 파일 목록**
    - **Header:** "저장된 파일 목록"
    - **File List Items:**
        - **Icon:** 파일 아이콘 (좌측)
        - **Info:** 파일명 (`log-2023...txt`), 용량(`1.2 MB`), 날짜(`2023-10-26`)
        - **Action:** 우측에 공유(모바일 내보내기) 아이콘.

---

## 🎨 Design System Summary

- **Palette:**
    - Primary Action: Black (#000000)
    - Secondary/Background: White (#FFFFFF)
    - Error/Emphasis: Salmon Red (#F15F5F) or Standard Red.
    - Text: Dark Grey (#333333) for body, Light Grey (#999999) for hints/secondary.
- **Typography:**
    - Clean Sans-serif font (System font - Robot/San Francisco).
    - Titles are Bold.
- **Components:**
    - **Buttons:** Rounded Corners (~8px).
    - **Inputs:** Light gray background, rounded corners.
    - **Chips:** Pill-shaped tags for filters.
