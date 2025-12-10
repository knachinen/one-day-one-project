# 1인 기업가용 MVP 기획 템플릿 웹서비스 기획서

## 1. 서비스 개요
### 서비스 이름
**SoloMVP Forge** (솔로 MVP 포지)  
- "Solo"는 1인 기업가를, "MVP"는 Minimum Viable Product를, "Forge"는 아이디어를 단련하고 형성하는 이미지를 상징합니다.  
- 로고 아이디어: 혼자 서 있는 대장장이가 해머로 MVP 로켓을 두드리는 이미지, 1인 창업의 노력을 강조.

### 서비스 목적
1인 기업가(솔로프레너)를 대상으로 '린 스타트업(Lean Startup)' 방법론을 기반으로 한 MVP 아이데이션 및 개발 프로세스를 템플릿 형태로 제공합니다. 사용자가 템플릿을 따라 자연스럽게 기획하도록 유도하여, 시장 검증 없이 개발에 뛰어드는 위험을 줄이고, 효율적인 MVP 구축을 돕습니다. 이 서비스는 Build-Measure-Learn 루프를 중심으로 한 린 스타트업 원칙을 적용해, 아이디어 검증부터 MVP 스펙 정의까지 단계별 가이드를 제공합니다.

### 문제 해결
- 1인 기업가는 자원(시간, 비용)이 제한적이라 MVP 기획이 체계적이지 못해 실패 위험이 높습니다.
- 기존 도구(예: Google Docs 템플릿, Miro 보드)는 린 스타트업에 특화되지 않아, 초보자가 자연스럽게 따라가기 어렵습니다.
- 이 서비스는 1인 관점에서 최적화된 템플릿을 통해 hypothesis testing, validated learning, fail fast 원칙을 적용한 기획을 유도합니다.

### 타겟 유저
- **주요 타겟**: 1인 기업가, 프리랜서 개발자, 사이드 프로젝트 창업자 (20~40대, 테크/비즈니스 관심층).
- **부 타겟**: 스타트업 코치, 초보 창업 교육자.
- 예상 사용자 규모: 초기 500명부터 시작, LinkedIn/Reddit 커뮤니티를 통해 성장.

## 2. 주요 기능
서비스는 웹 기반으로, 인터랙티브 템플릿을 중심으로 합니다. 린 스타트업의 4단계(Plan, Build, Measure, Learn)를 기반으로 기능 설계.

| 기능 카테고리 | 세부 기능 | 설명 |
|---------------|-----------|------|
| **아이데이션 템플릿** | 문제 정의 및 가설 설정 | 템플릿 폼: "문제는 무엇인가?", "타겟 고객은?", "가설: 이 솔루션이 문제를 해결할 것이다." 자동 프롬프트로 자연 유도. |
| | 아이디어 브레인스토밍 | 내장 AI 도우미(예: ChatGPT 연동)로 아이디어 확장. 키워드 클라우드 생성. |
| **MVP 기획** | MVP 스펙 정의 | 최소 기능 목록(Features Prioritization Matrix) 템플릿. MoSCoW 방법(Must/Should/Could/Won't) 적용. |
| | 로드맵 빌더 | 드래그앤드롭 타임라인: 아이데이션 → MVP 개발 → 테스트. Gantt 차트 자동 생성. |
| **검증 도구** | 피드백 설문 생성 | 내장 툴로 MVP 테스트 설문(예: "이 기능이 유용한가?") 자동 생성. Google Forms 스타일. |
| | 메트릭스 트래킹 | Build-Measure-Learn 루프 대시보드: KPI(예: 사용자 수, 전환율) 입력 및 분석. |
| **커뮤니티/공유** | 템플릿 공유 | 완성 기획서 PDF/링크 내보내기. 커뮤니티 피드백 요청 기능. |
| | 템플릿 라이브러리 | 미리 만들어진 산업별 템플릿(예: SaaS, eCommerce) 다운로드. |
| **기타** | 진척도 추적 | 1인 관점 체크리스트: "이번 주 액션 아이템" 알림. |
| | 소셜 연동 | LinkedIn/X 공유. 피드백 요청 자동 포스트. |

이 기능들은 기존 MVP 템플릿(예: Miro나 Sloboda Studio 템플릿)과 유사하지만, 1인 기업가의 솔로 워크플로에 초점을 맞춰 차별화합니다.

아래는 유사한 MVP 기획 UI 예시입니다.








## 3. 사용자 여정 (User Journey)
1. **회원가입/로그인**: 이메일 또는 Google/LinkedIn 소셜 로그인.
2. **템플릿 선택**: 대시보드에서 "새 MVP 기획 시작" → 산업/유형 선택.
3. **단계별 기획**: 템플릿 따라 문제 정의 → 가설 → MVP 스펙 입력. 각 단계에 팁/예시 제공 (린 스타트업 원칙 설명).
4. **검증 준비**: 설문 생성 → 공유 → 피드백 수집.
5. **로드맵 실행**: 개발 단계 업데이트 → Learn 루프 반복.
6. **완료 및 공유**: 기획서 내보내기 → 커뮤니티 피드백.

## 4. UI/UX 디자인 개요
- **테마**: 심플하고 모티베이팅. 그린/블루 톤으로 성장과 효율성을 강조.
- **메인 페이지**: 대시보드 중심. 진행 중 템플릿 목록, 추천 템플릿.
- **인터랙티브 요소**: 스텝 바이 스텝 위자드 UI, 자동 저장.
- **모바일 반응형**: 1인 기업가의 모바일 사용 고려.
- **접근성**: 다크 모드, 음성 가이드(옵션).

## 5. 기술 스택 (로컬 환경 최적화)
- **Frontend**: Next.js 16.0.7 (React 기반, 로컬 dev 서버).
- **Backend**: Node.js 24.11.1 with Express 5.2.1 (로컬 API 서버).
- **Database**: MongoDB 8.2 (로컬 설치).
- **기타**: Mongoose (ORM), Nodemailer (이메일), JWT (인증). AI 연동 시 OpenAI API 로컬 테스트.
- **개발 기간**: MVP 버전 1~2개월 (기본 템플릿 기능 우선).

## 6. 마케팅 전략
- **초기 유입**: Reddit(r/solopreneur), LinkedIn 그룹 포스팅. 무료 템플릿 샘플 공유.
- **SEO**: 블로그 콘텐츠 ("1인 기업가 MVP 기획 팁").
- **파트너십**: no-code 툴(예: Bubble)과 제휴.
- **성장 목표**: 런칭 3개월 내 1,000명 사용자, 200개 기획서 생성.

## 7. 비즈니스 모델
- **무료 기본**: 기본 템플릿 사용.
- **프리미엄**: 고급 템플릿(AI 자동화, 무제한 저장) $4.99/월.
- **기타 수익**: 제휴 수수료 (MVP 개발 툴 추천), 광고.
- **예상 수익**: 초기 무료로 사용자 모집 후, 15% 전환율 목표.

## 8. 로드맵
- **Phase 1 (MVP)**: 기본 템플릿 및 워크플로 (1개월).
- **Phase 2**: AI 도우미, 공유 기능 (2개월).
- **Phase 3**: 커뮤니티 피드, 프리미엄 (3개월 후).
- **위험 관리**: 사용자 피드백 저하 시 moderation. 프라이버시 준수.

이 기획은 린 스타트업의 핵심 원칙(예: MVP, 피벗)을 1인 기업가 관점에서 적용한 것입니다. 추가 피드백이나 세부 조정이 필요하시면 말씀해주세요!

---

# SoloMVP Forge MVP 기술 스택 (2025년 12월 업데이트 버전)

## 개요
MVP 개발을 위해 로컬 환경에 최적화된 스택을 유지하되, 2025년 12월 10일 기준 최신 버전으로 업데이트하였습니다. 이는 보안 패치와 성능 개선을 반영합니다. 로컬 개발 환경 기준:
- 개발: 로컬 서버 실행 (localhost).
- 데이터베이스: 로컬 설치 MongoDB.
- 결제: Stripe 테스트 모드 (로컬 API 키 사용, 이전 기획서에서 언급되지 않았으나 호환).
- 분석: GA4 스크립트 클라이언트 사이드 로드 (서버리스).
- 배포: 초기 MVP는 로컬/자체 서버, 이후 필요 시 클라우드 전환.

최신 버전은 공식 문서와 npm/GitHub 릴리스 노트를 기반으로 확인하였습니다.

## 기술 스택 상세
| 카테고리 | 기술 | 버전 | 설명 | 로컬 환경 적합성 | 공식 링크 |
|----------|------|------|------|------------------|----------|
| **Frontend** | Next.js (React 기반) | 16.1.0 | SSR/SSG 지원, 개발자 경험 향상. App Router 및 Turbopack 최적화. 최근 보안 패치 적용. | `npm run dev`로 localhost:3000 실행. Vercel CLI 불필요. | [Next.js 공식 블로그](https://nextjs.org/blog) |
| **Backend** | Node.js with Express | Node.js 24.11.1 (LTS)<br>Express 5.2.0 | RESTful API 서버. Node LTS 보안 강화, Express v5 코드베이스 단순화 및 보안 개선. | 로컬 `node server.js` 실행. PM2로 프로세스 관리 (옵션). | [Node.js 릴리스](https://nodejs.org/en/about/previous-releases), [Express changelog](https://expressjs.com/en/changelog/) |
| **Database** | MongoDB | 8.2.2 | NoSQL 문서 DB. 유연한 스키마, 최근 크로스-리전 싱크 기능 추가. | 로컬 설치 (`mongod` 실행). MongoDB Compass로 GUI 관리. 클라우드 Atlas 제거. | [MongoDB 업데이트](https://www.mongodb.com/products/updates/) |
| **기타 도구** | - Mongoose (ORM)<br>- Nodemailer (이메일 알림, 로컬 SMTP)<br>- jsonwebtoken (JWT, 인증) | Mongoose 9.0.1<br>Nodemailer 7.0.11<br>jsonwebtoken 9.0.3 | 데이터 매핑, 이메일 전송, 토큰 기반 인증. 최근 버전에서 스택 오버플로우 및 보안 패치 적용. | 모두 로컬 라이브러리. 이메일은 Mailtrap 같은 로컬 테스트 서비스. | [Mongoose 릴리스](https://mongoosejs.com/docs/version-support.html), [Nodemailer 릴리스](https://github.com/nodemailer/nodemailer/releases), [jsonwebtoken CHANGELOG](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) |
| **AI 연동 (옵션)** | OpenAI npm 패키지 | 6.10.0 | OpenAI API 클라이언트. 최근 타입 정렬 및 버그 픽스. | 로컬 API 키로 테스트. | [OpenAI npm](https://www.npmjs.com/package/openai) |

## 개발 환경 설정 가이드
### 1. 환경 요구사항
- OS: macOS, Linux, 또는 Windows (WSL 추천).
- Node.js 24.11.1 설치: [nodejs.org 다운로드](https://nodejs.org/en/download).
- MongoDB 8.2.2 로컬 설치: [MongoDB 설치 가이드](https://www.mongodb.com/docs/manual/installation/) 따라 설치 후 `mongod` 실행.
- Git, npm/yarn: 기본 설치.

### 2. 프로젝트 구조
```
solo-mvp-forge/
├── frontend/          # Next.js 앱
│   ├── app/           # App Router (Next.js 16 호환)
│   ├── components/    # UI 컴포넌트
│   └── package.json   # Next.js 16.1.0, openai 6.10.0
├── backend/           # Express API
│   ├── routes/        # API 엔드포인트
│   ├── models/        # Mongoose 스키마
│   └── package.json   # Express 5.2.0, mongoose 9.0.1, nodemailer 7.0.11, jsonwebtoken 9.0.3
├── scripts/           # 빌드/테스트 스크립트
└── README.md          # 로컬 실행 가이드
```

### 3. 로컬 실행 단계
1. **백엔드 설정**:
   - `cd backend && npm init -y && npm i express@5.2.0 mongoose@9.0.1 nodemailer@7.0.11 jsonwebtoken@9.0.3 openai@6.10.0`
   - `.env` 파일 생성: `MONGODB_URI=mongodb://localhost:27017/solomvp`, `OPENAI_API_KEY=your_key`, `JWT_SECRET=your_secret`
   - MongoDB 로컬 실행: `mongod`
   - 서버 실행: `node server.js` (포트 5000)

2. **프론트엔드 설정**:
   - `cd frontend && npx create-next-app@16.1.0 . --typescript`
   - 추가 설치: `npm i openai@6.10.0`
   - GA4 스크립트: `<head>`에 `gtag('config', 'G-XXXXXXX');` 삽입.
   - 실행: `npm run dev` (포트 3000)

3. **연동 테스트**:
   - Frontend에서 Backend API 호출 (e.g., fetch('http://localhost:5000/api/templates')).
   - AI 테스트: OpenAI 패키지로 로컬 프롬프트 실행.
   - 데이터베이스: Compass로 컬렉션 확인.

### 4. 개발 기간 및 비용
- **기간**: 여전히 1~2개월 (최신 버전 호환성으로 약간의 마이그레이션 시간 추가).
- **비용**: 0원 (로컬 전용). 배포 시 자체 서버(VPS) 고려.

### 5. 잠재적 제한 및 대안
- **스케일링**: 로컬 한계로 사용자 100명 초과 시 자체 서버(Nginx 리버스 프록시) 도입.
- **이메일/웹훅**: ngrok으로 외부 테스트.
- **보안**: 로컬 dev 모드만 사용, 프로덕션 전 HTTPS 설정. 최근 패치(예: Express 5.2.0 보안) 적용.
- **향후 전환**: 안정화 후 Docker 컨테이너화로 클라우드 마이그레이션 용이.

이 업데이트는 2025년 12월 보안 릴리스와 주요 기능을 반영합니다. 추가 조정 필요 시 말씀해주세요!

---

# SoloMVP Forge  
## 제품 요구사항 명세서 (Product Requirements Document, PRD)

### 문서 정보
- 제품명: SoloMVP Forge  
- 버전: 1.0 (MVP 기준)  
- 작성일: 2025년 12월 10일  
- 작성자: 기획팀  
- 승인 상태: 초안

### 1. 목적 및 범위
SoloMVP Forge는 1인 기업가(솔로프레너)를 위해 린 스타트업(Lean Startup) 방법론을 완벽하게 적용한 인터랙티브 MVP 기획 템플릿 웹서비스입니다.  
사용자가 템플릿을 따라가기만 하면 자연스럽게 아이디어 검증 → 가설 수립 → MVP 스펙 정의 → 검증 계획까지 완료할 수 있도록 설계되었습니다.

### 2. MVP 성공 지표 (런칭 후 3개월 이내 목표)
| 지표                     | 목표 값           |
|--------------------------|-------------------|
| 월간 활성 사용자 (MAU)   | 2,000명 이상      |
| 생성된 MVP 기획서 수     | 500개 이상        |
| 평균 기획 완료율         | 65% 이상          |
| 템플릿 평균 완료 시간    | 2.5시간 이내      |
| 프리미엄 구독 전환율     | 12~18%            |

### 3. 사용자 페르소나
| 페르소나           | 설명                                   | 주요 니즈                              |
|--------------------|----------------------------------------|----------------------------------------|
| 솔로프레너 (주 타겟) | 사이드 프로젝트나 1인 창업 준비 중     | 체계적인 기획 없이 실패하는 것 방지    |
| 프리랜서 개발자    | 혼자 SaaS·앱 만들고 있는 사람          | 빠르게 시장 검증하고 개발 시작하고 싶음 |
| 초보 창업자        | 린 스타트업 개념은 들어봤지만 적용 어려움 | 단계별로 손잡아 주는 가이드 필요       |

### 4. 기능 요구사항 (Functional Requirements)

| ID   | 기능                        | 상세 요구사항                                                                 | 우선순위 (MVP) |
|------|-----------------------------|-------------------------------------------------------------------------------|---------------|
| F-01 | 회원가입/로그인             | 이메일, Google, GitHub 소셜 로그인                                            | 필수          |
| F-02 | 새 MVP 기획 시작            | 산업·유형 선택 후 템플릿 생성 (SaaS, 콘텐츠, 이커머스, 앱 등)                 | 필수          |
| F-03 | 단계별 위자드 UI            | 1. 문제 정의 → 2. 고객 세그먼트 → 3. 가치 제안 → 4. 솔루션 → 5. 가설 → 6. MVP 스펙 → 7. 검증 계획 (7단계) | 필수          |
| F-04 | Lean Canvas 자동 생성        | 입력한 내용 실시간으로 Lean Canvas 9칸에 매핑                                  | 필수          |
| F-05 | 기능 우선순위 매트릭스      | MoSCoW 방식 또는 Kano 모델로 드래그앤드롭 우선순위 지정                        | 필수          |
| F-06 | 검증 설문 자동 생성         | “구매 의향”, “가장 중요한 기능” 등 5~8개 질문 자동 생성 및 커스터마이징 가능   | 필수          |
| F-07 | 로드맵 타임라인 빌더        | 드래그앤드롭으로 아이데이션 → MVP 개발 → 테스트 → 피벗 여부 타임라인 생성     | 필수          |
| F-08 | 진행률 대시보드             | 전체 진행률 퍼센트, 이번 주 해야 할 액션 아이템 자동 추천                      | 필수          |
| F-09 | 기획서 내보내기             | PDF, Notion 링크, Markdown, 이미지로 다운로드                                 | 필수          |
| F-10 | 템플릿 라이브러리           | 커뮤니티·전문가가 만든 산업별 템플릿 20개 이상 제공                            | 필수          |
| F-11 | AI 기획 도우미 (프리미엄)   | 입력된 내용 기반으로 자동 가설 제안, 경쟁사 분석, 기능 추천 (OpenAI 연동)     | Phase 2       |
| F-12 | 기획서 공유 및 피드백       | 공개 링크 생성 → 다른 사용자에게 피드백 요청 가능                              | Phase 2       |
| F-13 | 알림 시스템                 | “오늘은 가설 검증 단계입니다” 등 단계별 푸시·이메일 알림                      | 중요          |
| F-14 | 다크모드 / 다국어           | 한국어·영어 자동 감지 및 전환                                                 | 중요          |

### 5. 비기능 요구사항 (Non-Functional Requirements)
| 카테고리     | 요구사항                        | 기준                              |
|--------------|---------------------------------|-----------------------------------|
| 성능         | 페이지 로드 시간                | 1.8초 이내 (3G 기준)              |
| 가용성       | 서비스 uptime                   | 99.7% 이상                        |
| 보안         | 개인정보 보호                   | GDPR·한국 개인정보보호법 준수     |
| 접근성       | WCAG 2.1                        | Level AA 준수                     |
| 저장         | 자동 저장 주기                  | 10초마다 자동 저장                |
| 오프라인     | 일부 기능 오프라인 지원         | PWA 형태로 진행 중인 기획서 저장 가능 |
| 모바일       | 반응형 웹                       | 모바일 사용률 70% 이상 목표       |

### 6. 주요 사용자 흐름 (Main User Flow)
1. 로그인 → “새 MVP 기획 시작하기” 클릭  
2. 산업·유형 선택 → 빈 템플릿 생성  
3. 7단계 위자드 순서대로 입력 (각 단계마다 예시·팁 제공)  
4. 실시간으로 Lean Canvas와 로드맵이 업데이트됨  
5. 완료 → 기획서 PDF 다운로드 또는 공유 링크 생성  
6. 알림으로 “다음 주에 검증 시작하세요” 리마인드

### 7. 데이터 모델 (주요 컬렉션)
- Users (id, name, email, provider, subscription)
- Projects (id, user_id, title, industry, stage, lean_canvas JSON, roadmap JSON, created_at)
- Templates (id, title, industry, content JSON, is_public, downloads)
- Feedbacks (id, project_id, commenter_id, content, rating)

### 8. MVP 출시 범위 요약
필수 기능만 포함: F-01 ~ F-10, F-13, F-14  
총 12개 기능 + 관리자 패널  
예상 개발 기간: 8~10주 (프론트엔드 1명 + 백엔드 1명 기준)

### 9. 로드맵
| Phase   | 기간         | 주요 추가 기능                          |
|---------|--------------|-----------------------------------------|
| Phase 1 | 0~3개월      | MVP 출시 및 안정화                      |
| Phase 2 | 4~6개월      | AI 도우미, 기획서 공유·피드백, 프리미엄 구독 |
| Phase 3 | 7~12개월     | 커뮤니티 마켓플레이스, 모바일 앱 출시    |

이 PRD는 1인 기업가가 혼자서도 린 스타트업 방법론을 100% 따를 수 있도록 설계되었습니다.  
추가 논의나 와이어프레임 작업이 필요하시면 언제든 말씀해주세요!

---

# AI 모델별 "1인 기업가용 MVP 기획 템플릿 웹서비스" 내용 비교 및 정리

아래는 제공된 4개 DOCUMENT (Gemini, Grok, ChatGPT, Claude)의 내용을 주제별로 비교하고 정리한 것입니다. 각 AI의 출력은 "1인 기업가용 MVP 기획 템플릿 웹서비스"라는 동일한 아이디어를 기반으로 하며, 린 스타트업(Lean Startup) 방법론과 템플릿 중심의 기획 프로세스를 강조합니다. 공통점은 많으나, 세부 접근(예: 기능 세분화, 기술 스택 선택, PRD 상세도)에서 차이가 있습니다.

- **공통 테마**: 1인 기업가(솔로프레너) 타겟, 린 스타트업 원칙 적용(문제 정의 → 가설 → MVP 범위 → 검증 → 실행), 템플릿 기반 단계별 가이드, 자동 산출물(PDF 등) 생성.
- **차이점**: Gemini는 사용자 스토리 중심, Grok은 PRD 상세, ChatGPT는 UI/UX 초점, Claude는 5단계 템플릿과 API 세부.
- **기술 스택 업데이트**: 2025년 12월 10일 기준 최신 버전으로 통합 정리 (웹 검색 결과 기반: React 19.2.1, Next.js 16 (patched 16.0.7+ for CVE), Node.js 24.11.1 LTS 등).

## 1. 서비스 개요 비교

| 항목          | Gemini (p16-w03-3-gemini.md) | Grok (p16-w03-3-grok.md) | ChatGPT (p16-w03-3-chatgpt.md) | Claude (p16-w03-3-claude.md) |
|---------------|------------------------------|---------------------------|--------------------------------|-------------------------------|
| **서비스 이름** | 없음 (MVP 공유 웹서비스로 시작, 후속으로 1인 기업가용으로 전환) | SoloMVP Forge | MVP Studio | 없음 (제품 요구사항 명세서 중심) |
| **목적**     | 린 스타트업 기반 MVP 기획 자동화, 검증 기반 MVP 구축, 실행 가능한 산출물 생성 | 린 스타트업 방법론 기반 MVP 아이데이션/개발 프로세스 템플릿 제공, 시장 검증 위험 감소 | 린 스타트업 구조화된 기획, 템플릿 따라 자연스러운 완성, 최소 노력으로 문서 생성 | 린 스타트업 방법론 적용 템플릿 플랫폼, 구조화된 사고/검증/실행/학습 지원 |
| **문제 해결** | 1인 기업가의 시간/비용 낭비, 검증 부족 | 자원 제한으로 기획 체계화 어려움, 기존 도구 미특화 | 기획 시작/범위 정의 어려움, 시간 과다 소비 | 아이디어 시작/검증/실행/PRD 작성 어려움 |
| **타겟 유저** | 1인 기업가/솔로프레너 (20~40대 테크 관심층) | 1인 기업가/프리랜서 개발자/사이드 프로젝트 창업자 (20~40대 테크/비즈니스) | 1인 기업가/사이드 프로젝트 개발자/디자이너/PM | 1인 기업가/솔로프레너/사이드 프로젝트 개발자/노코드 빌더/비기술 창업자 |
| **예상 규모/성장** | 초기 500명, LinkedIn/Reddit 성장 | 초기 500명, LinkedIn/Reddit 성장 | 명시 없음 | 명시 없음 (MVP 성공 지표: MAU 2,000명) |

**정리**: 모든 AI가 1인 기업가의 기획 어려움을 린 스타트업으로 해결하는 데 초점. Grok과 ChatGPT가 이름 제안, Gemini/Claude가 기능/프로세스 중심. 공통 문제: 체계 부족, 시간 낭비.

## 2. 주요 기능 비교

기능은 린 스타트업 단계(문제 정의 → 가설 → MVP 정의 → 검증 → 산출물)를 따라 분류. 각 AI의 세부 기능은 테이블로 비교.

| 기능 카테고리 | Gemini | Grok | ChatGPT | Claude |
|---------------|--------|------|---------|--------|
| **아이디어 등록/문제 정의** | 아이디어 등록/Lean Canvas, 문제 정의/가설 설정 | 문제 정의/가설 설정, 아이디어 브레인스토밍 (AI 도우미) | 문제 정의/Persona/가설/Value Proposition/경쟁 분석 | 문제 발견 (Problem Statement, 타겟 고객, 대안 분석) |
| **MVP 기획/범위 설정** | MVP 정의/MoSCoW 우선순위 | MVP 스펙 정의/MoSCoW, 로드맵 빌더 | MVP 정의/Features Prioritization (Must/Should/Could) | 솔루션 정의, MVP 범위 설정 (기능 우선순위 매트릭스, 사용자 플로우) |
| **검증/측정** | 측정/검증 계획 (Metric/AARRR) | 피드백 설문 생성, 메트릭스 트래킹 | 검증 계획/Validation Plan, 지표 정의/Metrics | 검증 계획 (Pre/Post-MVP, 지표, 피드백 수집) |
| **산출물/공유** | PDF 기획서 자동 생성 | 기획서 내보내기 (PDF/Notion/Markdown), 템플릿 공유 | 자동 기획 문서 생성 (PDF/MD), 웹뷰 기획서 | 자동 PRD 생성, 문서화 (Lean Canvas, Gantt Chart 등) |
| **기타 (커뮤니티/관리)** | 프로젝트 관리/대시보드, 자동 저장 | 진척도 추적/알림, 소셜 연동, 템플릿 라이브러리 | 프로젝트 관리 (체크리스트/To-Do), AI 추천 (후속) | 진행 상황 추적 (프로그레스 바), AI 어시스턴트 (선택) |
| **프리미엄 기능** | 심화 템플릿, PDF 클린 Export, 버전 관리 | AI 기획 도우미, 기획서 공유/피드백 | 명시 없음 | 명시 없음 (Phase 2: AI 도우미) |

**정리**: 공통: MoSCoW 우선순위, PDF 생성, 단계별 템플릿 (문제 → MVP → 검증). Grok/ChatGPT가 AI 도우미 강조, Claude가 상세 질문/자동 생성 결과 중심. Gemini가 워크플로우/화면 구성 구체적.

## 3. 사용자 여정/플로우 비교

| AI      | 주요 흐름 |
|---------|-----------|
| **Gemini** | 회원가입 → 프로젝트 생성 → Lean Canvas → 문제/가설 → MVP 범위 → 검증 계획 → PDF 다운로드 |
| **Grok** | 로그인 → 새 기획 시작 → 산업 선택 → 7단계 위자드 (문제 → 고객 → 가치 → 솔루션 → 가설 → MVP → 검증) → Lean Canvas/로드맵 업데이트 → PDF 다운로드/공유 → 알림 |
| **ChatGPT** | 로그인 → 새 프로젝트 → 질문 기반 입력 → 섹션 자동 생성 → 기획 문서 생성 → 검증/실행 로드맵 → PDF 저장/공유 |
| **Claude** | 문제 발견 → 솔루션 정의 → MVP 범위 → 검증 계획 → 실행 로드맵 (각 단계: 질문 → 답변 → 자동 요약) |

**정리**: 모든 AI가 단계별 위자드 UI 강조. Grok/Claude가 5~7단계 세분화, Gemini/ChatGPT가 간단 흐름. 공통: 자동 저장/진행률 표시.

## 4. 기술 스택 비교 (2025년 12월 10일 최신 버전 업데이트)

각 AI의 제안 스택을 비교하고, 웹 검색 기반 최신 버전으로 통합. 로컬 환경 최적화 공통.

| 카테고리 | Gemini (PostgreSQL 중심) | Grok (MongoDB 중심) | ChatGPT (PostgreSQL 중심) | Claude (PostgreSQL 중심) | **통합 추천 (최신 버전)** |
|----------|---------------------------|----------------------|----------------------------|---------------------------|----------------------------|
| **Frontend** | React 19.2.1, Next.js 16.0.8, TypeScript, Zustand 5.0.9, Tailwind CSS 4.1.17 | Next.js 16.1.0 (React 기반) | React 19.2.1, Next.js 16.0.8, TypeScript 6.x, Zustand 5.x, Tailwind CSS 4.x | Next.js 16.0.8 (React 19.2.1), TypeScript 5.7+, Tailwind CSS 3.4, shadcn/ui, Zustand 5.0+ | Next.js 16 (patched 16.0.7+ for CVE-2025-66478), React 19.2.1, TypeScript 5.7+ (TS 7 in progress), Zustand 5.0, Tailwind CSS 4.1.17 |
| **Backend** | Node.js v24.x LTS, Express v5.2.1 | Node.js 24.11.1 LTS, Express 5.2.0 | Node.js 24 LTS, Express 5.x | Bun 1.3.4, Hono 4.7+, Lucia Auth 3+ | Node.js 24.11.1 LTS or Bun 1.3.4, Express 5.2 (patched for issues) or Hono 4.7+ |
| **Database/ORM** | PostgreSQL v18.1, Prisma v7.1.0 | MongoDB 8.2.2, Mongoose 9.0.1 | PostgreSQL 18, Prisma 7.x | PostgreSQL 17, Drizzle ORM 0.45.0 | PostgreSQL 18.1 or MongoDB 8.2.2, Prisma 7.1.0 or Drizzle 0.45.0 or Mongoose 9.0.1 |
| **기타 도구** | Docker/Compose, Git | Nodemailer 7.0.11, jsonwebtoken 9.0.3, OpenAI 6.10.0 | SQLite 3.x (로컬), OpenAI API | Sharp 0.34+, Redis 7, Vitest 3+ | OpenAI 6.10.0, Nodemailer 7.0.11, jsonwebtoken 9.0.3, Docker for 로컬 |
| **링크/비고** | 최신 LTS 중심, 로컬 Docker | MongoDB 로컬, AI 연동 옵션 | 로컬/경량, AI 가이드 | Bun으로 고속, 보안 패치 강조 (CVE-2025-55182/66478) | 로컬 최적화, 보안 패치 필수 (React/Next.js CVE 적용) |

**정리**: Grok이 MongoDB/NoSQL, 나머지 PostgreSQL/관계형. Claude가 Bun/Hono로 현대적/고속, Gemini/ChatGPT가 Prisma로 ORM 편의. 추천: PostgreSQL + Prisma (스케일링 좋음), Bun으로 개발 속도 향상.

## 5. PRD / 사용자 스토리 비교

| 항목          | Gemini (사용자 스토리 중심) | Grok (PRD 상세) | ChatGPT (PRD 초안) | Claude (PRD 세부) |
|---------------|-----------------------------|------------------|--------------------|-------------------|
| **PRD 구조** | 명시 없음 (사용자 스토리만) | 문서 정보, 목적/범위, 지표, 페르소나, 기능 요구사항 (F-01~F-14), 비기능, 사용자 흐름, 데이터 모델, MVP 범위, 로드맵 | 제품 개요, 기능 (온보딩~대시보드), 비기능, 사용자 스토리, UI/UX, 정보 구조, 기술 스택, 프로젝트 범위, 성공 지표, 릴리즈 계획 | 제품 개요, 린 적용, 5단계 템플릿 (상세 질문/자동 결과), UX, 데이터 모델, API 엔드포인트, 개발 우선순위 |
| **사용자 스토리** | 1. 인증/관리, 2. 아이디어/문제, 3. MVP 범위, 4. 측정/산출물 (스토리/목적 테이블) | 명시 없음 (PRD 내 페르소나/흐름) | 1인 창업자/개발자/디자이너 중심 스토리 (간단 테이블) | 명시 없음 (PRD 내 타겟 사용자/플로우) |
| **MVP 범위** | 기본 기능 우선 (포스팅/피드백), 개발 2~3개월 | F-01~F-10/F-13/F-14 (12개 기능), 8~10주 | 포함: 템플릿/입력/AI/Export, 제외: 협업/앱 | Phase 1: 인프라, 12주 전체 |

**정리**: Grok/Claude가 PRD 가장 상세 (기능 ID, 데이터 모델, API). Gemini/ChatGPT가 사용자 스토리 테이블 강조. 공통 지표: MAU/완료율. MVP 기간: 1~3개월.

## 6. 마케팅/비즈니스 모델 비교

| AI      | 마케팅 전략 | 비즈니스 모델 |
|---------|-------------|---------------|
| **Gemini** | Reddit/LinkedIn 포스팅, 무료 샘플 | Freemium (무료: 1개 프로젝트, Premium: 무제한/심화 템플릿 $?) |
| **Grok** | Reddit(r/solopreneur)/LinkedIn, SEO 블로그, 파트너십 (no-code) | 무료 기본, 프리미엄 $4.99/월 (AI/무제한), 제휴/광고 |
| **ChatGPT** | 명시 없음 | 명시 없음 |
| **Claude** | 명시 없음 | 명시 없음 |

**정리**: Gemini/Grok이 Freemium 중심, 초기 유입 소셜/커뮤니티.

## 7. 전체 평가 및 추천

- **최고 상세도**: Claude (템플릿 질문/자동 결과 세부).
- **최고 실용성**: Grok (PRD/기술 스택 균형).
- **최고 간결성**: ChatGPT (초안/UI 초점).
- **추천 통합**: Grok의 PRD를 기반으로 Claude의 5단계 템플릿 채택, 기술 스택은 PostgreSQL + Next.js + Prisma (스케일링/ORM 편의). 추가 피드백 필요 시 말씀해주세요!