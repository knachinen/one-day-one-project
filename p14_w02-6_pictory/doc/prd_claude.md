# 이미지 공유 커뮤니티 MVP 요구사항 명세서

## 1. MVP 개요

### 1.1 목적

핵심 기능에 집중하여 빠르게 시장 검증을 수행하고 사용자 피드백을 수집할 수 있는 최소 기능 제품(MVP) 개발

### 1.2 MVP 목표

- 3개월 내 개발 완료
- 핵심 사용자 여정 구현
- 기술적 복잡도 최소화
- 빠른 반복 개선 가능한 구조

### 1.3 MVP 범위

**포함되는 기능**: 회원가입/로그인, 게시물 작성/조회, 좋아요, 댓글, 팔로우, 기본 프로필 **제외되는 기능**: 스토리, DM, 고급 편집 도구, 라이브, 광고, 쇼핑

## 2. 핵심 기능 요구사항

### 2.1 사용자 인증

#### 2.1.1 회원가입

- 이메일 주소 입력
- 비밀번호 설정 (최소 8자, 영문+숫자 조합)
- 사용자명(아이디) 설정 (4-20자, 영문+숫자+언더스코어)
- 실명 입력
- 이메일 인증 (인증 코드 발송)
- 약관 동의 체크박스

**제외**: 소셜 로그인, 전화번호 인증

#### 2.1.2 로그인

- 이메일/사용자명 + 비밀번호
- "로그인 상태 유지" 옵션
- 비밀번호 찾기 (이메일로 리셋 링크 발송)

**제외**: 2단계 인증, 생체 인증

#### 2.1.3 프로필 설정 (초기)

- 프로필 사진 업로드 (선택사항)
- 자기소개 입력 (최대 150자, 선택사항)

### 2.2 프로필 관리

#### 2.2.1 프로필 보기

- 프로필 사진
- 사용자명, 실명
- 자기소개
- 게시물 수, 팔로워 수, 팔로잉 수
- 게시물 그리드 (3열)
- "프로필 편집" 버튼 (본인 프로필)
- "팔로우" 버튼 (타인 프로필)

#### 2.2.2 프로필 편집

- 프로필 사진 변경
- 실명 수정
- 자기소개 수정
- 비밀번호 변경

**제외**: 웹사이트 링크, 비공개 계정, 활동 기록

### 2.3 게시물 작성

#### 2.3.1 이미지 업로드

- 단일 이미지 업로드 (1장만)
- 지원 포맷: JPG, PNG
- 최대 파일 크기: 10MB
- 정사각형(1:1) 비율로 자동 크롭

**제외**: 다중 이미지, 세로/가로 비율, 동영상

#### 2.3.2 이미지 편집

- 기본 필터 5종 (예: 원본, 흑백, 세피아, 밝게, 선명하게)
- 밝기 조절 슬라이더

**제외**: 고급 편집 도구, 스티커, 텍스트, 그림 그리기

#### 2.3.3 게시물 정보 입력

- 캡션 작성 (최대 500자)
- 해시태그 추가 (#로 시작, 최대 10개)

**제외**: 위치 태그, 사용자 태그, 접근성 텍스트

#### 2.3.4 게시물 발행

- "공유" 버튼 클릭으로 즉시 발행
- 발행 후 프로필 페이지로 이동

**제외**: 임시 저장, 예약 발행

### 2.4 피드 및 게시물 보기

#### 2.4.1 홈 피드

- 팔로우한 사용자의 게시물 시간순 나열
- 무한 스크롤
- 새로고침 (당겨서 새로고침)
- 게시물 구성:
  - 작성자 프로필 사진 + 사용자명 (클릭 시 프로필 이동)
  - 이미지
  - 좋아요 버튼, 댓글 버튼, 공유 버튼
  - 좋아요 수 표시
  - 캡션 (더보기로 펼치기)
  - 댓글 수 표시 ("댓글 3개 모두 보기")
  - 게시 시간 (예: 3시간 전)

**제외**: 추천 게시물, 스토리, 광고

#### 2.4.2 게시물 상세 보기

- 전체 이미지 보기
- 전체 캡션 표시
- 댓글 목록 (최신순)
- 좋아요/댓글 기능

#### 2.4.3 자신의 게시물 관리

- 게시물 삭제 (확인 다이얼로그)

**제외**: 게시물 수정, 보관, 통계 보기

### 2.5 소셜 인터랙션

#### 2.5.1 좋아요

- 하트 아이콘 클릭/탭
- 이미지 더블탭으로 좋아요
- 좋아요 취소 (하트 다시 클릭)
- 좋아요 수 표시
- 좋아요한 사용자 목록 보기 (모달)

#### 2.5.2 댓글

- 댓글 작성 (최대 200자)
- 댓글 삭제 (본인 댓글만)
- 댓글 작성 시간 표시
- 사용자명 클릭 시 프로필 이동

**제외**: 답글, 댓글 좋아요, 댓글 신고, 댓글 고정

#### 2.5.3 공유

- 링크 복사 기능

**제외**: DM 공유, 스토리 공유, 외부 SNS 공유

### 2.6 팔로우 시스템

#### 2.6.1 팔로우/언팔로우

- 프로필 페이지에서 "팔로우" 버튼
- "팔로잉" 상태로 변경
- 언팔로우 (확인 없이 즉시 실행)

#### 2.6.2 팔로워/팔로잉 목록

- 팔로워 목록 보기
- 팔로잉 목록 보기
- 각 사용자별 팔로우 상태 표시
- 리스트에서 바로 팔로우/언팔로우

**제외**: 팔로우 요청/승인, 추천 사용자

### 2.7 검색

#### 2.7.1 사용자 검색

- 검색바에 사용자명 또는 실명 입력
- 검색 결과 리스트 (프로필 사진, 사용자명, 실명)
- 결과 클릭 시 프로필 이동

**제외**: 해시태그 검색, 위치 검색, 최근 검색 기록

### 2.8 알림

#### 2.8.1 알림 센터

- 좋아요 알림 (누가 내 게시물에 좋아요)
- 댓글 알림 (누가 내 게시물에 댓글)
- 팔로우 알림 (누가 나를 팔로우)
- 알림 시간 표시
- 알림 클릭 시 해당 게시물/프로필로 이동

**제외**: 푸시 알림, 알림 설정, 읽음/안읽음 구분

### 2.9 설정

#### 2.9.1 계정 설정

- 비밀번호 변경
- 이메일 변경
- 로그아웃
- 계정 삭제 (확인 다이얼로그)

**제외**: 개인정보 보호 설정, 알림 설정, 연동 계정

## 3. 화면 구성

### 3.1 필수 화면

1. **스플래시 화면**
2. **로그인 화면**
3. **회원가입 화면**
4. **홈 피드** (메인)
5. **검색 화면**
6. **게시물 작성 화면**
7. **알림 센터**
8. **프로필 페이지**
9. **프로필 편집 화면**
10. **게시물 상세 화면**
11. **팔로워/팔로잉 목록**
12. **설정 화면**

### 3.2 네비게이션

- 하단 탭 바 (5개):
  - 홈 (피드)
  - 검색
  - 추가 (게시물 작성)
  - 알림
  - 프로필

## 4. 기술 스택 (MVP 최적화 - 2025년 최신)

### 4.1 프론트엔드 (최신 트렌드 반영)

- **프레임워크**: Next.js 15+ (App Router, Turbopack 안정화)
  - React 19 지원 (React Compiler 자동 메모이제이션)
  - Partial Prerendering (PPR) 지원
  - 향상된 Server Actions
- **언어**: TypeScript 5+
- **스타일링**: Tailwind CSS 4.0 (또는 CSS Variables + PostCSS)
- **상태 관리**: Zustand (7.4kb, 의존성 제로)
- **폼 관리**: React Hook Form
- **HTTP 클라이언트**: Fetch API (네이티브) 또는 ky (경량)
- **이미지 처리**: react-image-crop
- **배포**: Vercel (Next.js 최적화)

**2025 프론트엔드 트렌드 적용:**

- PWA 지원 (오프라인 기능)
- Web Vitals 최적화 (LCP, INP, CLS)
- Micro-animations (Framer Motion)

### 4.2 백엔드 (성능 최적화)

옵션 A: 최고 성능 우선 (권장)

- **런타임**: Bun 1.3+ (Node.js 대비 5-8x 빠른 시작)
- **프레임워크**: Hono 또는 Elysia
  - Hono: 가벼움 (~14kb), 범용성, Edge 지원
  - Elysia: 최고 성능, Bun 최적화, 타입 안전성
- **언어**: TypeScript 5+
- **인증**: JWT + Argon2 (bcrypt보다 안전하고 빠름)
- **검증**: Zod 또는 TypeBox
- **ORM**: Drizzle ORM (Prisma 대비 경량, SQL 제어력 우수)
  - 7.4kb, 의존성 제로
  - 서버리스 친화적
  - TypeScript 네이티브 타입 추론
- **배포**: Fly.io, Railway, AWS Lambda

옵션 B: 안정성 우선

- **런타임**: Node.js 22 LTS
- **프레임워크**: Fastify 5
- **ORM**: Prisma 6 또는 Drizzle ORM
- **배포**: AWS Elastic Beanstalk, Railway

**공통 백엔드 도구:**

- **이메일**: Resend (현대적) 또는 Nodemailer
- **실시간**: Socket.io 또는 Hono WebSocket

### 4.3 데이터베이스 (현대적 선택)

- **메인 DB**:
  - PostgreSQL 16+ (Neon, Supabase - 서버리스)
  - Turso (SQLite 기반, Edge에 최적화)
- **캐시**:
  - Upstash Redis (서버리스, 사용량 기반 요금)
  - Cloudflare KV (글로벌 엣지 캐시)

### 4.4 스토리지 & CDN

- **이미지 저장**:
  - Cloudflare R2 (S3 호환, egress 무료)
  - AWS S3 (전통적 선택)
- **CDN**:
  - Cloudflare (무료 티어 강력)
  - BunnyCDN (가성비)
- **이미지 최적화**:
  - Cloudflare Images
  - Sharp (자체 구현)

### 4.5 인프라 & DevOps

- **컨테이너화**: Docker (프로덕션 배포용)
- **CI/CD**: GitHub Actions (무료 티어)
- **모니터링**:
  - Sentry (에러 트래킹)
  - BetterStack (통합 모니터링)
  - Axiom (로그 관리)

### 4.6 개발 도구 (2025 최신)

- **패키지 매니저**: pnpm (빠르고 디스크 효율적)
- **린터/포매터**:
  - Biome (Rust 기반, ESLint + Prettier 대체)
  - 또는 ESLint 9 + Prettier
- **API 개발**:
  - Bruno (오픈소스 Postman 대체)
  - Hoppscotch
- **타입 안전 API**: tRPC 또는 Hono RPC
- **디자인**: Figma
- **버전 관리**: Git + GitHub

### 4.7 2025년 추가 고려사항

**AI 통합 (선택사항):**

- **콘텐츠 모더레이션**: OpenAI Moderation API
- **이미지 분석**: Google Cloud Vision API
- **추천 시스템**: 간단한 협업 필터링 (자체 구현)

**보안 강화:**

- **Rate Limiting**: Upstash Rate Limit
- **DDoS 방어**: Cloudflare
- **환경 변수**: Doppler 또는 dotenv-vault

**성능 최적화:**

- **Edge Computing**: Cloudflare Workers (정적 자산)
- **데이터베이스 커넥션**: PgBouncer (PostgreSQL)
- **캐싱 전략**: Stale-While-Revalidate

### 4.8 권장 기술 스택 조합 (MVP)

```markdown
프론트엔드: Next.js 15 + TypeScript + Tailwind CSS + Zustand
백엔드: Bun + Hono + Drizzle ORM + Zod
데이터베이스: Neon PostgreSQL + Upstash Redis
스토리지: Cloudflare R2 + Cloudflare CDN
배포: Vercel (프론트) + Fly.io (백엔드)
모니터링: Sentry + BetterStack
```

**이 조합의 장점:**

- ✅ 최신 기술로 미래 지향적
- ✅ 뛰어난 성능 (Bun + Hono)
- ✅ 개발자 경험 우수
- ✅ 서버리스 친화적 (확장 용이)
- ✅ 비용 효율적 (무료/저가 티어 활용)

## 5. 데이터 모델 (간소화)

### 5.1 User (사용자)

```typescript
{
  id: string (UUID)
  username: string (unique, indexed)
  email: string (unique, indexed)
  password: string (hashed with Argon2)
  fullName: string
  bio: string (nullable)
  profileImage: string (nullable, CDN URL)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 5.2 Post (게시물)

```typescript
{
  id: string (UUID)
  userId: string (FK, indexed)
  imageUrl: string (CDN URL)
  caption: string (nullable, max 500 chars)
  likesCount: number (default: 0, denormalized)
  commentsCount: number (default: 0, denormalized)
  createdAt: DateTime (indexed for feed sorting)
  updatedAt: DateTime
}
```

### 5.3 Comment (댓글)

```typescript
{
  id: string (UUID)
  postId: string (FK, indexed)
  userId: string (FK, indexed)
  content: string (max 200 chars)
  createdAt: DateTime
}
```

### 5.4 Like (좋아요)

```typescript
{
  id: string (UUID)
  postId: string (FK, indexed)
  userId: string (FK, indexed)
  createdAt: DateTime
  unique: [postId, userId] (복합 인덱스)
}
```

### 5.5 Follow (팔로우)

```typescript
{
  id: string (UUID)
  followerId: string (FK - 팔로우하는 사람, indexed)
  followingId: string (FK - 팔로우받는 사람, indexed)
  createdAt: DateTime
  unique: [followerId, followingId] (복합 인덱스)
}
```

### 5.6 Notification (알림)

```typescript
{
  id: string (UUID)
  userId: string (FK - 알림 받는 사람, indexed)
  actorId: string (FK - 행동한 사람)
  type: enum ['LIKE', 'COMMENT', 'FOLLOW']
  postId: string (nullable, FK)
  createdAt: DateTime (indexed)
}
```

### 5.7 Drizzle ORM 스키마 예제

```typescript
// schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 50 }).notNull(),
  bio: varchar("bio", { length: 150 }),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  likesCount: integer("likes_count").default(0).notNull(),
  commentsCount: integer("comments_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueLike: unique().on(table.postId, table.userId),
  })
);
```

## 6. API 엔드포인트 (핵심만)

### 6.1 인증

```markdown
POST /api/auth/register # 회원가입
POST /api/auth/login # 로그인
POST /api/auth/logout # 로그아웃
POST /api/auth/forgot-password # 비밀번호 찾기
POST /api/auth/reset-password # 비밀번호 재설정
```

### 6.2 사용자

```markdown
GET /api/users/:username # 프로필 조회
PUT /api/users/me # 프로필 수정
DELETE /api/users/me # 계정 삭제
GET /api/users/:id/followers # 팔로워 목록
GET /api/users/:id/following # 팔로잉 목록
GET /api/users/search?q= # 사용자 검색
```

### 6.3 게시물

```markdown
GET /api/posts # 피드 조회
POST /api/posts # 게시물 작성
GET /api/posts/:id # 게시물 상세
DELETE /api/posts/:id # 게시물 삭제
GET /api/users/:id/posts # 특정 사용자 게시물
```

### 6.4 좋아요

```markdown
POST /api/posts/:id/like # 좋아요
DELETE /api/posts/:id/like # 좋아요 취소
GET /api/posts/:id/likes # 좋아요한 사용자 목록
```

### 6.5 댓글

```markdown
GET /api/posts/:id/comments # 댓글 목록
POST /api/posts/:id/comments # 댓글 작성
DELETE /api/comments/:id # 댓글 삭제
```

### 6.6 팔로우

```markdown
POST /api/users/:id/follow # 팔로우
DELETE /api/users/:id/follow # 언팔로우
```

### 6.7 알림

```markdown
GET /api/notifications # 알림 목록
```

### 6.8 업로드

```markdown
POST /api/upload/image # 이미지 업로드 (S3 presigned URL 또는 직접 업로드)
```

## 7. 비기능 요구사항 (MVP)

### 7.1 성능

- 페이지 로딩: 3초 이내
- 이미지 업로드: 30초 이내
- 동시 사용자: 1,000명 지원

### 7.2 보안

- HTTPS 필수
- JWT 토큰 만료: 7일
- 비밀번호 bcrypt 암호화 (salt rounds: 10)
- Rate limiting: IP당 시간당 100 요청

### 7.3 호환성

- 웹: Chrome, Safari, Firefox 최신 버전
- 모바일: 반응형 웹 (추후 네이티브 앱 고려)

### 7.4 데이터

- 이미지 자동 리사이징: 1080px
- 썸네일 생성: 320px
- 이미지 압축: 80% 품질

## 8. 개발 우선순위

### 8.1 Phase 1 (4주) - 기본 인프라

- [ ] 프로젝트 셋업
- [ ] DB 스키마 설계 및 마이그레이션
- [ ] 인증 시스템 (회원가입, 로그인)
- [ ] S3 이미지 업로드 구현
- [ ] 기본 UI 컴포넌트

### 8.2 Phase 2 (4주) - 핵심 기능

- [ ] 게시물 작성/조회
- [ ] 프로필 페이지
- [ ] 홈 피드
- [ ] 좋아요 기능
- [ ] 댓글 기능

### 8.3 Phase 3 (4주) - 소셜 기능

- [ ] 팔로우 시스템
- [ ] 알림 시스템
- [ ] 검색 기능
- [ ] 프로필 편집
- [ ] 버그 수정 및 최적화

## 9. 테스트 전략 (MVP)

### 9.1 필수 테스트

- 회원가입/로그인 플로우
- 게시물 작성 및 삭제
- 좋아요/댓글 기능
- 팔로우/언팔로우
- 이미지 업로드

### 9.2 테스트 도구

- **수동 테스트**: 주요 기능
- **E2E 테스트**: Playwright (핵심 플로우만)
- **API 테스트**: Postman

**제외**: 단위 테스트, 성능 테스트 (MVP 이후)

## 10. 출시 기준

### 10.1 필수 완료 항목

- [ ] 모든 핵심 기능 동작
- [ ] 주요 버그 0개
- [ ] 반응형 웹 완성
- [ ] HTTPS 적용
- [ ] 에러 로깅 설정

### 10.2 성공 지표 (3개월)

- 가입 사용자: 500명
- DAU: 50명
- 일일 게시물: 100개
- 사용자당 평균 팔로워: 10명

## 11. MVP 이후 로드맵

### 11.1 Phase 4 - 개선 (3-6개월)

- 스토리 기능
- DM 기능
- 고급 검색 (해시태그)
- 게시물 통계
- 푸시 알림

### 11.2 Phase 5 - 확장 (6-12개월)

- 네이티브 모바일 앱
- 동영상 지원
- 라이브 스트리밍
- 광고 플랫폼

## 12. 리스크 및 대응

### 12.1 기술적 리스크

- **리스크**: S3 비용 증가
- **대응**: 이미지 압축 최적화, CDN 캐싱

### 12.2 비즈니스 리스크

- **리스크**: 사용자 유입 부족
- **대응**: 베타 테스터 모집, 초기 마케팅

### 12.3 일정 리스크

- **리스크**: 개발 지연
- **대응**: 주간 스프린트, 기능 우선순위 조정

## 13. 팀 구성 (권장)

- **풀스택 개발자**: 2명
- **UI/UX 디자이너**: 1명 (파트타임)
- **프로젝트 매니저**: 겸임 가능

**최소**: 풀스택 개발자 1명으로도 가능
