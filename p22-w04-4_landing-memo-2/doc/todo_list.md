# Implementation To-Do List

## Phase 0: Project Foundation Setup
1. [completed] Create Next.js project with App Router, TypeScript, ESLint, Tailwind CSS enabled.
2. [completed] Configure ESLint and Prettier for consistent code formatting.
3. [completed] Set up `app/layout.tsx` with basic HTML structure, `lang="ko"`, and `body` with default background and text colors.
4. [pending] Integrate Pretendard font using `next/font/local` and apply it to `RootLayout`.
5. [completed] Configure `tailwind.config.ts` to extend colors (e.g., primary) and content paths.
6. [completed] Verify project runs locally and Tailwind/font styles are applied correctly.

## Phase 1: Static Hero Section (No Animation)
1. [completed] Implement the Header component with "MemoApp" logo, navigation links ("기능", "사용 사례", "가격", "로그인"), and "무료로 시작하기" CTA button.
2. [completed] Implement the main Hero content area including "NEW VERSION 2.0" as a sub-message, "생각이 떠오르는 순간, 바로 메모" as the main headline, and "회의 중에도, 길을 걷다가, 침대에 누워서도 당신의 모든 영감을 가장 빠르고 간편하게 기록하세요." as the sub-text.
3. [completed] Create Primary ("무료로 시작하기") and Secondary ("앱 다운로드") CTA buttons with basic styling (no hover animations yet).
4. [completed] Implement the static floating memo cards (3-5 cards) with glassmorphism style, but without parallax or hover animations.
5. [completed] Ensure responsive typography is applied to all Hero section text elements.
6. [completed] Verify the static Hero section layout on mobile and desktop breakpoints.

## Phase 2: Navigation Bar + Scroll Structure
1. [completed] Implement scroll-triggered style changes for the Header (transparent background initially, glassmorphism background, reduced height, shadow on scroll past 50px).
2. [completed] Implement smooth scroll to sections when navigation links are clicked.

## Phase 4: Basic Motion Added (Framer Motion)
1. [completed] Implement Hero text appearance motion (fade in + slide up).
2. [completed] Implement CTA button hover effect (pulse and subtle shadow change).
3. [completed] Implement card hover scale effect.

## Phase 5: Features Section (Static Tabs)
1. [pending] Create the Features section structure with a section header (title and subtitle).
2. [pending] Implement the Feature Navigation Tabs (e.g., "빠른 기록", "자동 정리", "스마트 검색", "실시간 동기화") with basic styling.
3. [pending] Implement the Preview Area with a basic layout for app UI mockup (left) and detailed description (right).
4. [pending] Populate the Preview Area with static content for each feature tab, and implement instant content replacement on tab click.
