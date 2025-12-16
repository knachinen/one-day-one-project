# 메모앱 랜딩페이지 기술 스택 명세서

본 문서는 **메모앱 랜딩페이지** 구축을 위한 기술 스택을 정의하고, 각 기술의 **선정 이유, 역할, 구현 기준**을 명확히 한다. 개발·기획·디자인 간 공통 참조 문서로 활용한다.

---

## 1. 기술 스택 선정 원칙

### 1.1 핵심 기준

- **퍼포먼스 우선**: 애니메이션 중심 페이지에서도 60fps 유지
    
- **확장성**: 향후 SaaS 웹앱/대시보드로 확장 가능
    
- **개발 생산성**: 컴포넌트 기반, 빠른 UI 반복
    
- **디자인 일관성**: 디자인 시스템과 자연스러운 연결
    
- **SEO & 마케팅 친화성**: 랜딩페이지 특성 반영
    

---

## 2. 전체 아키텍처 개요

```
Client (Browser)
  ↓
Next.js (React)
  ├─ UI Components
  ├─ Animation Layer
  ├─ Analytics Layer
  └─ API Routes (폼 제출)
  ↓
External Services
  ├─ Email / CRM
  ├─ Analytics
  └─ CDN
```

---

## 3. 프론트엔드 스택

### 3.1 프레임워크

#### Next.js 14 (App Router)

- **역할**: 전체 웹 애플리케이션 프레임워크
    
- **선정 이유**:
    
    - SSR/SSG 지원으로 SEO 최적화
        
    - App Router 기반 레이아웃 관리
        
    - Image, Font 최적화 내장
        
    - API Routes 제공 (CTA 폼 처리)
        

**필수 설정**

- `app/` 디렉토리 구조 사용
    
- Static Generation 우선
    
- Route Segment 단위 코드 스플리팅
    

---

### 3.2 UI 라이브러리

#### React 18

- **역할**: 컴포넌트 기반 UI 구성
    
- **주요 사용 패턴**:
    
    - Server Component + Client Component 혼합
        
    - 애니메이션/인터랙션은 Client Component
        

---

### 3.3 스타일링

#### Tailwind CSS

- **역할**: 유틸리티 기반 스타일링
    
- **선정 이유**:
    
    - 디자인 토큰을 코드로 직접 반영
        
    - 빠른 UI 반복
        
    - 반응형 설계 용이
        

**설정 기준**

- Design Token → Tailwind theme 확장
    
- spacing: 8px scale
    
- custom colors / gradients 정의
    

---

### 3.4 애니메이션

#### Framer Motion

- **역할**: 컴포넌트 단위 애니메이션
    
- **사용 영역**:
    
    - Hero 텍스트 등장
        
    - 카드 hover / tap
        
    - 모달 open/close
        
    - CTA 상태 전환
        

**가이드**

- `motion.div` 최소 사용
    
- `layout` 애니메이션 적극 활용
    

---

#### GSAP (ScrollTrigger)

- **역할**: 스크롤 기반 복잡 애니메이션
    
- **사용 영역**:
    
    - Hero 배경 그라데이션 이동
        
    - Parallax 효과
        
    - 수평 스크롤 섹션
        

**주의사항**

- 모바일에서는 제한적으로 사용
    
- requestAnimationFrame 기반 유지
    

---

### 3.5 아이콘 & 미디어

- **아이콘**: Lucide React
    
- **이미지**: Next/Image + WebP
    
- **일러스트**: SVG 기반
    
- **음성 웨이브폼**: SVG Path 애니메이션
    

---

## 4. 상태 관리 & 유틸리티

### 4.1 상태 관리

- **React useState / useContext** 중심
    
- 전역 상태 최소화
    
- 다크모드: localStorage + Context
    

---

### 4.2 유틸리티

|라이브러리|용도|
|---|---|
|clsx|조건부 className 처리|
|lodash-es|debounce, throttle|
|dayjs|날짜 포맷|

---

## 5. 폼 & 인터랙션

### 5.1 폼 처리

- **라이브러리**: React Hook Form
    
- **검증**: Zod
    
- **UX 포인트**:
    
    - 실시간 검증
        
    - 에러 메시지 애니메이션
        

---

### 5.2 CTA 제출 처리

- Next.js API Route
    
- 비동기 처리 시 로딩/성공/실패 상태 분리
    
- 실제 서비스 연동 전 mock 가능
    

---

## 6. 성능 최적화 스택

### 6.1 이미지 & 미디어

- Next/Image
    
- Lazy Loading 기본 적용
    
- Hero 주요 이미지는 preload
    

---

### 6.2 코드 스플리팅

- dynamic import
    
- 애니메이션 컴포넌트 지연 로딩
    

---

### 6.3 이벤트 최적화

- scroll / resize → throttle / debounce
    
- passive event listener 사용
    

---

## 7. 접근성 (A11y)

- Semantic HTML 우선
    
- aria-label / aria-live 적용
    
- 키보드 네비게이션 100% 지원
    
- Lighthouse Accessibility 95+ 목표
    

---

## 8. 분석 & 마케팅 도구

### 8.1 Analytics

- Google Analytics 4
    
- Google Tag Manager
    

### 8.2 UX 분석

- Hotjar 또는 Microsoft Clarity
    

### 8.3 이벤트 기준

- CTA 클릭
    
- 스크롤 depth
    
- 섹션 노출
    
- 폼 성공/실패
    

---

## 9. 배포 & 인프라

### 9.1 배포

- **플랫폼**: Vercel
    
- **환경 분리**:
    
    - Production
        
    - Preview
        

---

### 9.2 도메인 & CDN

- Vercel Edge Network
    
- 이미지 자동 CDN 처리
    

---

## 10. 브라우저 & 디바이스 지원

- Chrome, Edge, Safari, Firefox (최신 2버전)
    
- iOS 13+, Android 8+
    

---

## 11. 개발 도구 & 협업

|구분|도구|
|---|---|
|패키지 매니저|pnpm|
|형상 관리|Git + GitHub|
|코드 포맷|Prettier|
|린트|ESLint|
|디자인 협업|Figma|

---

## 12. 기술 부채 관리 원칙

- 애니메이션 과도 사용 금지
    
- 라이브러리 도입 전 목적 명확화
    
- MVP 이후 불필요 스택 제거
    

---

## 13. 향후 확장 고려

- 메모앱 웹앱 전환 시 동일 스택 재사용
    
- 인증(Auth.js) 추가 가능
    
- Dashboard용 Chart 라이브러리 연동
    

---

**본 기술 스택 명세서는 v1.0 기준이며, MVP 이후 점진적 고도화를 전제로 함**

---

최신 웹 자료를 참고해서 **기술 스택 버전 정보(2025년 말 기준)**를 업데이트했습니다. 아래는 2025년 현재 실제로 많이 사용·추천되는 최신 버전 스택입니다:

---

## ✅ 주요 프론트엔드 스택 최신 버전 (2025)

### 🧠 **프레임워크 / 라이브러리**

|기술|최신 안정 버전|비고|
|---|---|---|
|**Next.js**|**16.0.7**|최신 메이저 릴리즈, 개선된 Turbopack·캐싱 등 포함 ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|
|**React**|**19.2.1**|React 최신 안정 버전 ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|
|**React DOM**|**19.2.1**|React와 동일 버전 ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|

---

### 🎨 **스타일링**

|기술|최신 안정 버전|비고|
|---|---|---|
|**Tailwind CSS**|**4.x (v4.0 / 최신)**|Tailwind CSS v4가 2025년형 성능 개선 포함 출시됨 ([더이노베이터스](https://theinnovators.zone/archives/4135?utm_source=chatgpt.com "2025년 Next.js의 7가지 주요 대안"))|

---

### ⚡ **애니메이션 / UI 애니메이션**

|기술|최신 안정 버전|비고|
|---|---|---|
|**Framer Motion**|**12.23.26**|가장 최신 프레임워크 친화형 애니메이션 라이브러리 ([npm](https://www.npmjs.com/package/framer-motion?utm_source=chatgpt.com "framer-motion"))|
|**GSAP**|최신 3.x|GSAP은 주로 현재 3.x 계열 안정 사용 (정식 릴리즈 지속) ([Front-end 개발](https://ttowa.tistory.com/entry/JS-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%B9%84%EA%B5%90-GSAP-vs-Framer-Motion-vs-Animatecss-%E2%80%94-%EC%96%B4%EB%96%A4-%EA%B1%B8-%EC%8D%A8%EC%95%BC-%ED%95%A0%EA%B9%8C?utm_source=chatgpt.com "GSAP vs Framer Motion vs Animate.css — 어떤 걸 써야 할까?"))|

> 참고로 Framer Motion 커뮤니티 버전은 React 19 대응이 아직 안정 완전 지원 상태가 아닌 케이스도 존재합니다. 필요 시 릴리즈 노트를 확인하고 종속성 버전을 맞추는 것이 중요합니다. ([GitHub](https://github.com/vercel/next.js/discussions/72228?utm_source=chatgpt.com "framer-motion for Next.js 15.0.2 #72228"))

---

### 📦 **상태 관리 및 유틸리티**

|기술|최신 안정 버전(예시)|
|---|---|
|**React Hook Form**|~7.68.x ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|
|**Lucide React**|~0.556.x ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|
|**TanStack Query**|~5.90.x ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|

---

### 📊 **기타 개발 도구**

|도구|최신 안정 버전(예시)|
|---|---|
|**Vite**|~7.2.x ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|
|**Prettier**|~3.7.x ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))|
|**eslint**|~latest (ESLint 9.x 이상 권장)|

---

## 🔎 참고 요약

- **Next.js 16**는 최신 기능 및 성능 개선 포함된 메이저 릴리즈이며 공식 docs에서 최신으로 확인됨. ([nextjs.org](https://nextjs.org/blog/next-16?utm_source=chatgpt.com "Next.js 16"))
    
- **React 19**는 2025년 업데이트 기준 최신 안정 버전입니다. ([Medium](https://medium.com/nextjs/37-the-next-js-and-react-js-weekly-newsletter-09-dec-2025-39e94d096044?utm_source=chatgpt.com "#37: The Next.js and React.js Weekly Newsletter (09 Dec ..."))
    
- **Framer Motion 12.23.26**이 2025년 12월 기준 최신 안정 버전입니다. ([npm](https://www.npmjs.com/package/framer-motion?utm_source=chatgpt.com "framer-motion"))
    
- **Tailwind CSS v4**가 현재 프론트엔드 새 프로젝트 기준 추천 버전입니다. ([더이노베이터스](https://theinnovators.zone/archives/4135?utm_source=chatgpt.com "2025년 Next.js의 7가지 주요 대안"))
    

---

## 🛠 반영 팁

✔ **Next.js + React 19 조합**이 최신 표준이나  
Framer Motion 사용 시 호환성 이슈가 있을 경우 React 18.2로 고정 테스트도 고려하세요. ([GitHub](https://github.com/vercel/next.js/discussions/72228?utm_source=chatgpt.com "framer-motion for Next.js 15.0.2 #72228"))

✔ Tailwind v4로 설정할 때는 `tailwind.config.js` 기본 구성과 purging 경로를 반드시 확인하세요 (Next.js와 통합 고려). ([더이노베이터스](https://theinnovators.zone/archives/4135?utm_source=chatgpt.com "2025년 Next.js의 7가지 주요 대안"))

✔ GSAP는 3.x 기반이며 ScrollTrigger 등 고급 애니메이션에 강점 있습니다 (React 업계에서도 선택적 사용). ([Front-end 개발](https://ttowa.tistory.com/entry/JS-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%B9%84%EA%B5%90-GSAP-vs-Framer-Motion-vs-Animatecss-%E2%80%94-%EC%96%B4%EB%96%A4-%EA%B1%B8-%EC%8D%A8%EC%95%BC-%ED%95%A0%EA%B9%8C?utm_source=chatgpt.com "GSAP vs Framer Motion vs Animate.css — 어떤 걸 써야 할까?"))

---

원하시면 **버전별 패키지 설치 명령**, **package.json 예시**, 또는 **호환성 체크 가이드**까지 정리해 드릴까요?