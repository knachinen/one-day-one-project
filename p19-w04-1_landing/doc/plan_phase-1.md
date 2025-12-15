요청하신 **Phase 1: 코어 구조 및 기본 콘텐츠 (MVP)** 구현을 위한 상세 명세서를 아래와 같이 작성합니다.

이 단계는 **Next.js, Tailwind CSS, shadcn/ui** 환경 구축을 포함하며, 랜딩페이지의 구조적 뼈대(Header, Footer)와 핵심 섹션 3가지(Hero, Problem Statement, Final CTA)의 정적 콘텐츠를 완성하여 **최소 실행 가능 제품(MVP)**을 구현하는 데 초점을 맞춥니다.

---

## 🛠️ Phase 1: 코어 구조 및 기본 콘텐츠 구현 상세 명세서

### 1. 환경 설정 및 코어 기술 구축

|**항목**|**상세 명세**|**기술 스택**|
|---|---|---|
|**프로젝트 초기화**|Next.js App Router 기반 프로젝트 생성.|Next.js, TypeScript|
|**스타일링 환경**|`tailwind.config.ts` 파일에 **바이브코딩 브랜드 컬러 (Primary Blue, Accent Orange)**를 정의하고 기본 폰트(Pretendard) 설정.|Tailwind CSS|
|**UI 컴포넌트 환경**|`shadcn/ui`의 초기 설정(`init`)을 완료하고, `Button` 및 `Card` 컴포넌트 설정을 확인.|shadcn/ui|
|**공통 레이아웃**|`app/layout.tsx` 파일에서 `<RootLayout>`을 정의하여 기본적인 `font-class` 및 `viewport` 설정을 적용.|Next.js, Tailwind|

### 2. 글로벌 요소 구현 (Header & Footer)

|**요소**|**상세 구현 내용**|**검증 포인트**|
|---|---|---|
|**Header (Navigation Bar)**|**Fixed/Sticky Top Bar** 구현. 높이 `80px` (Desktop).<br><br>  <br><br>1. **좌측:** 로고 이미지/텍스트 (Placeholder)<br><br>  <br><br>2. **우측:** Primary CTA 버튼 (shadcn/ui Button) 배치.|1. 스크롤 시 상단에 고정되는지 확인.<br><br>  <br><br>2. 모바일(768px 미만)에서 높이가 `60px`로 축소되는지 확인.|
|**Footer**|전체 너비의 푸터 영역 구현.<br><br>  <br><br>1. 저작권 정보, 개인정보처리방침 링크 (Placeholder).<br><br>  <br><br>2. Social Media 아이콘 (3개) 영역 확보.|1. 페이지 최하단에 위치하는지 확인.<br><br>  <br><br>2. 모바일에서 모든 텍스트가 중앙 정렬되는지 확인.|
|**Global Spacing**|모든 섹션의 상하 패딩을 Desktop 기준 `100px` ~ `120px`로 일관성 있게 적용.|섹션 간격이 디자인 명세서에 따라 통일되었는지 확인.|

### 3. 섹션별 상세 구현 (정적 콘텐츠)

#### 3.1. Section 1: Hero Section (히어로 섹션)

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**레이아웃**|중앙 컨테이너 내 2-Column Grid (Text 4 : Visual 6 비율).|Tailwind CSS Grid|
|**텍스트**|**H1:** "코딩 몰라도 괜찮아요, 3시간이면 당신의 아이디어가 앱이 됩니다"<br><br>  <br><br>**H2:** "바이브코딩으로 오늘 당장 MVP 만들기"|Tailwind Typography|
|**CTA 버튼**|1. **Primary CTA:** "무료 커뮤니티 가입하기" (Primary Blue 배경)<br><br>  <br><br>2. **Secondary CTA:** "워크숍 둘러보기" (텍스트 링크 스타일)|shadcn/ui Button|
|**비주얼**|우측 60% 영역에 **Mockup Placeholder Block**을 설정하고 배경색(`Soft Grey`)만 적용.|Tailwind CSS|
|**반응형**|모바일(`md` 이하)에서 **1-Column Stack** (텍스트 → 비주얼)으로 전환되는지 확인.|Tailwind Breakpoints|

#### 3.2. Section 2: Problem Statement (문제 제기)

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**레이아웃**|상단 중앙 정렬 H2 후, 하단 **3-Column Grid** 구현.|Tailwind CSS Grid|
|**카드 컴포넌트**|`shadcn/ui Card`를 사용하여 3개의 카드 구조를 정의.|shadcn/ui Card|
|**카드 스타일**|`16px` Radius 및 연한 그림자 적용. 내부 Padding `32px`.|Tailwind CSS|
|**콘텐츠**|3가지 Pain Point의 제목과 설명 텍스트를 정적으로 배치.<br><br>  <br><br>카드 하단에 **공감 버튼 영역** (Placeholder) 확보.|Markdown/HTML|
|**반응형**|Desktop 3열 → Tablet(md) 2열 → Mobile(sm) 1열로 전환되는지 확인.|Tailwind Breakpoints|

#### 3.3. Section 10: Final CTA (최종 전환 유도)

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**레이아웃**|Full-width 섹션, 중앙 정렬.|Tailwind Flex/Grid|
|**헤드라인**|**H1:** "당신의 아이디어를 현실로 만들 준비되셨나요?"<br><br>  <br><br>H1 아래에 서브 설명 텍스트 배치.|Tailwind Typography|
|**폼 영역**|**이메일 입력 필드** 및 **"무료로 시작하기 →" CTA 버튼**을 위한 인라인 레이아웃만 확보 (폼 로직은 Phase 3).|shadcn/ui Input / Button (레이아웃 목적)|
|**신뢰 요소**|CTA 아래에 **3가지 안심 요소** (30초 만에 가입, 평생 무료 구독 등) 텍스트를 아이콘(Placeholder)과 함께 리스트 형태로 배치.|Tailwind CSS|

### 4. Phase 1 최종 검증 체크리스트

| **검증 항목**        | **상세 내용**                                                                                          | **담당** | **완료** |
| ---------------- | -------------------------------------------------------------------------------------------------- | ------ | ------ |
| **환경 설정**        | Next.js 빌드 성공 및 Tailwind CSS 클래스 정상 적용 확인.                                                         | DEV    | ☐      |
| **글로벌 UX**       | Header/Footer가 모든 페이지에서 일관성 있게 노출되는지 확인.                                                           | QA     | ☐      |
| **Hero 콘텐츠**     | 핵심 메시지와 CTA 버튼이 명확히 노출되는지 확인.                                                                      | PM/QA  | ☐      |
| **반응형 Layout**   | Hero, Problem Statement 섹션이 Mobile(360px) 및 Tablet(768px) 환경에서 **레이아웃이 깨지지 않고** 의도된 스택으로 전환되는지 확인. | QA     | ☐      |
| **shadcn/ui 통합** | shadcn/ui의 `Button`, `Card` 컴포넌트가 브랜드 컬러(Primary Blue)로 스타일링되었는지 확인.                               | DEV    | ☐      |
| **최종 상태**        | 페이지의 모든 섹션이 **정적인 상태**로 정상 실행되는지 확인.                                                               | QA     | ☐      |