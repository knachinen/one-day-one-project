제공해주신 프로젝트 기획안(`claude.md`)의 요구사항과 최신 기술 스택(Next.js, Tailwind CSS, Framer Motion)을 기반으로, 각 섹션별 디자인 및 인터랙션 명세서를 구체적으로 작성했습니다.

이 명세서는 개발자가 Tailwind CSS 유틸리티 및 Framer Motion/GSAP 코드를 직접 작성할 수 있도록 구체적인 스타일과 애니메이션 속성을 포함합니다.

---

## 🎨 섹션별 디자인 명세서

### I. 공통 디자인 시스템 (Typography & Color)

|**구분**|**명세**|**Tailwind CSS 유틸리티 예시**|**설명**|
|---|---|---|---|
|**기본 배경색**|Dark Mode (선호)|`bg-gray-900`|프로페셔널하고 콘텐츠 집중도를 높이는 배경|
|**기본 텍스트색**|밝은 흰색/회색|`text-gray-100`|읽기 쉬운 대비 제공|
|**액센트 컬러**|브랜드 컬러 (밝은 파랑/보라 계열 가정)|`text-blue-500`, `bg-blue-600`|CTA, 링크, 애니메이션 효과에 사용|
|**폰트**|Sans-Serif (고딕체)|`font-sans`|Inter, Pretendard 또는 Noto Sans KR 등 현대적이고 가독성 높은 폰트|
|**주요 제목 (Hero)**|72px 이상 (Desktop)|`text-7xl md:text-[5rem]`|시선을 사로잡는 타이포그래피|
|**섹션 제목**|48px|`text-4xl md:text-5xl`|섹션 구분을 위한 명확한 제목|
|**간격 (Spacing)**|Tailwind 기본 스케일|`p-4`, `my-12`|4px, 8px, 16px 단위의 일관된 간격 사용|

---

### II. 섹션별 상세 명세

#### 1. 히어로 섹션 (Hero Section)

| **구분**           | **명세**                                           | **상세 디자인/인터랙션**                                                                            | **구현 기술 (예시)**                                                      |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **레이아웃**         | 뷰포트 전체 높이 (`h-screen`), 콘텐츠 중앙 정렬.               | `flex flex-col items-center justify-center`                                                | `Tailwind CSS`                                                      |
| **애니메이션 타이포그래피** | 핵심 메시지가 한 단어/글자씩 **공개(Reveal)**되는 효과.            | `opacity: 0`에서 `opacity: 1` 및 `y: -10`에서 `y: 0`으로 부드럽게 등장하는 **Staggered Animation** 적용.    | `Framer Motion` (Variants & Stagger)                                |
| **동적 배경**        | 배경에 미세한 **파티클(Particle)** 또는 **그라디언트** 효과.       | GSAP을 사용하여 마우스 위치(`clientX`, `clientY`)를 추적하고, 배경 요소의 `transform` 속성을 변경하여 Parallax 효과 구현. | `GSAP` (`gsap.to()`, `ScrollTrigger`)                               |
| **CTA 버튼**       | **프로젝트 보기**, **상담 신청** 버튼 2개.                    | 호버 시 배경색이 액센트 컬러로 변경되고, 버튼이 1.05배 확대되는(`scale`) 효과 적용.                                     | `Tailwind CSS`, `Framer Motion` (`whileHover`)                      |
| **스크롤 인디케이터**    | 화면 하단 중앙에 아래 방향 화살표 애니메이션.                       | 화살표가 `y`축을 따라 위아래로 반복 움직이는 애니메이션 (Infinite Loop).                                          | `Framer Motion` (`animate` with `transition: { repeat: Infinity }`) |
| **반응형**          | 모바일에서는 텍스트 크기를 `text-4xl`로 축소하고, CTA 버튼을 세로로 배치. | `text-7xl md:text-4xl`, `md:flex-row flex-col`                                             | `Tailwind CSS` (Mobile First)                                       |

#### 2. 소개 섹션 (About Section)

|**구분**|**명세**|**상세 디자인/인터랙션**|**구현 기술 (예시)**|
|---|---|---|---|
|**레이아웃**|Desktop: 좌(프로필/소개) - 우(통계/스킬) 6:4 분할. Mobile: 수직 스택.|`grid md:grid-cols-10 gap-10`|`Tailwind CSS`|
|**스크롤 애니메이션**|섹션 진입 시 모든 콘텐츠가 **페이드 인**하며 부드럽게 등장.|각 주요 요소(프로필, 통계 카드 등)에 `whileInView`를 적용하고, 0.1초씩 지연(`delay`)을 주어 순차적 등장 효과 부여.|`Framer Motion` (`whileInView`)|
|**프로필 이미지**|원형 또는 모서리가 둥근 사각형.|호버 시 이미지가 미세하게 **회전(`rotate: 1deg`)**하거나 **그림자**가 깊어지는 효과. `next/image`를 사용해 최적화.|`Framer Motion` (`whileHover`), `Next/image`|
|**통계 카운터**|**0에서 목표 숫자까지** 빠르게 증가하는 애니메이션.|GSAP 또는 Framer Motion을 사용해 숫자의 변화를 **`duration: 1.5`초** 동안 부드럽게 표현.|`GSAP` (`gsap.to()` on number value)|
|**스킬 셋**|스킬 이름과 퍼센트 바(Bar) 비주얼라이제이션.|스크롤 진입 시 스킬 바가 왼쪽에서 오른쪽으로 **0%에서 목표 퍼센트까지 채워지는** 애니메이션.|`Framer Motion` (`whileInView` for `width` animation)|

#### 3. 프로젝트 섹션 (Projects Section)

|**구분**|**명세**|**상세 디자인/인터랙션**|**구현 기술 (예시)**|
|---|---|---|---|
|**레이아웃**|상단에 필터 버튼. 하단에 **3열 반응형 그리드** (`grid-cols-3` Desktop).|`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`|`Tailwind CSS`|
|**프로젝트 카드**|이미지, 제목, 사용 기술 태그, 간결한 설명으로 구성.|배경색이 `bg-gray-800`인 카드 컴포넌트.|`shadcn/ui` Card 컴포넌트 기반|
|**카드 호버 효과**|마우스 오버 시 카드 전체가 **약간 솟아오르는** 효과.|`whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 15px rgba(0,0,0,0.5)' }}`|`Framer Motion` (`whileHover`)|
|**필터링 인터랙션**|필터 버튼 클릭 시 프로젝트 목록이 **재배치(Re-Layout)**되는 애니메이션.|필터링된 항목만 남기고, 항목들이 새로운 위치로 **부드럽게 이동**하는 레이아웃 애니메이션.|`Framer Motion` (`AnimatePresence` & `layout` prop)|
|**반응형**|모바일에서는 1열, 태블릿에서는 2열로 자동 전환.|`grid-cols-1 sm:grid-cols-2`|`Tailwind CSS` (Grid)|

#### 4. 문의 섹션 (Contact Section)

|**구분**|**명세**|**상세 디자인/인터랙션**|**구현 기술 (예시)**|
|---|---|---|---|
|**레이아웃**|화면 중앙에 최대 너비가 제한된 폼 컨테이너. (e.g., `max-w-xl`)|`mx-auto` (중앙 정렬), `space-y-6` (필드 간 간격)|`Tailwind CSS`|
|**입력 필드**|이름, 이메일, 메시지 영역 (`<textarea>`).|기본 배경은 `bg-gray-700`, 테두리 `border-gray-600`.|`shadcn/ui` Input 및 Textarea|
|**포커스 효과**|입력 필드에 커서가 있을 때 **테두리가 액센트 컬러**로 빛나는 효과.|`focus:ring-2 focus:ring-blue-500 focus:border-blue-500`|`Tailwind CSS` (Focus Utilities)|
|**제출 버튼**|폼 유효성 검사 통과 시 활성화.|제출 버튼은 `bg-blue-600` 액센트 컬러. 제출 중에는 **스피너 애니메이션** 표시.|`Framer Motion` (Spinner Animation)|
|**폼 제출 피드백**|제출 성공 시 **성공 메시지**와 함께 **Toast 알림** 표시.|`Zustand` 전역 상태를 사용하여 알림 상태를 관리하고, 알림 컴포넌트가 화면 상단/하단에 일정 시간 동안 표시된 후 사라지도록 구현.|`Zustand`, `shadcn/ui` Toast|