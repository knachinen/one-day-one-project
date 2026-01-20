아래는 **Next.js + Supabase 로그인 CRUD 프로젝트**를 기준으로 한
👉 **단계별 상세 구현 계획서**입니다.

핵심 원칙은 **각 단계가 “완성된 하나의 실행 단위”**가 되도록 설계하는 것입니다.
(중간 단계에서도 `npm run dev` → 정상 동작)

---

# 📘 Next.js + Supabase 로그인 CRUD

## 단계별 상세 구현 계획서

---

## 🟢 STEP 0. 프로젝트 초기화 (베이스라인)

### 🎯 목표

* 프로젝트 실행 가능 상태 확보
* Supabase 연동 준비

### 📦 작업 내용

* Next.js App Router 프로젝트 생성
* Supabase SDK 설치
* 환경변수 설정
* Supabase 클라이언트 생성

### 🗂 산출물

```
src/
 ├─ app/
 │   └─ page.tsx
 ├─ lib/
 │   └─ supabase.ts
 └─ .env.local
```

### 🔧 구현

* `createClient`로 Supabase 연결
* 홈 페이지에서 “서버 정상 작동” 확인

### ✅ 완료 기준

* `npm run dev` 성공
* Supabase 클라이언트 import 에러 없음

---

## 🟢 STEP 1. Supabase Auth (회원가입 / 로그인)

### 🎯 목표

* 이메일/비밀번호 로그인 구현
* 인증 세션 생성 확인

### 📦 작업 내용

* `/login` 페이지 생성
* 회원가입 / 로그인 UI
* Supabase Auth API 연동

### 🗂 산출물

```
app/login/page.tsx
```

### 🔧 구현 포인트

* `signUp`, `signInWithPassword`
* 로그인 성공 시 페이지 이동

### ✅ 완료 기준

* Supabase Auth → Users 테이블에 사용자 생성
* 로그인 후 세션 유지 확인

### 🔍 테스트

* 회원가입 → 이메일 확인
* 새로고침 후 로그인 유지

---

## 🟢 STEP 2. 게시글 CRUD (Auth 미적용)

### 🎯 목표

* CRUD 전체 흐름 완성
* Supabase DB 연동 검증

### 📦 작업 내용

* `posts` 테이블 생성
* `/posts` 페이지 생성
* Create / Read / Delete 구현

### 🗂 산출물

```
app/posts/page.tsx
```

### 🔧 구현 포인트

* RLS ❌ (임시 비활성)
* 누구나 CRUD 가능

### ✅ 완료 기준

* 게시글 작성 / 조회 / 삭제 정상 동작
* DB에 데이터 저장 확인

### 💡 이유

> Auth + CRUD를 분리해 디버깅 단순화

---

## 🟢 STEP 3. Auth + CRUD 결합

### 🎯 목표

* 로그인한 사용자만 CRUD 가능
* 사용자별 데이터 분리

### 📦 작업 내용

* `posts.user_id` 추가
* CRUD 시 로그인 유저 ID 저장
* 본인 글만 조회

### 🗂 산출물

* Supabase SQL (user_id)
* CRUD 로직 수정

### 🔧 구현 포인트

* `supabase.auth.getUser()`
* 클라이언트에서 user_id 전달

### ✅ 완료 기준

* 사용자 A 글 → 사용자 B 조회 불가
* 로그인 안 하면 글 작성 실패

---

## 🟢 STEP 4. RLS 적용 (보안 완성)

### 🎯 목표

* 클라이언트 조작 방어
* DB 레벨 보안 적용

### 📦 작업 내용

* RLS 활성화
* SELECT / INSERT / UPDATE / DELETE 정책 추가

### 🗂 산출물

* Supabase Policy SQL

### 🔧 구현 포인트

* `auth.uid() = user_id`

### ✅ 완료 기준

* 콘솔에서 쿼리 조작 시 접근 차단
* Supabase 로그에 정책 적용 확인

---

## 🟢 STEP 5. Middleware 인증 보호

### 🎯 목표

* 비로그인 접근 차단
* 페이지별 인증 코드 제거

### 📦 작업 내용

* `middleware.ts` 생성
* `/posts` 보호
* 로그인 페이지 리다이렉트

### 🗂 산출물

```
src/middleware.ts
```

### 🔧 구현 포인트

* `@supabase/ssr`
* 쿠키 기반 세션 판별

### ✅ 완료 기준

* 비로그인 → `/posts` 접근 시 `/login` 이동
* 로그인 상태 → `/login` 접근 시 `/posts` 이동

---

## 🟢 STEP 6. UX 안정화 (실무 수준)

### 🎯 목표

* 새로고침 / 세션 유지 안정화
* 로그아웃 플로우 정리

### 📦 작업 내용

* `window.location.href` 적용
* 공통 Layout 구성
* 로그아웃 버튼 컴포넌트화

### 🗂 산출물

```
components/LogoutButton.tsx
app/layout.tsx
```

### ✅ 완료 기준

* 새로고침 시 로그인 유지
* 로그아웃 후 접근 차단

---

## 🟢 STEP 7. 리팩토링 & 확장 준비

### 🎯 목표

* 포트폴리오 제출 가능 상태
* 기능 확장 기반 마련

### 📦 작업 내용

* Supabase 로직 분리
* 타입 정의
* 에러 처리 통합

### 🗂 산출물

```
types/post.ts
lib/posts.ts
```

### ✅ 완료 기준

* 코드 가독성 확보
* 기능 추가가 쉬운 구조

---

## 📌 전체 단계 요약표

| 단계     | 실행 가능 | 핵심 목표   |
| ------ | ----- | ------- |
| STEP 0 | ✅     | 프로젝트 부팅 |
| STEP 1 | ✅     | 로그인     |
| STEP 2 | ✅     | CRUD    |
| STEP 3 | ✅     | Auth 결합 |
| STEP 4 | ✅     | 보안      |
| STEP 5 | ✅     | 접근 제어   |
| STEP 6 | ✅     | UX      |
| STEP 7 | ✅     | 확장성     |

---

## 🎯 이 계획서의 강점

* ✔ 각 단계 독립 실행 가능
* ✔ 디버깅 포인트 명확
* ✔ 과제 / 실무 / 포트폴리오 공용
* ✔ 보안 → UX → 구조 순서

---

원하시면 다음으로 👇

* **각 STEP별 실제 코드 패키지**
* **과제 제출용 문서 버전**
* **ERD + 아키텍처 다이어그램**
* **팀 프로젝트용 일정표**

중에서 어떤 걸 원하시나요?
