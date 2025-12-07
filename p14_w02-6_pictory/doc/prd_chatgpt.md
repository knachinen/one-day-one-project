# 📌 제품 요구사항 명세서 (PRD)

## 서비스명(가칭): **PicTalk**

---

# 1. **개요**

## 1.1 목적

PicTalk은 사용자들이 이미지와 짧은 글(캡션)을 쉽게 공유하고, 팔로우 기반 소셜 네트워크를 형성하며, 소통할 수 있는 커뮤니티 웹서비스를 구축하는 것을 목표로 한다. 본 문서는 서비스 개발을 위한 기능적·비기능적 요구사항을 정의한다.

## 1.2 목표 사용자

- 사진 및 일상 공유를 선호하는 일반 사용자
- 콘텐츠 크리에이터, 브랜드 계정
- 소규모 비즈니스 및 홍보 목적 사용자

## 1.3 플랫폼

- 웹(Web) 기반 서비스 (PC/Mobile Responsive)
- 추후 모바일 앱 확장 고려

---

# 2. **핵심 기능 요구사항 (Functional Requirements)**

## 2.1 회원관리

### 2.1.1 회원가입

- 이메일, 비밀번호 입력을 통한 가입
- 소셜 로그인 (Google, Apple, Facebook) 지원
- 사용자명(unique), 프로필 이미지, 소개글 설정 가능

### 2.1.2 로그인/로그아웃

- JWT 기반 인증
- 기기 remember 기능(옵션)

### 2.1.3 계정관리

- 비밀번호 변경, 이메일 변경
- 프로필 수정(닉네임, 프로필사진, 소개)
- 계정 비공개 설정

---

## 2.2 피드(Feed) 기능

### 2.2.1 홈 피드

- 사용자가 팔로우한 계정의 게시물 목록 표시
- 최신순(default), 인기순 정렬 옵션

### 2.2.2 게시물(Post) 작성

- 이미지 1~10장 업로드
- 짧은 텍스트(최대 2,000자)
- 태그(해시태그) 입력 가능
- 장소 태그 기능 (선택)
- 초안 저장 기능(옵션)

### 2.2.3 게시물 조회

- 이미지 슬라이드(캐러셀)
- 좋아요, 댓글 수 표시
- 작성자 프로필 미리보기
- 게시물 공유(링크 복사)

### 2.2.4 좋아요(Like)

- 게시물 좋아요/취소
- 좋아요한 사용자 목록 보기

### 2.2.5 댓글(Comment)

- 단일 레벨 댓글(대댓글은 1 depth로 지원 옵션 선택 가능)
- 댓글 좋아요
- 댓글 신고

---

## 2.3 사용자 소셜 기능

### 2.3.1 팔로우/언팔로우

- 사용자 프로필에서 팔로우 가능
- 비공개 계정은 요청-승인 구조

### 2.3.2 프로필 페이지

- 프로필사진, 소개글, 게시물 수, 팔로워/팔로잉 표시
- 사용자의 게시물 그리드 형태 노출
- 팔로워/팔로잉 리스트 페이지 제공

---

## 2.4 검색 기능

### 2.4.1 검색 카테고리

- 사용자 검색
- 해시태그 검색
- 인기 게시물 탐색(Tags/Explore)

### 2.4.2 자동완성

- 사용자명, 태그 추천

---

## 2.5 알림(Notification)

- 팔로우 요청/승인
- 좋아요, 댓글 알림
- 시스템 알림(정책 변경 등)

---

## 2.6 메시지(Direct Message) [확장 기능]

- 1:1 개인 메시지
- 텍스트, 이미지 전송
- 알림 연동

(※ 초기 버전에서는 제외 가능)

---

# 3. **관리자 기능(Admin Requirements)**

## 3.1 콘텐츠 관리

- 게시물 삭제/블라인드 처리
- 악성 사용자 신고 내역 관리

## 3.2 사용자 관리

- 회원 정보 조회/비활성화 처리
- 제재 내역 기록

## 3.3 통계 Dashboard

- 사용자 성장 그래프
- 게시물/트래픽 분석
- 인기 콘텐츠 분석

---

# 4. **비기능 요구사항 (Non-Functional Requirements)**

## 4.1 성능

- 피드 로딩 속도: 2초 이내
- 이미지 업로드 제한: 최대 20MB
- 동시 접속자: 초기 10,000명

## 4.2 보안

- 비밀번호 암호화(BCrypt 이상)
- JWT + Refresh 토큰 구조
- CSRF, XSS, SQL Injection 방지
- 이미지 파일 확장자 체크

## 4.3 확장성

- 이미지 CDN 사용
- 마이크로서비스 고려(필요 시 분리)
- 검색 서비스는 ElasticSearch 고려

## 4.4 안정성 및 가용성

- 데이터 백업 주기: 24시간
- 장애 대응을 위한 로그 및 모니터링 시스템 구축

---

# 5. **UI/UX 요구사항**

## 5.1 주요 화면

- 로그인/회원가입 페이지
- 홈 피드
- 게시물 상세 페이지
- 게시물 작성 페이지
- 프로필 화면
- 검색 화면
- 설정 페이지

## 5.2 디자인 가이드

- 모바일 우선(Responsive UI)
- 직관적 업로드 UX
- 그리드 기반 레이아웃 3열 구조(프로필)

---

# 6. **API 요구사항 (요약)**

| 기능        | Method | Endpoint            | 설명                   |
| ----------- | ------ | ------------------- | ---------------------- |
| 회원가입    | POST   | /auth/signup        | 이메일 회원가입        |
| 로그인      | POST   | /auth/login         | JWT 발급               |
| 게시물 목록 | GET    | /posts              | 피드 조회              |
| 게시물 생성 | POST   | /posts              | 이미지 + 텍스트 업로드 |
| 좋아요      | POST   | /posts/{id}/like    | 좋아요 추가            |
| 댓글        | POST   | /posts/{id}/comment | 댓글 작성              |
| 팔로우      | POST   | /users/{id}/follow  | 팔로우                 |

(필요 시 상세 API 명세서로 확장 가능)

---

# 7. **개발 우선순위(Roadmap)**

## v1.0 (MVP)

- 회원가입/로그인
- 게시물 업로드 및 피드 보기
- 좋아요/댓글
- 기본 프로필
- 검색(사용자)
- 관리자 페이지(기본 기능)

## v1.1

- 해시태그 검색
- 비공개 계정
- 신고/차단 기능

## v1.2

- 알림 시스템
- 스토리 기능(선택)

## v2.0

- 메시지 기능
- 크리에이터 전용 기능

---

# 8. **개발 기술 스택 추천**

## Frontend

- React + Next.js
- TailwindCSS
- Zustand or Redux

## Backend

- Node.js + NestJS or Express
- PostgreSQL
- Redis (캐싱)
- ElasticSearch (검색)
- AWS S3 (이미지)
- AWS CloudFront (CDN)

## DevOps

- Docker, Kubernetes
- GitHub Actions
- AWS or GCP

---

필요하시면 다음도 작성해 드릴 수 있습니다:

✔ API 상세 설계서  
✔ DB ERD 설계  
✔ 와이어프레임(Figma 스타일)  
✔ 관리자 기능 상세  
✔ 전체 시스템 아키텍처 다이어그램

어떤 부분을 더 확장할까요?

---

좋아요. 아래는 앞서 세운 PRD 기반으로, 2025년 현재 시점의 **최신 기술 트렌드 & 스택**을 반영해 업데이트한 제안입니다. 최신 개발 흐름, 유지보수 편의성, 확장성, 성능, 클라우드/AI 준비성 등을 고려했습니다.

---

## ✅ 2025년 최신 기술 스택 제안

### 🔹 Frontend (웹 UI / 클라이언트)

- **React + Next.js (with Server Components / Edge-first rendering)**  
   → React 는 여전히 풍부한 생태계 + 커뮤니티 + 라이브러리 지원 측면에서 강점이 있음. ([TwentyTwentyOne](https://twentytwentyone.tistory.com/m/248?utm_source=chatgpt.com "웹 개발 기초부터 실무까지 #10 - 최신 웹 개발 트렌드 및 기업에서 활용하는 기술 스택 분석"))  
   → Next.js 는 서버 사이드 렌더링(SSR), 정적 생성(SSG), 서버리스 함수, Edge 배포 등을 지원하여, SEO + 초기 로딩 속도 + 글로벌 배포에서 유리. ([Wikipedia](https://en.wikipedia.org/wiki/Next.js?utm_source=chatgpt.com "Next.js"))  
   → 특히 2025년 “서버 컴포넌트 + 서버사이드/엣지 렌더링 + 타입스크립트 + Tailwind CSS” 조합이 웹 앱에서 매우 각광받는 조합으로 평가됨. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))
- **TypeScript**  
   → 규모가 커질수록 정적 타입의 안정성과 유지보수성이 중요하기 때문에, JS 대신 TS 사용을 권장. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))
- **Tailwind CSS (또는 유틸리티-CSS)**  
   → 빠른 UI 구성과 일관된 스타일 체계를 유지하기 좋고, 모던 프론트엔드 트렌드에 적합. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))
- (선택지) **경량 프레임워크**: 만약 SPA가 아닌, 보다 경량/고성능/빠른 초기 로딩이 중요하다면, SvelteKit 또는 Qwik 과 같은 컴파일 타임 프레임워크 고려 가능. 2025년 일부 프로젝트에서는 React 대안으로 선택됨. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))

---

### 🔹 Backend / API / 서버 / 인프라

- **Node.js (or Bun) 기반 + 타입스크립트 + API-first 설계**  
   → Node.js 는 비동기 처리, 커뮤니티, 모듈 생태계에서 여전히 유리. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))  
   → 특히 타입스크립트와 결합하면, 프론트/백 모두 타입 안전성을 유지 가능.
- **API Layer: tRPC (또는 GraphQL / REST) + ORM으로 Prisma**  
   → tRPC + Prisma + PostgreSQL 조합은 2025년 “풀스택 JS/TS + 타입 안전 + 개발 효율성 + 데이터베이스 안정성”을 목표로 하는 프로젝트에서 각광 받는 스택. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))  
   → 특히 백엔드 로직 복잡성이 크지 않고, CRUD + 인증/권한 + 파일 업로드 중심 서비스라면 이 조합이 유지보수/확장성 면에서 유리.
- **데이터베이스: PostgreSQL**  
   → 관계형 DB로서 안정성과 기능성 (JSON 컬럼 지원, 트랜잭션, 확장성 등) 면에서 여전히 널리 쓰임. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))
- **서버리스(Serverless) / FaaS + 컨테이너 오케스트레이션**  
   → 2025년 백엔드에서는 전통적인 단일 서버 방식보다, **마이크로서비스 아키텍처(MSA)** + **서버리스 + 컨테이너 (예: Kubernetes + Docker + FaaS)** 조합이 트렌드. 특히 초기 비용/운영 부담을 줄이면서도 추후 확장성 고려할 수 있음. ([MG's Lab+](https://mg-lab.tistory.com/342?utm_source=chatgpt.com "2025년 백엔드 개발 최신 기술 동향: 아키텍처, 자동화, AI·클라우드, 언어·프레임워크의 진화 :: MG's Lab+"))
- **클라우드 인프라 (예: AWS, GCP, 또는 멀티-클라우드/하이브리드 고려)**  
   → 클라우드 네이티브 배포, 자동 스케일링, CDN, 이미지 저장소, 인증/보안, AI / ML 연동 등 현대 웹서비스의 비기능 요구사항을 유연하게 대응 가능. ([axiomorient.com](https://axiomorient.com/?utm_source=chatgpt.com "Axient - 복잡함 너머, 혁신적인 솔루션을 찾아서"))
- (추가, 선택) **고성능 / 메모리 안전 / 병렬성이 중요한 부분 — Rust 기반 서비스**  
   → 예: 이미지 처리, 실시간 알림, 스트리밍, 고성능 처리 모듈 등이 필요하다면 Rust로 특정 마이크로서비스 구성 가능. 최근 Rust 기반 백엔드/마이크로서비스를 도입하는 경우가 늘고 있음. ([whistory](https://whiseung.tistory.com/entry/2025%EB%85%84-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B4%EB%A0%A5%EC%84%9C%EC%97%90-%EC%A0%81%EA%B8%B0-%EC%A2%8B%EC%9D%80-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-%ED%8A%B8%EB%A0%8C%EB%93%9C-%F0%9F%9A%80%F0%9F%92%BB?utm_source=chatgpt.com "2025년 개발자 이력서에 적기 좋은 기술 스택 트렌드 🚀💻"))

---

### 🔹 데이터 + 실시간 / 캐시 / 확장성 / 운영 관련

- **캐시 / 메시지 큐 / 비동기 처리**: 예: Redis, RabbitMQ 또는 Kafka 같은 큐잉/메시지 시스템 — 특히 알림, 실시간 피드 업데이트, 비동기 작업(이미지 처리, 리사이징 등)에 유용. ([MG's Lab+](https://mg-lab.tistory.com/342?utm_source=chatgpt.com "2025년 백엔드 개발 최신 기술 동향: 아키텍처, 자동화, AI·클라우드, 언어·프레임워크의 진화 :: MG's Lab+"))
- **CDN + 이미지/미디어 스토리지**: 이미지 중심 서비스이므로, 정적 파일은 CDN + 오브젝트 스토리지 (예: AWS S3 + CloudFront) 구조가 권장됨. (앞서 설계안에서 제시했던 내용과 동일.)
- **CI/CD + Infrastructure as Code (IaC) + 자동 배포 / 모니터링 / 로깅**: 예: GitHub Actions / GitOps / Terraform / Argo CD / Flux 등을 도입하여, 초기부터 운영·배포 자동화 + 인프라 버전 관리 + 안정성 확보. 최근 DevOps / GitOps 흐름이 강해지고 있음. ([whistory](https://whiseung.tistory.com/entry/2025%EB%85%84-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B4%EB%A0%A5%EC%84%9C%EC%97%90-%EC%A0%81%EA%B8%B0-%EC%A2%8B%EC%9D%80-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-%ED%8A%B8%EB%A0%8C%EB%93%9C-%F0%9F%9A%80%F0%9F%92%BB?utm_source=chatgpt.com "2025년 개발자 이력서에 적기 좋은 기술 스택 트렌드 🚀💻"))
- **준비: AI / ML 연동 가능성 열어두기**  
   → 2025년은 AI/생성형 AI 적용 사례가 급증하고 있고, 클라우드 아키텍처의 형태도 AI 워크로드를 고려한 설계가 강조됨. ([ITWorld](https://www.itworld.co.kr/article/3631899/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%ED%8C%90%EB%8F%84%EA%B0%80-%EB%92%A4%EC%A7%91%ED%9E%8C%EB%8B%A4-2025%EB%85%84-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D.html?utm_source=chatgpt.com "“클라우드 판도가 뒤집힌다” 2025년 클라우드 아키텍처 르네상스 | ITWorld"))  
   → 따라서, 향후 이미지 필터링, 콘텐츠 추천, 자동 태그 제안, 이미지 썸네일 생성, 혹은 사용자 맞춤 추천 시스템 도입을 염두에 두고 설계하면 좋음.

---

## 🎯 제안된 스택 — “2025년형 PicTalk 기본/권장 구성”

| 계층                        | 기술 / 툴 / 구성 요소                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| Frontend                    | React + Next.js (Server Components / Edge rendering) + TypeScript + Tailwind CSS              |
| Backend / API               | Node.js (or Bun) + TypeScript + tRPC (또는 REST/GraphQL) + Prisma + PostgreSQL                |
| Infrastructure / Deployment | 서버리스 + 컨테이너 (Docker) / Kubernetes + 클라우드 (AWS 또는 GCP) + CDN + 오브젝트 스토리지 |
| 성능 / 확장 / 비동기        | Redis / 메시지 큐 (RabbitMQ, Kafka 등) + 비동기 작업 처리                                     |
| DevOps / CI-CD              | GitHub Actions (또는 GitOps), IaC (Terraform 등), 자동 배포 / 모니터링 / 로깅                 |
| Optional / 고성능 모듈      | Rust 기반 마이크로서비스 (고성능/메모리 안전)                                                 |
| 미래 확장                   | AI/ML 지원 구조 (추천 시스템, 이미지 자동 처리 등)                                            |

---

## 💡 왜 이 스택이 지금 적합한가

- 2025년 기준으로 **React + Next.js + TypeScript + Tailwind** 조합은 여전히 가장 널리 쓰이고, 생태계/라이브러리/도구가 풍부하여 빠른 개발과 유지보수가 가능. ([LinkedIn](https://www.linkedin.com/posts/denisojua_five-years-ago-if-you-asked-a-web-developer-activity-7363053072454955008-Qvg0?utm_source=chatgpt.com "The best web dev stack in 2025: React, Next.js, TypeScript, Tailwind, Node, tRPC, Prisma, PostgreSQL, Serverless | Denis Ojua posted on the topic | LinkedIn"))
- 서버리스 + MSA + 클라우드 기반으로 설계하면, 초기 인프라 관리 부담을 줄이면서도 사용자/트래픽 증가에 유연하게 대응 가능. 특히 이미지 중심 서비스에서 CDN + 오브젝트 스토리지는 매우 효율적.
- tRPC + Prisma + PostgreSQL 조합은 API + 데이터베이스 + 타입 안전성 + 생산성의 밸런스를 잘 잡아준다.
- Rust나 고성능 모듈을 “필요한 부분에만” 도입함으로써, 복잡도와 러닝 커브를 낮추면서도 성능 병목을 대응할 수 있다.
- 또한, AI/ML 연동이나 실시간 기능, 대규모 확장, 글로벌 배포 등을 고려한 미래지향적 설계가 가능하다.

---

만약 원하신다면 — 이 스택을 기반으로 **권장 아키텍처 다이어그램 + 배포 구조 + 파일/데이터 흐름 설계**도 같이 그려드릴 수 있어요. 그렇게 하면 기술 + 구조 + 운영까지 한눈에 보이는 설계 문서가 됩니다. 그렇게 할까요?
