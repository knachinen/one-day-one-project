# 메모앱 랜딩페이지

## 🚀 프로젝트 소개

"메모앱 랜딩페이지" 프로젝트는 빠르고 직관적인 메모 경험을 제공하는 핵심 가치를 전달하고, 사용자가 직접 체험해볼 수 있는 인터랙티브 랜딩페이지를 구축하여 전환율을 극대화하는 것을 목표로 합니다. 최신 웹 기술 스택을 활용하여 고성능의 반응형 웹 페이지를 구현합니다.

## ✨ 주요 기능 및 특징

*   **반응형 디자인**: 모바일, 태블릿, 데스크탑 등 다양한 기기에서 최적화된 사용자 경험을 제공합니다.
*   **스크롤 애니메이션**: 스크롤 위치에 따라 헤더의 스타일이 동적으로 변경되며, 섹션 간 부드러운 이동을 지원합니다.
*   **인터랙티브 히어로 섹션**: Framer Motion을 활용한 텍스트 등장 애니메이션과 CTA 버튼의 펄스 효과, 그리고 떠다니는 메모 카드들의 호버 스케일 효과가 적용되어 사용자 참여를 유도합니다.
*   **글래스모피즘**: 메모 카드에 적용된 블러 및 반투명 효과로 세련된 디자인을 제공합니다.

## 🛠️ 기술 스택

이 프로젝트는 다음과 같은 최신 기술 스택으로 구축되었습니다:

*   **프레임워크**: [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
*   **UI 라이브러리**: [React 19](https://react.dev/)
*   **스타일링**: [Tailwind CSS 4](https://tailwindcss.com/)
    *   커스텀 컬러는 `src/app/globals.css`의 `@theme` 지시어를 통해 관리됩니다.
*   **애니메이션**: [Framer Motion](https://www.framer.com/motion/)
*   **패키지 매니저**: [pnpm](https://pnpm.io/)
*   **코드 품질**: ESLint, Prettier

## 🏃‍♂️ 시작하기

프로젝트를 로컬 환경에서 설정하고 실행하려면 다음 단계를 따르세요.

### 1. 저장소 클론

```bash
git clone [YOUR_REPOSITORY_URL]
cd p22-w04-4_landing-memo-2
```

### 2. 의존성 설치

pnpm을 사용하여 프로젝트 의존성을 설치합니다:

```bash
pnpm install
```

### 3. 개발 서버 실행

개발 서버를 시작합니다:

```bash
pnpm dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 📂 프로젝트 구조

```
/
├── public/                 # 정적 파일 (이미지, 폰트 등)
├── src/
│   ├── app/                # Next.js App Router (루트 레이아웃, 페이지)
│   │   ├── globals.css     # 전역 스타일 및 Tailwind 커스텀 컬러 정의
│   │   └── layout.tsx      # 루트 레이아웃 (헤더 포함)
│   │   └── page.tsx        # 메인 페이지 (히어로 섹션 포함)
│   ├── components/
│   │   ├── layout/         # 레이아웃 관련 컴포넌트 (예: Header.tsx)
│   │   │   └── Header.tsx
│   │   └── sections/       # 페이지 섹션 컴포넌트 (예: HeroSection.tsx)
│   │   │   └── HeroSection.tsx
│   │   └── ui/             # 재사용 가능한 UI 컴포넌트 (예: MemoCard.tsx)
│   │       └── MemoCard.tsx
│   └── (기타 파일)
├── doc/                    # 프로젝트 문서 (PRD, 기술 스택 등)
├── tailwind.config.ts      # Tailwind CSS 설정
├── .prettierrc             # Prettier 설정
├── eslint.config.mjs       # ESLint 설정
├── package.json            # 프로젝트 의존성 및 스크립트
└── (기타 설정 파일)
```

## ✅ 현재까지 구현된 내용

이 프로젝트는 다음 단계들을 성공적으로 완료했습니다:

*   **Phase 0: 프로젝트 기반 설정 완료**
    *   Next.js 프로젝트 초기화 (App Router, TypeScript, ESLint, Tailwind CSS 활성화).
    *   ESLint 및 Prettier를 통한 일관된 코드 포맷팅 설정.
    *   `app/layout.tsx`에 기본 HTML 구조, `lang="ko"`, 기본 배경 및 텍스트 색상 설정.
    *   `tailwind.config.ts`에 커스텀 컬러 확장 설정 (이후 `globals.css`로 이전).
    *   프로젝트 로컬 실행 및 Tailwind 스타일 적용 확인.
*   **Phase 1: 정적 히어로 섹션 구현 완료**
    *   헤더 컴포넌트 (로고, 네비게이션 링크, CTA 버튼) 구현.
    *   메인 히어로 콘텐츠 영역 (부제목, 메인 헤드라인, 서브 텍스트) 구현.
    *   기본 스타일의 Primary 및 Secondary CTA 버튼 구현.
    *   글래스모피즘 스타일의 정적 떠다니는 메모 카드 구현.
    *   모든 히어로 섹션 텍스트 요소에 반응형 타이포그래피 적용.
    *   모바일 및 데스크탑 뷰에서 정적 히어로 섹션 레이아웃 확인.
*   **Phase 2: 네비게이션 바 + 스크롤 구조 구현 완료**
    *   헤더에 스크롤-트리거 스타일 변경 구현 (초기 투명 -> 스크롤 시 글래스모피즘 배경, 높이 감소, 그림자).
    *   네비게이션 링크 클릭 시 섹션으로 부드러운 스크롤 구현.
*   **Phase 4: 기본 모션 추가 (Framer Motion) 구현 완료**
    *   히어로 텍스트 등장 모션 (페이드 인 + 슬라이드 업) 구현.
    *   CTA 버튼 호버 효과 (펄스 및 은은한 그림자 변경) 구현.
    *   카드 호버 스케일 효과 구현.

## 💡 향후 계획 (Phase 5)

다음 단계에서는 기능 소개 섹션(Features Section)을 구현할 예정입니다. 이는 정적 탭 방식으로 구현되며, 각 기능에 대한 설명과 미리보기 영역을 포함할 것입니다.

---

[프로젝트 문서](doc/): 더 자세한 내용은 `doc/` 폴더 내의 문서를 참조하십시오.
*   `2-prd.md`: 제품 요구사항 명세서
*   `2-prd__tech-stack.md`: 기술 스택 명세서
*   `3-design-1-hero.md`: 디자인 요구사항 - 히어로 섹션
*   `4-phase.md`: 단계별 구현 계획
*   `4-phase-1.md`: Phase 1 상세 명세서
*   `todo_list.md`: 현재 진행 중인 작업 목록

이 `README.md`는 프로젝트의 진행 상황에 따라 지속적으로 업데이트될 예정입니다.