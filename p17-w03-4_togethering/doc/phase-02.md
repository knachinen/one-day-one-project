## 🛠️ '스몰팀' 구현 계획서: 2단계 상세 명세 (데이터베이스 및 API 설계)

**목표:** 서비스의 핵심 데이터 모델(스키마)을 정의하고, 사용자 인증 및 그룹 관리를 위한 백엔드 API 엔드포인트를 **Bun 런타임** 환경에서 구현합니다. 이 단계는 프론트엔드 UI를 구현하기 위한 기능적 토대를 마련합니다.

---

### 2단계: 데이터베이스 및 API 설계 (Data & API Layer)

#### 2.1. 데이터베이스 스키마 정의 및 마이그레이션

| 항목 | 기술 스택 | 버전 | 상세 내용 (핵심 모델 정의) |
| :--- | :--- | :--- | :--- |
| **ORM** | Prisma | v6.19.0 | **모델 정의:** 협업 기능에 필요한 6가지 핵심 엔티티와 그 관계를 `schema.prisma`에 명확히 정의합니다. |
| **DB** | SQLite | v3.51.1 | **마이그레이션:** 로컬에서 `bun prisma migrate dev --name init` 명령을 실행하여 **`dev.db`** 파일에 스키마를 반영하고, 마이그레이션 기록을 남깁니다. |
| **보안** | 비밀번호 해싱 | bcrypt.js (예정) | `User` 모델에 `password_hash` 필드를 정의하고, 비밀번호는 반드시 해시되어 저장되도록 로직을 준비합니다. |

| 핵심 엔티티 (모델) | 주요 필드 및 역할 |
| :--- | :--- |
| **User** | `id`, `email` (Unique), `password_hash`, `name`, `profileUrl` | 서비스 사용자 정보 |
| **Group** | `id`, `name`, `type` (Enum), `createdAt`, `updatedAt` | 협업의 기본 단위 (커플, 스터디 등) |
| **GroupMember** | `id`, `userId`, `groupId`, `role` (Admin/Member) | User와 Group을 연결하는 N:M 관계 테이블 |
| **Project** | `id`, `groupId`, `title`, `description`, `dueDate`, `status` (Enum) | 그룹 내의 프로젝트 관리 |
| **Task** | `id`, `projectId`, `title`, `dueDate`, `status` (Enum), `assignedToId` | 프로젝트 내의 개별 할 일 (칸반 보드 요소) |
| **CalendarEvent** | `id`, `groupId`, `title`, `start`, `end`, `type` | 그룹 공유 일정 관리 |

> 🔑 **주요 산출물:** 완성된 **`schema.prisma`** 파일, 초기 DB 테이블이 적용된 **`dev.db`** 파일.

#### 2.2. 인증 및 그룹 관리 API 구현

| 항목 | 기술 스택 | 버전 | 상세 내용 (API 엔드포인트 구현) |
| :--- | :--- | :--- | :--- |
| **백엔드** | Next.js API Routes (Bun) | v16.0.8, v1.3.4 | API Routes 디렉토리(`/pages/api` 또는 `/app/api`)에 Prisma 및 로직을 활용한 엔드포인트를 구현합니다. |
| **인증** | JWT 표준 | jsonwebtoken (예정) | 사용자 인증 성공 시 JWT를 생성하고, API 요청마다 JWT를 검증하는 미들웨어 로직을 구현합니다. |
| **세션/캐시** | Redis (로컬 구동) | ioredis (예정) | JWT의 블랙리스트 관리 또는 Rate Limiting 등 Redis를 활용할 기반을 마련합니다. |

| 기능 | HTTP 메서드 | 엔드포인트 (Next.js API Route) | 설명 (요구사항 ID) |
| :--- | :--- | :--- | :--- |
| **회원가입** | POST | `/api/auth/register` | 사용자 생성 및 비밀번호 해싱 (FR-U.1) |
| **로그인** | POST | `/api/auth/login` | 인증 후 JWT 발급 및 **HttpOnly 쿠키 저장** (FR-U.1) |
| **그룹 생성** | POST | `/api/groups` | 그룹 생성 및 그룹 생성자를 자동으로 `Admin`으로 설정 (FR-G.1) |
| **그룹 조회** | GET | `/api/groups` | 현재 로그인된 사용자가 속한 모든 그룹 목록 반환 |
| **멤버 초대** | POST | `/api/groups/[groupId]/members` | 이메일 기반 그룹 멤버 초대 로직 구현 (FR-G.1) |
| **멤버 탈퇴** | DELETE | `/api/groups/[groupId]/members` | 그룹 멤버 탈퇴 처리 (FR-G.2) |

> 🔑 **주요 산출물:** 인증 및 그룹 관리를 처리하는 **API Route 파일들**, **JWT 발급 및 검증 미들웨어** 모듈.

---

### 3. 2단계 구현에 따른 UI/UX 명세

이 단계는 서비스의 백엔드 로직에 집중하므로, 프론트엔드 사용자 인터페이스 구현은 최소화됩니다.

| 구현 항목 | 상세 내용 | 비고 |
| :--- | :--- | :--- |
| **화면** | N/A | 화면 컴포넌트 개발은 3단계부터 시작됩니다. |
| **API 테스트** | Postman 또는 Thunder Client | 개발된 API 엔드포인트의 동작을 검증하기 위한 테스트 스위트 작성. (인증, 그룹 생성 등) |
| **데이터 흐름 검증** | Prisma Studio | `bun prisma studio`를 실행하여 DB에 데이터(User, Group)가 정상적으로 저장되는지 육안으로 확인. |
| **보안 준비** | HttpOnly 쿠키 | JWT를 사용자에게 반환하지 않고, 보안을 위해 `HttpOnly` 옵션으로 쿠키에 저장되도록 설정. |

---

다음 실행 단계는 **3단계: 핵심 UI 및 프로젝트 기능 구현**입니다. 2단계에서 만든 API를 이용하여 사용자가 실제로 보게 될 **로그인/회원가입 화면** 및 **칸반 보드**의 UI/UX를 구축하게 됩니다.
