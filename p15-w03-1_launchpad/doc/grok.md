# MVP 공유 플랫폼 제품 요구사항 명세서

## 1. 제품 개요

### 1.1 제품 비전

창업가와 개발자들이 제품 아이디어를 공유하고, 커뮤니티 피드백을 통해 검증받으며, MVP부터 실제 제품 런칭까지 여정을 함께하는 플랫폼

### 1.2 핵심 가치 제안

- **아이디어 검증**: 개발 전 시장 반응 확인
- **피드백 수집**: 잠재 고객의 실질적인 의견 수렴
- **빠른 실행**: 검증된 아이디어의 빠른 MVP 개발 독려
- **투명한 여정**: 아이디어부터 런칭까지 전 과정 공유
- **커뮤니티 형성**: 얼리어답터와 초기 사용자 확보

### 1.3 타겟 사용자

**주 타겟**:

- 솔로 창업가 (Solopreneur)
- 인디 해커 (Indie Hacker)
- 스타트업 창업자
- 제품 개발자

**부 타겟**:

- 얼리어답터
- 엔젤 투자자
- 제품에 관심 있는 일반 사용자

### 1.4 경쟁 서비스 분석

- **Product Hunt**: 완성된 제품 중심, 아이디어 단계 부족
- **Reddit (r/SideProject)**: 구조화 부족, 추적 어려움
- **Indie Hackers**: 커뮤니티 중심, 제품 여정 추적 미흡
- **우리의 차별점**: 아이디어 → MVP → 런칭까지 전체 여정 구조화

## 2. 핵심 기능 요구사항

### 2.1 아이디어 등록 (Idea Post)

#### 2.1.1 아이디어 작성

**필수 항목**:

- 제목 (최대 100자)
- 한 줄 요약 (Tagline, 최대 150자)
- 문제 정의 (어떤 문제를 해결하나?)
- 솔루션 설명 (어떻게 해결하나?)
- 타겟 사용자 (누구를 위한 제품인가?)
- 카테고리 선택 (SaaS, Mobile App, Web Service, Tool 등)

**선택 항목**:

- 목업/스케치 이미지 (최대 5장)
- 기술 스택 예상
- 예상 개발 기간
- 비즈니스 모델
- 참고 링크

#### 2.1.2 상태 관리

아이디어는 다음 단계를 거침:

1. **💡 Idea** (아이디어 단계)
2. **🚧 Building MVP** (MVP 개발 중)
3. **🎉 Launched** (런칭 완료)
4. **❌ Dropped** (중단됨)

작성자가 상태를 업데이트하면 타임라인에 기록

#### 2.1.3 태그 시스템

- 카테고리 태그: #SaaS, #MobileApp, #Tool
- 기술 스택 태그: #React, #Python, #AI
- 대상 태그: #B2B, #B2C, #Developer
- 커스텀 해시태그 추가 가능 (최대 10개)

### 2.2 피드백 시스템

#### 2.2.1 투표 (Voting)

- **관심 있음** (I'd use this): 이 제품을 사용하고 싶음
- **좋은 아이디어** (Interesting): 흥미롭지만 나는 사용 안 함
- 투표 수가 많을수록 상단 노출

#### 2.2.2 댓글 (Comments)

- 피드백 작성 (최대 1,000자)
- 댓글에 좋아요
- 답글 (1 depth)
- 건설적인 피드백 권장 (가이드라인 제공)

**피드백 템플릿 제공** (선택적 사용):

```
💡 나라면 이렇게 개선할 것 같아요
✅ 좋은 점
❓ 궁금한 점
⚠️ 우려되는 점
```

#### 2.2.3 설문 기능

작성자가 특정 질문에 대한 투표 생성 가능:

- 예: "어떤 가격대가 적당할까요?"
- 선택지 최대 5개
- 투표 결과 실시간 표시

### 2.3 진행 상황 업데이트 (Updates)

#### 2.3.1 업데이트 작성

아이디어 작성자가 개발 진행 상황 공유:

- 제목 + 내용 (마크다운 지원)
- 이미지/GIF 첨부 (스크린샷, 데모)
- YouTube 동영상 임베드
- 상태 변경 (예: Idea → Building MVP)

#### 2.3.2 마일스톤

주요 진행 상황을 마일스톤으로 표시:

- ✅ 디자인 완료
- ✅ MVP 개발 완료
- ✅ 베타 테스터 모집
- ✅ 공식 런칭

#### 2.3.3 타임라인

아이디어의 전체 여정을 시간순으로 표시:

- 아이디어 등록
- 업데이트 포스트
- 상태 변경
- 런칭 정보

### 2.4 사용자 프로필

#### 2.4.1 프로필 정보

- 프로필 사진
- 사용자명 (unique)
- 한 줄 소개
- 소셜 링크 (Twitter, GitHub, LinkedIn, 웹사이트)
- 위치 (선택)

#### 2.4.2 활동 내역

- 내가 등록한 아이디어
- 상태별 필터 (Idea, Building, Launched, Dropped)
- 받은 피드백 수
- 참여한 피드백 (댓글, 투표)

#### 2.4.3 팔로우 시스템

- 관심 있는 창업가 팔로우
- 팔로우한 사람의 새 아이디어/업데이트 알림
- 팔로워/팔로잉 목록

### 2.5 탐색 및 발견

#### 2.5.1 홈 피드

**기본 정렬**:

- 🔥 Hot (인기순): 최근 24시간 내 투표+댓글 많은 순
- 🆕 New (최신순): 최근 등록된 아이디어
- 🏆 Top (전체 인기순): 전체 기간 투표 많은 순

**추가 필터**:

- 상태별 (Idea / Building / Launched)
- 기간별 (오늘, 이번 주, 이번 달, 전체)

#### 2.5.2 카테고리 탐색

- SaaS
- Mobile App
- Web Service
- Chrome Extension
- Developer Tool
- Productivity
- AI/ML
- 기타

#### 2.5.3 검색

- 제목, 설명 전체 검색
- 태그로 필터링
- 사용자명 검색

#### 2.5.4 트렌딩 섹션

- 이번 주 가장 핫한 아이디어 Top 10
- 최근 런칭된 제품 Top 10
- 빠르게 성장 중인 아이디어

### 2.6 런칭 (Launch)

#### 2.6.1 런칭 등록

아이디어 상태를 "Launched"로 변경하면:

- 🎉 런칭 배지 표시
- 제품 URL 추가 (필수)
- 공식 런칭 날짜
- 특별 런칭 업데이트 작성 권장

#### 2.6.2 런칭 페이지 섹션

- **제품 정보**: 최종 설명, 스크린샷, 데모 영상
- **가격 정보**: 무료/유료, 가격표
- **여정 타임라인**: 아이디어부터 런칭까지의 전체 과정
- **받은 피드백**: 초기에 받은 주요 피드백과 반영 내역
- **통계**: 총 피드백 수, 관심 표시 수, 개발 기간

#### 2.6.3 얼리어답터 보상

아이디어 단계부터 관심 표시하고 피드백 준 사용자에게:

- 🏅 "Early Supporter" 뱃지
- 제품 할인 코드 제공 (선택사항)
- 특별 감사 멘션

### 2.7 커뮤니티 기능

#### 2.7.1 신뢰도 시스템

사용자 활동에 따라 포인트 획득:

- 아이디어 등록: +10pt
- MVP 런칭: +50pt
- 제품 정식 런칭: +100pt
- 유용한 피드백 (좋아요 많이 받음): +5pt
- 스팸/저품질: -10pt

레벨 표시: 🥉 Newbie → 🥈 Builder → 🥇 Maker → 💎 Veteran

#### 2.7.2 뱃지 시스템

- 🚀 Early Bird: 첫 아이디어 등록
- 🏃 Fast Mover: 아이디어 등록 후 30일 내 MVP 런칭
- 💬 Helpful: 유용한 피드백 50개 이상
- 🎯 Achiever: 제품 3개 이상 런칭
- ⭐ Community Star: 팔로워 100명 이상

#### 2.7.3 주간 다이제스트

- 이번 주 Top 아이디어
- 새로 런칭된 제품
- 커뮤니티 하이라이트

### 2.8 알림 시스템

#### 2.8.1 알림 유형

- 내 아이디어에 새 댓글
- 내 아이디어에 투표
- 팔로우한 사람의 새 아이디어
- 팔로우한 아이디어 업데이트
- 누군가 나를 팔로우
- 내 댓글에 답글
- 런칭 축하 (내가 관심 표시한 아이디어)

#### 2.8.2 이메일 알림

사용자가 설정 가능:

- 주간 다이제스트
- 중요 알림만 (댓글, 투표)
- 모든 알림
- 알림 끄기

### 2.9 설정 및 개인정보

#### 2.9.1 계정 설정

- 프로필 수정
- 비밀번호 변경
- 이메일 변경
- 알림 설정

#### 2.9.2 개인정보 보호

- 아이디어 공개/비공개 설정
- 프로필 공개 범위
- 계정 삭제

## 3. 화면 구성

### 3.1 주요 화면

1. **랜딩 페이지**
    
    - 서비스 소개
    - 최근 인기 아이디어 미리보기
    - CTA (Sign Up)
2. **홈 피드**
    
    - 아이디어 카드 그리드 (3열)
    - 정렬/필터 옵션
    - 사이드바: 트렌딩, 카테고리
3. **아이디어 작성 페이지**
    
    - 단계별 폼 (Step 1: 기본 정보, Step 2: 상세 설명, Step 3: 추가 정보)
    - 실시간 미리보기
4. **아이디어 상세 페이지**
    
    - 헤더: 제목, 작성자, 상태, 투표
    - 본문: 문제/솔루션/타겟
    - 이미지 갤러리
    - 댓글 섹션
    - 타임라인/업데이트
5. **업데이트 작성 페이지**
    
    - 마크다운 에디터
    - 이미지 업로드
    - 상태 변경 옵션
6. **사용자 프로필**
    
    - 프로필 정보
    - 아이디어 목록 (탭: All, Idea, Building, Launched)
    - 활동 통계
7. **탐색 페이지**
    
    - 카테고리별 탐색
    - 태그 클라우드
    - 검색 결과
8. **알림 센터**
    
    - 알림 리스트
    - 읽음/안읽음
    - 알림 타입별 필터
9. **설정 페이지**
    
    - 프로필 편집
    - 알림 설정
    - 계정 관리

### 3.2 네비게이션

**상단 네비게이션**:

- 로고 (홈 링크)
- 탐색 (Explore)
- 검색바
- 알림 아이콘
- 프로필 드롭다운

**주요 CTA 버튼**:

- "Share Your Idea" (큰 버튼, 고정)

## 4. 기술 스택 (로컬 환경 최적화 - 2025년 12월 최신)

### 4.1 프론트엔드 (2025년 12월 최신 버전)

- **프레임워크**: Next.js 16.0+ (2025년 출시) 또는 Next.js 15.5
    - **React 19.2.0** (2025년 10월 1일 정식 출시, 최신 안정)
        - Activity API (visible/hidden 모드)
        - Web Streams for SSR in Node.js
        - 향상된 useId 프리픽스 (_r_)
    - **중요 보안**: React 19.0.1+ 필수 (CVE-2025-55182 수정, CVSS 10.0)
    - Turbopack 빌드 (베타 → 안정화)
    - Cache Components (PPR + use cache)
    - TypeScript config 지원 (next.config.ts)
- **언어**: TypeScript 5.7+ (2025년 최신)
- **스타일링**:
    - Tailwind CSS 4.0 (2025년 정식 출시 예정)
    - 또는 Tailwind CSS 3.4+ (안정 버전)
- **UI 컴포넌트**: shadcn/ui (React 19 완벽 지원)
- **상태 관리**: Zustand 5.0+ (4.9kb, 의존성 제로)
- **폼 관리**: React Hook Form 7.54+
- **HTTP 클라이언트**:
    - 네이티브 Fetch API (권장)
    - 또는 ky 1.7+ (경량 HTTP 클라이언트)
- **마크다운**:
    - react-markdown 9+
    - remark-gfm (GitHub Flavored Markdown)
    - rehype-highlight (코드 하이라이팅)
- **검증**: Zod 3.24+
- **아이콘**: Lucide React 0.460+
- **애니메이션**: Framer Motion 11+
- **차트**: Recharts 2.14+

### 4.2 백엔드 (로컬 최적화)

**권장 옵션: 최신 기술 (2025년 12월)**

- **런타임**: Bun 1.3.4 (2025년 12월 6일 릴리스)
    - **주요 업데이트**:
        - URLPattern API 지원 (라우팅 패턴 매칭)
        - Fake Timers for bun:test
        - Custom Proxy Headers in fetch()
        - SQLite 3.51.1
        - HTTP Agent 연결 풀링 개선
    - **Anthropic 인수** (2025년 12월 2일)
        - 오픈소스 유지 (MIT 라이선스)
        - Claude Code/Agent SDK 지원 강화
    - Node.js 대비 5-8x 빠른 시작
    - 내장 TypeScript, 테스트, 번들러
    - 내장 MySQL/Redis/SQLite 클라이언트
- **프레임워크**: Hono 4.7+ 또는 Elysia 1.2+
    - Hono: 범용성, Edge 최적화, 14kb
    - Elysia: Bun 최적화, 최고 성능, 타입 안전
- **인증**:
    - Lucia Auth 3+ (모던 인증 라이브러리)
    - 또는 Better-Auth (최신)
- **세션**:
    - jose 5+ (JWT, JWE)
    - Argon2id (비밀번호 해싱, bcrypt 대체)
- **검증**: Zod 3.24+ 또는 TypeBox 0.34+
- **ORM**: Drizzle ORM 0.45.0+
    - 7.4kb, 의존성 제로
    - TypeScript 네이티브
    - SQL-like 쿼리
    - 로컬 PostgreSQL/SQLite 완벽 지원
- **이메일**:
    - Resend (API 기반, 개발자 친화적)
    - 또는 Nodemailer 6.9+ (로컬 SMTP)
- **API 문서**: Scalar 또는 Hono OpenAPI

**대안 (안정성 중시)**:

- Node.js 24 LTS (2025년) + Express 5 + Prisma 6

### 4.3 데이터베이스 (로컬 설치)

**주 데이터베이스** (하나 선택):

- **PostgreSQL 17+** (최신 2024년 9월 출시)
    - Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:17-alpine`
    - 로컬 설치: Postgres.app (macOS), 공식 installer (Windows/Linux)
    - 장점: 강력한 기능, JSON 지원, Full-text search
- **SQLite 3.51+** (내장, 설치 불필요)
    - Bun 내장 지원
    - 장점: 설정 불필요, 단일 파일, 백업 용이
    - 단점: 동시 쓰기 제한적
    - 적합: MVP, 소규모 프로젝트

**캐시** (선택사항):

- **Redis 7.4+** (로컬 설치)
    - Docker: `docker run -d -p 6379:6379 redis:7-alpine`
    - 용도: 세션, 실시간 카운터, 피드 캐시
    - 대안: Node-cache (인메모리, Redis 대체)

**전체 텍스트 검색** (선택사항):

- **PostgreSQL Full-text Search** (내장, 추가 설치 불필요)
- **Meilisearch 1.12+** (로컬 설치)
    - Docker: `docker run -d -p 7700:7700 getmeili/meilisearch:latest`
    - 오픈소스, 빠른 검색, 타이포 허용

### 4.4 파일 저장소 (로컬)

**이미지 저장**:

- **로컬 파일 시스템**: `public/uploads/` 폴더
    - Sharp 0.34+ (이미지 처리, 리사이징)
    - 장점: 설정 불필요, 무료
    - 단점: CDN 없음, 스케일링 제한

**대안 (프로덕션 대비)**:

- MinIO (셀프 호스팅 S3 호환 스토리지)
    - Docker: `docker run -d -p 9000:9000 -p 9001:9001 minio/minio server /data --console-address ":9001"`
    - S3 API 호환, 로컬에서 개발 후 S3로 전환 용이

### 4.5 개발 환경 & 도구

**패키지 매니저**:

- pnpm 9.15+ (빠르고 디스크 효율적)
- 또는 Bun 내장 패키지 매니저

**린터 & 포매터**:

- Biome 1.9+ (Rust 기반, ESLint+Prettier 통합)
    - 또는 ESLint 9 + Prettier 3

**API 개발 & 테스트**:

- Bruno 1.41+ (오픈소스 Postman 대체)
- 또는 Hoppscotch (웹 기반)

**데이터베이스 GUI**:

- DBeaver (무료, 모든 DB 지원)
- TablePlus (macOS/Windows, 유료지만 UI 우수)
- Drizzle Studio (내장, `drizzle-kit studio`)

**버전 관리**: Git + GitHub/GitLab

**개발 서버**:

- Docker 컨테이너 (PostgreSQL, Redis 등)
- 또는 로컬 설치

### 4.6 테스트

**프론트엔드**:

- Vitest 3+ (Vite 기반, Jest 호환)
- React Testing Library 16+
- Playwright 1.50+ (E2E)

**백엔드**:

- Bun Test (내장) 또는 Vitest
- Supertest (API 테스트)

### 4.7 배포 (옵션)

**개발 단계**: 로컬 실행만 **프로덕션 대비** (나중에):

- Vercel (프론트엔드)
- Fly.io (백엔드)
- Railway (풀스택 올인원)

### 4.8 로컬 개발 환경 설정

**필수 설치**:

```bash
# 1. Bun 설치 (macOS/Linux)
curl -fsSL https://bun.com/install | bash

# 또는 npm으로 설치
npm install -g bun

# 2. PostgreSQL (Docker 권장)
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mvp_platform \
  -p 5432:5432 \
  postgres:17-alpine

# 3. Redis (선택사항, Docker)
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:7-alpine

# 4. 프로젝트 생성
bun create next-app@latest my-mvp-platform --typescript
cd my-mvp-platform

# 5. 의존성 설치
bun add drizzle-orm postgres
bun add -d drizzle-kit @types/node
bun add hono zod
bun add @lucia-auth/adapter-drizzle lucia
```

**환경 변수** (`.env.local`):

```env
# 데이터베이스
DATABASE_URL="postgresql://postgres:password@localhost:5432/mvp_platform"

# 캐시 (선택)
REDIS_URL="redis://localhost:6379"

# 세션
SESSION_SECRET="your-super-secret-key-change-in-production"

# 업로드
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=10485760  # 10MB
```

### 4.9 권장 기술 스택 조합 (MVP 로컬 환경)

```yaml
프론트엔드:
  - Next.js 15.5 + React 19
  - TypeScript 5.7
  - Tailwind CSS 3.4
  - shadcn/ui
  - Zustand

백엔드:
  - Bun 1.3.4
  - Hono 4.7
  - Drizzle ORM 0.45
  - Zod 3.24
  - Lucia Auth

데이터베이스:
  - PostgreSQL 17 (Docker)
  - Redis 7 (Docker, 선택)

파일 저장:
  - 로컬 파일 시스템
  - Sharp (이미지 처리)

개발 도구:
  - pnpm 9
  - Biome 1.9
  - Drizzle Studio
  - Bruno
  - Docker Desktop
```

**이 조합의 장점**:

- ✅ 완전한 로컬 개발 (클라우드 비용 0원)
- ✅ 최신 기술 스택 (2024년 12월 기준)
- ✅ 초고속 개발 경험 (Bun + Turbopack)
- ✅ 프로덕션 준비 가능 (Docker → 클라우드 전환 용이)
- ✅ 타입 안전성 (TypeScript + Drizzle)
- ✅ 개발자 경험 우수

## 5. 데이터 모델

### 5.1 User

```typescript
{
  id: string
  username: string (unique)
  email: string (unique)
  password: string
  displayName: string
  bio: string?
  avatar: string?
  website: string?
  twitter: string?
  github: string?
  linkedin: string?
  location: string?
  points: number (default: 0)
  level: enum
  createdAt: DateTime
}
```

### 5.2 Idea

```typescript
{
  id: string
  userId: string (FK)
  title: string
  tagline: string
  problem: text
  solution: text
  targetUser: text
  category: enum
  status: enum ['IDEA', 'BUILDING', 'LAUNCHED', 'DROPPED']
  techStack: string[]?
  businessModel: text?
  estimatedDuration: string?
  launchUrl: string? (런칭 시)
  launchDate: DateTime?
  upvotes: number (denormalized)
  interested: number (denormalized)
  commentsCount: number (denormalized)
  viewsCount: number
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 5.3 IdeaImage

```typescript
{
  id: string
  ideaId: string (FK)
  url: string
  order: number
  createdAt: DateTime
}
```

### 5.4 Tag

```typescript
{
  id: string
  name: string (unique)
  type: enum ['CATEGORY', 'TECH', 'TARGET', 'CUSTOM']
  count: number (denormalized)
}
```

### 5.5 IdeaTag (Many-to-Many)

```typescript
{
  ideaId: string (FK)
  tagId: string (FK)
}
```

### 5.6 Vote

```typescript
{
  id: string
  ideaId: string (FK)
  userId: string (FK)
  type: enum ['INTERESTED', 'UPVOTE']
  createdAt: DateTime
  unique: [ideaId, userId, type]
}
```

### 5.7 Comment

```typescript
{
  id: string
  ideaId: string (FK)
  userId: string (FK)
  parentId: string? (FK, 답글용)
  content: text
  likesCount: number
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 5.8 Update

```typescript
{
  id: string
  ideaId: string (FK)
  userId: string (FK)
  title: string
  content: text (markdown)
  statusChange: enum? (이전 상태 → 새 상태)
  createdAt: DateTime
}
```

### 5.9 UpdateImage

```typescript
{
  id: string
  updateId: string (FK)
  url: string
  order: number
}
```

### 5.10 Follow

```typescript
{
  followerId: string (FK)
  followingId: string (FK)
  createdAt: DateTime
  unique: [followerId, followingId]
}
```

### 5.11 Notification

```typescript
{
  id: string
  userId: string (FK - 받는 사람)
  actorId: string (FK - 행동한 사람)
  type: enum ['COMMENT', 'VOTE', 'FOLLOW', 'UPDATE', 'LAUNCH']
  ideaId: string? (FK)
  commentId: string? (FK)
  isRead: boolean (default: false)
  createdAt: DateTime
}
```

### 5.12 Badge

```typescript
{
  id: string
  userId: string (FK)
  type: enum ['EARLY_BIRD', 'FAST_MOVER', 'HELPFUL', etc.]
  earnedAt: DateTime
}
```

### 5.13 Poll

```typescript
{
  id: string
  ideaId: string (FK)
  question: string
  options: json[] // [{text: string, votes: number}]
  createdAt: DateTime
  endsAt: DateTime?
}
```

### 5.14 PollVote

```typescript
{
  id: string
  pollId: string (FK)
  userId: string (FK)
  optionIndex: number
  createdAt: DateTime
  unique: [pollId, userId]
}
```

## 6. API 엔드포인트

### 6.1 인증

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
GET    /api/auth/me
```

### 6.2 아이디어

```
GET    /api/ideas                    # 피드 (정렬/필터)
POST   /api/ideas                    # 아이디어 작성
GET    /api/ideas/:id                # 상세
PUT    /api/ideas/:id                # 수정
DELETE /api/ideas/:id                # 삭제
PATCH  /api/ideas/:id/status         # 상태 변경
GET    /api/ideas/:id/timeline       # 타임라인
GET    /api/ideas/trending           # 트렌딩
GET    /api/ideas/search?q=          # 검색
```

### 6.3 투표

```
POST   /api/ideas/:id/vote           # body: {type: 'INTERESTED' | 'UPVOTE'}
DELETE /api/ideas/:id/vote/:type     # 투표 취소
GET    /api/ideas/:id/voters         # 투표한 사용자 목록
```

### 6.4 댓글

```
GET    /api/ideas/:id/comments
POST   /api/ideas/:id/comments
PUT    /api/comments/:id
DELETE /api/comments/:id
POST   /api/comments/:id/like
```

### 6.5 업데이트

```
GET    /api/ideas/:id/updates
POST   /api/ideas/:id/updates
GET    /api/updates/:id
PUT    /api/updates/:id
DELETE /api/updates/:id
```

### 6.6 사용자

```
GET    /api/users/:username
PUT    /api/users/me
GET    /api/users/:id/ideas
GET    /api/users/:id/followers
GET    /api/users/:id/following
```

### 6.7 팔로우

```
POST   /api/users/:id/follow
DELETE /api/users/:id/follow
```

### 6.8 알림

```
GET    /api/notifications
PATCH  /api/notifications/:id/read
PATCH  /api/notifications/read-all
```

### 6.9 태그

```
GET    /api/tags                     # 인기 태그
GET    /api/tags/:name/ideas         # 태그별 아이디어
```

### 6.10 설문

```
POST   /api/ideas/:id/polls
POST   /api/polls/:id/vote
GET    /api/polls/:id/results
```

### 6.11 업로드

```
POST   /api/upload/image             # 이미지 업로드
```

## 7. 비기능 요구사항

### 7.1 성능

- LCP: 2.5초 이내
- INP: 200ms 이내
- 아이디어 카드 로딩: 무한 스크롤 (20개씩)
- 이미지 최적화: WebP/AVIF, 지연 로딩

### 7.2 보안

- HTTPS 필수
- JWT 인증 (7일 만료)
- Rate Limiting:
    - 아이디어 작성: 10개/일
    - 댓글: 50개/시간
    - API: 100req/분
- XSS, CSRF 방어
- 스팸 필터링

### 7.3 SEO

- Open Graph 메타 태그
- Twitter Card
- 동적 sitemap.xml
- 각 아이디어별 고유 URL
- 서버 사이드 렌더링 (Next.js)

### 7.4 접근성

- WCAG 2.2 AA
- 키보드 내비게이션
- ARIA 레이블
- 색상 대비 4.5:1

## 8. MVP 개발 우선순위 (12주)

### Phase 1 (Week 1-4): 핵심 인프라

- [ ] 프로젝트 셋업 (Next.js, Bun, Drizzle)
- [ ] DB 스키마 설계
- [ ] 인증 시스템 (회원가입, 로그인)
- [ ] 이미지 업로드 (R2)
- [ ] 기본 UI 컴포넌트

### Phase 2 (Week 5-8): 아이디어 관리

- [ ] 아이디어 작성/수정/삭제
- [ ] 아이디어 상세 페이지
- [ ] 투표 시스템 (관심 있음/좋아요)
- [ ] 댓글 시스템
- [ ] 홈 피드 (정렬/필터)

### Phase 3 (Week 9-12): 소셜 & 진행 상황

- [ ] 사용자 프로필
- [ ] 팔로우 시스템
- [ ] 업데이트 작성
- [ ] 타임라인
- [ ] 알림 시스템
- [ ] 상태 관리 (Idea → Building → Launched)
- [ ] 런칭 페이지
- [ ] 버그 수정 & 최적화

## 9. MVP 이후 로드맵

### Phase 4 (Month 4-6): 커뮤니티 강화

- 뱃지 & 레벨 시스템
- 설문 기능
- 주간 다이제스트 이메일
- 검색 고도화 (Typesense)
- 모바일 앱 (PWA)

### Phase 5 (Month 7-9): 고급 기능

- AI 피드백 요약
- 멘토링 매칭
- 프라이빗 아이디어 (유료)
- 팀 협업 기능
- 투자자 섹션

### Phase 6 (Month 10-12): 수익화

- 프리미엄 플랜
    - 아이디어 분석 대시보드
    - 프라이빗 아이디어 무제한
    - 우선 노출
- 스폰서십 (Featured Ideas)
- 채용 공고 연계

## 10. 비즈니스 모델

### 10.1 프리미엄 (Freemium)

**무료 플랜**:

- 아이디어 등록 무제한
- 기본 피드백 기능
- 커뮤니티 참여

**Pro 플랜** ($9/월):

- 프라이빗 아이디어 5개
- 고급 분석 대시보드
- 우선 지원
- 뱃지: Pro Member

**Team 플랜** ($29/월):

- 팀 협업 (최대 5명)
- 프라이빗 아이디어 무제한
- API 액세스
- 전담 지원

### 10.2 추가 수익원

- Featured Ideas (하루 $49)
- 스폰서 뉴스레터 ($199)
- 채용 공고 ($99/포지션)
- 제휴 마케팅 (도구 추천)

## 11. 성공 지표 (KPI)

### 11.1 3개월 목표 (MVP 런칭)

- 가입 사용자: 1,000명
- 등록된 아이디어: 200개
- DAU: 100명
- 런칭된 제품: 5개
- 평균 아이디어당 피드백: 10개

### 11.2 6개월 목표

- MAU: 5,000명
- 등록된 아이디어: 1,000개
- 런칭된 제품: 30개
- 유료 전환율: 2% (100명)
- 커뮤니티 참여율: 50%

### 11.3 12개월 목표

- MAU: 20,000명
- 등록된 아이디어: 5,000개
- 런칭된 제품: 200개
- MRR: $5,000
- 투자 유치 또는 자립 운영

## 12. 마케팅 전략

### 12.1 초기 사용자 확보

**타겟 커뮤니티**:

- Product Hunt (서비스 자체를 런칭)
- Indie Hackers
- Reddit (r/SideProject, r/startups)
- Hacker News
- Twitter/X (#buildinpublic)

**콘텐츠 마케팅**:

- 창업 여정 블로그 (Build in Public)
- YouTube 튜토리얼 (MVP 만들기)
- 성공 사례 인터뷰

**파트너십**:

- 노코드 툴 (Bubble, Webflow)과 제휴
- 개발자 부트캠프 협력
- 스타트업 액셀러레이터 연계

### 12.2 성장 전략

**바이럴 루프**:

- "Powered by [서비스명]" 런칭 배지
- 소셜 공유 인센티브
- 초대 보상 (포인트)

**SEO 최적화**:

- 카테고리별 랜딩 페이지
- 성공 사례 스토리
- 태그별 컨텐츠 페이지

**이메일 마케팅**:

- 주간 최고 아이디어 다이제스트
- 런칭 알림
- 팁 & 트릭 뉴스레터

## 13. 리스크 분석 및 대응

### 13.1 기술적 리스크

**리스크**: 트래픽 급증 시 서버 다운

- **대응**: Cloudflare CDN, 서버리스 아키텍처, 오토 스케일링

**리스크**: 이미지 저장 비용 급증

- **대응**: 이미지 압축 최적화, CDN 캐싱, 용량 제한

### 13.2 비즈니스 리스크

**리스크**: 사용자 유입 부족

- **대응**: 베타 테스터 사전 모집, 초기 인플루언서 참여, 콘텐츠 마케팅

**리스크**: 저품질 아이디어/스팸

- **대응**: 커뮤니티 가이드라인, 신고 시스템, 모더레이션, AI 필터

**리스크**: 경쟁 서비스 등장

- **대응**: 차별화된 UX, 커뮤니티 문화 구축, 빠른 기능 개선

### 13.3 법적 리스크

**리스크**: 저작권/지적재산권 침해

- **대응**: 명확한 이용약관, DMCA 정책, 신고 시스템

**리스크**: GDPR/개인정보 이슈

- **대응**: 개인정보처리방침, 쿠키 동의, 데이터 삭제 요청 기능

## 14. 팀 구성 (권장)

### 14.1 MVP 단계 (최소)

- **풀스택 개발자**: 1-2명
- **디자이너**: 1명 (파트타임 가능)
- **커뮤니티 매니저**: 겸임 가능

### 14.2 성장 단계

- **백엔드 개발자**: 1명
- **프론트엔드 개발자**: 1명
- **제품 매니저**: 1명
- **마케터**: 1명
- **커뮤니티 매니저**: 1명 (풀타임)

## 15. 예산 계획 (연간)

### 15.1 인프라 비용 (연간)

- Vercel Pro: $240 ($20/월)
- Fly.io: $180 ($15/월)
- Neon PostgreSQL: $240 ($20/월)
- Upstash Redis: $120 ($10/월)
- Cloudflare R2: $300 (저장 + 전송)
- Domain: $20
- 모니터링 (Sentry, etc.): $300
- **총합**: ~$1,400/년

### 15.2 마케팅 비용

- 콘텐츠 제작: $2,000
- 유료 광고 (선택): $3,000
- 인플루언서 협업: $1,000
- **총합**: ~$6,000/년

### 15.3 총 운영 비용 (MVP → 초기 성장)

- 인프라: $1,400
- 마케팅: $6,000
- 기타 (디자인, 툴): $1,000
- **총합**: ~$8,400/년

## 16. 출시 체크리스트

### 16.1 기술적 준비

- [ ] 모든 핵심 기능 동작 확인
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 반응형 확인
- [ ] 성능 최적화 (Lighthouse 90+ 목표)
- [ ] 보안 점검 (OWASP Top 10)
- [ ] 에러 모니터링 설정
- [ ] 백업 시스템 구축

### 16.2 법적 준비

- [ ] 이용약관 작성
- [ ] 개인정보처리방침
- [ ] 쿠키 정책
- [ ] 커뮤니티 가이드라인
- [ ] DMCA 정책

### 16.3 콘텐츠 준비

- [ ] 랜딩 페이지 카피라이팅
- [ ] 온보딩 튜토리얼
- [ ] FAQ 작성
- [ ] 이메일 템플릿 준비
- [ ] 소셜 미디어 자산 제작

### 16.4 마케팅 준비

- [ ] Product Hunt 런칭 계획
- [ ] 베타 테스터 모집 완료 (최소 50명)
- [ ] 런칭 블로그 포스트 작성
- [ ] 소셜 미디어 계정 개설
- [ ] 프레스킷 준비

## 17. 차별화 포인트 요약

### 17.1 vs Product Hunt

- ✅ 아이디어 단계부터 시작
- ✅ 전체 여정 추적 (타임라인)
- ✅ 피드백 중심 문화

### 17.2 vs Indie Hackers

- ✅ 더 구조화된 아이디어 포맷
- ✅ 시각적 피드 (이미지 중심)
- ✅ MVP 개발 추적 기능

### 17.3 vs Reddit

- ✅ 전문화된 플랫폼
- ✅ 체계적인 피드백 시스템
- ✅ 진행 상황 업데이트 구조

### 17.4 우리만의 강점

- 🎯 **명확한 목적**: 아이디어 검증 → MVP → 런칭
- 🚀 **빠른 실행 독려**: 상태 추적, 마일스톤
- 👥 **커뮤니티 보상**: 얼리 서포터 뱃지, 할인
- 📊 **투명한 여정**: 타임라인으로 전체 과정 공개
- 🤝 **Win-Win**: 창업가는 검증, 사용자는 얼리억세스

## 18. 핵심 사용자 여정

### 18.1 창업가 여정

1. 아이디어를 가지고 가입
2. 구조화된 폼으로 아이디어 작성
3. 커뮤니티에 공유
4. 피드백 수집 (투표, 댓글)
5. 긍정적 반응 확인
6. 상태를 "Building MVP"로 변경
7. 개발 과정 업데이트 공유
8. MVP 완성 후 런칭 발표
9. 얼리 서포터들에게 특별 혜택
10. 제품 성장 과정 계속 공유

### 18.2 피드백 제공자 여정

1. 흥미로운 아이디어 발견
2. "관심 있음" 투표
3. 건설적인 피드백 댓글 작성
4. 아이디어 팔로우
5. 업데이트 알림 받기
6. MVP 런칭 알림
7. 얼리 서포터 뱃지 획득
8. 제품 할인 혜택
9. 제품 사용 & 후기 공유

## 19. 예상 타임라인

### 19.1 개발 일정

- **Week 1-4**: 기본 인프라, 인증
- **Week 5-8**: 아이디어 관리, 피드백
- **Week 9-12**: 소셜, 업데이트, 런칭

### 19.2 마케팅 일정

- **Week 10**: 베타 테스터 모집 시작
- **Week 12**: 비공개 베타 런칭
- **Week 13-14**: 베타 피드백 수집 & 개선
- **Week 15**: Product Hunt 공식 런칭
- **Week 16+**: 콘텐츠 마케팅 본격화

## 20. 성공 사례 시나리오

### 20.1 이상적인 성공 사례

**Day 1**:

- 개발자 김철수, "AI 기반 독서 관리 앱" 아이디어 등록
- 50명이 "관심 있음" 투표
- 15개의 건설적인 피드백 댓글

**Week 2**:

- 피드백 반영하여 기능 수정
- "Building MVP" 상태로 변경
- 개발 진행 상황 업데이트 3회

**Month 2**:

- MVP 완성, 베타 테스터 모집
- 초기 팔로워 30명 중 20명 참여

**Month 3**:

- 공식 런칭, "Launched" 상태
- 얼리 서포터들에게 50% 할인 제공
- Product Hunt에도 재런칭하여 #3 달성

**Month 6**:

- 유료 사용자 500명 확보
- 커뮤니티 플랫폼에서 성공 스토리 공유
- 다른 창업가들에게 영감 제공

이렇게 플랫폼이 실제로 아이디어를 제품으로 만드는 데 기여하는 사례가 쌓이면서 신뢰도 상승

---

## 마무리

이 플랫폼의 핵심 가치는 **"검증된 아이디어에 집중하고, 빠르게 실행하며, 투명하게 공유하는 문화"**입니다.

단순히 아이디어를 공유하는 것을 넘어, 창업가들이 실제로 제품을 만들도록 동기부여하고, 그 과정에서 커뮤니티의 지원을 받을 수 있는 생태계를 만드는 것이 목표입니다.
