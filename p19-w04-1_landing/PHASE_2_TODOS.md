# Phase 2: Interactive Features and Core Value Implementation Plan

This document outlines the detailed tasks for Phase 2, focusing on implementing interactive features and core value sections such as How It Works, Live Demo, Comparison Table, Success Stories (card layout), and Community Preview (card layout).

## 1. Section 4: How It Works (작동 방식) Implementation

- [x]  **Layout:** Implement 2-Column Grid (Left: Accordion 4, Right: Visual 6) for desktop. Mobile: Full width stack (Accordion then Visual).
- [x]  **Section Header:**
    - [x]  Sub-label: "THE ROADMAP" (chip style, Primary Blue background).
    - [x]  Main H2: "How It Works".
    - [x]  Description: "From zero coding knowledge to your own app in just 3 hours. Here is our proven roadmap to launch your MVP."
- [x]  **Process Accordion:**
    - [x]  Use `shadcn/ui Accordion` component for 3 steps (Workshop, Post-Debugging, Coaching).
    - [x]  **Accessibility:** Apply `aria-expanded` and `aria-controls` to accordion headers. Implement keyboard navigation.
    - [x]  **Content for each step:**
        - [x]  **Step 1 (Workshop):** Title "3-Hour Offline Workshop", Description "Join our intensive offline session where you will build a functional app prototype from scratch. No prior experience needed. We provide the laptops, the curriculum, and the coffee.", Chips ("Offline", "Gangnam Station", "3 Hours"), CTA Link "See Curriculum Details →".
        - [x]  **Step 2 (Post-Debugging):** Title "Post-Debugging Training", Description "Learn to fix errors and polish your code."
        - [x]  **Step 3 (Coaching):** Title "Solo Founder Coaching", Description "1:1 strategy session for your MVP."
    - [x]  **Final CTA (below accordion):** Button "Start Your Journey →" (Primary CTA style).
- [x]  **Visual Elements (Right Column):**
    - [x]  Placeholder for Workshop Photo Gallery (Main image + 2 small thumbnails).
    - [x]  "LIVE WORKSHOP" badge.
    - [x]  Social Proof Card: "Join 400+ Makers" with avatar group placeholder and "5.0 / 5 stars".
- [x]  **Entry Animation:** Implement `Fade-in Up` with `150ms` delay for accordion items, `Slide-in Left` for right gallery on scroll entry.
- [x]  **Progress Indicator:** Placeholder for a vertical line animating on scroll.

## 2. Section 5: Live Demo (라이브 데모) Implementation

- [x]  **Layout:** Implement 2-Column Grid (Left: Control Panel 4, Right: Real-time Preview 6) for desktop. Mobile: Full width stack (Section Title -> Preview -> Control Panel).
- [x]  **Section Header:**
    - [x]  Sub-label: "LIVE SANDBOX".
    - [x]  Main H2: "이렇게 만들어집니다".
    - [x]  Description: "코딩 없이 클릭만으로 앱을 완성해보세요. 드래그 앤 드롭조차 필요 없습니다. 원하는 기능을 선택하기만 하면 실시간으로 앱이 완성됩니다."
- [x]  **Core Logic (State Management):** Define React `useState` for `appTitle`, `primaryColor`, `componentList`.
- [x]  **Control Panel (Left Column):**
    - [x]  **Title Editor:** `shadcn/ui Input` for `appTitle` state. Placeholder "예: 나만의 할일 앱".
    - [x]  **Color Theme Selector:** 6 circular color chips (Primary Blue, Purple, Green, Orange, Red, Yellow). On click, change `primaryColor` state. Selected chip shows white checkmark.
    - [x]  **Component Controls:** Placeholders for "구성 요소 추가", "텍스트 변경", "테마 설정" categories with small card options (e.g., "헤더 추가", "버튼 생성", "텍스트 변경", "이미지 삽입").
- [x]  **Real-time Preview (Right Column):**
    - [x]  Thin, elegant smartphone mockup frame.
    - [x]  **App Title:** Reflect `appTitle` state.
    - [x]  **Dynamic Styles:** Buttons, bottom tab bar, accent text colors change based on `primaryColor` state using CSS variables.
    - [x]  Placeholder for basic UI (greeting, button, design card widget, bottom nav).
- [x]  **Real-time Sync:** Ensure changes in control panel reflect in preview within 100ms.
- [x]  **Final CTA (Full Width below preview):** Button "3시간 완성 워크숍 신청하기 →" (Primary CTA style).
- [x]  **Entry Animation:** `Slide-in Right` for left panel, `Slide-in Left` for right mockup.

## 3. Section 7: Comparison Table (차별점 강조) Implementation

- [x]  **Layout:** Implement Comparison Table (5 columns) below Section Header. Mobile: Horizontal scrollable table.
- [x]  **Section Header:**
    - [x]  Sub-label: "Why Vibe Coding?" (Primary Blue chip).
    - [x]  Main H2: "왜 바이브코딩인가요?".
    - [x]  Description: "수개월 걸리는 독학이나 비싼 외주 대신, 단 3시간 만에 나만의 앱을 완성하세요."
- [x]  **Table Structure:** Use HTML `<table>`, `<thead>`, `<tbody>` for 5 columns (Criteria, Self-study, Online Course, Outsourcing, VibeCoding).
- [x]  **VibeCoding Column Highlight:** Apply light Primary Blue background (`#F5F8FF`) and 2px Solid Primary Blue border.
- [x]  **Visual Elements:** Place Check (V) icons for benefits and X icons for drawbacks.
- [x]  **Content:** Populate table with provided data (e.g., "소요 시간", "비용", "실시간 지원", "후속 지원", "맞춤형 교육").
- [x]  **Final CTA (below table):**
    - [x]  Headline: "망설일 시간이 없습니다".
    - [x]  Description: "이미 3,000명 이상의 수강생이 자신만의 앱을 만들었습니다.".
    - [x]  Button: "지금 3시간 만에 앱 만들기 🚀" (Primary CTA style).
- [x]  **Entry Animation:** Implement `Fade-in Up` for each table row with `100ms` delay. `Pulse` animation for VibeCoding column on entry.
- [x]  **Check/X Animation:** Animate Check marks (drawing) and X marks (rotation) on viewport entry.

## 4. Section 6 & 9: Stories & Community (카드 레이아웃) Implementation

### 4.1. Section 6: Success Stories (성공 사례)

- [x]  **Layout:** Implement 3-Column Grid or Carousel structure for cards. Mobile: Touch swipe enabled carousel, 1 card visible.
- [x]  **Section Header:**
    - [x]  Main H2: "수강생들이 만든 놀라운 결과물".
    - [x]  Description: "아이디어만으로 시작해 실제 성공까지 달성한 이야기를 만나보세요."
- [x]  **Success Story Cards:** Use `shadcn/ui Card` with static content.
    - [x]  **Card Content:** Project screenshot placeholder, "강조 배지" (e.g., "3시간 완성"), Project name, Student info (Name, profile image), One-line comment, Achievement metrics ("조회 100+천회").
- [x]  **Carousel Navigation (Placeholder):** Implement left/right arrow buttons and pagination indicators.
- [x]  **Entry Animation:** Implement `Staggered Fade-in` for cards (Y: 30px → 0, `100ms` delay).
- [x]  **Metrics Counter Animation:** Animate numbers (e.g., "100+", "1.5K") from 0 to final value on viewport entry.

### 4.2. Section 9: Community Preview (커뮤니티 미리보기)

- [x]  **Layout:** Implement 2-Column Grid (Left: Info 4, Right: Feed Preview 6) for desktop. Mobile: Full width stack (Metrics -> Info -> Feed Preview).
- [x]  **Section Header:**
    - [x]  Sub-label: "LIVE COMMUNITY" (Primary Blue chip).
    - [x]  Main H2: "이미 500명의 창업자들이 함께하고 있어요".
    - [x]  Description: "코딩 지식이 전혀 없어도 괜찮습니다. 3시간이면 나만의 앱을 만들 수 있습니다. 실시간으로 질문하고, 서로 피드백을 주고받으며 성장하는 바이브코딩 커뮤니티에 함께하세요."
- [x]  **Key Metrics (Left Column):** Static display of 3 metrics (e.g., "500+ 누적 멤버", "98% 강의 만족도", "3hr 평균 제작 시간").
- [x]  **Benefits List (Left Column):** Static list of benefits with icon placeholders (e.g., "실시간 Q&A 지원", "매주 프로젝트 피드백", "네트워킹 & 팀빌딩").
- [x]  **Final CTA (Left Column):** Button "지금 커뮤니티 합류하기 →" (Primary CTA style).
- [x]  **Community Feed Preview (Right Column):** Placeholder for a social media feed snapshot (with mock messages, user avatars, attached image placeholder).
- [x]  **Metrics Counter Animation:** Animate numbers (e.g., "500+", "98%", "3hr") from 0 to final value on viewport entry.
- [x]  **Feed Animation:** Placeholder for sequential `Slide-in Up` and flash animation for new messages.

## 5. Phase 2 Final Verification Checklist

- [ ]  **Live Demo 기능:** 좌측 입력값 및 컬러 칩 클릭 시 우측 프리뷰 UI가 **실시간으로 변경**되는지 확인.
- [ ]  **How It Works UX:** 아코디언이 클릭 시 부드럽게 열리고, **접근성(Tab 키)**이 확보되었는지 확인.
- [ ]  **비교 테이블 UX:** Mobile 환경에서 테이블이 가로 스크롤 되며, **바이브코딩 컬럼의 강조**가 유지되는지 확인.
- [ ]  **스크롤 애니메이션:** How It Works, Comparison Table 등에서 **순차적 등장 애니메이션**(`Fade-in Up`)이 스크롤 진입 시 작동하는지 확인.
- [ ]  **반응형:** Live Demo 섹션이 Mobile에서 **세로 스택** (프리뷰 → 컨트롤)으로 전환되는지 확인.
- [ ]  **카드/그리드:** Success Stories 및 Community 섹션의 **그리드 레이아웃**이 깨지지 않는지 확인.