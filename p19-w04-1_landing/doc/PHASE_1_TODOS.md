# Phase 1: Core Structure and Basic Content (MVP) Implementation Plan

This document outlines the detailed tasks for Phase 1, focusing on establishing the project environment, implementing global elements (Header & Footer), and developing the static content for the Hero, Problem Statement, and Final CTA sections.

## 1. Project Environment Setup

- [ ]  Initialize Next.js project with App Router, TypeScript.
- [ ]  Configure Tailwind CSS:
    - [ ]  Define VibeCoding brand colors (Primary Blue, Accent Orange) in `tailwind.config.ts`.
    - [ ]  Set up default font (Pretendard).
- [ ]  Set up shadcn/ui:
    - [ ]  Complete `shadcn/ui init`.
    - [ ]  Verify `Button` and `Card` components are set up.
- [ ]  Define `RootLayout` in `app/layout.tsx` with `font-class` and `viewport` settings.

## 2. Global Elements Implementation

### 2.1. Header (Navigation Bar)

- [ ]  Implement Fixed/Sticky Top Bar, height `80px` (Desktop).
- [ ]  Implement responsive height `60px` for mobile (< 768px).
- [ ]  Add Logo (placeholder image/text) on the left.
- [ ]  Add Primary CTA Button (shadcn/ui Button) on the right.

### 2.2. Footer

- [ ]  Implement full-width footer.
- [ ]  Add Copyright information (placeholder).
- [ ]  Add Privacy Policy link (placeholder).
- [ ]  Secure area for 3 Social Media icons (placeholders).
- [ ]  Ensure all text is center-aligned on mobile.

### 2.3. Global Spacing

- [ ]  Apply consistent top/bottom padding of `100px` ~ `120px` for all sections on Desktop.

## 3. Section-Specific Static Content Implementation

### 3.1. Section 1: Hero Section

- [ ]  **Layout:** Central container with 2-Column Grid (Text 4 : Visual 6 ratio).
- [ ]  **Text Content:**
    - [ ]  H1: "코딩 몰라도 괜찮아요, 3시간이면 당신의 아이디어가 앱이 됩니다"
    - [ ]  H2: "바이브코딩으로 오늘 당장 MVP 만들기"
- [ ]  **CTA Buttons:**
    - [ ]  Primary CTA: "무료 커뮤니티 가입하기" (Primary Blue background)
    - [ ]  Secondary CTA: "워크숍 둘러보기" (text link style)
- [ ]  **Visual:** Implement Mockup Placeholder Block (60% width) with `Soft Grey` background color.
- [ ]  **Responsiveness:** Ensure 1-Column Stack (Text → Visual) on mobile (`md` breakpoint and below).

### 3.2. Section 2: Problem Statement

- [ ]  **Layout:** Top center-aligned H2, followed by a 3-Column Grid.
- [ ]  **Section Header:**
    - [ ]  Sub-label: "PROBLEM STATEMENT" (chip style, Primary Blue background)
    - [ ]  Main H2: "이런 고민 하고 계시나요?"
    - [ ]  Description: "앱 개발, 시작하기도 전에 높은 벽에 부딪히셨나요? 수많은 예비 창업자와 기획자들이 겪는 공통적인 어려움입니다."
- [ ]  **Cards:**
    - [ ]  Use `shadcn/ui Card` for 3 cards.
    - [ ]  **Card Style:** `16px` Radius, light shadow (`0 10px 15px -3px rgba(0, 0, 0, 0.05)`), `1px` Solid Light Grey border, `32px` padding, min-height `380px`.
    - [ ]  **Content (static text):**
        - [ ]  Card 1 (Title: "개발자 구인난", Icon: placeholder, Desc: "좋은 아이디어는 있는데 내 생각을 실현해줄 개발자를 구할 수가 없어요. 팀 빌딩부터 막막합니다.")
        - [ ]  Card 2 (Title: "비싼 외주 비용", Icon: placeholder, Desc: "간단한 MVP 하나 만드는데도 천만 원 넘는 견적을 받았어요. 초기 자본으로 큰 투자가 나갑니다.")
        - [ ]  Card 3 (Title: "높은 진입 장벽", Icon: placeholder, Desc: "코딩을 직접 배우려고 학원을 알아봤는데 최소 6개월은 걸린대요. 지금 당장 시작하고 싶은데 시간이 없어요.")
    - [ ]  **Empathy Button Area:** Placeholder for "공감 버튼" at the bottom center of each card.
- [ ]  **Responsiveness:** Desktop 3-column, Tablet (md) 2-column, Mobile (sm) 1-column stack.

### 3.3. Section 10: Final CTA

- [ ]  **Layout:** Full-width section, center-aligned.
- [ ]  **Headlines:**
    - [ ]  H1: "당신의 아이디어를 현실로 만들 준비되셨나요?"
    - [ ]  Sub-description: "지금 커뮤니티에 가입하고 첫 워크숍 소식을 가장 먼저 받아보세요. 코딩 지식이 없어도 3시간 만에 나만의 앱을 만들 수 있습니다."
- [ ]  **Form Area (Layout Only):**
    - [ ]  Layout for Email input field.
    - [ ]  Layout for "무료로 시작하기 →" CTA button (inline with input field on desktop).
- [ ]  **Trust Elements:** List 3 reassurance texts below CTA with icon placeholders (e.g., "30초 만에 가입 완료", "평생 무료 구독", "스팸 없는 청정 구역").

## 4. Phase 1 Verification Checklist

- [ ]  Next.js build successful and Tailwind CSS classes applied correctly.
- [ ]  Header/Footer consistently displayed across all pages.
- [ ]  Hero content (headline, CTA buttons) clearly visible.
- [ ]  Responsive layout for Hero and Problem Statement sections on Mobile (360px) and Tablet (768px) breakpoints.
- [ ]  shadcn/ui `Button` and `Card` components styled with brand colors.
- [ ]  All sections running correctly in a static state.
