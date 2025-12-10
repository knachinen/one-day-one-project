# MVP 기획 템플릿 구현 계획서 (Phase 1-3)

## 1. 개요 및 목표

본 문서는 '1인 기업가용 MVP 기획 템플릿 웹서비스'의 MVP(Minimum Viable Product) 구현을 위한 상세한 기술 로드맵을 제공합니다.

- **기반 문서**: `claude_local_only.md` (100% 로컬 환경 명세)
    
- **주요 목표**: 12주 내에 핵심 기능(5단계 기획 템플릿, 자동 문서화, 인증)을 완성하고 로컬 환경 패키징을 준비합니다.
    
- **핵심 원칙**: Bun, Next.js, Drizzle ORM을 활용하여 고성능, 타입 안전성, 개발 속도 최적화.
    

## 2. 기술 스택 및 환경 설정

### 2.1 핵심 기술 스택

|   |   |   |   |
|---|---|---|---|
|**역할**|**기술 스택**|**버전**|**사용 이유**|
|**프론트엔드**|Next.js|16.0.8|React 19 호환, App Router 기반의 빠른 개발 환경 제공|
||React|19.2.1|최신 상태 관리 및 컴포넌트 아키텍처|
||Tailwind CSS, shadcn/ui|3.4+|일관성 있는 디자인 및 빠른 UI 구축|
|**런타임**|Bun|1.3.4|Node.js 대비 빠른 실행 속도 및 내장 기능 활용 (SQLite)|
|**백엔드/API**|Hono|4.7+|경량 API 레이어, Edge-Optimized 아키텍처|
|**데이터베이스**|PostgreSQL|17+|안정성 및 고급 기능 (FTS) 제공. (로컬 Docker 필수)|
|**ORM**|Drizzle ORM|0.45.0|타입 안전성을 극대화하는 경량 ORM|
|**인증**|Lucia Auth|3+|모던 세션 및 인증 관리|
|**문서화**|react-markdown, Mermaid.js|최신|마크다운 렌더링 및 다이어그램 자동 생성|

### 2.2 개발 환경 설정 (Dev Setup)

1. **필수 도구 설치**: Bun, Docker Desktop, Git.
    
2. **DB 컨테이너 실행**:
    
    ```
    docker run -d \
      --name postgres \
      -e POSTGRES_PASSWORD=password \
      -e POSTGRES_DB=mvp_planning_tool \
      -p 5432:5432 \
      postgres:17-alpine
    ```
    
3. **프로젝트 초기화**: Next.js 프로젝트 생성 후 필수 의존성 설치 (`bun install ...`).
    
4. **Drizzle 설정**: `drizzle.config.ts` 파일 생성 및 DB 연결 설정.
    
5. **Biome 설정**: 코드 포맷팅 및 린팅 규칙 정의.
    

## 3. 상세 데이터 모델 설계 (Drizzle Schema)

`claude_local_only.md`의 데이터 모델을 기반으로 Drizzle ORM 스키마를 정의합니다.

### 3.1 User Table

|   |   |   |   |
|---|---|---|---|
|**필드**|**타입**|**제약조건**|**설명**|
|`id`|`text`|Primary Key, `lucia-auth` 호환|사용자 고유 ID|
|`email`|`text`|Unique|사용자 이메일 (인증용)|
|`name`|`text`|Nullable|사용자 이름|
|`createdAt`|`timestamp`|Default `now()`|생성 일시|

### 3.2 Project Table

|   |   |   |   |
|---|---|---|---|
|**필드**|**타입**|**제약조건**|**설명**|
|`id`|`text`|Primary Key|프로젝트 고유 ID (UUID)|
|`userId`|`text`|Foreign Key (`User.id`)|소유 사용자 ID|
|`title`|`text`|Not Null|프로젝트 제목|
|`industry`|`text`|Not Null|산업 분류 (e.g., 'SaaS', 'Ecommerce')|
|`status`|`text`|Default 'Draft'|상태 (Draft, InProgress, Completed)|
|`currentStage`|`integer`|Default 1|현재 진행 단계 (1~5)|
|`completionRate`|`integer`|Default 0|완료율 (%)|
|`createdAt`|`timestamp`|Default `now()`|생성 일시|
|`updatedAt`|`timestamp`|Update `now()`|최종 수정 일시|

### 3.3 StageResponse Table (핵심 기획 데이터)

|   |   |   |   |
|---|---|---|---|
|**필드**|**타입**|**제약조건**|**설명**|
|`id`|`text`|Primary Key|응답 고유 ID (UUID)|
|`projectId`|`text`|Foreign Key (`Project.id`)|연결된 프로젝트 ID|
|`stageNumber`|`integer`|Not Null|단계 번호 (1~5)|
|`questionId`|`text`|Not Null|템플릿 내 질문 ID (예: '4.1.2_A1')|
|`answer`|`text`|Not Null|사용자 답변 (긴 텍스트)|
|`createdAt`|`timestamp`|Default `now()`|생성 일시|

## 4. MVP 개발 마일스톤 및 일정 (12주)

### Phase 1: 핵심 인프라 및 기본 UI (Week 1-4)

|   |   |   |   |
|---|---|---|---|
|**주차**|**목표 (Deliverables)**|**상세 작업 내용**|**담당**|
|**1주차**|프로젝트 셋업 및 DB 마이그레이션|Bun/Next.js/Drizzle 초기 설정. PostgreSQL 컨테이너 실행. **User, Project 테이블 스키마 정의 및 마이그레이션**. Biome 설정.|Backend/Infra|
|**2주차**|인증 시스템 구축|Lucia Auth 설정. `/api/auth/register`, `/api/auth/login`, `/api/auth/me` 엔드포인트 구현 및 테스트. 로그인/회원가입 UI (shadcn/ui 활용).|Backend/Auth|
|**3주차**|대시보드 및 프로젝트 CRUD|Project 테이블 CRUD API 구현. 대시보드 UI (프로젝트 카드 그리드) 구현. '새 프로젝트 시작' 모달 구현.|Full Stack|
|**4주차**|Stage 1 작성 화면 뼈대|`StageResponse` 테이블 스키마 정의. **Stage 1 (문제 발견) 질문 폼 UI** 구현. 답변 저장 API (`POST /api/projects/:id/stages/1`) 구현.|Frontend/UI|

### Phase 2: 핵심 기능 완성 (Week 5-8)

|   |   |   |   |
|---|---|---|---|
|**주차**|**목표 (Deliverables)**|**상세 작업 내용**|**담당**|
|**5주차**|Stage 2 & 3 기능 구현|**Stage 2 (솔루션 정의) 및 Stage 3 (MVP 범위 설정) 질문 폼 및 저장 기능 완성**. 가이드 & 힌트 컴포넌트 개발.|Frontend/Logic|
|**6주차**|Stage 4 & 5 기능 구현|**Stage 4 (검증 계획) 및 Stage 5 (실행 로드맵) 질문 폼 및 저장 기능 완성**. 단계별 완료율 계산 로직 구현.|Frontend/Logic|
|**7주차**|다이어그램 및 파일 업로드|**Mermaid.js 연동** (User Flow, Gantt Chart 자동 생성). 로컬 파일 시스템 업로드 API 및 `Sharp` 연동 (Stage 4 검증 자료 등).|Backend/Infra|
|**8주차**|실시간 미리보기 및 UX 개선|작성 내용을 기반으로 PRD 실시간 미리보기 UI 구현. **프로그레스 바 및 틀린 답 피드백(검증) 로직** 구현.|Frontend/UX|

### Phase 3: 결과물 및 안정화 (Week 9-12)

|   |   |   |   |
|---|---|---|---|
|**주차**|**목표 (Deliverables)**|**상세 작업 내용**|**담당**|
|**9주차**|자동 문서 생성 (PRD, Canvas)|5단계 응답 데이터를 취합하여 **PRD, Lean Canvas 마크다운 자동 생성 로직** 구현. `GeneratedDocument` 테이블 저장.|Backend/Logic|
|**10주차**|내보내기 기능|**PDF 내보내기 기능 구현** (`react-pdf` 또는 서버 측 렌더링). Markdown 및 Notion 템플릿 내보내기 기능.|Full Stack|
|**11주차**|QA 및 보안/성능 최적화|E2E 테스트 (Playwright) 작성 및 실행. React 19 CVE 패치 최종 확인 및 성능 프로파일링. 버그 수정.|QA/Security|
|**12주차**|최종 패키징 및 런칭 준비|**로컬 환경 패키징 검토** (Next.js Standalone 빌드). 최종 문서화 (Readme, 사용 가이드). MVP 베타 런칭 준비.|Infra/Launch|

## 5. 핵심 기술 구현 상세

### 5.1 데이터 검증 (Input Validation)

모든 API 입력은 **Zod**를 사용하여 서버 및 클라이언트 측에서 철저히 검증됩니다.

- `StageResponse` 저장 시, 각 `questionId`에 맞는 길이/타입/형식 검증 스키마를 적용.
    
- 예: `z.string().min(50).max(500)` (문제 정의 필드)
    

### 5.2 Mermaid.js 자동 생성

Stage 3 (User Flow) 및 Stage 5 (Gantt Chart) 질문의 답변 구조를 파싱하여, 백엔드에서 Mermaid 코드를 생성한 후 프론트엔드에서 렌더링합니다.

- **User Flow**: **Stage 3.2**의 Step-by-step 응답을 `graph TD` 구문으로 변환.
    
- **Gantt Chart**: **Stage 5.2**의 마일스톤 및 기간 응답을 `gantt` 구문으로 변환.
    

### 5.3 로컬 환경 보안

- **비밀번호**: **Argon2id**를 사용하여 안전하게 해싱 및 저장.
    
- **세션 관리**: `http-only` 쿠키를 사용하는 **Lucia Auth**로 세션 하이재킹 방지.
    
- **Next.js 보안**: 최신 버전으로 유지하고, CVE-2025-66478 등 알려진 취약점에 대한 패치를 주기적으로 확인하고 적용합니다.

