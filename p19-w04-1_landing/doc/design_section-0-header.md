제공해주신 기획안(`plan_claude.md`) 및 목업 이미지(`image_c7fd3e.jpg`, `image_0ac3dc.jpg`)를 바탕으로, **Header (Navigation Bar)의 인터랙션 및 애니메이션이 강화된 디자인 업그레이드 상세 명세서**를 작성해 드립니다.

이 헤더는 단순한 내비게이션 기능을 넘어, 사용자 경험을 향상시키고 페이지 스크롤 상태를 직관적으로 전달하는 역할을 수행합니다.

## 🔗 Header (Navigation Bar) 인터랙션 및 애니메이션 상세 명세서

### 1. 기본 구조 및 스타일 (Base Design)

| 항목 | 상세 명세 | 기술/컴포넌트 |
| :--- | :--- | :--- |
| **높이** | Desktop: `80px`, Mobile (`< 768px`): `60px`. | Tailwind CSS |
| **로고** | 좌측 상단 배치. SVG 로고 사용 (색상 Primary Blue). | SVG, Next.js/Image |
| **메뉴 항목** | 워크숍 소개, 커리큘럼, 후기, FAQ, 로그인 (목업 이미지 참조). | shadcn/ui: Tabs (시맨틱 용도), 앵커 링크 |
| **Primary CTA** | 우측 끝에 배치: "신청하기" 또는 "무료 가입하기" (목업 이미지 참조). | shadcn/ui: Button, Primary Blue Color |
| **기본 배경** | 투명 (`background-color: transparent`). | Tailwind CSS |

---

### 2. 스크롤 인터랙션 (Scroll Interaction)

**스크롤 상태에 따른 Header 스타일 변화는 페이지의 가독성과 집중도를 높이는 핵심 요소입니다.**

| 상태 | 조건 | 스타일 변경 상세 | 애니메이션 |
| :--- | :--- | :--- | :--- |
| **초기 상태 (Above the Fold)** | 스크롤 위치 `0px` | 배경: **투명**. 텍스트/버튼 색상: Dark Grey. | - |
| **Sticky 상태 (Sticky State)** | 스크롤 위치 `80px` (Hero 섹션 진입 후) | 1. **배경:** `White` (`#FFFFFF`)로 변경 및 **Soft Drop Shadow** 적용. 2. **높이:** `80px` 유지. 3. **폰트 색상:** Dark Grey 유지. | `Fade-in` 애니메이션 (배경 전환), `0.2s` `ease-in-out` 전환. |
| **Active Section (Scroll Spy)** | 현재 섹션이 뷰포트에 50% 이상 노출될 때 | 해당 메뉴 항목 하단에 **2px 두께의 Primary Blue Underline** 표시. | 언더라인이 좌우로 `0.15s` 동안 부드럽게 채워지는 애니메이션. |



---

### 3. 애니메이션 및 마이크로 인터랙션

| 항목 | 상세 구현 내용 | 기술/컴포넌트 |
| :--- | :--- | :--- |
| **로고 애니메이션** | 스크롤 다운 시 로고 크기가 **`1.0` → `0.9`로 미세하게 축소**되었다가 Sticky 상태에서 `1.0`으로 복구되는 효과 (공간 절약). | Framer Motion / CSS `transform: scale` |
| **CTA 버튼 애니메이션** | **호버 시 살짝 들어 올리기** (`translateY: -2px`) 및 그림자 강화. | Tailwind CSS `hover:shadow-lg`, `transition` |
| **"무료 가입하기" 펄스 (Urgency)** | 10초 주기로 Primary CTA 버튼의 테두리 또는 배경색이 **미세하게 펄스(pulse)**하여 시선 유도 (긴급성 부여). | CSS Animation (`@keyframes`), Opacity/Scale 변경 |
| **스크롤 인디케이터** | **(선택적) 뷰포트 우측**에 현재 스크롤 진행도를 나타내는 **세로 프로그레스 바** 구현. | Custom SVG / React Progress Component |

---

### 4. 모바일 반응형 디자인 (Mobile Optimization)

| 항목 | 상세 구현 내용 | 기술/컴포넌트 |
| :--- | :--- | :--- |
| **메뉴 전환** | Desktop 메뉴 항목을 숨기고 **햄버거 아이콘** (`shadcn/ui: Menu Icon`) 표시. | Tailwind CSS `hidden`/`md:flex` |
| **햄버거 메뉴 애니메이션** | 클릭 시 햄버거 아이콘이 **닫기(X) 아이콘**으로 변형되는 애니메이션. | Framer Motion |
| **모바일 드로어 (Drawer)** | 햄버거 클릭 시 화면 우측/좌측에서 전체 화면을 덮는 **드로어(Drawer)** 또는 **모달** 형태로 메뉴가 부드럽게 슬라이드 인. | shadcn/ui: Sheet (Radix UI 기반) |
| **드로어 내부** | Desktop 메뉴 항목과 CTA 버튼을 **세로 스택**으로 배치. CTA 버튼은 드로어 하단에 Full-width로 고정. | Tailwind Flex, shadcn/ui: Button |

---

### 5. 기술적 구현 및 접근성 (A11y)

| 항목 | 상세 구현 내용 | 기술/컴포넌트 |
| :--- | :--- | :--- |
| **상태 관리** | 스크롤 위치(`window.scrollY`)를 감지하고, 현재 상태(Sticky/Transparent)를 React `useState`로 관리. | JavaScript, React Hooks |
| **접근성 (A11y)** | 1. **로고:** `aria-label`="홈으로" 설정. 2. **햄버거 아이콘:** `button` 태그 사용 및 `aria-expanded` 속성 토글. | ARIA Attributes |
| **앵커 스크롤** | 메뉴 클릭 시 해당 섹션으로 **부드럽게 스크롤링**되는 로직 구현 (`scroll-behavior: smooth` 또는 JS 라이브러리). | CSS / JavaScript |
| **성능 최적화** | 스크롤 이벤트 리스너는 **Debouncing 또는 Throttling** 기법을 적용하여 성능 부하 최소화. | JavaScript Utility |
