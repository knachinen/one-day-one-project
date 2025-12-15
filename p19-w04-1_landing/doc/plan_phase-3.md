요청하신 **Phase 3: 최적화 및 최종 점검 (Launch Ready)** 구현을 위한 상세 명세서를 아래와 같이 작성합니다.

이 단계는 랜딩페이지의 **성능, SEO, 분석 도구 연동** 및 **최종 전환 유도(Final CTA) 폼 로직**을 완성하여, 실제 런칭에 필요한 모든 기술적 요소를 마무리하는 것을 목표로 합니다.

---

## 🛠️ Phase 3: 최적화 및 최종 점검 상세 명세서

### 1. Final CTA (최종 전환 유도) 로직 구현

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**폼 로직 및 유효성 검사**|Final CTA 섹션의 이메일 입력 필드에 **React Hook Form**을 적용.<br><br>  <br><br>폼 제출 시 유효성 검사(이메일 형식, 빈 값 확인) 로직 구현.|React Hook Form, TypeScript|
|**API 연동**|Next.js API Routes를 통해 폼 제출 데이터를 처리하는 엔드포인트 구현 (예: `/api/signup`).<br><br>  <br><br>이 엔드포인트는 실제 **CRM/ESP (Email Service Provider) API** (예: Mailchimp, ConvertKit)로 데이터를 전달하는 역할 수행.|Next.js API Routes|
|**사용자 피드백**|폼 제출 성공/실패 시 사용자에게 명확한 피드백 메시지 제공.<br><br>  <br><br>성공 시 **축하 Confetti 애니메이션** 실행.|shadcn/ui: Toast, Framer Motion|

### 2. 고급 인터랙션 및 애니메이션 적용

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**스크롤 기반 애니메이션**|**Hero Section:** 배경의 코드 블록 타이핑 효과 (CSS 또는 Lottie) 및 마우스 움직임에 따른 **그라데이션 반응** (Parallax) 구현.|Framer Motion, GSAP (선택)|
|**Solution Section 타임라인**|Comparison Table의 타임라인 요소에 **Stroke Animation**을 적용하여 스크롤 진입 시 선이 그려지는 효과 구현.|Intersection Observer, SVG/CSS|
|**Final CTA Parallax**|Final CTA 섹션 배경과 텍스트 콘텐츠의 스크롤 속도를 다르게 설정하여 깊이감을 주는 **Parallax Scrolling** 효과 적용.|Framer Motion|
|**Micro-Interactions**|모든 주요 CTA 버튼 (Header, Final CTA) 호버 시 **살짝 부양(Elevation)** 효과 및 화살표 아이콘 **통통 튀는** 애니메이션 적용.|Tailwind CSS, Framer Motion|

### 3. 성능 및 SEO 최적화

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**이미지 최적화**|페이지 내 모든 이미지에 **Next.js `Image` 컴포넌트** 사용.<br><br>  <br><br>WebP 포맷 사용 및 **Lazy Loading** 기본 적용.|Next.js/Image|
|**SEO 메타태그**|`Next/Head`를 사용하여 페이지 제목, 설명, Open Graph 태그 (SNS 공유 이미지 및 설명) 등 설정.|Next.js/Head|
|**폰트 및 CSS 최적화**|**Pretendard 폰트**를 로컬 또는 최적화된 방법으로 로딩하여 **CLS(Cumulative Layout Shift)** 방지. 사용하지 않는 CSS 제거 (Purge CSS).|Next.js, Tailwind CSS|
|**Code Splitting**|Next.js의 동적 가져오기(`dynamic` import) 기능을 활용하여 초기 로딩 시 불필요한 섹션 컴포넌트를 분할 로딩.|Next.js|

### 4. 분석 및 전환 추적 시스템 연동

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**GTM/GA4 연동**|**Google Tag Manager(GTM)** 스니펫을 `_document` 또는 `layout.tsx`에 삽입.<br><br>  <br><br>GTM을 통해 **Google Analytics 4(GA4)** 태그 설정.|GTM|
|**전환 이벤트 추적**|GTM을 활용하여 다음 전환 이벤트를 설정하고 GA4로 전송:<br><br>  <br><br>**1. 최종 CTA 클릭** (폼 제출 버튼)<br><br>  <br><br>**2. 스크롤 깊이** (페이지의 75% 이상 도달 시).|GTM, GA4|
|**사용자 행동 분석**|**Hotjar** 또는 **Microsoft Clarity**와 같은 히트맵 및 세션 녹화 도구의 스크립트 삽입.|Hotjar/Clarity|

### 5. 최종 QA 및 접근성 점검

|**항목**|**상세 구현 내용**|**기술/컴포넌트**|
|---|---|---|
|**접근성 최종 점검**|**Axe DevTools**를 사용하여 페이지의 접근성 문제 점검.<br><br>  <br><br>모든 **shadcn/ui 기반 컴포넌트**의 **ARIA 속성** 및 **키보드 접근성** 최종 확인.|Radix UI|
|**브라우저 호환성**|Chrome, Firefox, Safari, Edge 등 주요 브라우저에서 랜딩페이지가 동일하게 표시되는지 확인.|QA|
|**Lighthouse 감사**|Google Lighthouse를 실행하여 **성능(Performance), 접근성(Accessibility), SEO** 점수를 측정하고 목표치(90점 이상) 달성 확인.|Lighthouse|

### 6. Phase 3 최종 검증 체크리스트

|**검증 항목**|**상세 내용**|**담당**|**완료**|
|---|---|---|---|
|**CTA 폼 로직**|이메일 유효성 검사 작동 및 폼 제출 후 **CRM/ESP API**로 데이터 전송 성공 확인.|DEV/QA|☐|
|**애니메이션**|모든 고급 애니메이션(Parallax, 타이핑 효과 등)이 부드럽게 재생되고 **성능 저하**가 없는지 확인.|QA/DEV|☐|
|**SEO/성능**|Lighthouse 성능 점수가 90점 이상인지 확인.|DEV|☐|
|**분석 도구**|GTM 디버그 모드를 통해 CTA 클릭 시 **전환 이벤트**가 GA4로 정상 전송되는지 확인.|QA|☐|
|**반응형**|Final CTA 섹션이 Mobile에서 **세로 스택**으로 전환되고, 폼이 Full-width로 표시되는지 확인.|QA|☐|
|**최종 배포**|Vercel 또는 Netlify에 배포하여 **실제 운영 환경**에서 기능 및 성능 테스트 완료.|DEV|☐|