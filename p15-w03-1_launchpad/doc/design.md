# UI 디자인 및 구현 명세서

본 문서는 제공된 목업 이미지와 PRD를 바탕으로 각 화면의 UI 구성요소와 인터랙션을 정의합니다.

## 1. 디자인 시스템 가이드
- **Colors**:
  - Primary: Indigo/Violet 계열 (창의성, 미래지향적)
  - Background: Clean White (#FFFFFF) & Light Gray (#F9FAFB)
  - Text: Slate/Gray 계열 (가독성 중시)
- **Typography**:
  - Headings: Inter (Bold/Semibold)
  - Body: Inter (Regular), Pretendard (한글)
- **Components Style**:
  - Shadcn/UI 기반의 모던하고 깔끔한 디자인
  - 부드러운 라운딩 (Rounded-lg, Rounded-xl)
  - 은은한 그림자 (Shadow-sm)

## 2. 화면별 상세 명세

### 2.1 랜딩 페이지 (Landing Page)
**목표**: 서비스의 가치를 전달하고 회원가입 유도.
- **Header**: 로고, 네비게이션(Explore, Pricing), 로그인/회원가입 버튼.
- **Hero Section**:
  - Catchy Title: "Build in Public, Grow Together"
  - Subtitle: "아이디어 검증부터 런칭까지, 메이커들을 위한 올인원 플랫폼"
  - Main CTA: "아이디어 공유하기" (Primary Button)
  - Social Proof/Stats: "1,000+ Ideas Launched", "500+ Makers"
- **Featured Ideas**:
  - 가로 스크롤 또는 그리드로 인기 아이디어 카드 3~4개 노출.
  - 각 카드는 썸네일, 제목, 태그, 투표 수를 포함.

### 2.2 메인 피드 / 탐색 (Discovery)
**목표**: 다양한 아이디어를 탐색하고 참여 유도.
- **Filter/Sort Bar**:
  - 정렬: 🔥 Hot, ✨ New, 🏆 Top
  - 필터: 카테고리(SaaS, App..), 상태(Idea, Building..)
- **Idea List Grid**:
  - 반응형 그리드 (데스크탑 3열, 태블릿 2열, 모바일 1열)
  - **Idea Card Component**:
    - **Top**: 썸네일 이미지/카테고리 뱃지
    - **Middle**: 제목, 짧은 요약(1-2줄)
    - **Bottom**: 작성자 아바타, `🔥 120` (투표수), `💬 15` (댓글수)
    - **Interaction**: 카드 클릭 시 상세 페이지 이동.

### 2.3 아이디어 상세 (Idea Detail)
**목표**: 아이디어에 대한 깊은 이해와 피드백 제공.
- **Header Section**:
  - Breadcrumb: Home > Category > Idea Title
  - Title, 작성자 정보, 작성일, 현재 상태 뱃지.
  - **Action Area**:
    - `I'd use this` 버튼 (Primary, 굵게)
    - `Interesting` 버튼 (Secondary, 아웃라인)
    - 공유하기, 북마크 버튼.
- **Content Section**:
  - **Carousel**: 아이디어 목업 이미지 슬라이더.
  - **Problem & Solution**: 명확한 헤더와 함께 텍스트 본문.
  - **Tech Stack & Info**: 사이드바 또는 하단에 기술 스택, 예상 기간 등 메타 정보 표시.
- **Tabs**:
  - `About`: 상세 설명
  - `Updates`: 개발 일지 타임라인 (최신순)
  - `Discussion`: 댓글, 피드백, 설문
- **Comment Input**:
  - 하단 고정 또는 탭 내 상단에 위치. "어떤 점이 기대되나요?" 플레이스홀더.

### 2.4 아이디어 작성 (Create Idea)
**목표**: 쉽고 빠르게 아이디어를 구조화하여 등록.
- **Step-based Wizard** (권장) 또는 Single Form:
  1. **Basics**: 제목, 태그라인, 카테고리.
  2. **Details**: 문제, 해결책, 타겟 유저 (Textarea + Markdown 지원).
  3. **Visuals**: 이미지 업로드 (Drag & Drop).
  4. **Preview**: 등록 전 미리보기.
- **Auto-save**: 작성 중 임시 저장 기능 (Local Storage 활용).

### 2.5 프로필 페이지 (Profile)
**목표**: 메이커의 신뢰도 입증 및 포트폴리오 역할.
- **User Info**:
  - 커버 이미지, 아바타.
  - 닉네임, 한 줄 소개, 소셜 링크(GitHub, Twitter).
  - Stats: 팔로워, 팔로잉, 총 투표 받은 수.
- **Tabs**:
  - `Ideas`: 내가 등록한 아이디어 카드 리스트.
  - `Activity`: 내가 남긴 댓글, 투표한 아이디어(공개 설정 시).
  - `Saved`: 저장한 아이디어.

## 3. 모바일 대응
- 모든 페이지는 모바일 우선(Mobile-First) 설계.
- 네비게이션 바는 모바일에서 하단 탭 바(Bottom Tab Bar) 또는 햄버거 메뉴로 변환.
- 그리드 레이아웃은 모바일에서 단일 컬럼 스택으로 변경.
