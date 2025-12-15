사용자님께서 요청하신 대로 기존 기획안의 기술 스택에 **shadcn/ui**를 통합한 **업데이트된 기술 스택 명세서**를 작성해 드립니다.

**shadcn/ui**는 기존에 계획된 **React, Next.js, Tailwind CSS** 스택과 완벽하게 호환되며, 높은 수준의 커스터마이징 및 접근성을 제공하는 컴포넌트 라이브러리 역할을 수행하여 프로젝트의 완성도를 높일 수 있습니다.

## 🛠️ (Update) 바이브코딩 랜딩페이지 기술 스택 명세서

### 1. 핵심 기술 (Core Stack) 업데이트

기존의 안정적인 프론트엔드 스택을 유지하면서, UI/UX 구축의 효율성을 위해 **shadcn/ui**를 통합합니다.

|**구분**|**기술 스택**|**통합 역할 및 선정 이유**|
|---|---|---|
|**프론트엔드 (Framework)**|**React** + **TypeScript**|타입 안정성 및 재사용성 기반.|
|**성능/배포 (Deployment)**|**Next.js**|SSR/SSG를 통한 성능 및 SEO 최적화.|
|**스타일링 (Styling)**|**Tailwind CSS**|유틸리티 기반의 빠르고 유연한 스타일링.|
|**UI 컴포넌트**|**shadcn/ui + Radix UI**|**Tailwind 기반의 커스터마이징 가능한 고품질 컴포넌트 제공** 및 **높은 접근성(Accessibility)** 확보.|

---

### 2. 사용자 경험 및 인터랙션 구현 (UX/UI & Interaction)

**shadcn/ui**는 Radix UI의 무상태 컴포넌트를 기반으로 하여, 랜딩페이지에 필요한 복잡한 UI 요소들을 높은 접근성 기준으로 빠르고 일관성 있게 구현하는 데 사용됩니다.

|**영역**|**기술 스택**|**적용 섹션 및 컴포넌트 (shadcn/ui 활용)**|**역할 및 효과**|
|---|---|---|---|
|**애니메이션**|**Framer Motion**|Hero, Comparison Table, Final CTA|shadcn/ui 컴포넌트의 등장/전환 모션에 Framer Motion을 결합하여 정교한 인터랙션 구현.|
|**컴포넌트 기본**|**shadcn/ui: Button, Input, Card**|전 섹션 (CTA 버튼, 이메일 입력, 스토리 카드 등)|일관되고 접근성이 높은 기본 UI 요소 구현.|
|**아코디언/탭**|**shadcn/ui: Accordion, Tabs**|Section 4: How It Works, Section 8: FAQ|**접근성(ARIA)**이 보장된 아코디언 컴포넌트( 참조)를 사용하여 단계별 프로세스 및 Q&A 구현.|
|**모달/다이얼로그**|**shadcn/ui: Dialog**|Section 6: Success Stories|수강생 스토리 클릭 시 **"전체 이야기 보기" 모달** 팝업 구현.|
|**폼 상태 관리**|**React Hook Form**|Live Demo, Final CTA|shadcn/ui의 Input 컴포넌트를 React Hook Form과 결합하여 유효성 검사 및 폼 상태 관리.|

---

### 3. 디자인 및 커스터마이징 (Design & Customization)

|**항목**|**구현 방안**|**상세 내용**|
|---|---|---|
|**디자인 시스템**|**shadcn/ui + Tailwind CSS**|shadcn 컴포넌트를 프로젝트에 복사하여 가져온 후, Tailwind Config를 통해 **바이브코딩 브랜드 컬러 (Primary Blue, Accent Orange)**로 쉽게 커스터마이징하여 일관된 디자인 시스템 구축.|
|**반응형 디자인**|**Tailwind Breakpoints**|shadcn/ui 컴포넌트의 Tailwind 클래스를 직접 수정하여 모바일 환경에 맞게 레이아웃을 세밀하게 조정.|
|**컬러 테마**|**CSS Variables**|shadcn/ui의 CSS 변수를 활용하여 `Live Demo` 섹션에서 색상 팔레트 변경 시, Primary Color가 실시간으로 변하는 인터랙티브 요소 구현.|

---

### 4. 기술적 이점 요약 (Summary of Benefits)

shadcn/ui를 도입함으로써 얻는 핵심 이점은 다음과 같습니다.

1. **높은 접근성 (Accessibility):** Radix UI를 기반으로 하여, 키보드 네비게이션 및 스크린 리더 지원과 같은 웹 접근성 표준을 기본적으로 충족합니다.
    
2. **완벽한 커스터마이징:** 컴포넌트를 직접 소스 코드로 관리하기 때문에, 일반적인 UI 라이브러리의 제약을 넘어 Tailwind CSS를 통해 모든 디자인 요구사항(그라데이션, 특정 호버 효과 등)을 충족할 수 있습니다.
    
3. **성능 최적화:** 빌드 시 모든 코드가 번들에 포함되므로, 런타임에 외부 라이브러리를 로드할 필요가 없어 성능 저하를 최소화합니다.