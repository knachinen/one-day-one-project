# 구현 계획 (Implementation Plan)

## 1. Phase 1: 기반 구축 (Setup & Foundation)

### 1.1 프로젝트 초기화
- [ ] `p15_mvp_platform` 디렉토리에 Next.js 16+ 프로젝트 생성 (`bun create next-app`)
- [ ] Bun 런타임 환경 설정
- [ ] Hono 설치 및 API 라우트 구성 (`app/api/[[...route]]/route.ts`)
- [ ] TypeScript, Tailwind CSS, ESLint 설정
- [ ] Shadcn/UI 초기화 및 기본 컴포넌트(Button, Input, Card, Dialog) 설치

### 1.2 데이터베이스 및 인증 설정
- [ ] Neon DB 프로젝트 생성 및 연결 정보 설정 (`.env`)
- [ ] Drizzle ORM 설치 및 스키마 파일 설정 (`schema.ts`)
- [ ] Lucia Auth (또는 Next-Auth) 설치 및 세션 관리 구현
- [ ] 회원가입/로그인 페이지 UI 및 로직 구현 (Email/Password or Social)

### 1.3 레이아웃 및 라우팅
- [ ] Root Layout (Header, Footer, Navigation) 구현
- [ ] 메인 페이지(Landing), 대시보드 구조 잡기
- [ ] 테마(Dark/Light) 설정

## 2. Phase 2: 핵심 기능 - 아이디어 (Core: Idea)

### 2.1 아이디어 CRUD
- [ ] 아이디어 DB 스키마 정의 (`ideas`, `idea_images`, `tags`)
- [ ] 아이디어 작성 페이지 구현 (Form handling, Validation with Zod)
- [ ] 이미지 업로드 기능 구현 (R2 이용 추후 연동, 우선 Local/Mock 처리)
- [ ] 아이디어 상세 페이지 (Dynamic Route) 구현
- [ ] 아이디어 수정 및 삭제 기능

### 2.2 아이디어 목록 (Feed)
- [ ] 메인 피드 UI 구현 (Card Grid)
- [ ] 정렬(최신순, 인기순) 및 카테고리 필터링 API 구현
- [ ] 페이지네이션 또는 무한 스크롤 구현

## 3. Phase 3: 상호작용 및 소셜 (Interaction)

### 3.1 투표 시스템
- [ ] 투표 DB 스키마 (`votes`)
- [ ] 'I would use this' / 'Interesting' 투표 API 및 UI 연동
- [ ] 낙관적 업데이트(Optimistic Updates)로 반응 속도 향상

### 3.2 댓글 시스템
- [ ] 댓글 DB 스키마 (`comments`)
- [ ] 댓글 작성, 대댓글, 수정, 삭제 기능
- [ ] 마크다운 렌더링 지원

### 3.3 사용자 프로필
- [ ] 프로필 페이지 UI
- [ ] 사용자 활동 내역(작성한 아이디어, 투표 내역) 표시
- [ ] 프로필 정보 수정

## 4. Phase 4: 고급 기능 및 완성 (Polish)

### 4.1 업데이트 및 타임라인
- [ ] 프로젝트 업데이트(DevLOG) 작성 기능
- [ ] 아이디어 상세 페이지 내 타임라인 탭 구현

### 4.2 검색 및 알림
- [ ] 기본 검색 기능 (DB Like 검색)
- [ ] 알림 센터 UI 및 기본 알림 로직 (DB 기반)

### 4.3 배포 및 최적화
- [ ] Vercel 배포 설정
- [ ] SEO 메타 태그 최적화 (Open Graph)
- [ ] 최종 버그 수정 및 성능 점검

## 5. Directory Structure
```
src/
├── app/                 # Next.js App Router
├── components/          # React Components
│   ├── ui/              # Shadcn UI
│   ├── features/        # Feature-specific
│   └── shared/          # Shared components
├── lib/                 # Utilities
│   ├── db/              # Drizzle setup & schema
│   ├── auth/            # Auth config
│   └── utils.ts         # Helper functions
├── server/              # Server Actions
├── types/               # TypeScript Definitions
└── hooks/               # Custom Hooks
```
