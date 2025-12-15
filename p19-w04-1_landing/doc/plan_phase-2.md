요청하신 **Phase 2: 인터랙티브 기능 및 핵심 가치 구현 (Conversion Engine)** 구현을 위한 상세 명세서를 아래와 같이 작성합니다.

이 단계는 랜딩페이지의 **핵심 전환 요소**인 Live Demo 로직, 아코디언 컴포넌트, 캐러셀, 그리고 Comparison Table의 레이아웃을 완성하는 데 중점을 둡니다.

---

## 🛠️ Phase 2: 인터랙티브 기능 및 핵심 가치 구현 상세 명세서

### 1. Section 4: How It Works (작동 방식) 구현

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**프로세스 아코디언**|**shadcn/ui Accordion** 컴포넌트를 사용하여 3가지 스텝(Workshop, Post-Debugging, Coaching) 구현.|shadcn/ui: Accordion|
|**접근성**|아코디언 헤더에 **`aria-expanded`** 및 **`aria-controls`** 속성 적용. 키보드 네비게이션으로 확장/축소 가능하도록 구현.|Radix UI|
|**진입 애니메이션**|스크롤 진입 시(Intersection Observer) 각 아코디언 항목이 **순차적으로 (`150ms` 딜레이)** `Fade-in Up` 효과 적용.|Framer Motion|
|**비주얼 요소**|우측 영역에 워크숍 현장 사진 Placeholder를 배치하고, **사회적 증거 카드**("Join 400+ Makers")의 레이아웃만 구현 (정적).|Tailwind CSS|

### 2. Section 5: Live Demo (라이브 데모) 구현 (핵심)

이 단계는 랜딩페이지의 가장 중요한 기능인 **실시간 동기화**를 구현합니다.

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**코어 로직**|React의 `useState`를 사용하여 **`appTitle`**, **`primaryColor`**, **`componentList`**와 같은 핵심 상태를 정의.|React State Management|
|**컨트롤 패널 (좌측)**|**1. 제목 편집기:** `shadcn/ui Input`을 사용하여 `appTitle` 상태와 바인딩.<br><br>  <br><br>**2. 색상 테마 선택:** 6개의 원형 컬러 칩을 구현하고 클릭 시 `primaryColor` 상태를 변경.|shadcn/ui: Input|
|**프리뷰 목업 (우측)**|**1. 앱 타이틀:** `appTitle` 상태를 반영.<br><br>  <br><br>**2. 동적 스타일:** 버튼, 하단 탭 바, 강조 텍스트의 배경색을 `primaryColor` 상태에 따라 CSS 변수로 실시간 변경.|Tailwind CSS, CSS Variables|
|**실시간 동기화**|좌측 입력 필드 타이핑 시 우측 프리뷰에 **100ms 이내**로 지연 없이 반영되는지 확인.|JavaScript|
|**최종 CTA**|**"내 앱 만들기 시작하기"** 버튼을 목업 아래에 배치.|shadcn/ui: Button|

### 3. Section 7: Comparison Table (차별점 강조) 구현

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**테이블 구조**|HTML `<table>` 태그를 사용하여 5열 구조 (기준 + 4가지 대안) 구현.|HTML Table|
|**바이브코딩 강조**|**바이브코딩 컬럼**에 Primary Blue 계열의 배경색(`#F5F8FF`) 및 굵은 테두리를 적용하여 시각적 강조.|Tailwind CSS|
|**시각적 요소**|각 항목의 텍스트 옆에 **체크(V) 아이콘** (성공) 및 **엑스(X) 아이콘** (단점)을 배치.|shadcn/ui: Icons|
|**반응형 (Mobile)**|모바일(`sm` 이하)에서 테이블이 화면을 벗어날 경우 **가로 스크롤 (`overflow-x: auto`)** 가능하도록 구현.|Tailwind CSS|
|**진입 애니메이션**|스크롤 진입 시 **테이블의 각 행(Row)**이 순차적으로 `Fade-in Up` 효과 적용.|Framer Motion, Intersection Observer|

### 4. Section 6 & 9: Stories & Community (카드 레이아웃) 구현

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**Section 6 카드 레이아웃**|3열 그리드 또는 캐러셀의 정적 레이아웃만 구현. **shadcn/ui Card**를 사용하여 수강생 성공 사례 카드 구조 정의.|shadcn/ui: Card, Tailwind Grid|
|**Section 9 레이아웃**|2-Column Grid (좌측 정보 4 : 우측 피드 6) 구현. 좌측의 **핵심 수치 요약**(`500+`, `98%` 등) 영역만 정적으로 배치.|Tailwind CSS Grid|
|**콘텐츠 배치**|두 섹션 모두 목업 이미지에 기반한 텍스트 및 Placeholder 이미지 배치.|HTML/Placeholder|

### 5. Phase 2 최종 검증 체크리스트

| **검증 항목**           | **상세 내용**                                                                             | **담당** | **완료** |
| ------------------- | ------------------------------------------------------------------------------------- | ------ | ------ |
| **Live Demo 기능**    | 좌측 입력값 및 컬러 칩 클릭 시 우측 프리뷰 UI가 **실시간으로 변경**되는지 확인.                                     | QA     | ☐      |
| **How It Works UX** | 아코디언이 클릭 시 부드럽게 열리고, **접근성(Tab 키)**이 확보되었는지 확인.                                       | QA     | ☐      |
| **비교 테이블 UX**       | Mobile 환경에서 테이블이 가로 스크롤 되며, **바이브코딩 컬럼의 강조**가 유지되는지 확인.                               | QA     | ☐      |
| **스크롤 애니메이션**       | How It Works, Comparison Table 등에서 **순차적 등장 애니메이션**(`Fade-in Up`)이 스크롤 진입 시 작동하는지 확인. | DEV    | ☐      |
| **반응형**             | Live Demo 섹션이 Mobile에서 **세로 스택** (프리뷰 → 컨트롤)으로 전환되는지 확인.                              | QA     | ☐      |
| **카드/그리드**          | Success Stories 및 Community 섹션의 **그리드 레이아웃**이 깨지지 않는지 확인.                             | QA     | ☐      |