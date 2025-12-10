# 1인 기업가용 MVP 기획 템플릿 웹서비스 제품 요구사항 명세서

## 1. 제품 개요

### 1.1 제품 비전

1인 기업가와 솔로프레너가 린 스타트업 방법론을 기반으로 체계적으로 MVP를 기획하고, 검증하고, 실행할 수 있도록 돕는 가이드형 템플릿 플랫폼

### 1.2 핵심 가치 제안

- **구조화된 사고**: 복잡한 아이디어를 린 방법론에 따라 단계별로 정리
- **검증 중심**: 가정(Hypothesis)을 먼저 세우고 검증하는 문화
- **실행 가능성**: 실제로 개발할 수 있는 구체적인 MVP 스펙 도출
- **자동 문서화**: 작성한 내용이 PRD(Product Requirements Document)로 자동 변환
- **학습 경험**: 과정을 통해 자연스럽게 린 스타트업 방법론 학습

### 1.3 문제 정의

**1인 기업가가 겪는 문제**:

- ❌ 아이디어는 있지만 어디서부터 시작해야 할지 막막함
- ❌ 너무 많은 기능을 넣으려다 개발이 늦어짐
- ❌ 고객 검증 없이 개발하여 실패율 높음
- ❌ 린 스타트업 책은 읽었지만 실제 적용이 어려움
- ❌ PRD 작성 경험이 없어 기획서 작성이 버거움

### 1.4 솔루션

템플릿 기반의 **단계별 질문 → 응답 → 자동 문서 생성** 프로세스로 누구나 쉽게 MVP 기획 완성

### 1.5 타겟 사용자

**주 타겟**:

- 1인 기업가 (Solopreneur)
- 사이드 프로젝트 개발자
- 노코드 빌더
- 비기술 창업자

**부 타겟**:

- 스타트업 초기 팀 (2-3명)
- 제품 관리자 지망생
- 창업 준비생

## 2. 린 스타트업 방법론 적용

### 2.1 핵심 원칙

1. **Build-Measure-Learn Loop**: 빠른 실험과 학습
2. **Validated Learning**: 데이터 기반 의사결정
3. **MVP First**: 최소 기능으로 빠르게 검증
4. **Pivot or Persevere**: 데이터에 따라 방향 전환
5. **Innovation Accounting**: 진행 상황 측정

### 2.2 적용 방식

이 서비스는 사용자가 **린 방법론을 자연스럽게 따르도록** 템플릿을 설계:

- 가정(Hypothesis) 먼저 작성
- 검증 방법 구체화
- 측정 가능한 지표 설정
- 최소 기능 집합 정의

## 3. 서비스 구조: 5단계 템플릿

### 3.1 전체 프로세스

```
1️⃣ 문제 발견 (Problem Discovery)
   ↓
2️⃣ 솔루션 정의 (Solution Definition)
   ↓
3️⃣ MVP 범위 설정 (MVP Scoping)
   ↓
4️⃣ 검증 계획 (Validation Plan)
   ↓
5️⃣ 실행 로드맵 (Execution Roadmap)
```

각 단계는 **질문 → 답변 → 자동 요약** 형태로 진행

---

## 4. 상세 기능 요구사항

### 4.1 Stage 1: 문제 발견 (Problem Discovery)

#### 4.1.1 목표

사용자가 해결하려는 **진짜 문제**를 명확히 정의

#### 4.1.2 템플릿 질문들

**섹션 A: 문제 정의**

1. **어떤 문제를 해결하고 싶나요?** (필수, 500자)
    
    - 가이드: "고객이 겪는 구체적인 불편함을 작성하세요"
    - 예시: "프리랜서들이 프로젝트 견적을 작성할 때 매번 처음부터 만들어야 해서 시간이 오래 걸립니다"
2. **이 문제는 얼마나 자주 발생하나요?** (객관식)
    
    - [ ] 매일
    - [ ] 주 1-2회
    - [ ] 월 1-2회
    - [ ] 가끔
3. **이 문제로 인한 비용/손실은?** (텍스트)
    
    - 시간, 돈, 기회비용 등

**섹션 B: 타겟 고객** 4. **누가 이 문제를 겪고 있나요?** (필수, 300자)

- 페르소나 작성 유도
- 예시: "프리랜서 디자이너, 30대, 월 5-10개 프로젝트 수주"

5. **타겟 고객은 몇 명 정도인가요?** (시장 규모)
    - 가이드: "한국 또는 글로벌 시장에서 예상 고객 수"

**섹션 C: 현재 대안** 6. **사람들은 지금 이 문제를 어떻게 해결하나요?**

- 경쟁사, 대체재, 수동 작업 등
- 가이드: "현재 솔루션의 한계점을 파악하세요"

7. **현재 솔루션의 한계는?**
    - 불편한 점, 비용, 시간 등

#### 4.1.3 자동 생성 결과

- **Problem Statement** (문제 정의서)
- **Target Customer Profile** (타겟 고객 프로필)
- **Competitive Landscape** (경쟁 환경)

---

### 4.2 Stage 2: 솔루션 정의 (Solution Definition)

#### 4.2.1 목표

문제에 대한 **최적의 솔루션**을 구체화하고, 핵심 가치 제안 도출

#### 4.2.2 템플릿 질문들

**섹션 A: 솔루션 개요**

1. **어떤 방식으로 문제를 해결하나요?** (필수, 500자)
    
    - 핵심 기능/접근법
    - 예시: "템플릿 라이브러리 + 자동 계산기를 제공하여 5분 내 견적서 완성"
2. **다른 솔루션과 차별점은?** (USP)
    
    - 왜 고객이 당신 제품을 선택해야 하나?
3. **한 문장으로 요약한다면?** (Tagline)
    
    - 예시: "프리랜서를 위한 5분 견적서 메이커"

**섹션 B: 가치 제안** 4. **고객이 얻는 가장 큰 혜택은?** (Value Proposition)

- 시간 절약? 비용 절감? 품질 향상?

5. **고객이 지불할 가치가 있나요?**
    - [ ] 무료로 제공
    - [ ] 프리미엄 ($1-10/월)
    - [ ] 프로페셔널 ($10-50/월)
    - [ ] 엔터프라이즈

**섹션 C: 핵심 가정 (Hypothesis)** 6. **검증해야 할 핵심 가정 3가지는?** (필수)

- 예시 1: "프리랜서들이 견적서 작성에 평균 30분 이상 소요한다"
- 예시 2: "템플릿만 있으면 견적서 작성 시간이 5분으로 줄어든다"
- 예시 3: "프리랜서들은 이를 위해 월 $10를 지불할 의향이 있다"

#### 4.2.3 자동 생성 결과

- **Solution Overview** (솔루션 개요)
- **Value Proposition Canvas** (가치 제안 캔버스)
- **Key Hypotheses** (핵심 가정 리스트)

---

### 4.3 Stage 3: MVP 범위 설정 (MVP Scoping)

#### 4.3.1 목표

**최소 기능 집합**을 정의하고 불필요한 기능 제거 (린 접근)

#### 4.3.2 템플릿 질문들

**섹션 A: 필수 기능**

1. **MVP에서 반드시 포함해야 할 기능은?** (최대 5개)
    
    - 각 기능별 우선순위 설정 (High/Medium/Low)
    - 각 기능의 목적 설명
    - 예시:
        
        ```
        기능 1: 템플릿 선택 (High)- 목적: 사용자가 빠르게 시작할 수 있도록기능 2: 견적 항목 입력 (High)- 목적: 맞춤형 견적서 생성
        ```
        
2. **나중에 추가할 기능은?** (Nice-to-have)
    
    - v2, v3에 포함할 기능들
    - 지금 넣으면 출시가 늦어지는 기능

**섹션 B: 사용자 플로우** 3. **사용자가 제품을 어떻게 사용하나요?** (Step-by-step)

- 회원가입부터 핵심 기능 사용까지
- 예시:
    
    ```
    1. 회원가입/로그인2. "견적서 만들기" 클릭3. 템플릿 선택 (3가지 중 1개)4. 항목 입력 (품목, 수량, 단가)5. 자동 계산된 견적서 확인6. PDF 다운로드 또는 공유
    ```
    

**섹션 C: 제외 항목** 4. **의도적으로 MVP에서 제외할 것은?**

- 왜 제외하나요?
- 가이드: "나중에 추가해도 되는 것, 복잡도가 높은 것"

#### 4.3.3 기능 우선순위 매트릭스 (자동 생성)

사용자가 입력한 기능들을 자동으로 분류:

|구분|설명|예시|
|---|---|---|
|Must Have|MVP 필수 기능|로그인, 템플릿 선택, 견적 생성|
|Should Have|중요하지만 v1.1 가능|견적서 히스토리, 템플릿 커스터마이징|
|Could Have|있으면 좋지만 나중에|팀 협업, API 연동|
|Won't Have|v1에서 제외|AI 자동 견적, 다국어 지원|

#### 4.3.4 자동 생성 결과

- **MVP Feature List** (MVP 기능 목록)
- **User Flow Diagram** (사용자 플로우 다이어그램, Mermaid)
- **Feature Prioritization Matrix** (기능 우선순위 매트릭스)

---

### 4.4 Stage 4: 검증 계획 (Validation Plan)

#### 4.4.1 목표

MVP 출시 전/후 **어떻게 검증할지** 구체적인 계획 수립

#### 4.4.2 템플릿 질문들

**섹션 A: 사전 검증 (Pre-MVP)**

1. **MVP 개발 전에 어떻게 검증할 건가요?**
    
    - [ ] 랜딩 페이지 + 대기자 명단
    - [ ] 설문조사 (최소 50명)
    - [ ] 고객 인터뷰 (최소 10명)
    - [ ] Figma/Mockup 피드백
    - [ ] 기타: ___________
2. **검증 목표 지표는?**
    
    - 예시: "랜딩 페이지 방문자 중 20% 이상이 이메일 등록"
    - 예시: "인터뷰 10명 중 7명이 '확실히 사용하겠다' 응답"

**섹션 B: MVP 검증 (Post-MVP)** 3. **MVP 출시 후 측정할 지표는?** (최대 5개)

- 가이드: "AAARRR 프레임워크 참고"
- 예시:
    
    ```
    지표 1: 주간 활성 사용자 (WAU) 100명지표 2: 견적서 생성 완료율 60%지표 3: 유료 전환율 5%지표 4: NPS (Net Promoter Score) 50+지표 5: 주간 리텐션 30%
    ```
    

4. **어떤 도구로 측정하나요?**
    - Google Analytics, Mixpanel, Hotjar 등

**섹션 C: 성공/실패 기준** 5. **어떤 결과가 나오면 성공인가요?**

- 구체적인 수치 목표
- 예시: "첫 달에 유료 고객 10명, MRR $100"

6. **어떤 결과가 나오면 Pivot을 고려하나요?**
    - 예시: "3개월 동안 유료 전환이 1명도 없을 경우"

**섹션 D: 피드백 수집** 7. **어떻게 사용자 피드백을 수집하나요?**

- [ ] 인앱 설문
- [ ] 이메일 설문
- [ ] 1:1 사용자 인터뷰
- [ ] 지원 채팅
- [ ] NPS 설문

#### 4.4.3 자동 생성 결과

- **Validation Roadmap** (검증 로드맵)
- **Success Metrics Dashboard** (성공 지표 대시보드 설계)
- **Experiment Canvas** (실험 캔버스)

---

### 4.5 Stage 5: 실행 로드맵 (Execution Roadmap)

#### 4.5.1 목표

**언제, 무엇을, 어떻게** 개발/출시할지 구체적인 실행 계획

#### 4.5.2 템플릿 질문들

**섹션 A: 개발 계획**

1. **개발 기간은 얼마나 예상하나요?**
    
    - [ ] 2주 이내
    - [ ] 1개월
    - [ ] 2-3개월
    - [ ] 3개월 이상
2. **직접 개발하나요, 외주인가요?**
    
    - [ ] 직접 개발 (기술 스택: _________)
    - [ ] 외주 개발 (예산: _________)
    - [ ] 노코드 툴 (Bubble, Webflow 등)
    - [ ] AI 도구 활용 (v0, Cursor 등)
3. **기술 스택은?** (선택)
    
    - 프론트엔드, 백엔드, 데이터베이스 등

**섹션 B: 마일스톤** 4. **주요 마일스톤은?** (최대 5개)

- 예시:
    
    ```
    Week 1-2: 디자인 & DB 설계Week 3-4: 핵심 기능 개발Week 5: 베타 테스트Week 6: 공식 런칭
    ```
    

**섹션 C: 출시 전략** 5. **어디에 먼저 출시하나요?**

- [ ] 비공개 베타 (친구/지인)
- [ ] Product Hunt
- [ ] 특정 커뮤니티 (Reddit, 디스코드 등)
- [ ] SNS (트위터, 링크드인 등)

6. **초기 사용자를 어떻게 모을 건가요?**
    - 구체적인 마케팅 채널

**섹션 D: 예산 & 리소스** 7. **예상 비용은?**

- 개발 비용
- 인프라 비용 (호스팅, DB)
- 마케팅 비용

8. **혼자 하나요, 팀이 있나요?**
    - 역할 분담

#### 4.5.3 자동 생성 결과

- **Gantt Chart** (간트 차트, 타임라인)
- **Budget Breakdown** (예산 분석)
- **Launch Checklist** (출시 체크리스트)

---

## 5. 핵심 UX 기능

### 5.1 진행 상황 추적

- **프로그레스 바**: 5단계 중 현재 위치 표시
- **완료율**: 각 단계별 답변 완료율 (%)
- **저장 기능**: 자동 저장, 언제든지 돌아와서 이어쓰기

### 5.2 가이드 & 힌트

- **질문마다 가이드 텍스트**: 무엇을 써야 할지 명확히 안내
- **예시 제공**: 실제 성공 사례 기반 예시
- **틀린 답 피드백**: 너무 모호하거나 구체성이 떨어지면 경고
    - 예: "타겟 고객이 '모든 사람'이면 너무 광범위합니다. 더 구체적으로 작성해주세요"

### 5.3 템플릿 & 프리셋

- **산업별 템플릿**: SaaS, 커머스, 마켓플레이스 등
- **프리셋 질문**: 선택한 산업에 맞는 추가 질문 자동 생성

### 5.4 AI 어시스턴트 (선택 기능)

- **AI 피드백**: 사용자가 작성한 답변에 대해 개선 제안
- **예시 생성**: 막막할 때 AI가 초안 생성
- **자동 요약**: 긴 답변을 짧게 요약

---

## 6. 결과물: 자동 생성 문서

### 6.1 MVP PRD (Product Requirements Document)

사용자가 5단계를 완료하면 자동으로 생성:

**구성**:

```markdown
# [제품명] MVP 제품 요구사항 명세서

## 1. Executive Summary
- 한 문장 요약 (Tagline)
- 문제 정의
- 솔루션 개요
- 타겟 고객

## 2. Problem & Solution
- Problem Statement
- Solution Overview
- Value Proposition
- Competitive Analysis

## 3. MVP Scope
- Must-Have Features
- Should-Have Features
- Won't-Have Features
- User Flow

## 4. Success Metrics
- Pre-MVP Validation
- Post-MVP Metrics
- Success Criteria
- Pivot Triggers

## 5. Execution Plan
- Development Timeline
- Tech Stack
- Launch Strategy
- Budget

## 6. Key Hypotheses
- Hypothesis 1: [검증 방법]
- Hypothesis 2: [검증 방법]
- Hypothesis 3: [검증 방법]
```

### 6.2 추가 산출물

- **Lean Canvas** (1페이지 비즈니스 모델 캔버스)
- **Feature Roadmap** (기능 로드맵)
- **Experiment Plan** (실험 계획서)
- **Pitch Deck** (간단한 피치 덱, 5-10장)

### 6.3 내보내기 형식

- PDF (인쇄용)
- Markdown (GitHub, Notion 호환)
- Google Docs 내보내기
- Notion 템플릿 복사

---

## 7. 추가 기능

### 7.1 대시보드

- 진행 중인 프로젝트 목록
- 완료율 표시
- 최근 작업 이력

### 7.2 버전 관리

- MVP v1, v2 등 여러 버전 관리
- Pivot 기록
- 변경 이력 추적

### 7.3 커뮤니티 (선택)

- 다른 사용자의 MVP 계획 구경 (공개 설정 시)
- 피드백 교환
- 성공 사례 공유

### 7.4 리소스 라이브러리

- 린 스타트업 가이드
- MVP 체크리스트
- 검증 방법론 템플릿
- 성공 사례 분석

---

## 8. 화면 구성

### 8.1 주요 화면

1. **랜딩 페이지**
    
    - 서비스 소개
    - 5단계 프로세스 시각화
    - "무료로 시작하기" CTA
2. **회원가입/로그인**
    
    - 이메일 또는 소셜 로그인
3. **대시보드**
    
    - 프로젝트 카드 그리드
    - "새 프로젝트 시작" 버튼
    - 진행률 표시
4. **프로젝트 생성**
    
    - 프로젝트명 입력
    - 산업 선택 (SaaS, E-commerce, Tool 등)
    - 템플릿 선택 (기본 / 산업별)
5. **5단계 작성 화면**
    
    - 좌측: 단계 네비게이션 (1-5)
    - 중앙: 질문 폼
    - 우측: 가이드 & 힌트 패널
6. **미리보기 화면**
    
    - 작성한 내용을 PRD 형태로 실시간 미리보기
    - 섹션별 점프 기능
7. **결과물 화면**
    
    - 생성된 PRD, Lean Canvas 등
    - 다운로드/공유 버튼
    - 인쇄 최적화 뷰
8. **설정 화면**
    
    - 프로필 정보
    - 프로젝트 관리
    - 내보내기 설정

### 8.2 네비게이션

- 상단: 로고, 대시보드, 리소스, 프로필
- 진행 중 화면: 단계별 프로그레스 바 (1-5)

---

## 9. 기술 스택 (로컬 환경 - 2025년 12월 최신 버전)

### 9.1 프론트엔드

**프레임워크 & 런타임**:

- **Next.js 16.0.8** (2025년 12월 7일 최신)
    
    - 📦 [NPM](https://www.npmjs.com/package/next)
    - 🔗 [공식 문서](https://nextjs.org/docs)
    - ⚠️ **중요**: CVE-2025-66478 (CVSS 10.0) 보안 패치 적용 필수
    - Turbopack 빌드 (안정화)
    - Cache Components (PPR + use cache)
    - Next.js DevTools MCP 지원
- **React 19.2.1** (2025년 12월 3일 최신)
    
    - 📦 [NPM](https://www.npmjs.com/package/react)
    - 🔗 [공식 블로그](https://react.dev/blog/2025/10/01/react-19-2)
    - ⚠️ **보안 패치**: CVE-2025-55182 수정 (RSC 취약점)
    - Activity API (visible/hidden 모드)
    - useEffectEvent Hook
    - Web Streams for SSR in Node.js
    - React Performance Tracks
    - React Compiler 1.0 (자동 메모이제이션)

**언어 & 스타일**:

- **TypeScript 5.7+**
    - 🔗 [공식 문서](https://www.typescriptlang.org/)
- **Tailwind CSS 3.4** (안정 버전) 또는 **4.0 beta**
    - 📦 [NPM](https://www.npmjs.com/package/tailwindcss)
    - 🔗 [공식 문서](https://tailwindcss.com/)

**UI 컴포넌트 & 폼**:

- **shadcn/ui** (Radix UI 기반, React 19 호환)
    - 🔗 [공식 사이트](https://ui.shadcn.com/)
- **React Hook Form 7.54+**
    - 📦 [NPM](https://www.npmjs.com/package/react-hook-form)
- **Zod 3.24+** (검증)
    - 📦 [NPM](https://www.npmjs.com/package/zod)

**마크다운 & 다이어그램**:

- **react-markdown 9+**
    - 📦 [NPM](https://www.npmjs.com/package/react-markdown)
- **Mermaid.js** (플로우차트, 간트 차트)
    - 📦 [NPM](https://www.npmjs.com/package/mermaid)
    - 🔗 [공식 문서](https://mermaid.js.org/)

**PDF 생성**:

- **react-pdf** 또는 **Puppeteer**
    - 📦 [react-pdf NPM](https://www.npmjs.com/package/@react-pdf/renderer)
    - 📦 [Puppeteer NPM](https://www.npmjs.com/package/puppeteer)

**상태 관리 & 아이콘**:

- **Zustand 5.0+** (4.9kb, 의존성 제로)
    - 📦 [NPM](https://www.npmjs.com/package/zustand)
- **Lucide React 0.460+**
    - 📦 [NPM](https://www.npmjs.com/package/lucide-react)

### 9.2 백엔드

**런타임** (권장):

- **Bun 1.3.4** (2025년 12월 6일 최신)
    - 📦 [공식 사이트](https://bun.com/)
    - 🔗 [GitHub](https://github.com/oven-sh/bun)
    - 🎉 **뉴스**: 2025년 12월 2일 Anthropic에 인수됨
    - **주요 업데이트**:
        - URLPattern API 지원
        - Fake Timers for bun:test
        - Custom Proxy Headers in fetch()
        - SQLite 3.51.1 내장
        - HTTP Agent 연결 풀링 개선
    - **특징**:
        - Node.js 대비 5-8x 빠른 시작
        - 내장 TypeScript, 번들러, 테스트 러너
        - 내장 PostgreSQL, MySQL, SQLite, Redis 클라이언트
        - MIT 라이선스 (오픈소스 유지)

**프레임워크**:

- **Hono 4.7+** (경량, Edge 최적화, 14kb)
    - 📦 [NPM](https://www.npmjs.com/package/hono)
    - 🔗 [공식 문서](https://hono.dev/)
- 대안: **Elysia 1.2+** (Bun 최적화)
    - 📦 [NPM](https://www.npmjs.com/package/elysia)

**ORM**:

- **Drizzle ORM 0.45.0** (2025년 12월 4일 최신)
    - 📦 [NPM](https://www.npmjs.com/package/drizzle-orm)
    - 🔗 [공식 문서](https://orm.drizzle.team/)
    - 🔗 [GitHub](https://github.com/drizzle-team/drizzle-orm)
    - **특징**:
        - 7.4kb, 의존성 제로
        - TypeScript 네이티브
        - v1.0.0-beta.2 진행 중 (2025년 2월 예정)
        - MSSQL 지원 추가 (베타)
        - RQBv2 (Relations Query Builder v2)
    - **동반 도구**:
        - Drizzle Kit (마이그레이션)
        - Drizzle Studio (DB GUI)

**인증 & 보안**:

- **Lucia Auth 3+** (모던 인증)
    - 📦 [NPM](https://www.npmjs.com/package/lucia)
    - 🔗 [공식 문서](https://lucia-auth.com/)
- **Argon2id** (비밀번호 해싱, bcrypt 대체)
    - 📦 [NPM](https://www.npmjs.com/package/argon2)
- **jose 5+** (JWT, JWE)
    - 📦 [NPM](https://www.npmjs.com/package/jose)

**검증 & API**:

- **Zod 3.24+**
- **Hono OpenAPI** (API 문서)
    - 🔗 [문서](https://hono.dev/docs/helpers/openapi)

**이메일** (선택):

- **Resend** (API 기반, 개발자 친화적)
    - 🔗 [공식 사이트](https://resend.com/)
- **Nodemailer 6.9+** (로컬 SMTP)
    - 📦 [NPM](https://www.npmjs.com/package/nodemailer)

### 9.3 데이터베이스 (로컬 설치)

**주 데이터베이스** (하나 선택):

1. **PostgreSQL 17+** (2025년 최신, Docker 권장)
    
    - 🔗 [공식 사이트](https://www.postgresql.org/)
    - 🐳 Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:17-alpine`
    - **장점**: 강력한 기능, JSON 지원, Full-text search
2. **SQLite 3.51.1+** (Bun 내장, 설치 불필요)
    
    - 🔗 [공식 사이트](https://www.sqlite.org/)
    - **장점**: 설정 불필요, 단일 파일, 백업 용이
    - **단점**: 동시 쓰기 제한적
    - **적합**: MVP, 소규모 프로젝트

**캐시** (선택사항):

- **Redis 7.4+** (로컬 설치)
    - 🔗 [공식 사이트](https://redis.io/)
    - 🐳 Docker: `docker run -d -p 6379:6379 redis:7-alpine`
    - 용도: 세션, 실시간 카운터, 피드 캐시
    - 대안: **node-cache** (인메모리, Redis 대체)

**전체 텍스트 검색** (선택사항):

- **PostgreSQL Full-text Search** (내장, 추가 설치 불필요)
- **Meilisearch 1.12+** (로컬 설치)
    - 🔗 [공식 사이트](https://www.meilisearch.com/)
    - 🐳 Docker: `docker run -d -p 7700:7700 getmeili/meilisearch:latest`

### 9.4 파일 저장소 (로컬)

**이미지 저장** (MVP):

- **로컬 파일 시스템**: `public/uploads/` 폴더
    - **Sharp 0.34+** (이미지 처리, 리사이징)
        - 📦 [NPM](https://www.npmjs.com/package/sharp)
    - **장점**: 설정 불필요, 무료
    - **단점**: CDN 없음, 스케일링 제한

**대안** (프로덕션 대비):

- **MinIO** (셀프 호스팅 S3 호환 스토리지)
    - 🔗 [공식 사이트](https://min.io/)
    - 🐳 Docker: `docker run -d -p 9000:9000 -p 9001:9001 minio/minio server /data --console-address ":9001"`
    - S3 API 호환, 로컬에서 개발 후 S3로 전환 용이

### 9.5 개발 도구

**패키지 매니저**:

- **pnpm 9.15+** (빠르고 디스크 효율적)
    - 📦 [공식 사이트](https://pnpm.io/)
    - 또는 **Bun 내장 패키지 매니저**

**린터 & 포매터**:

- **Biome 1.9+** (Rust 기반, ESLint+Prettier 통합)
    - 📦 [NPM](https://www.npmjs.com/package/@biomejs/biome)
    - 🔗 [공식 사이트](https://biomejs.dev/)
- 대안: **ESLint 9 + Prettier 3**

**API 테스트**:

- **Bruno 1.41+** (오픈소스 Postman 대체)
    - 🔗 [공식 사이트](https://www.usebruno.com/)
- **Hoppscotch** (웹 기반)
    - 🔗 [공식 사이트](https://hoppscotch.io/)

**데이터베이스 GUI**:

- **Drizzle Studio** (내장, `drizzle-kit studio`)
- **DBeaver** (무료, 모든 DB 지원)
    - 🔗 [공식 사이트](https://dbeaver.io/)
- **TablePlus** (macOS/Windows, 유료지만 UI 우수)
    - 🔗 [공식 사이트](https://tableplus.com/)

**버전 관리**:

- **Git + GitHub/GitLab**

**개발 서버**:

- **Docker Desktop** (컨테이너 관리)
    - 🔗 [공식 사이트](https://www.docker.com/products/docker-desktop)

### 9.6 테스트

**프론트엔드**:

- **Vitest 3+** (Vite 기반, Jest 호환)
    - 📦 [NPM](https://www.npmjs.com/package/vitest)
- **React Testing Library 16+**
    - 📦 [NPM](https://www.npmjs.com/package/@testing-library/react)
- **Playwright 1.50+** (E2E)
    - 📦 [NPM](https://www.npmjs.com/package/@playwright/test)

**백엔드**:

- **Bun Test** (내장) 또는 **Vitest**
- **Supertest** (API 테스트)
    - 📦 [NPM](https://www.npmjs.com/package/supertest)

### 9.7 AI 기능 (선택사항)

**LLM**:

- **OpenAI GPT-4**
    - 🔗 [API 문서](https://platform.openai.com/docs)
- **Anthropic Claude**
    - 🔗 [API 문서](https://docs.anthropic.com/)

**용도**:

- 답변 피드백
- 예시 생성
- 자동 요약

### 9.8 배포 (프로덕션, 선택사항)

- **Vercel** (프론트엔드)
    - 🔗 [공식 사이트](https://vercel.com/)
- **Fly.io** (백엔드)
    - 🔗 [공식 사이트](https://fly.io/)
- **Railway** (풀스택 올인원)
    - 🔗 [공식 사이트](https://railway.app/)

### 9.9 로컬 개발 환경 설정

**필수 설치**:

```bash
# 1. Bun 설치 (macOS/Linux)
curl -fsSL https://bun.sh/install | bash

# 또는 npm으로 설치
npm install -g bun

# 2. PostgreSQL (Docker 권장)
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mvp_planning_tool \
  -p 5432:5432 \
  postgres:17-alpine

# 3. Redis (선택사항, Docker)
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:7-alpine

# 4. 프로젝트 생성
bunx create-next-app@latest mvp-planning-tool --typescript --tailwind --app
cd mvp-planning-tool

# 5. 의존성 설치
bun add drizzle-orm postgres
bun add -d drizzle-kit @types/node
bun add hono zod
bun add lucia @lucia-auth/adapter-drizzle
bun add react-markdown remark-gfm rehype-highlight
bun add lucide-react
```

**환경 변수** (`.env.local`):

```env
# 데이터베이스
DATABASE_URL="postgresql://postgres:password@localhost:5432/mvp_planning_tool"

# 캐시 (선택)
REDIS_URL="redis://localhost:6379"

# 세션
SESSION_SECRET="your-super-secret-key-change-in-production"

# 업로드
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=10485760  # 10MB

# AI (선택)
OPENAI_API_KEY="sk-..."
# 또는
ANTHROPIC_API_KEY="sk-ant-..."
```

### 9.10 권장 기술 스택 조합 (MVP 로컬 환경)

```yaml
프론트엔드:
  - Next.js 16.0.8
  - React 19.2.1 (보안 패치 필수)
  - TypeScript 5.7+
  - Tailwind CSS 3.4
  - shadcn/ui
  - Zustand 5.0+

백엔드:
  - Bun 1.3.4 (Anthropic 인수 후 최신)
  - Hono 4.7+
  - Drizzle ORM 0.45.0
  - Zod 3.24+
  - Lucia Auth 3+

데이터베이스:
  - PostgreSQL 17 (Docker)
  - Redis 7 (Docker, 선택)

파일 저장:
  - 로컬 파일 시스템
  - Sharp 0.34+ (이미지 처리)

개발 도구:
  - pnpm 9+ 또는 Bun
  - Biome 1.9+ (린트/포맷)
  - Drizzle Studio (DB GUI)
  - Bruno 1.41+ (API 테스트)
  - Docker Desktop

테스트:
  - Vitest 3+ (유닛)
  - Playwright 1.50+ (E2E)
```

### 9.11 중요 보안 공지 ⚠️

**React & Next.js 보안 취약점**:

1. **CVE-2025-55182** (React, CVSS 10.0)
    
    - 영향: React 19.0, 19.1.0, 19.1.1, 19.2.0
    - 패치: React 19.0.1, 19.1.2, **19.2.1** (최신) 이상 필수
    - 설명: RSC (React Server Components) 프로토콜 RCE 취약점
    - 🔗 [보안 공지](https://unit42.paloaltonetworks.com/cve-2025-55182-react-and-cve-2025-66478-next/)
2. **CVE-2025-66478** (Next.js, CVSS 10.0)
    
    - 영향: Next.js 15.x, 16.x (2025년 12월 3일 발표)
    - 패치: Next.js 16.0.7+, 15.5.7+, 15.4.8+ 등
    - 설명: RSC 프로토콜 RCE 취약점
    - **즉시 업그레이드 필수!**
    - 🔗 [Next.js 보안 공지](https://nextjs.org/blog)

**이 조합의 장점**:

- ✅ 완전한 로컬 개발 (클라우드 비용 0원)
- ✅ 2025년 12월 기준 최신 버전
- ✅ 보안 패치 적용 (CVSS 10.0 취약점 해결)
- ✅ 초고속 개발 경험 (Bun + Turbopack)
- ✅ 프로덕션 준비 가능 (Docker → 클라우드 전환 용이)
- ✅ 타입 안전성 (TypeScript + Drizzle)
- ✅ 개발자 경험 우수
- ✅ Anthropic 인수로 장기 지원 보장 (Bun)

---

## 10. 데이터 모델

### 10.1 User

```typescript
{
  id: string
  email: string
  name: string
  createdAt: DateTime
}
```

### 10.2 Project

```typescript
{
  id: string
  userId: string (FK)
  title: string
  industry: enum (SaaS, Ecommerce, Tool, etc.)
  status: enum (Draft, InProgress, Completed)
  currentStage: number (1-5)
  completionRate: number (0-100)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 10.3 StageResponse

```typescript
{
  id: string
  projectId: string (FK)
  stageNumber: number (1-5)
  questionId: string
  answer: text
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 10.4 GeneratedDocument

```typescript
{
  id: string
  projectId: string (FK)
  type: enum (PRD, LeanCanvas, Roadmap)
  content: text (Markdown)
  createdAt: DateTime
}
```

---

## 11. API 엔드포인트

### 11.1 인증

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### 11.2 프로젝트

```
GET    /api/projects              # 프로젝트 목록
POST   /api/projects              # 프로젝트 생성
GET    /api/projects/:id          # 프로젝트 상세
PUT    /api/projects/:id          # 프로젝트 수정
DELETE /api/projects/:id          # 프로젝트 삭제
```

### 11.3 단계별 응답

```
GET    /api/projects/:id/stages/:stage  # 특정 단계 응답 조회
POST   /api/projects/:id/stages/:stage  # 응답 저장
PUT    /api/projects/:id/stages/:stage  # 응답 수정
```

### 11.4 문서 생성

```
POST   /api/projects/:id/generate       # PRD, Lean Canvas 생성
GET    /api/projects/:id/documents      # 생성된 문서 목록
GET    /api/documents/:id               # 문서 조회
GET    /api/documents/:id/pdf           # PDF 다운로드
```

### 11.5 AI 어시스턴트 (선택)

```
POST   /api/ai/feedback                 # 답변 피드백
POST   /api/ai/generate-example         # 예시 생성
POST   /api/ai/summarize                # 요약
```

---

## 12. MVP 개발 우선순위 (12주)

### Phase 1 (Week 1-4): 핵심 인프라

- [ ] 프로젝트 셋업 (Next.js, B

---

제공하신 4개의 문서(ChatGPT, Claude, Gemini, Grok)를 비교 분석하여 핵심 내용을 정리하겠습니다.

## 📊 문서 비교 분석

### 1. **서비스 명칭**

|AI|서비스명|특징|
|---|---|---|
|ChatGPT|MVP Studio|직관적, 간단명료|
|Claude|(명칭 없음)|기능 중심 설명|
|Gemini|(명칭 없음)|방법론 중심|
|Grok|SoloMVP Forge|브랜딩까지 고려|

### 2. **린 스타트업 단계 구조 비교**

|AI|단계 수|핵심 단계|
|---|---|---|
|ChatGPT|10단계|문제→고객→가설→가치제안→경쟁분석→MVP→검증→지표→범위→로드맵|
|**Claude**|**5단계**|**문제발견→솔루션정의→MVP범위→검증계획→실행로드맵**|
|Gemini|9단계|Lean Canvas 중심 (아이디어→문제→MVP→검증)|
|Grok|7단계|문제→고객→가치→솔루션→가설→MVP→검증|

**✅ Claude 방식이 가장 균형잡힘**: 너무 많지도, 적지도 않은 5단계

### 3. **기술 스택 비교 (2025년 12월 기준)**

|구분|ChatGPT|Claude|Gemini|Grok|
|---|---|---|---|---|
|**프론트엔드**|Next.js 16 + React 19|**Next.js 16.0.8 + React 19.2.1**|Next.js 16 + React 19|Next.js 16.1.0|
|**백엔드**|Node.js 24 + Express 5|**Bun 1.3.4 + Hono 4.7**|Node.js 24 + Express 5|Node.js 24.11.1 + Express 5.2.0|
|**데이터베이스**|PostgreSQL 18 + Prisma 7|**PostgreSQL 17 + Drizzle 0.45**|PostgreSQL 18 + Prisma 7|MongoDB 8.2.2 + Mongoose 9|
|**ORM**|Prisma 7.x|**Drizzle ORM 0.45**|Prisma 7.x|Mongoose 9.0.1|
|**특이사항**|클라우드 서비스 일부 포함|**완전 로컬 환경, 보안 패치 강조**|로컬 환경|로컬 환경, MongoDB 중심|

**✅ Claude의 기술 스택이 가장 현대적**:

- Bun (2025년 12월 2일 Anthropic 인수)
- Drizzle ORM (경량, 타입 안전)
- 보안 취약점(CVE) 명시

### 4. **핵심 기능 비교**

|기능|ChatGPT|Claude|Gemini|Grok|
|---|---|---|---|---|
|**템플릿 작성**|✅|✅|✅|✅|
|**Lean Canvas**|✅|✅|✅|✅|
|**MoSCoW 우선순위**|✅|✅|✅|✅|
|**자동 문서 생성**|✅ (PDF/MD)|✅ (PDF/MD/Notion)|✅ (PDF)|✅ (PDF/MD/이미지)|
|**AI 어시스턴트**|✅|✅ (선택)|❌|✅ (프리미엄)|
|**가이드 & 힌트**|✅|✅ (예시 제공)|✅ (툴팁)|✅ (예시)|
|**진행률 추적**|✅|✅|✅|✅|
|**커뮤니티**|❌|✅ (선택)|❌|✅ (Phase 2)|
|**User Flow 다이어그램**|❌|✅ (Mermaid)|❌|✅ (드래그앤드롭)|

**✅ Claude가 가장 체계적**: Mermaid로 다이어그램 자동 생성

### 5. **차별화 포인트**

|AI|주요 차별점|
|---|---|
|ChatGPT|10단계 상세 템플릿, Rule 기반 추천|
|**Claude**|**5단계 균형, 보안 강조, 완전 로컬, Mermaid 다이어그램**|
|Gemini|Freemium 모델 상세, AARRR 지표|
|Grok|브랜딩(SoloMVP Forge), 타임라인 빌더|

### 6. **보안 취약점 명시 여부**

|AI|CVE 보안 패치 언급|
|---|---|
|ChatGPT|❌|
|**Claude**|**✅ CVE-2025-55182, CVE-2025-66478 명시**|
|Gemini|❌|
|Grok|⚠️ 일반적인 보안만 언급|

**✅ Claude만 CVSS 10.0 보안 취약점 명시**

---

## 🎯 최종 권장 조합

각 AI의 장점을 결합한 **최적 구조**:

### **기본 구조: Claude 방식 채택**

- ✅ **5단계 템플릿** (적당한 복잡도)
- ✅ **Bun 1.3.4 + Drizzle ORM** (최신 기술)
- ✅ **보안 패치 적용** (CVE 명시)
- ✅ **Mermaid 다이어그램** (자동 생성)

### **추가 기능: 타 AI 아이디어 차용**

1. **Grok의 브랜딩**: "SoloMVP Forge" 같은 서비스명
2. **ChatGPT의 상세함**: 각 질문에 더 구체적인 예시
3. **Gemini의 Freemium**: 명확한 무료/유료 구분

---
