# MVP 공유 플랫폼 (Provisional Name: LaunchPad) 제품 요구사항 명세서 (PRD)

## 1. 제품 개요

### 1.1 제품 비전
창업가와 개발자들이 제품 아이디어를 공유하고, 커뮤니티 피드백을 통해 검증받으며, MVP부터 실제 제품 런칭까지의 모든 여정을 함께하는 플랫폼입니다.

### 1.2 핵심 가치 제안
- **검증 (Validation)**: 개발 시작 전 시장 반응을 확인하여 실패 비용 최소화
- **피드백 (Feedback)**: 얼리어답터 및 잠재 고객의 실질적인 피드백 수집
- **기록 (Documentation)**: 아이디어부터 런칭까지의 빌드 과정을 투명하게 기록 및 공유
- **팬덤 (Community)**: 초기 사용자 확보 및 팬덤 형성

### 1.3 타겟 사용자
- **Primary**: 솔로 창업가(Solopreneur), 인디 해커(Indie Hacker), 사이드 프로젝트를 진행하는 개발자
- **Secondary**: 얼리어답터, 엔젤 투자자, 새로운 제품을 찾고 지지하는 일반 사용자

## 2. 핵심 기능 요구사항

### 2.1 아이디어 (Idea)
- **작성**: 제목, 한 줄 요약(Tagline), 문제 정의, 해결책, 타겟, 카테고리(SaaS, App, Web, Tool 등) 필수 입력.
- **이미지**: 목업 또는 스케치 이미지 (최대 5장).
- **상태 관리**:
  - `💡 Idea`: 초기 아이디어 단계
  - `🚧 Building`: 개발 및 MVP 제작 중
  - `🎉 Launched`: 정식 출시 완료
  - `❌ Dropped`: 프로젝트 중단
- **태그**: 카테고리, 기술 스택, 타겟 고객 태그, 커스텀 해시태그.

### 2.2 피드백 및 상호작용 (Feedback)
- **투표 (Voting)**:
  - `I'd use this` (사용 의향 있음): 실질적 수요 지표
  - `Interesting` (흥미로움): 단순 지지 또는 아이디어 칭찬
- **댓글 (Comments)**: 1 depth 대댓글 지원, 마크다운 지원.
- **설문 (Polls)**: 작성자가 가격, 기능 선호도 등에 대해 직접 설문 생성 가능.

### 2.3 업데이트 및 런칭 (Updates & Launch)
- **개발 일지 (DevLOG)**: 마크다운 형식의 진행 상황 업데이트, 이미지/영상 임베드.
- **마일스톤**: 디자인 완료, MVP 배포, 베타 테스터 모집 등 주요 이벤트 체크.
- **런칭**: `Launched` 상태 변경 시 별도 런칭 뱃지 부여, 프로덕트 URL 노출, 런칭 기념 특별 섹션(Pricing, Stats) 활성화.

### 2.4 커뮤니티 및 게이미피케이션 (Community)
- **프로필**: 사용자 정보, 등록한 아이디어 목록, 활동 내역(투표, 댓글 수).
- **팔로우**: 관심 있는 메이커 팔로우 및 알림 수신.
- **평판 시스템 (Reputation)**: 활동에 따른 포인트 및 등급(Newbie -> Builder -> Maker -> Veteran) 부여.
- **뱃지**: Early Bird, Fast Mover 등 성과 기반 뱃지.

### 2.5 탐색 (Discovery)
- **홈 피드**: Hot(인기), New(최신), Top(누적 인기) 정렬.
- **필터**: 카테고리별, 상태별, 기간별 필터링.
- **검색**: 제목, 내용, 태그, 사용자 검색.

## 3. 기술 스택 (Tech Stack)

MVP의 빠른 개발과 배포 효율성을 위해 Next.js 기반의 **통합 모노리스(Unified Monolith)** 아키텍처를 채택합니다.

### 3.1 Frontend
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4.0, Shadcn/UI (Radix UI)
- **State Management**: Zustand (Client), React Server Components (Server)

### 3.2 Backend (API)
- **Runtime**: Bun 1.3+
- **Framework**: Hono (Edge Optimized)
- **API Communication**: RPC (Hono RPC) or REST
- **Validation**: Zod


### 3.2 Database & Storage
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Auth**: Lucia Auth (또는 NextAuth v5)
- **Storage**: Cloudflare R2 (이미지 저장)

### 3.3 Infrastructure
- **Deployment**: Vercel (Frontend + Serverless Functions)
- **CDN**: Vercel Edge Network
- **Image Optimization**: Next.js Image Component

## 4. 데이터 모델 설계 (Schema Draft)

### Users
- `id`, `email`, `username`, `auth_id`, `avatar_url`, `bio`, `points`, `created_at`

### Ideas
- `id`, `user_id`, `title`, `tagline`, `problem`, `solution`, `status` (enum), `category`, `upvotes`, `interested_count`, `created_at`

### IdeaImages
- `id`, `idea_id`, `url`, `order`

### Comments
- `id`, `idea_id`, `user_id`, `content`, `parent_id`, `created_at`

### Votes
- `idea_id`, `user_id`, `type` ('INTERESTED' | 'UPVOTE')

### Updates
- `id`, `idea_id`, `title`, `content`, `created_at`

### Follows
- `follower_id`, `following_id`

## 5. MVP 개발 로드맵

### Phase 1: Setup & Core Infrastructure (Week 1)
- 프로젝트 초기화 및 환경 설정 (Next.js, Drizzle, Auth)
- DB 스키마 설계 및 마이그레이션
- 기본 레이아웃 및 공통 UI 컴포넌트 구현

### Phase 2: Idea Management (Week 2-3)
- 아이디어 작성, 수정, 조회 (CRUD)
- 이미지 업로드 기능
- 아이디어 상세 페이지 (설명, 이미지)

### Phase 3: Interaction & Community (Week 4-5)
- 투표 및 댓글 시스템
- 사용자 프로필 페이지
- 탐색(홈 피드) 및 필터링

### Phase 4: Updates & Polish (Week 6)
- 업데이트(개발 일지) 작성 기능
- 반응형 디자인 점검 및 UI 개선
- 배포 및 최종 테스트
