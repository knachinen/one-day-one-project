# Phase 4: Hero Animation & Card Hover Implementation Todo List

This todo list outlines the steps for implementing Phase 4 of the memoapp landing page, focusing on micro-animations and hover effects in the Hero section.

## Implementation Steps:

1.  **Create Motion Wrapper Structure:** (completed)
    *   Create the `components/hero/motion` directory.
    *   Create empty files for the following components:
        *   `components/hero/motion/HeroMotionWrapper.tsx`
        *   `components/hero/motion/CardMotionWrapper.tsx`

2.  **Implement `HeroMotionWrapper.tsx`:** (completed)
    *   **Purpose**: Wrap `HeroTitle`, `HeroSubtitle`, and `HeroCTA` components.
    *   **Animation Rules**:
        *   `initial={{ opacity: 0, y: 16 }}`
        *   `animate={{ opacity: 1, y: 0 }}`
        *   `transition={{ duration: 0.5, ease: 'easeOut' }}`
        *   Apply sequential delays: 0.0s for HeroTitle, 0.1s for HeroSubtitle, 0.2s for HeroCTA.
    *   **Usage**: Each wrapped component will use this wrapper to apply its entry animation.
    *   **Accessibility**: Integrate `useReducedMotion` to disable animations if `prefers-reduced-motion` is active.

3.  **Implement `CardMotionWrapper.tsx`:** (completed)
    *   **Purpose**: Wrap `NoteCard` components.
    *   **Hover/Tap Animation Rules**:
        *   `whileHover={{ y: -4, rotate: (random +/- 1deg) }}` (rotate value should vary per card)
        *   `whileTap={{ scale: 0.97 }}`
        *   `transition={{ duration: 0.2, ease: 'easeOut' }}`
    *   **Accessibility**: Integrate `useReducedMotion` to disable animations if `prefers-reduced-motion` is active.
    *   **UX**: Ensure `pointer-events` are enabled only for the hoverable area of the card (likely already handled by `pointer-events-none` on `FloatingNotes` and now needs selective re-enablement or specific targetting).

4.  **Update `HeroTitle.tsx`, `HeroSubtitle.tsx`, `HeroCTA.tsx`:** (completed)
    *   Wrap their content with `HeroMotionWrapper` (or integrate the `motion.div` directly, ensuring sequential delays).

5.  **Update `NoteCard.tsx` (or directly specific cards):** (completed)
    *   Wrap the `NoteCard` content (or `NoteCard` itself) with `CardMotionWrapper` to enable hover effects.
    *   Randomize `rotate` value for each card.

6.  **Update `package.json` and install Framer Motion:** (completed)
    *   Add `"framer-motion": "^x.x.x"` (latest stable version) to dependencies.
    *   Run `pnpm install`.

7.  **Verification (Checklist):** (in_progress)
    *   Hero content entry animation is smooth and natural.
    *   Card hover effects are subtle and responsive.
    *   `prefers-reduced-motion` setting correctly disables animations.
    *   Lighthouse Performance score is maintained (no significant degradation).

This list is intended to be updated during the implementation process.
