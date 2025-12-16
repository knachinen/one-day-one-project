# Phase 1: Hero Section (Static UI) Implementation Todo List

This todo list outlines the steps for implementing Phase 1 of the memoapp landing page, focusing on the static UI of the Hero section.

## Implementation Steps:

1.  **Create Component Structure:**
    *   Create the `components/hero` directory.
    *   Create empty files for the following components:
        *   `components/hero/HeroSection.tsx`
        *   `components/hero/HeroTitle.tsx`
        *   `components/hero/HeroSubtitle.tsx`
        *   `components/hero/HeroCTA.tsx`

2.  **Implement `HeroTitle.tsx`:**
    *   Use the fixed phrase: "생각이 떠오르는 순간,
바로 메모"
    *   Apply styles:
        *   Desktop Font Size: 56px
        *   Mobile Font Size: 36px
        *   Font Weight: 700 / 800
        *   Line Height: 1.2
        *   Letter Spacing: -1%
    *   Apply `text-primary` to "바로 메모".
    *   Ensure line breaks are fixed (even in responsive views).
    *   Use `h1` tag for accessibility.

3.  **Implement `HeroSubtitle.tsx`:**
    *   Use the phrase: "생각을 놓치지 않도록, 가장 빠르고 가벼운 메모 경험"
    *   Apply styles:
        *   Font Size: 18px
        *   Color: `text-gray-600`
        *   Max Width: 640px
        *   Margin Top: 24px

4.  **Implement `HeroCTA.tsx`:**
    *   Create two buttons: "무료로 시작하기" (Primary) and "앱 다운로드" (Secondary).
    *   Apply Primary Button styles:
        *   Height: 56px
        *   Padding: 24px
        *   Radius: 28px
        *   Background: `bg-primary`
        *   Text Color: white
    *   Apply Secondary Button styles:
        *   Height: 56px
        *   Padding: 24px
        *   Radius: 28px
        *   Border: 1px solid #E5E7EB
        *   Background: white
    *   Implement desktop layout: horizontal alignment, 16px gap.
    *   Implement mobile layout: vertical alignment, 12px gap.
    *   Ensure `<button>` tags are used for accessibility.

5.  **Implement `HeroSection.tsx`:**
    *   Assemble `HeroTitle`, `HeroSubtitle`, and `HeroCTA` components.
    *   Apply layout rules:
        *   `min-h-[100svh]`
        *   Content aligned vertically center.
        *   Max width: 1200px.
        *   Horizontal padding: Desktop 24px, Tablet 20px, Mobile 16px.
    *   Implement responsive behavior:
        *   Mobile (≤767px): text center aligned, buttons vertical stack, auto hero height.
        *   Tablet / Desktop: text left aligned, buttons horizontal.

6.  **Update `app/page.tsx`:**
    *   Import and render `HeroSection` component.
    *   Remove existing default content.

7.  **Address Pretendard Font Integration (if `Pretendard-Regular.woff2` is provided):**
    *   Uncomment `localFont` import and `pretendard` constant in `app/layout.tsx`.
    *   Apply `pretendard.className` to the `<html>` tag in `app/layout.tsx`.

8.  **Verification (Checklist):**
    *   Verify mobile/desktop display correctly.
    *   Confirm no CLS (Cumulative Layout Shift) issues.
    *   Ensure CTA buttons are clickable (even with dummy actions/links).
    *   Verify SEO meta title is correctly exposed.

This list is intended to be updated during the implementation process.
