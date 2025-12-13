# 🧑‍💻 Alex's Interactive Portfolio (알렉스 인터랙티브 포트폴리오)

## 🚀 프로젝트 개요 (Project Overview)
이 프로젝트는 개인 개발자/디자이너 '알렉스'의 전문성과 창의성을 보여주기 위해 제작된 인터랙티브 포트폴리오 웹사이트입니다. 방문자에게 강렬한 시각적 경험과 부드러운 사용자 인터랙션을 제공하여, 알렉스의 작업물과 역량을 효과적으로 전달하는 것을 목표로 합니다.

## ✨ 주요 기능 (Key Features)
*   **반응형 웹 디자인**: 모든 디바이스에서 최적의 사용자 경험을 제공합니다.
*   **다이나믹 Hero 섹션**: 마우스 움직임 및 스크롤에 반응하는 Parallax 효과와 애니메이션 타이포그래피를 통해 시선을 사로잡습니다.
*   **포트폴리오 필터링**: 다양한 카테고리별로 작업물을 쉽게 탐색하고 검색할 수 있습니다.
*   **About 섹션 애니메이션**: 스크롤 진입 시 부드러운 페이드 인/슬라이드 업 효과와 동적인 스킬 바, 통계 카운터 애니메이션을 제공합니다.
*   **문의하기 폼**: React Hook Form과 Zod를 활용한 클라이언트 측 유효성 검사로 안전하고 편리한 문의 기능을 제공합니다.
*   **전역 상태 관리**: Zustand를 사용하여 UI 상태(다크 모드, 모달 등) 및 필터링 상태를 효율적으로 관리합니다.
*   **서버 상태 관리**: TanStack Query를 사용하여 비동기 데이터(프로젝트, 통계 등)를 효율적으로 캐싱하고 관리합니다.

## 🛠️ 기술 스택 (Tech Stack)
이 프로젝트는 최신 웹 기술 스택을 활용하여 구축되었습니다.

*   **프레임워크**: [Next.js](https://nextjs.org/) (App Router)
*   **언어**: [TypeScript](https://www.typescriptlang.org/)
*   **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
*   **애니메이션**:
    *   [Framer Motion](https://www.framer.com/motion/) (컴포넌트 기반 애니메이션)
    *   [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) (고급 타임라인 및 스크롤 인터랙션)
*   **전역 상태 관리**: [Zustand](https://zustand-bear.github.io/zustand/)
*   **서버 상태 관리**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
*   **폼 관리 및 유효성 검사**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **UI 컴포넌트**: [shadcn/ui](https://ui.shadcn.com/) (Tailwind CSS 기반 재사용 가능한 컴포넌트)

## 📦 설치 및 실행 방법 (Installation & Usage)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1.  **저장소 클론 (Clone the repository)**
    ```bash
    git clone https://github.com/your-username/your-portfolio.git
    cd your-portfolio/frontend
    ```

2.  **의존성 설치 (Install dependencies)**
    ```bash
    npm install
    # 또는 yarn을 사용하는 경우
    # yarn install
    ```

3.  **개발 서버 실행 (Run the development server)**
    ```bash
    npm run dev
    # 또는 yarn을 사용하는 경우
    # yarn dev
    ```

4.  **접속 (Access)**
    브라우저를 열고 `http://localhost:3000`으로 접속합니다.

## 📁 프로젝트 구조 (Project Structure)

주요 디렉토리 및 파일 설명:

```
.
├── frontend/
│   ├── app/                    # Next.js App Router (페이지 및 레이아웃)
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/                 # shadcn/ui 컴포넌트 (버튼, 인풋 등)
│   │   └── ...                 # HeroSection, AboutSection 등 주요 섹션 컴포넌트
│   ├── data/                   # Mock 데이터 파일
│   ├── hooks/                  # 커스텀 React Hooks (데이터 패칭 로직)
│   ├── lib/                    # 유틸리티 함수
│   ├── store/                  # Zustand 상태 관리 스토어
│   ├── types/                  # TypeScript 타입 정의
│   └── ...
├── doc/                        # 프로젝트 문서 (디자인 명세서, 계획 등)
└── .gitignore
```

## 📄 라이선스 (License)

이 프로젝트는 MIT 라이선스(MIT License)를 따릅니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

Made with ❤️ by Alex.
