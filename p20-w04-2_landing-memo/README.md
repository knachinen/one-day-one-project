# MemoApp 랜딩페이지 프로젝트

## 📝 프로젝트 개요

이 프로젝트는 메모 앱을 위한 랜딩페이지의 디자인 및 기획 문서를 포함하고 있습니다. 이 랜딩페이지의 주요 목표는 메모 앱의 핵심 가치를 효과적으로 전달하고, 사용자 참여를 유도하여 다운로드 또는 가입으로 이어지게 하는 것입니다. 프로젝트는 고도로 상호작용적이며 애니메이션이 적용된 사용자 경험을 강조합니다.

현재까지 Phase 4까지 구현이 완료되었습니다.

## 🚀 구현된 주요 단계

### Phase 0: 프로젝트 기반 세팅 완료
- Next.js 프로젝트 초기화 (App Router, TypeScript, ESLint, Tailwind CSS)
- 기본 디렉토리 구조 설정
- `app/layout.tsx`에 한국어 (`lang="ko"`) 설정 및 기본 구조 반영
- Tailwind CSS v4를 위한 `app/global.css` 업데이트 및 `tailwind.config.ts`에 커스텀 색상 팔레트 정의
- ESLint `unused-vars` 경고로 설정 및 Prettier 통합
- `next dev --webpack` 설정 (Framer Motion과의 호환성 문제 해결을 위한 임시 방편)

### Phase 1: 히어로 섹션 (정적 UI) 구현 완료
- `HeroTitle`, `HeroSubtitle`, `HeroCTA` 컴포넌트 구현
- Hero 섹션의 정적 레이아웃 및 반응형 디자인 적용
- 정의된 디자인 시스템 기반의 타이포그래피 및 색상 적용

### Phase 2: 네비게이션 바 & 스크롤 구조 구현 완료
- `Navbar`, `NavLogo`, `NavMenu`, `NavCTA` 컴포넌트 구현
- 상단 고정 네비게이션 바 및 앵커 기반 스크롤 구조 설정
- `app/layout.tsx` 및 `app/page.tsx`에 내비게이션 및 섹션 구조 반영
- `scroll-margin-top` 글로벌 CSS 규칙 적용

### Phase 3: 플로팅 메모 카드 (정적 위치) 구현 완료
- `FloatingNotes`, `NoteCard` 및 개별 카드 컴포넌트 (`ChecklistCard`, `TextNoteCard`, `TagNoteCard`, `CalendarNoteCard`, `VoiceNoteCard`) 구현
- Hero 섹션에 절대 위치로 플로팅 카드 배치 (데스크탑에서만 표시)
- 글래스모피즘 스타일 및 그림자 효과 적용
- `pointer-events-none` 및 `aria-hidden`을 통한 접근성/UX 고려

### Phase 4: 히어로 애니메이션 & 카드 Hover 효과 구현 완료
- Framer Motion 라이브러리 통합 및 설정
- `HeroTitle`, `HeroSubtitle`, `HeroCTA`에 진입 애니메이션 적용 (순차적 페이드인/슬라이드업)
- `NoteCard`에 Hover 및 Tap 효과 적용 (미세한 y 이동 및 회전)
- `useReducedMotion`을 통한 접근성 지원
- `FloatingNotes` 컴포넌트를 클라이언트 컴포넌트로 분리하고 `FloatingNotesClientWrapper`를 통해 동적 임포트 (SSR 비활성화)하여 클라이언트-사이드 렌더링 및 애니메이션 문제 해결
- `HeroSection` 배경에 소프트 컬러 그라데이션 애니메이션 적용

## 🛠️ 주요 기술 스택

이 프로젝트는 성능과 풍부한 인터랙티브 경험에 중점을 둔 최신 웹 개발 스택을 활용합니다:

-   **프레임워크**: Next.js 16+ (React 19+)
-   **스타일링**: Tailwind CSS 4+
-   **애니메이션**: Framer Motion
-   **아이콘**: Lucide React
-   **폼 처리**: React Hook Form with Zod
-   **배포**: Vercel

## ⚙️ 프로젝트 설정 및 실행

### 1. 종속성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```
(개발 서버는 `http://localhost:3000`에서 실행됩니다.)

### 3. 빌드

```bash
pnpm build
```

### 4. 기타 스크립트

-   **린트**: `pnpm lint`

## 📂 폴더 구조 (주요 파일)

```
.
├── app/
│   ├── global.css          # 전역 스타일 (Tailwind CSS)
│   ├── layout.tsx          # Root 레이아웃 (Navbar 포함)
│   └── page.tsx            # 메인 페이지 (HeroSection 및 섹션 플레이스홀더)
├── components/
│   ├── ClientHomePage.tsx  # (삭제됨)
│   ├── MotionWrapper.tsx   # (삭제됨)
│   ├── hero/
│   │   ├── FloatingNotes.tsx           # 플로팅 카드 컨테이너 (use client)
│   │   ├── FloatingNotesClientWrapper.tsx # FloatingNotes를 동적으로 불러오는 래퍼
│   │   ├── HeroCTA.tsx                 # CTA 버튼 컴포넌트
│   │   ├── HeroSection.tsx             # 히어로 섹션 레이아웃
│   │   ├── HeroSubtitle.tsx            # 히어로 서브 타이틀
│   │   ├── HeroTitle.tsx               # 히어로 타이틀
│   │   ├── NoteCard.tsx                # 공통 메모 카드 스타일
│   │   └── cards/                      # 개별 메모 카드 타입
│   │       ├── CalendarNoteCard.tsx
│   │       ├── ChecklistCard.tsx
│   │       ├── TagNoteCard.tsx
│   │       ├── TextNoteCard.tsx
│   │       └── VoiceNoteCard.tsx
│   └── navigation/
│       ├── Navbar.tsx                  # 네비게이션 바
│       ├── NavCTA.tsx                  # 네비게이션 CTA
│       ├── NavLogo.tsx                 # 네비게이션 로고
│       └── NavMenu.tsx                 # 네비게이션 메뉴
├── doc/
│   ├── ... (기획 및 디자인 문서들)
├── public/
│   ├── fonts/              # 웹폰트 파일 (Pretendard-Regular.woff2 등)
│   └── ...
├── tailwind.config.ts      # Tailwind CSS 설정
└── ...
```

## ✅ 다음 단계 (Phase 5)

다음 단계는 **Features 섹션 콘텐츠**를 구현하고, 스크롤 기반 레이아웃을 확장하는 것입니다.

---
**메모**: 현재 Pretendard 폰트 통합은 `public/fonts/Pretendard-Regular.woff2` 파일이 제공되지 않아 임시 비활성화된 상태입니다. 실제 폰트 파일을 `public/fonts` 디렉토리에 추가한 후 `app/layout.tsx`에서 주석 처리된 부분을 활성화하면 됩니다.
