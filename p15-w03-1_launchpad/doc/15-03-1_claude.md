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

## 4. 기술 스택 (2025 최신)

### 4.1 프론트엔드

- **프레임워크**: Next.js 15 (App Router, React 19)
- **언어**: TypeScript 5+
- **스타일링**: Tailwind CSS 4.0
- **UI 컴포넌트**: shadcn/ui (Radix UI 기반)
- **상태 관리**: Zustand
- **폼**: React Hook Form + Zod
- **마크다운**: react-markdown, remark/rehype
- **아이콘**: Lucide React
- **애니메이션**: Framer Motion
- **차트**: Recharts (통계용)
- **배포**: Vercel

### 4.2 백엔드

- **런타임**: Bun 1.3+
- **프레임워크**: Hono (초경량, Edge 최적화)
- **언어**: TypeScript 5+
- **인증**: Lucia Auth (모던 인증 라이브러리)
- **이메일**: Resend (현대적 이메일 API)
- **검증**: Zod
- **ORM**: Drizzle ORM
- **API 문서**: Scalar (OpenAPI 기반)
- **배포**: Fly.io 또는 Cloudflare Workers

### 4.3 데이터베이스

- **메인 DB**: Neon PostgreSQL (서버리스)
- **캐시**: Upstash Redis (서버리스)
- **전체 검색**: Typesense (오픈소스) 또는 Meilisearch

### 4.4 스토리지 & CDN

- **이미지 스토리지**: Cloudflare R2
- **CDN**: Cloudflare
- **이미지 최적화**: Sharp

### 4.5 인프라 & DevOps

- **버전 관리**: Git + GitHub
- **CI/CD**: GitHub Actions
- **모니터링**:
    - Sentry (에러 트래킹)
    - BetterStack (업타임 모니터링)
    - Axiom (로그)
- **분석**:
    - Plausible Analytics (프라이버시 친화적)
    - PostHog (제품 분석)

### 4.6 커뮤니케이션

- **이메일 템플릿**: React Email
- **알림**: Web Push API
- **웹소켓**: Hono WebSocket (실시간 알림)

### 4.7 AI 기능 (선택)

- **AI 피드백 요약**: OpenAI API (GPT-4)
- **태그 자동 제안**: 텍스트 분석
- **스팸 필터링**: OpenAI Moderation API

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

### 11.2 6개월 목

# End
