# Phase 2: Navigation Bar & Scroll Structure Implementation Todo List

This todo list outlines the steps for implementing Phase 2 of the memoapp landing page, focusing on the Navigation Bar and Scroll Structure.

## Implementation Steps:

1.  **Create Component Structure:** (completed)
    *   Create the `components/navigation` directory.
    *   Create empty files for the following components:
        *   `components/navigation/Navbar.tsx`
        *   `components/navigation/NavLogo.tsx`
        *   `components/navigation/NavMenu.tsx`
        *   `components/navigation/NavCTA.tsx`

2.  **Implement `NavLogo.tsx`:** (completed)
    *   Content: `MemoApp` (text logo).
    *   Style: `font-bold text-lg`.
    *   Behavior: On click, navigate to `#top` or `/`.

3.  **Implement `NavMenu.tsx`:** (completed)
    *   Menu Items:
        *   "기능" -> `#features`
        *   "사용 사례" -> `#use-cases`
        *   "후기" -> `#social-proof`
    *   Behavior: Use `<a href="...">` for navigation (no JavaScript scroll control).
    *   Responsive: Desktop (horizontal menu), Mobile (menu hidden, only CTA visible).

4.  **Implement `NavCTA.tsx`:** (completed)
    *   Button Text: `무료로 시작하기`.
    *   Style: Same as Phase 1 Primary CTA (height: 56px, padding: 24px, radius: 28px, background: `bg-primary`, text color: white).
    *   Behavior: On click, navigate to `#cta`.

5.  **Implement `Navbar.tsx`:** (completed)
    *   Assemble `NavLogo`, `NavMenu`, and `NavCTA` components.
    *   Apply styles:
        *   `fixed top-0`
        *   `h-18` (72px)
        *   `bg-transparent`
        *   `z-50`
        *   Max width: 1200px (centered, e.g., `max-w-[1200px] mx-auto`).
        *   Padding for content: `px-4 md:px-5 lg:px-6` (matching HeroSection).
        *   Flexbox for layout: `flex items-center justify-between`.

6.  **Update `app/layout.tsx`:** (completed)
    *   Add `Navbar` component outside of the `children` prop, likely before or after.

7.  **Update `app/page.tsx` (Page Structure Change):** (completed)
    *   Wrap `HeroSection` and new empty `section` elements with a `<main>` tag.
    *   Add `Navbar` before the `<main>` tag.
    *   Add placeholder empty `<section>` elements with `id`s for `#features`, `#use-cases`, `#social-proof`, and `#cta` after `HeroSection`. Each `section` should have `min-h-[100svh]`.

8.  **Apply Section Common Rules:** (completed)
    *   Add `scroll-margin-top: 72px;` to a global CSS rule for `section` elements (e.g., in `app/global.css` or a utility CSS file).

9.  **Verification (Checklist):** (completed)
    *   Navbar fixed position works correctly.
    *   Anchor navigation works correctly.
    *   No screen overlap on mobile.
    *   No overlap issues with Hero section.
    *   A11y: Semantic `<nav>` and `<a>` tags, keyboard navigation, focus outline.

This list is intended to be updated during the implementation process.
