# Phase 3: Optimization and Final Review (Launch Ready) Implementation Plan

This document outlines the detailed tasks for Phase 3, focusing on implementing the final technical elements required for launching the landing page, including performance, SEO, analytics integration, and final CTA form logic.

## 1. Final CTA (최종 전환 유도) Logic Implementation

- [ ]  **Form Logic and Validation:** Apply `React Hook Form` to the email input field in the Final CTA section. Implement validation logic (email format, 빈 값 확인) on form submission.
- [ ]  **API Integration:** Implement a Next.js API Route (e.g., `/api/signup`) to handle form submission data. This endpoint will forward data to an actual CRM/ESP (Email Service Provider) API.
- [ ]  **User Feedback:** Provide clear feedback messages to the user on form submission success/failure. Implement a **Confetti animation** on success (using `shadcn/ui: Toast`, `Framer Motion`).

## 2. Advanced Interaction and Animation Application

- [ ]  **Scroll-based Animations (Hero Section):** Implement typing effect for the background code block (CSS or Lottie) and mouse-movement-driven **gradient parallax** in the Hero Section.
- [ ]  **Solution Section Timeline:** Apply **Stroke Animation** to the timeline elements (e.g., in Comparison Table, if applicable) so that lines draw on scroll entry.
- [ ]  **Final CTA Parallax:** Apply **Parallax Scrolling** to the Final CTA section's background and text content for depth.
- [ ]  **Micro-Interactions:** Implement **subtle elevation** and **bouncing arrow icon animation** on hover for all main CTA buttons (Header, Final CTA).

## 3. Performance and SEO Optimization

- [ ]  **Image Optimization:** Use **Next.js `Image` component** for all images on the page. Ensure WebP format usage and **Lazy Loading**.
- [ ]  **SEO Meta Tags:** Use **`Next/Head`** to configure page title, description, Open Graph tags (for social sharing images and descriptions).
- [ ]  **Font and CSS Optimization:** Load **Pretendard font** using local or optimized methods to prevent **CLS (Cumulative Layout Shift)**. Remove unused CSS (Purge CSS).
- [ ]  **Code Splitting:** Utilize Next.js dynamic import (`dynamic` import) for splitting unnecessary section components during initial load.

## 4. Analytics and Conversion Tracking System Integration

- [ ]  **GTM/GA4 Integration:** Insert **Google Tag Manager (GTM)** snippet into `_document` or `layout.tsx`. Configure **Google Analytics 4 (GA4)** tags via GTM.
- [ ]  **Conversion Event Tracking:** Configure the following conversion events via GTM and send to GA4:
    - [ ]  **1. Final CTA Click** (Form submission button).
    - [ ]  **2. Scroll Depth** (when 75% or more of the page is reached).
- [ ]  **User Behavior Analysis:** Insert scripts for heatmap and session recording tools like **Hotjar** or **Microsoft Clarity**.

## 5. Final QA and Accessibility Check

- [ ]  **Accessibility Final Check:** Review accessibility issues using **Axe DevTools**. Verify **ARIA attributes** and **keyboard accessibility** for all `shadcn/ui` based components.
- [ ]  **Browser Compatibility:** Verify consistent display of the landing page across major browsers (Chrome, Firefox, Safari, Edge).
- [ ]  **Lighthouse Audit:** Run Google Lighthouse to measure **Performance, Accessibility, and SEO** scores, ensuring they meet the target (90+ points).

## 6. Phase 3 Final Verification Checklist

- [ ]  **CTA 폼 로직:** 이메일 유효성 검사 작동 및 폼 제출 후 **CRM/ESP API**로 데이터 전송 성공 확인.
- [ ]  **애니메이션:** 모든 고급 애니메이션(Parallax, 타이핑 효과 등)이 부드럽게 재생되고 **성능 저하**가 없는지 확인.
- [ ]  **SEO/성능:** Lighthouse 성능 점수가 90점 이상인지 확인.
- [ ]  **분석 도구:** GTM 디버그 모드를 통해 CTA 클릭 시 **전환 이벤트**가 GA4로 정상 전송되는지 확인.
- [ ]  **반응형:** Final CTA 섹션이 Mobile에서 **세로 스택**으로 전환되고, 폼이 Full-width로 표시되는지 확인.
- [ ]  **최종 배포:** Vercel 또는 Netlify에 배포하여 **실제 운영 환경**에서 기능 및 성능 테스트 완료.
