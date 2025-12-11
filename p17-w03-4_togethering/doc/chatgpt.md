아래는 **“소규모 그룹 프로젝트 및 일정 관리 서비스”**를 기반으로 한 **기획서 1차 버전**입니다. MVP 관점에서 핵심 가치가 명확히 드러나도록 구성했습니다.  
필요하면 여기서 **MVP 범위 확정 / 기능 우선순위 / UX 플로우 / 기술 스택**까지 확장해드릴게요.

---

# 📌 1. 서비스 개요

## ● 서비스명(가칭)

**TogetherPlan** — 커플·친구·가족 등 소규모 그룹(2~4명)을 위한 프로젝트·일정 공동 관리 서비스

## ● 대상 사용자

- 커플
- 친구 2~4명으로 구성된 소규모 스터디/사이드 프로젝트 그룹
- 공동 목표를 가진 가족 구성원
- 강한 조직 구조 없이 “느슨하게 협력하는 소규모 단위”

## ● 핵심 문제 정의

소규모 그룹은 Trello, Notion, Google Calendar 등 “대규모·팀 중심 협업 도구”를 쓰기에 과하고,  
카톡/메신저로만 협업하기에는 **일정 공유·작업 분담·리마인드**가 누락되기 쉽다.

즉, **“간단하지만 서로 꼭 알아야 할 일정/작업을 놓치지 않도록 하는 도구”** 가 부재.

---

# 📌 2. 서비스 목표 (MVP)

MVP는 복잡한 워크플로우보다 **‘간단함’과 ‘명확한 공유’** 에 초점.

1. 그룹별 일정·작업을 한 곳에서 확인
2. 상대가 언제 한가한지/바쁜지 쉽게 이해
3. 해야 할 일을 잊지 않도록 리마인드
4. 인터페이스는 카톡만큼 단순, 캘린더만큼 직관적으로

---

# 📌 3. 주요 기능 정의

## 3.1 그룹 생성 & 멤버 초대

- 그룹은 2~4명 제한
- 초대 링크 / QR 공유
- 프로필(이름, 색상) 간단 설정

---

## 3.2 프로젝트 / 작업(Task) 관리

### ● 기능

- 프로젝트 생성
- 작업 등록
    - 담당자
    - 마감일
    - 체크리스트
- 진행 상태
    - To-Do / Doing / Done
- 푸시 알림
    - 마감 하루 전
    - 담당자 변경 등 주요 이벤트 발생 시

### ● 특징

- Trello처럼 복잡한 칸반 아님 → **작업 카드 형식의 간단한 리스트**

---

## 3.3 일정(Calendar) 관리

- 공유 캘린더
- 반복 일정 설정
- 멤버별 바쁜 시간/가능 시간 표시
- 일정 세부 정보
    - 시간, 장소
    - 참여 멤버 지정
- 알림 설정
- Google Calendar 연동(차후, MVP 제외 가능)

### ● 특징

- 멤버 2~4명 기준으로 “겹치는 가능 시간 추천 기능”이 잘 먹힘  
    → 예: “이번 주 4명 모두 가능한 시간대는 금요일 7~9시”

---

## 3.4 이벤트(Event) 관리

프로젝트와는 별개로 “가볍게 계획하는 일정”

- 데이트(커플), 점심 약속, 소풍, 영화 보기 등
- 투표 기능 (시간/장소 후보 투표)
- 알림 기능
- 공동 메모

---

## 3.5 그룹 피드(활동 기록)

- 일정 생성, 작업 완료 등 이력을 타임라인 형태로
- 댓글 기능 (간단한 커뮤니케이션 가능)

---

## 3.6 알림

- 일정 시작 10/30/60분 전
- 마감일 하루 전
- 멤버가 작업을 자신에게 assign했을 때
- 투표 마감 임박 알림

---

# 📌 4. 사용자 시나리오(UX 플로우)

## 시나리오 A: 커플이 일정 정리

1. A가 그룹 생성
2. B에게 링크 공유 → 합류
3. 두 사람이 데이트 일정 생성
4. 추천 가능 시간대 제시
5. 알림으로 일정 시작 전에 둘 다 안내

---

## 시나리오 B: 3명이 사이드 프로젝트 진행

1. 프로젝트 생성
2. 작업 분배
3. 캘린더에서 마감일 자동 표시
4. 작업 완료 시 활동 피드로 공유
5. “이번 주 3명이 다 가능한 시간대” 자동 추천

---

# 📌 5. 경쟁 제품 비교 & 차별점

|구분|일반 캘린더(Google 등)|Notion/Trello|TogetherPlan|
|---|---|---|---|
|타깃|개인/대규모 팀|팀/조직|**2~4명 소규모**|
|사용 난이도|낮음|중간~높음|**아주 낮음**|
|협업|약함|강함|**작지만 필요한 협업 기능만**|
|일정+작업 통합|분리됨|가능하지만 복잡|**완전 통합**|
|시간대 추천|없음|없음|**그룹 가능 시간 자동 계산**|
|투표 기능|없음|일부|**가볍고 빠르게 제공**|

핵심 차별점 = **소규모 그룹 전용 최적화 + 일정/작업의 초간단 통합**

---

# 📌 6. MVP 범위 (제안)

### 필수 (MVP)

- 그룹 생성 & 초대
- 프로젝트
- 작업 생성/할당/마감
- 공유 캘린더
- 알림
- 활동 피드
- UI: 모바일 웹 대응 (반응형)

### 제외 (추후)

- Google Calendar 연동
- 채팅 시스템
- 고급 권한 관리
- 파일 업로드
- 고급 리포트 / 통계
- AI 기반 일정 자동 생성

---

# 📌 7. 기술 스택(간단 버전)

(필요하면 2025년 기준 최신 버전 리서치 포함하여 상세 문서 작성 가능)

- **Frontend**: React or Next.js (앱 느낌 필요하면 Next.js 추천)
- **Backend**: Node.js (Express or Fastify)
- **DB**: Supabase(PostgreSQL) 또는 PlanetScale(MySQL)
- **Auth**: Supabase Auth or Firebase Auth
- **Infra**: Vercel (웹), Supabase hosting
- **Push 알림**: Firebase Cloud Messaging or OneSignal

---

# 📌 8. 다음 단계 제안

필요하신 다음 문서를 바로 만들어드립니다:

1️⃣ **전체 서비스 IA (Information Architecture)**  
2️⃣ **완전한 PRD(제품 요구사항 명세서)**  
3️⃣ **핵심 기능 와이어프레임**  
4️⃣ **2025년 최신 기술 스택 리서치 + 버전 명시**  
5️⃣ **사용자 여정맵(Journey Map)**

어떤 문서부터 진행할까요?

---

아래는 **“소규모 그룹 프로젝트 및 일정 관리 서비스”**의 **제품 요구사항 명세서(PRD) 1.0**입니다.  
MVP 기준으로 구성했으며, 바로 개발 가능한 수준으로 상세하게 작성했습니다.  
필요하면 **테이블 구조, API 명세서, UI 와이어프레임**까지 확장해드립니다.

---

# 📘 제품 요구사항 명세서(PRD) v1.0

## 제품명: TogetherPlan (가칭)

## 목적: 커플·친구·가족 등 2~4명 소규모 그룹의 프로젝트·일정·이벤트를 간단하게 공동 관리하는 서비스

---

# 1. 제품 개요

## 1.1 목표

- 소규모 그룹이 일정/작업을 잊지 않도록 한다.
    
- 대형 협업툴의 복잡함 없이 간단하고 빠르게 협력할 수 있게 한다.
    
- 일정과 작업을 한 화면에 통합하여, 서로의 바쁨/여유 시간대를 쉽게 파악하도록 한다.
    

## 1.2 대상 사용자

- 커플
    
- 2~4명 소규모 프로젝트 팀
    
- 가족 구성원
    
- 압도적 기능보다 _단순성과 공유_를 중요시하는 사용자
    

---

# 2. 문제 정의 (Pain Points)

- 메신저 기반 일정/작업 공유는 누락되기 쉽다.
    
- Google Calendar/Trello 등은 “2~4명 기준”으로는 기능 과다 → 사용성이 떨어짐.
    
- 서로의 가능한 시간대를 맞추기 어려움.
    
- 데일리 협업 툴로 쓰기엔 너무 무겁고 복잡함.
    

---

# 3. 핵심 가치 (Core Value)

- **Simple**: 누구나 5분 안에 익혀서 사용 가능
    
- **Shared**: 모든 일정/작업이 그룹 전체에 자동 공유
    
- **Lightweight**: 프로젝트가 아니라 _사람 중심으로_ 구성
    
- **Time Matching**: 멤버 가능 시간 기반의 “겹치는 시간대 추천”
    

---

# 4. 기능 요구사항(FR, Functional Requirements)

---

## 4.1 회원가입 & 인증

### 기능 요구사항

- 이메일/비밀번호 가입
    
- 소셜 로그인(Optional, MVP 제외 가능): Google, Apple
    
- 비밀번호 재설정
    
- 프로필 설정(닉네임, 프로필 색상)
    

### 제약조건

- 최소 정보만 수집 → 빠른 가입 유도
    
- 한 사용자는 여러 그룹 참여 가능
    

---

## 4.2 그룹(Group) 관리

### 기능 요구사항

- 그룹 생성
    
- 그룹 이름, 커버 색상 선택
    
- 초대 링크 생성
    
- 링크 클릭 시 그룹 참여
    
- 그룹 최대 인원: **4명**
    

### 제약조건

- 그룹 단위로 모든 데이터(일정/작업/이벤트) 묶임
    
- 권한:
    
    - 생성자 ≠ 관리자 → 모든 멤버 동등한 권한 (MVP 기준)
        

---

## 4.3 캘린더(Calendar)

### 기능 요구사항

- 그룹 공유 캘린더 제공
    
- 일정 생성
    
    - 제목
        
    - 날짜/시작-종료 시간
        
    - 반복 여부(없음/매일/매주/매월)
        
    - 참여 멤버 선택
        
    - 장소(Optional)
        
    - 메모(Optional)
        
- 일정 수정/삭제
    
- 일정별 알림
    
- 멤버별 “바쁜 시간/가능 시간” 시각화
    
- 이번 주/월 전체 일정 보기
    

### 부가 기능

- **겹치는 가능 시간 추천 알고리즘** (MVP+1 또는 MVP 필수 여부 결정 가능)
    
    - 2~4명의 공통 Free Time 자동 계산
        
    - 일정 생성 시 추천 슬롯 표시
        

### 제약조건

- 알림은 서버 기반 Push 또는 브라우저 Push
    
- Google Calendar 연동은 MVP 제외
    

---

## 4.4 프로젝트(Project)

### 기능 요구사항

- 프로젝트 생성(이름, 간단한 설명)
    
- 프로젝트 목록 표시
    
- 프로젝트별 작업(Task) 연결
    
- 프로젝트 아카이브 기능(선택)
    

MVP 단계에서는 **최대한 간단한 리스트 형태**로 유지.

---

## 4.5 작업(Task)

### 기능 요구사항

- 작업 생성
    
    - 제목
        
    - 담당자 1명 선택
        
    - 마감일(Optional)
        
    - 체크리스트(Optional)
        
- 작업 상태
    
    - To-Do / Doing / Done
        
- 작업 수정/삭제
    
- 마감일 전날 알림
    
- 작업 완료 시 → 그룹 피드에 표시
    

### 제약조건

- 칸반 UI는 MVP에서는 단순 리스트
    
- 파일 업로드 없음 (추후 버전)
    

---

## 4.6 이벤트(Event)

프로젝트보다 가벼운 일상 이벤트 관리 용도

### 기능 요구사항

- 이벤트 생성(제목, 날짜, 시간, 장소, 참여자, 메모)
    
- 시간/장소에 대한 투표 기능
    
- 투표 결과에서 다수 선택 자동 표시
    
- 이벤트 완료 후 일정으로 변환(선택적)
    

### 제약조건

- 파일/사진 업로드 없음
    
- 투표는 단순 다중 선택 기반
    

---

## 4.7 활동 피드(Activity Feed)

### 기능 요구사항

- 일정 생성
    
- 작업 완료
    
- 이벤트 생성/완료
    
- 그룹 참여  
    등 모든 주요 활동을 타임라인에 표시
    

### 부가 기능

- 댓글/이모지 반응(Optional, MVP 제외 가능)
    

---

## 4.8 알림(Notification)

### 기능 요구사항

- 일정 시작 전 알림(10/30/60분 선택)
    
- 마감 하루 전 작업 알림
    
- 이벤트 투표 마감 임박 알림
    
- 누군가 나에게 작업을 assign할 때 알림
    
- 그룹 참여 알림
    

### 제약조건

- 모바일 Push 또는 웹 Push
    
- 이메일 알림은 옵션
    

---

# 5. 비기능 요구사항(NFR)

---

## 5.1 성능

- 주요 화면(캘린더/작업 리스트)은 1초 이내로 로드
    
- 알림은 최대 5초 내 도착
    

## 5.2 보안

- OAuth/OpenID 기반 인증
    
- HTTPS mandatory
    
- 비밀번호 암호화
    

## 5.3 접근성

- 모바일 중심 UI 필수
    
- 데스크톱은 반응형으로 제공
    

## 5.4 안정성

- 서버 장애 시 일정/작업 데이터 보존
    
- DB 백업 자동화
    

---

# 6. 정보 구조(IA)

### 상위 구조

- 홈
    
    - 캘린더
        
    - 프로젝트
        
    - 작업 목록
        
    - 이벤트
        
    - 그룹 피드
        
    - 그룹 설정
        

---

# 7. 성공 지표(KPI)

|카테고리|KPI|
|---|---|
|사용자 활성|주간 재방문율(WAU/MAU)|
|일정 관리|1인당 월 평균 일정 생성 수|
|작업 관리|작업 완료율|
|그룹 협업|그룹당 평균 멤버 상호작용(피드 업데이트)|
|유지율|4주차 Retention|

---

# 8. MVP 스코프 요약

### ⭐ 필수

- 회원가입
    
- 그룹 생성/초대
    
- 캘린더
    
- 일정
    
- 작업
    
- 알림
    
- 그룹 피드
    

### ⭕ 옵션(MVP+1)

- 이벤트 투표
    
- 가능 시간 추천 알고리즘
    
- 프로젝트 아카이브
    
- Google Calendar 연동
    
- 첨부파일 업로드
    

---

# 9. 릴리즈 계획 (예시)

|단계|기간|기능|
|---|---|---|
|Phase 1|Week 1~2|회원가입, 그룹, 캘린더 기본|
|Phase 2|Week 3~4|작업, 프로젝트, 피드|
|Phase 3|Week 5|알림 추가|
|Phase 4|Week 6|이벤트 기능|
|Phase 5|Week 7+|추천 알고리즘, 외부 캘린더 연동|

---

필요하시면 아래 항목도 바로 제작해 드릴 수 있습니다:

📌 **API 스펙(JSON 예시 포함)**  
📌 **DB 스키마(ERD)**  
📌 **UI 와이어프레임(Figma 스타일)**  
📌 **2025년 최신 기술 스택 + 버전 리서치 문서**  
📌 **전체 IA 구조도**

어떤 문서부터 다음으로 진행할까요?

---

좋아요 — 아래는 2025년 시점에서, 당신이 기획한 “소규모 그룹 프로젝트/일정 관리 웹서비스”를 만드는 데 적합한 **현행 최신 기술 스택 + 추천 버전** 조사 문서입니다. 프론트엔드 / 백엔드 / DB / 인프라 / 도구 등 섹션별로 나눠 정리했습니다.

---

# 🚀 2025년 기준 최신 기술 스택 제안

## ✅ 왜 최신 스택이 중요한가

- 프레임워크와 런타임이 활발히 업데이트되면 개발 경험(DX), 성능, 보안이 개선됨
    
- 특히 소규모 서비스라도 장기 유지 계획이 있다면 LTS 또는 최근 안정 버전을 사용하는 게 안전
    

---

# 1. Frontend / Full-stack 프레임워크

|기술|추천 버전 (2025) / 이유|
|---|---|
|React|**19.2.1** — 2024년 말 React 19 출시 이후, 2025년 12월 현재 패치 포함 안정화 버전. 최신 Server Components, React Compiler, Actions API 등을 활용 가능. ([프로그래머의 과학노트](https://dev-science.kr/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%B5%9C%EC%8B%A0-%EC%86%8C%EA%B0%9C%EC%99%80-2025%EB%85%84-%EC%A0%84%EB%A7%9D-React-19-%EA%B8%B0%EC%A4%80?utm_source=chatgpt.com "리액트 최신 소개와 2025년 전망 (React 19 기준)"))|
|Next.js|**16 (Active LTS)** — 2025년 10월 21일 공식 릴리스. Cache Components, Turbopack 기본 번들러, 빠른 빌드/개발 경험. 새 프로젝트 시작 시 권장. ([Next.js](https://nextjs.org/blog/next-16?utm_source=chatgpt.com "Next.js 16 \| Next.js"))|
|JavaScript / TypeScript|TypeScript 최신 (2025) — React + Next.js 조합에서 정적 타입 지원 + 유지보수성 향상. 여러 2025년 스택 가이드가 TypeScript 사용 권장. ([Avolve.io](https://avolve.io/software?utm_source=chatgpt.com "Verified Stack: Next.js 16 Beta, React 19.2, TypeScript 5.9 \| Avolve.io"))|
|CSS / 스타일링|Tailwind CSS (최신) — 유틸리티-퍼스트 CSS, 빠른 스타일링 가능. React + Next.js 조합과 잘 맞음. 예: 2025년 스택 예시에서 자주 등장. ([Avolve.io](https://avolve.io/software?utm_source=chatgpt.com "Verified Stack: Next.js 16 Beta, React 19.2, TypeScript 5.9 \| Avolve.io"))|
|UI 컴포넌트 라이브러리 (옵션)|shadcn/ui — React + Tailwind + Next.js 조합에서 무난, 커스텀/경량 UI 가능. ([Avolve.io](https://avolve.io/software?utm_source=chatgpt.com "Verified Stack: Next.js 16 Beta, React 19.2, TypeScript 5.9 \| Avolve.io"))|

**요약**: 최신 Next.js 16 + React 19 + TypeScript + Tailwind CSS 조합은 2025년 현재 “프런트엔드 + 풀스택 웹앱” 개발에서 사실상 표준이자 동향.

> ⚠️ 참고: 2025년 말 시점으로, React Server Components와 관련해 보안 취약점(CVE-2025-55182 등)이 보고되었으며, 이에 따라 React 19.2.1 (패치된 버전) 사용이 권장됨. ([Google Cloud](https://cloud.google.com/blog/ko/products/identity-security/responding-to-cve-2025-55182?utm_source=chatgpt.com "CVE-2025-55182 보안 취약점, 당신의 React와 Next.js 프로젝트를 직접 겨냥합니다. | Google Cloud 블로그"))

---

# 2. Backend / API / 서버

소규모 ~ 중규모 웹서비스를 타겟으로 할 경우 아래 옵션이 현실적입니다.

- **Node.js**: 런타임
    
- 또는 (선택지) 백엔드 프레임워크: Express, 또는 TypeScript 중심이라면 NestJS 같은 프레임워크도 고려
    

### 권장 런타임 / 버전

|기술|추천 버전|
|---|---|
|Node.js|**v24.8.0 (Current / 곧 LTS)** — 2025년 가을 기준, 빠른 빌드/최신 JS 기능 지원. ([Avolve.io](https://avolve.io/software?utm_source=chatgpt.com "Verified Stack: Next.js 16 Beta, React 19.2, TypeScript 5.9 \| Avolve.io"))|
|백엔드 프레임워크|Express (경량 REST/API 서버), 또는 NestJS (조금 더 구조화된 백엔드) — 팀 규모, 코드 복잡도에 따라 선택 가능|

**참고 커뮤니티 의견**:

> “Prisma with Postgres works great” ([Reddit](https://www.reddit.com//r/react/comments/1i9lfvn/what_backenddatabase_stack_you_would_recommend/?utm_source=chatgpt.com "What backend/database stack you would recommend for Reactjs/Nextjs developer?"))  
> “If I were a React developer I would use Nest.js … + Postgres or Express + Mongo” ([Reddit](https://www.reddit.com//r/react/comments/1i9lfvn/what_backenddatabase_stack_you_would_recommend/?utm_source=chatgpt.com "What backend/database stack you would recommend for Reactjs/Nextjs developer?"))

즉, Node.js + Express/NestJS + 관계형 DB 조합은 현업에서도 널리 사용되는 실용적 풀스택.

---

# 3. 데이터베이스 (DB)

당신의 서비스 구조 (사용자, 그룹, 캘린더, 작업, 이벤트 등) — 관계형 모델이 자연스러우므로, relational DB 권장.

|데이터베이스|추천 버전 (2025) / 이유|
|---|---|
|PostgreSQL|**16.x (예: 16.11) 또는 최신 17.x** — PostgreSQL 16은 2023년에 출시되었고, 2025년 기준 안정화 + 성능/확장성 개선. ([PostgreSQL](https://www.postgresql.org/about/news/postgresql-16-released-2715/?utm_source=chatgpt.com "PostgreSQL: PostgreSQL 16 Released!"))|
|또는 MySQL|**8.0.44 (또는 8.0 최신 마이너)** — MySQL 8.0 계열이 여전히 널리 사용되며, 2025년에도 안정적. 예: AWS RDS에서 8.0.44 지원 중. ([Amazon Web Services, Inc.](https://aws.amazon.com/ko/about-aws/whats-new/2025/11/amazon-rds-mysql-new-minor-versions/?utm_source=chatgpt.com "Amazon RDS for MySQL, 새로운 마이너 버전 8.0.44 및 8.4.7 지원 - AWS"))|

> ✅ 대부분 경우 PostgreSQL이 기능, 성능, 확장성 측면에서 더 유리하므로 우선 추천.

당신이 초기 MVP 단계라면 PostgreSQL + ORM/쿼리 빌더 (예: Prisma, 또는 Supabase의 Postgres + API) 조합이 신속하고 유지보수성도 좋습니다. 커뮤니티에서도 Postgres + Prisma 조합이 많다는 의견이 많습니다. ([Reddit](https://www.reddit.com//r/react/comments/1i9lfvn/what_backenddatabase_stack_you_would_recommend/?utm_source=chatgpt.com "What backend/database stack you would recommend for Reactjs/Nextjs developer?"))

---

# 4. 백엔드-서비스 제공 (BaaS) 또는 완전관리형 백엔드

만약 “직접 백엔드 서버 + DB 운영”보다 **더 빠르게 MVP** 만들고 싶다면, 아래 완전관리형(BaaS/FaaS) 조합도 고려 가능:

- Supabase (PostgreSQL 기반, 인증/Auth, 실시간 DB, RLS 지원) — 빠른 MVP에 적합. 실제로 2025년 여러 프로젝트에서 사용 사례 존재. ([Wishket](https://www.wishket.com/project/150191/?utm_source=chatgpt.com "Next.js /Supabase 기반 MVP 웹 플랫폼 개발 · 위시켓(Wishket) - 프로젝트"))
    
- 또는 Firebase, AppWrite 등 (다만 관계형 데이터 + 일정/작업 중심이라면 Postgres 기반 Supabase가 자연스럽다는 커뮤니티 의견 존재) ([Reddit](https://www.reddit.com//r/react/comments/1i9lfvn/what_backenddatabase_stack_you_would_recommend/?utm_source=chatgpt.com "What backend/database stack you would recommend for Reactjs/Nextjs developer?"))
    

이 경우 백엔드 로직이 상대적으로 단순하고, 사용자/작업/일정 CRUD + 알림 정도라면 충분히 커버 가능.

---

# 5. 인프라 / 배포 / 호스팅

당신의 서비스가 “소규모 그룹용 웹앱”이라면, 초기엔 다음과 같은 옵션이 비용-운영 측면에서 효율적입니다:

- 프런트엔드 + API + 정적 자산: Vercel or Netlify — Next.js + React 앱을 쉽게 배포 가능
    
- 데이터베이스: 관리형 PostgreSQL (예: AWS RDS, Supabase hosted, 혹은 managed Postgres)
    
- 알림 (푸시): 웹 푸시 또는 푸시 서비스 (예: FCM, OneSignal 등) — 초기엔 Firebase Cloud Messaging (FCM) 사용 가능
    

실제 2025년 현재, “Next.js + Supabase 기반 MVP” 프로젝트가 외주/프리랜서 시장에서 여전히 활발한 선택지입니다. ([Wishket](https://www.wishket.com/project/150191/?utm_source=chatgpt.com "Next.js /Supabase 기반 MVP 웹 플랫폼 개발 · 위시켓(Wishket) - 프로젝트"))

---

# 6. 개발 도구 / 보조 도구

- 코드 편집기: Visual Studio Code (VSCode) — 일반적
    
- 형상관리: Git + GitHub (또는 GitLab)
    
- 타입 검사 / 린트: TypeScript + ESLint + Prettier
    
- 테스트 (옵션): Vitest / Jest / React Testing Library
    
- CI/CD (옵션): Vercel 내장, 또는 GitHub Actions
    

---

# 7. 권장 기술 스택 요약

```text
Frontend / Full-stack:
  Next.js 16 (App Router)
  React 19.2.1
  TypeScript
  Tailwind CSS + shadcn/ui (옵션)

Backend / DB:
  Node.js 24.x
  (Express or NestJS)  — 또는 Supabase (managed backend)

Database:
  PostgreSQL 16.x (권장)
  또는 MySQL 8.0.x (대안)

Infra / Hosting:
  Vercel (Frontend/API)
  Managed Postgres / Supabase (DB)
  (Optional: Firebase Cloud Messaging for notifications)

Dev Tools:
  VSCode, Git + GitHub, ESLint + Prettier, Vitest/Jest (as needed)
```

---

# 8. 왜 이 스택이 당신의 프로젝트에 적합한가

- 당신의 서비스는 **소규모 그룹 (2~4명)** 기반, 즉 트래픽/부하가 과도치 않음 → 경량 + 개발 속도가 중요한 상황.
    
- 프론트엔드 + 백엔드를 하나로 묶는 풀스택 방식이 유지보수/출시 속도 모두에 유리. Next.js + Node.js 조합이 이런 요구를 잘 충족.
    
- 일정·작업·알림 중심이므로 관계형 DB가 데이터 정합성과 쿼리 측면에서 유리 → PostgreSQL 권장.
    
- 초기 MVP 상태이므로 복잡한 권한, 파일 업로드, 대규모 확장 보다는 “빠른 개발 & 안정성”이 중요 → Supabase + Managed Postgres 혹은 Next.js + DB + Vercel 조합이 적절.
    
- 2025년 기준 최신 기술을 쓰면 보안, 성능, 커뮤니티 지원에서 유리 + 장기 유지 가능성 확보.
    

---

# 9. 주의점 / 보안 고려

- 2025년 12월 현재, React Server Components (RSC)를 포함한 React/Next.js 환경에서 **보안 취약점 (예: CVE-2025-55182 / CVE-2025-66478)** 이 보고됨 — 반드시 패치된 React 19.2.1 + Next.js 안정버전 사용해야 함. ([Google Cloud](https://cloud.google.com/blog/ko/products/identity-security/responding-to-cve-2025-55182?utm_source=chatgpt.com "CVE-2025-55182 보안 취약점, 당신의 React와 Next.js 프로젝트를 직접 겨냥합니다. | Google Cloud 블로그"))
    
- DB는 최신 안정 + 마이너 패치 상태 유지 필수 — PostgreSQL 16.x 또는 17.x (보안 패치 포함) 권장. ([PostgreSQL](https://www.postgresql.org/about/news/postgresql-16-released-2715/?utm_source=chatgpt.com "PostgreSQL: PostgreSQL 16 Released!"))
    
- 푸시 알림 / 인증 / 사용자 데이터 저장 등 민감한 정보가 있다면 HTTPS, 암호화, 안전한 인증 방식 필요
    

---

# 🔧 제안: 당신의 프로젝트에 맞춘 스택

제 경험과 위 조사 바탕으로, 당신이 바로 시작할 때 **가장 현실적이고 무난한** 스택은 다음과 같습니다:

- Next.js 16 + React 19.2.1 + TypeScript + Tailwind CSS
    
- Backend: Next.js API Routes (Node.js 24.x) + PostgreSQL 16.x (managed)
    
- Hosting: Vercel (Frontend + API) + Supabase 또는 별도 Managed Postgres
    
- Notification: Firebase Cloud Messaging (웹 푸시)
    
- Dev Tools: VSCode + GitHub, ESLint/Prettier, optional 테스트
    

→ 이 조합이면 초기 MVP를 **최소 인력 / 빠른 속도 / 안정성**으로 만들 수 있고, 나중에 기능 추가나 규모 확장도 비교적 유연합니다.

---

만약 원하신다면, **2025년 기준 이 스택으로 바로 시작할 수 있는 예시 `package.json` + 기본 폴더 구조 + 설정파일 (TS, ESLint, Tailwind 등 포함)** 템플릿도 같이 만들어 드릴 수 있어요.  
그렇게 할까요?

---

아래는 당신의 서비스 **“소규모 그룹 프로젝트 및 일정 관리 서비스”**를 위한 **UI/UX 디자인 명세서(Design Specification v1.0)**입니다. 디자인 원칙 → 화면 구조 → 컴포넌트 → 플로우 → 인터랙션 → 접근성 → 가이드라인 순으로, 실제 디자이너/개발자가 바로 사용할 수 있게 작성했습니다.  
원하시면 이어서 **Figma 스타일 와이어프레임**도 생성해 드립니다.

---

# 🎨 UI/UX DESIGN SPECIFICATION v1.0

## 제품명: TogetherPlan (가칭)

## 목적: 2~4명 소규모 그룹이 프로젝트·일정·작업을 쉽고 빠르게 공유하도록 지원하는 UI/UX 기준 제시

---

# 1. 디자인 철학 (Design Principles)

### 1. **Simplicity (단순함)**

- 커플/친구/가족 등 비전문 사용자가 빠르게 적응하도록 UI 복잡도를 최소화.
    
- 1~2 depth로 원하는 행동에 도달하게 구성.
    

### 2. **Shared Awareness (공유 인식)**

- “나의 일정”이 아니라 **“우리의 일정”**을 중심에 배치.
    
- 작업/일정의 변경사항은 시각적으로 즉시 인식 가능.
    

### 3. **Lightweight Collaboration (가벼운 협업)**

- 할당, 투표, 일정 제안 등 공동행동을 2~3탭으로 끝내기.
    
- 댓글이나 관계형 협업 기능은 단순화.
    

### 4. **Emotional Minimalism (감정적 피로 최소화)**

- 커플/친구 중심 서비스는 과도하게 업무적 느낌을 배제.
    
- 부드러운 색·둥근 모서리·여백 중심의 디자인 권장.
    

---

# 2. UI 스타일 가이드 (UI Style Guide)

---

## 2.1 색상(Color Palette)

### **Primary**

- Primary Blue: `#4A7AFE`
    
- Primary Light: `#E9F0FF`
    
- Primary Dark: `#2F5BEA`
    

### **Secondary**

- Mint Green: `#30D5C8`
    
- Coral Pink (커플 사용자 배려): `#FF7A7A`
    

### **Neutral**

- Black: `#1A1A1A`
    
- Dark Gray: `#4B4B4B`
    
- Gray: `#B8B8B8`
    
- Light Gray: `#F5F5F5`
    
- White: `#FFFFFF`
    

### **Feedback**

- Success: `#52C41A`
    
- Warning: `#FAAD14`
    
- Error: `#FF4D4F`
    

---

## 2.2 타이포그래피 (Typography)

- **Primary Font:** Inter (또는 Pretendard 한글 지원 버전)
    
- **Heading 구조**
    
    - H1: 24–28px / Bold
        
    - H2: 20–22px / Semibold
        
    - H3: 18px / Medium
        
- **Body**
    
    - Body 1: 16px / Regular
        
    - Body 2: 14px / Regular
        
- **Caption**
    
    - 12px / Regular (날짜, 상태 표시)
        

---

## 2.3 컴포넌트 규격 (Components)

### 버튼(Button)

- Primary Button
    
    - Height: 44px
        
    - Radius: 12px
        
    - Background: Primary Blue
        
    - Text: white
        
- Secondary Button
    
    - Background: LightGray
        
    - Text: DarkGray
        
- Icon Button
    
    - Circle, 36px
        
    - Shadow: subtle (4px blur)
        

### 카드(Card)

- Radius: 16px
    
- Padding: 16px
    
- Shadow: 0px 2px 8px rgba(0,0,0,0.06)
    
- 배경: white
    

### 입력(Input)

- Height: 44px
    
- Border: 1px solid #E5E5E5
    
- Radius: 12px
    
- Focus: Border Primary Blue
    

### 네비게이션 (Bottom Tab)

- 5개 탭: 홈 / 캘린더 / 작업 / 프로젝트 / 설정
    
- 아이콘: 24px / 라인형
    
- Active 색상: Primary
    

---

# 3. 화면 구조 (Screen Structure)

---

## 3.1 홈 (Dashboard Home)

### 목적

그룹의 핵심 정보와 오늘의 일정/작업을 한눈에.

### 구성

1. 상단: 그룹명 + 멤버 아바타
    
2. 오늘 일정 섹션
    
3. 진행 중인 작업 리스트
    
4. 빠른 액션 FAB
    
    - 일정 생성
        
    - 작업 생성
        
    - 이벤트 생성
        

### UX 포인트

- “오늘”에 집중한 정보 구성
    
- 캘린더/작업으로 이동하는 쇼트컷 유지
    

---

## 3.2 캘린더 화면 (Calendar Screen)

### 표시 모드

- 월(Month) View → 기본
    
- 주(Week) View → 스와이프 또는 드롭다운 옵션
    
- 일정 클릭 시 → 상세 Bottom Sheet
    

### 일정 생성 플로우

- 날짜 탭 → “일정 추가” 버튼 → Modal
    
- 시간 선택 UI: Wheel Picker(모바일)/선형 슬라이더(웹)
    
- 참여 멤버 선택: 멤버 아바타 토글
    

### 특별 기능

- **“모든 멤버의 Free Time 겹치는 슬롯 강조 표시”**
    
    - Free Slot: Mint Green 오버레이
        
    - 바쁜 시간(Busy): 반투명 Gray
        

### UX 포인트

- 캘린더 터치 영역 확대
    
- 일정 정보는 색상 + 시작시간만으로도 식별 가능하게 디자인
    

---

## 3.3 작업(Task) 화면

### 구조

- 상단 필터: 전체/담당/마감순
    
- 리스트 형태
    
- 각 작업 카드
    
    - 제목
        
    - 담당자 아바타
        
    - 상태 → 색 아이콘
        
    - 마감일 (없으면 표시 안 함)
        

### 작업 상세

- Bottom Sheet
    
- 내용 / 체크리스트 / 담당자 변경 / 상태 변경
    
- "완료" 버튼을 Sticky Bottom 으로 배치
    

### UX 포인트

- 단일 리스트로 구성해 “칸반처럼 과한 정보”를 피함
    
- 작업 검색창 포함
    

---

## 3.4 프로젝트(Project) 화면

### 구성

- 프로젝트 카드(심플 버전)
    
- 프로젝트 상세 → 해당 프로젝트의 작업 리스트
    
- 메모/설명(Optional)
    

### UX 포인트

- 프로젝트는 정보의 “그룹화" 목적
    
- 프로젝트 생성은 2 step으로 단순화
    

---

## 3.5 이벤트(Event) 화면

### 구성

- 카드 리스트
    
- 투표가 있는 경우 “투표 중” 태그 표시
    
- 이벤트 상세 화면
    
    - 시간/장소 후보
        
    - 멤버별 투표 상태
        
    - 선택지 강조(Primary 컬러)
        

### UX 포인트

- 복잡한 Poll UI는 피하고 선택지를 하나씩 큰 카드로 표시
    

---

## 3.6 그룹 피드(Activity Feed)

### 구성

- 타임라인 형태
    
- 항목: 일정 생성, 작업 완료, 멤버 합류
    
- 아이콘 + 텍스트
    
- 날짜 기준 그룹핑
    

### UX 포인트

- 정보는 단순 텍스트 중심
    
- 대화 기능은 최소화 / 댓글은 MVP 제외 가능
    

---

## 3.7 설정(Settings)

### 항목

- 그룹 설정(이름, 색)
    
- 멤버 목록
    
- 알림 설정
    
- 계정 설정
    

---

# 4. 사용자 흐름 (User Flows)

---

## 4.1 그룹 참여 플로우

```
초대 링크 클릭 → 앱/웹 열림 → 로그인/회원가입 → 자동 그룹 참여 → 홈 화면 이동
```

- 단계 최소화
    
- 로그인 방식은 최소 정보(이메일 + 코드 인증 등)
    

---

## 4.2 일정 생성 플로우

```
캘린더 → 날짜 선택 → 일정 추가 → 제목 입력 → 시간 선택 → 멤버 선택 → 저장
```

- 평균 15초 이내 완료 목표
    

---

## 4.3 작업 생성 플로우

```
작업 탭 → + → 제목 → 담당자 지정 → 옵션(마감/메모) → 저장
```

---

## 4.4 투표 플로우

```
이벤트 → + → 제목 → 시간/장소 후보 추가 → 멤버별 투표 → 결과 자동 선정
```

---

# 5. 인터랙션 디자인 (Interaction Design)

### 애니메이션

- 화면 전환: 200–250ms 슬라이드
    
- FAB 확장: 스케일 애니메이션
    
- 일정/작업 생성 완료 시: 체크 애니메이션(150ms)
    

### 제스처

- 캘린더 월/주 전환 → 좌우 스와이프
    
- 작업 완료 → 오른쪽 스와이프(“Done” 애니메이션)
    

### 상태 처리

- 일정/작업 로딩 중: Skeleton UI
    
- 오류 발생 시: 스낵바(alert banner)
    

---

# 6. UX 원칙 (Accessibility 포함)

### 접근성

- 최소 폰트: 14px
    
- 주요 액션 버튼 터치 영역: 44px 이상
    
- 색상 대비: WCAG AA 준수
    
- 색맹 모드 고려(상태 정보는 아이콘 병행 표시)
    

### 멤버 인식

- 아바타 컬러는 자동 생성
    
- 멤버 컬러는 일정/작업에 ‘태그 느낌’으로 표시해 가시성 개선
    

---

# 7. UI 컴포넌트 시스템 (Design System Foundation)

### 컴포넌트 목록

- Button (Primary/Secondary/Icon)
    
- Form Input / Select / DateTime Picker
    
- Card (일정/작업/이벤트 전용)
    
- Calendar Grid
    
- Bottom Sheet
    
- Nav Bar / Tab Bar
    
- FAB(Floating Action Button)
    
- Toast/Snackbar
    

---

# 8. 핵심 화면 와이어프레임(텍스트 기반)

(원하시면 실제 Figma 스타일 wireframe도 제작해드립니다)

---

## 📅 캘린더 월간 뷰 (예시)

```
<Header>
  ←  February 2025  →
  [그룹명] [멤버아바타3개]

<Monthly Grid>
  Sun  Mon  Tue  Wed  Thu  Fri  Sat
   -    -    1    2    3    4    5
   6    7    8    9   10   11   12
  ... 일정은 색 점(•)로 표시 ...

<Floating Button> ＋
```

---

## ✔ 작업 리스트

```
<Header> Tasks
[필터: 전체 ▼]

[ ] 디자인 시안 정리         (담당: 민수)   (D-2)
[✓] 회의 시간 조정           (담당: 나)
[ ] 장소 후보 정리            (담당: 지영)

<FAB> ＋ 새 작업
```

---

# 9. MVP 기준 UX 우선순위

### 1순위

- 캘린더
    
- 일정 생성
    
- 작업 생성/관리
    
- 그룹 피드
    
- 알림
    

### 2순위

- 이벤트 투표
    
- Free Time 추천
    
- 프로젝트 구조(기본 수준)
    

### 3순위

- 댓글, 파일 업로드
    
- 고급 권한 관리
    

---

# 10. 다음으로 제작 가능한 문서

원하시면 다음 문서를 바로 이어서 제작해드립니다:

✅ **Figma 스타일 고해상도 와이어프레임**  
✅ **디자인 시스템(Components Spec) 전체 문서**  
✅ **UI Kit (색상/타입/컴포넌트)**  
✅ **개발자 전달용 화면별 UI 스펙(Spec Sheet)**  
✅ **유저 플로우 Diagram**

어떤 문서를 다음으로 만들어드릴까요?

---

아래는 **“소규모 그룹 프로젝트 및 일정 관리 서비스”**를 위한 **디자인 시스템 전체 문서 v1.0**입니다.  
MVP 기준으로 “실제 디자이너가 바로 활용할 수 있는 수준”으로 구성했습니다.  
(원하면 Canvas에 따로 정리된 문서 파일도 생성해드립니다.)

---

# 🎨 **Design System v1.0 — TogetherPlan**

---

# 1. 브랜드 아이덴티티 (Brand Identity)

## 1.1 브랜드 키워드

- **가볍게(Light)** — 복잡하지 않고 부담 없는 협업
    
- **따뜻하게(Warm)** — 가족/커플 중심의 친근감
    
- **명확하게(Clear)** — 정보 가독성이 매우 중요
    
- **함께(Together)** — 모두가 동일한 화면, 동일한 흐름
    

## 1.2 브랜드 메시지

> _“작지만 중요한 약속들을 잊지 않게 하는 서비스”_

---

# 2. 컬러 시스템 (Color System)

## 2.1 Primary Palette

|목적|색상|HEX|사용처|
|---|---|---|---|
|Primary|Indigo 500|#6366F1|주요 버튼, 강조|
|Primary Dark|Indigo 600|#4F46E5|버튼 hover|
|Primary Light|Indigo 100|#E0E7FF|배경 강조|

## 2.2 Neutral Palette

|목적|HEX|사용처|
|---|---|---|
|Gray 900|#111827|기본 텍스트|
|Gray 700|#374151|제목/중요 텍스트|
|Gray 500|#6B7280|본문|
|Gray 300|#D1D5DB|경계선|
|Gray 100|#F3F4F6|기본 배경|
|White|#FFFFFF|레이아웃 기본|

## 2.3 Semantic Colors

|의미|색상|HEX|사용처|
|---|---|---|---|
|Success|Green 500|#22C55E|작업 완료|
|Warning|Yellow 500|#F59E0B|일정 임박|
|Danger|Red 500|#EF4444|삭제/오류|
|Info|Blue 500|#3B82F6|알림|

## 2.4 커플/그룹 테마 컬러 (Optional)

- Coral: #FF6B6B
    
- Mint: #4ECDC4
    
- Lavender: #C3B5FD
    
- Peach: #FDBA74
    

(그룹마다 선택 가능)

---

# 3. 타이포그래피 시스템 (Typography)

## 3.1 Font Family

```
Primary: Inter
Secondary: Noto Sans KR (한글 fallback)
```

## 3.2 Type Scale

|유형|크기|Weight|설명|
|---|---|---|---|
|H1|28px|700|페이지 타이틀|
|H2|22px|600|섹션 헤더|
|H3|18px|600|그룹/프로젝트 타이틀|
|Body 1|16px|400|일반 본문|
|Body 2|14px|400|설명/부가 정보|
|Caption|12px|400|날짜/라벨|

---

# 4. 컴포넌트 디자인 (Component UI Spec)

---

## 4.1 버튼 (Button)

### Variants

- **Primary**: `#6366F1` + white
    
- **Secondary**: White + Gray 700 border
    
- **Ghost**: Gray 700 text only
    
- **Danger**: Red 500 + white
    

### States

- Default
    
- Hover
    
- Pressed
    
- Disabled
    
- Loading
    

> 버튼 높이: 44px (터치 영역 확보)

---

## 4.2 입력 필드 (Input Field)

- 라운드: 8px
    
- Height: 44px
    
- Padding: 12px
    
- Placeholder: Gray 400
    
- Focus: Primary 500 border + shadow
    

상태: default, focus, disabled, error

---

## 4.3 카드(Card)

- Background: White
    
- Radius: 12px
    
- Shadow:
    
    - 0 1px 2px rgba(0,0,0,0.08)
        
- 사용처
    
    - 일정 카드
        
    - 프로젝트 카드
        
    - 작업(Task) 항목
        

---

## 4.4 리스트(List Item)

|항목|규격|
|---|---|
|Height|52px|
|텍스트|16px|
|Divider|Gray 200 / 1px|
|Icon|20–24px|

---

## 4.5 탭(Tabs)

- Underline Type
    
- 선택된 탭: Primary 500 underline
    
- 미선택 탭: Gray 500
    
- 탭 간격: 32px
    

---

## 4.6 네비게이션(Navigation)

### Bottom Navigation (Mobile)

아이콘 + 라벨  
높이: 64px  
아이콘 크기: 24px  
Active: Primary 600  
Inactive: Gray 500

탭:

- 캘린더
    
- 작업
    
- 이벤트
    
- 피드
    
- 설정
    

---

# 5. 레이아웃 시스템 (Layout System)

## 5.1 Grid

- 모바일: 4 Column
    
- Tablet: 6 Column
    
- Desktop: 12 Column
    

Gutter:

- Mobile: 16px
    
- Desktop: 24px
    

## 5.2 Spacing Scale

|token|px|
|---|---|
|xs|4|
|sm|8|
|md|12|
|lg|16|
|xl|24|
|xxl|32|

---

# 6. 아이콘 시스템 (Icons)

스타일: **Outline + Rounded**  
대표 라이브러리: **Lucide / Heroicons** 권장

상태 아이콘:

- 일정: Calendar
    
- 작업: CheckSquare
    
- 이벤트: Users / MapPin
    
- 알림: Bell
    
- 설정: Cog
    

---

# 7. 모션 & 인터랙션 (Animations)

## 7.1 기본 모션

- Fade In: 150ms
    
- Slide Up: 200ms
    
- Click Ripple: 120ms
    
- Snackbar: Slide from bottom 250ms
    

## 7.2 피드백 모션

- 작업 완료 체크 → scale 1.1 → 1.0 (120ms)
    

---

# 8. 접근성 (Accessibility)

- Contrast: WCAG AA 기준
    
- 최소 텍스트 크기: 14px
    
- 터치 영역: 최소 44px
    
- 색상만으로 상태 구분 금지
    
- 모든 아이콘에 aria-label 제공
    

---

# 9. 화면별 UI 가이드라인 (Page-Level Spec)

---

## 9.1 홈(Home)

- 상단: 그룹 선택 드롭다운
    
- 주요 CTA: "일정 추가"
    
- 이번 주 일정 3개 요약
    
- 빠른 작업 리스트
    

---

## 9.2 캘린더(Calendar)

**월간 뷰**

- 날짜 40px
    
- 일정은 최대 2줄 요약
    
- 오늘 날짜: Primary Light 배경
    

**주간 뷰**

- 시간축: 1시간 단위
    
- 일정 블록: radius 8px
    

---

## 9.3 작업(Task)

- 진행 중/완료 구분 라벨
    
- 체크 애니메이션 포함
    
- 담당자 아이콘 (원형 24px)
    

---

## 9.4 이벤트(Event)

- 카드 형태
    
- 투표 옵션은 선택 시 Primary Light 강조
    
- 투표 진행률 바(Bar) 포함
    

---

## 9.5 피드(Activity Feed)

- 타임라인 dot 색 → 이벤트 유형에 따라 변경
    
- 카드형 로그
    
- 시간 표기: "3시간 전"
    

---

# 10. 디자인 토큰 (Design Tokens)

```
{
  "color-primary": "#6366F1",
  "color-primary-dark": "#4F46E5",
  "color-primary-light": "#E0E7FF",
  "text-primary": "#111827",
  "text-secondary": "#374151",
  "border-default": "#D1D5DB",
  "radius-md": "8px",
  "radius-lg": "12px",
  "spacing-md": "16px",
  "font-body": "Inter, Noto Sans KR"
}
```

---

# 11. 컴포넌트 라이브러리 가이드

### 웹 기준 추천 스택

- React + TailwindCSS
    
- shadcn/ui 기반 디자인 확장
    
- Icon: Lucide
    

### 모바일 앱 (추후 확장)

- React Native
    
- React Native Paper
    

---

# 12. 확장 계획 (Design System Roadmap)

|단계|항목|
|---|---|
|v1.1|컬러 토큰 반응형 다크모드 추가|
|v1.2|캘린더/작업/이벤트 컴포넌트 고도화|
|v1.3|미션/가계부 등 신규 기능 확장 시 패턴 추가|

---

# 필요 시 생성 가능한 추가 문서

원하시면 아래 문서도 만들어드립니다:

✅ Figma 프레임 구조 설명  
✅ 컴포넌트별 상세 스펙(Spacing, Padding, State Guide)  
✅ 아이콘 패밀리 패키지  
✅ 반응형 디자인 명세  
✅ UI 플로우 차트 및 사용자 시나리오

원하는 문서가 있나요? 또는 이 디자인 시스템을 **Canvas 문서로 변환**해드릴까요?

---

아래는 **“소규모 그룹 프로젝트 및 일정 관리 서비스(TogetherPlan)”**의 **UI 플로우 차트**와 **사용자 시나리오** 전체 문서입니다.  
실제 UX 문서 구조에 맞춰 작성했으며, 필요하면 **Canvas로 시각화 버전**도 만들어 드립니다.

---

# 📍 **UI Flow Chart & User Scenario Document v1.0**

---

# 1. UI 플로우 차트 (UX Flow)

텍스트 기반이지만 실제 플로우 차트 구조 그대로 볼 수 있게 정리했습니다.

---

## 1.1 전체 서비스 플로우 (High-Level)

```
[앱 진입]
    ↓
[온보딩]
    ↓
[회원가입/로그인]
    ↓
[그룹 선택 또는 그룹 생성]
    ↓
[홈(이번 주 일정 + 작업)]
 ├── [캘린더]
 ├── [작업(Task)]
 ├── [이벤트(Event)]
 ├── [피드(Activity)]
 └── [그룹 설정]
```

---

## 1.2 회원가입/로그인 Flow

```
[시작 화면]
    ├── 로그인
    │     ├ 이메일 입력
    │     ├ 비밀번호 입력
    │     └ 로그인 성공 → 홈
    │
    └── 회원가입
          ├ 이메일/비밀번호 입력
          ├ 프로필 닉네임 설정
          ├ 프로필 색상 선택
          └ 가입 완료 → 그룹 생성 화면
```

---

## 1.3 그룹 생성/참여 Flow

```
[그룹 선택 화면]
    ├── 기존 그룹 선택 → 홈 진입
    └── 새 그룹 생성
            ├ 그룹명 입력
            ├ 커버 색상 선택
            └ 그룹 생성 완료 → 초대 링크
                       ↓
              [초대 링크 공유]
                       ↓
              사용자 A → 링크 클릭 → 그룹 참여
```

---

## 1.4 일정 생성 Flow (Calendar)

```
[캘린더 화면]
    ↓
[+ 일정 추가 버튼]
    ├ 제목 입력
    ├ 날짜 선택
    ├ 시간 입력
    ├ 반복 여부
    ├ 멤버 선택
    ├ 장소(Optional)
    ├ 메모(Optional)
    └ 저장
        ↓
    [캘린더에 일정 표시 + 그룹 피드 자동 업데이트]
```

---

## 1.5 작업(Task) Flow

```
[작업 목록 화면]
    ↓
[+ 작업 추가]
    ├ 제목 입력
    ├ 담당자 선택
    ├ 마감일(Optional)
    ├ 체크리스트(Optional)
    └ 저장
         ↓
     [작업 생성됨]
          ↓
[작업 체크 시 → 상태 Done 변경 → 피드에 "완료" 표시]
```

---

## 1.6 이벤트(Event) Flow

```
[이벤트 목록 화면]
    ↓
[+ 이벤트 생성]
    ├ 이름
    ├ 날짜/시간
    ├ 장소
    ├ 참여자
    ├ (옵션) 시간/장소 투표 생성
    └ 저장
         ↓
   [그룹 멤버 투표]
         ↓
   [투표 마감 → 자동으로 최다 득표 옵션 적용]
```

---

## 1.7 활동 피드(Activity Feed)

```
[피드 화면]
    ├ 일정 생성 로그
    ├ 작업 완료 로그
    ├ 이벤트 생성/종료 로그
    └ 그룹 참여 로그
```

---

## 1.8 설정

```
[그룹 설정]
    ├ 그룹명 변경
    ├ 그룹 색상 변경
    ├ 초대 링크 재발급
    └ 그룹 나가기
```

---

# 2. 주요 사용자 시나리오 (User Scenario)

실제 사용자 행동 흐름을 기반으로 작성했습니다.

---

# 시나리오 1 — “커플이 데이트 일정을 함께 관리하고 싶다”

### 🎯 Goal

데이트 일정이 겹치지 않고, 서로의 시간대도 쉽게 파악하고 싶다.

### 흐름

1. A는 회원가입 후 “우리 둘만의 그룹” 생성
    
2. 초대 링크를 B에게 공유
    
3. 둘이 모두 그룹 참여
    
4. A는 날짜·시간 입력 후 “영화 보기” 일정 추가
    
5. B는 캘린더를 보고 빈 시간대 확인
    
6. B는 이벤트 기능으로 “저녁 메뉴 투표” 생성
    
7. 둘이 투표 → 자동으로 투표 결과 반영
    
8. 데이트 일정 확정
    

### 성공 기준

- 겹치지 않는 일정 파악
    
- 소통 없이도 일정이 자동 공유됨
    

---

# 시나리오 2 — “3명이 스터디 그룹을 만들고 과제를 관리”

### 🎯 Goal

각자 맡은 과제를 확인하고 마감일 이전에 완료하고 싶다.

### 흐름

1. 그룹 생성 후 3명 모두 초대
    
2. 스터디 주제별 프로젝트 생성 (예: Chapter 1, Chapter 2)
    
3. 멤버별 작업 생성
    
    - A: 자료 조사
        
    - B: 요약 작성
        
    - C: 발표 준비
        
4. 작업 완료 시 → 피드에 자동 반영
    
5. 마감일 전 자동 알림
    
6. 다음 주 일정 캘린더에서 바로 관리
    

### 성공 기준

- 각자의 역할이 명확
    
- 작업 진행상황을 공동으로 확인 가능
    

---

# 시나리오 3 — “가족 모임 날짜 조율”

### 🎯 Goal

여러 가족 구성원의 가능한 날짜/시간대를 조정.

### 흐름

1. 그룹 생성
    
2. A가 “가족 모임” 이벤트 생성
    
3. 참여자 4명 모두
    
4. 이벤트 옵션에
    
    - 날짜 후보 3개
        
    - 장소 후보 2개
        
    - 시간대 2개  
        포함
        
5. 가족들이 앱에서 투표
    
6. 투표 종료 후 → 최다 득표 일정이 자동 선택
    
7. 캘린더에 자동 추가
    

### 성공 기준

- 투표로 빠르고 부담 없는 합의
    
- 최종 일정 자동 등록
    

---

# 시나리오 4 — “작업을 1일 전에 알려주는 리마인더 사용”

### 🎯 Goal

중요한 작업 마감일을 놓치지 않고 싶다.

### 흐름

1. 유저는 작업 생성 시 마감일을 설정
    
2. 서비스는 자동으로
    
    - 하루 전
        
    - 3시간 전(옵션)  
        알림을 발송
        
3. 유저는 앱에서 “완료” 체크
    
4. 완료 정보가 그룹 피드에 기록
    
5. 다른 멤버는 진행 상황을 실시간 확인
    

### 성공 기준

- 작업 누락 방지
    
- 팀 전체의 작업 진행 가시성 확보
    

---

# 3. 사용자 플로우 다이어그램 (Detailed Flows)

필요 시 **Figma 스타일로 시각화된 Flow**를 Canvas에 만들어 드릴 수 있습니다.

예:

- 회원가입 Flow
    
- 일정 생성 Flow
    
- 이벤트 투표 Flow
    
- 작업 완료 Flow
    
- 멤버 초대 Flow
    
- 그룹 전환 Flow
    

---

# 4. 사용자 여정 맵 (User Journey Map) — 요약

|단계|행동|감정|Pain Point|해결 요소|
|---|---|---|---|---|
|가입|이메일로 빠르게 가입|😊|정보 입력 많으면 귀찮음|최소 정보만 요구|
|그룹 생성|링크로 멤버 초대|😀|앱 설치 유도 번거롭|링크 기반 즉시 참여|
|일정/작업 생성|쉽게 추가|😌|일정 겹칠 수 있음|공통 가능 시간 표시|
|협업|작업 완료 공유|🙂|메신저로 매번 공유 필요|자동 피드|
|유지|반복적 사용|😀|일정 누락|자동 알림|

---

# 5. 확장 가능 요소

- 사용자 역할(관리자/참여자)
    
- 읽음 확인
    
- 개인 일정(Layer overlay)
    
- 외부 캘린더 Sync
    
- AI 일정 제안
    

---

원하시면 아래도 제작해 드릴게요:

📌 **Figma 와이어프레임 버전**  
📌 **Flow Chart를 Canvas에 그려진 버전(시각화)**  
📌 **사용자 스토리(User Stories + Acceptance Criteria)**  
📌 **Task Flow만 따로 정리된 문서**

어떤 형태로 확장할까요?