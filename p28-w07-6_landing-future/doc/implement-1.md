# 단계 1: 프로젝트 기반 구축 및 디자인 시스템 상세 명세서

본 문서는 아티스트 포트폴리오의 기초가 되는 개발 환경과 디자인 시스템을 Next.js 환경에 코드로 이식하기 위한 가이드입니다.

## 1. 개발 환경 설정 (Initialization)

### 1.1 프로젝트 생성

최신 안정화 버전의 Next.js를 사용하여 프로젝트를 초기화합니다.

```
npx create-next-app@latest . --typescript --tailwind --eslint --app
```

### 1.2 필수 라이브러리 설치

디자인 및 인터랙션 구현을 위한 핵심 의존성을 추가합니다.

```
npm install framer-motion gsap lucide-react
```

## 2. 디자인 시스템 코드화 (Theme Setting)

### 2.1 Tailwind CSS 설정 (`tailwind.config.ts`)

디자인 명세서(Design Spec)에 정의된 컬러와 폰트를 테마로 등록합니다.

```
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        background: '#050505', // Deep Space Black
        secondary: '#121212',  // Obsidian Dark
        accent: {
          cyan: '#00F0FF',     // Cyber Cyan
          purple: '#BF00FF',   // Plasma Purple
        },
        text: {
          main: '#FFFFFF',
          sub: '#A0A0A0',
        },
      },
      fontFamily: {
        header: ['var(--font-orbitron)', 'sans-serif'],
        body: ['var(--font-pretendard)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      }
    },
  },
}
```

### 2.2 글로벌 폰트 적용 (`app/layout.tsx`)

Google Fonts 및 로컬 폰트를 최적화하여 적용합니다.

- **Header:** `Orbitron` (Google Fonts)
    
- **Body:** `Pretendard` (Local/CDN)
    
- **Mono:** `JetBrains Mono` (Google Fonts)
    

## 3. 공통 컴포넌트 구현 (Global UI)

### 3.1 Navbar (Floating Glassmorphism)

- **속성:** `fixed`, `top-10`, `w-fit`, `mx-auto`
    
- **스타일:** `bg-background/70`, `backdrop-blur-md`, `border border-white/10`, `rounded-full`
    
- **인터랙션:** 하단 언더라인 호버 애니메이션 (Framer Motion 활용).
    

### 3.2 Footer

- **내용:** Copyright, SNS Links (Instagram, LinkedIn, GitHub), 이메일 주소.
    
- **스타일:** `py-10`, `text-text-sub`, `text-sm`, `text-center`.
    

## 4. SEO 및 메타데이터 설정

`app/layout.tsx` 내에서 프로젝트의 정체성을 담은 메타데이터를 구성합니다.

```
export const metadata = {
  title: "Futurist Artist | Next Senses",
  description: "인공지능과 가상 현실의 융합을 통해 인류의 다음 감각을 설계하는 퓨처리스트 아티스트의 포트폴리오입니다.",
  openGraph: {
    title: "Futurist Artist Portfolio",
    description: "Designing the next senses for humanity.",
    images: ["/og-image.png"],
    type: "website",
  },
};
```

## 5. 폴더 구조 (Folder Structure)

단계 1 완료 시점의 구조입니다.

```
src/
├── app/
│   ├── layout.tsx       # 글로벌 레이아웃 및 폰트 설정
│   ├── page.tsx         # 빈 배경의 메인 화면
│   └── globals.css      # 기본 배경색 및 초기화
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/              # 버튼 등 공통 UI 요소
├── styles/
│   └── theme.ts         # 공통 색상 상구 관리
└── public/
    └── fonts/           # 로컬 폰트 에셋
```

## 6. 단계 1 독립적 실행 및 검증 방법

1. **실행:** `npm run dev` 명령어로 로컬 서버 구동.
    
2. **검증:** * 화면 배경이 완벽한 블랙(`#050505`)으로 출력되는가?
    
    - 상단에 반투명한 플로팅 네비게이션 바가 정상적으로 표시되는가?
        
    - 브라우저 탭에 설정한 메타데이터(타이틀, 아이콘)가 적용되었는가?
        
    - 반응형 테스트 시 모바일에서도 네비게이션 바가 중앙에 위치하는가?