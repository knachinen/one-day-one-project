# Phase 3: Floating Memo Cards (Static Position) Implementation Todo List

This todo list outlines the steps for implementing Phase 3 of the memoapp landing page, focusing on the static placement of floating memo cards in the Hero section.

## Implementation Steps:

1.  **Create Component Structure:** (completed)
    *   Create the `components/hero/cards` directory.
    *   Create empty files for the following components:
        *   `components/hero/FloatingNotes.tsx`
        *   `components/hero/NoteCard.tsx`
        *   `components/hero/cards/ChecklistCard.tsx`
        *   `components/hero/cards/TextNoteCard.tsx`
        *   `components/hero/cards/TagNoteCard.tsx`
        *   `components/hero/cards/CalendarNoteCard.tsx`
        *   `components/hero/cards/VoiceNoteCard.tsx`

2.  **Implement `NoteCard.tsx` (Common Card Style):** (completed)
    *   Apply base styles:
        *   `rounded-2xl`
        *   `bg-white/90`
        *   `p-4`
        *   `shadow-[0_10px_30px_rgba(0,0,0,0.08)]`
        *   Set `width` (e.g., a sensible default or allow prop).
    *   Include `aria-hidden="true"` and `pointer-events-none` for accessibility/UX.

3.  **Implement Specific Note Card Components (within `components/hero/cards`):** (completed)
    *   **`ChecklistCard.tsx`**:
        *   Title (1 line), 3-4 check items.
        *   Use SVG icons for checkboxes.
    *   **`TextNoteCard.tsx`**:
        *   2-3 lines of text, natural line breaks.
    *   **`TagNoteCard.tsx`**:
        *   Short sentence, 2-3 hashtags.
    *   **`CalendarNoteCard.tsx`**:
        *   Emphasized date, 1 line for event title.
    *   **`VoiceNoteCard.tsx`**:
        *   Waveform SVG icon, playback time text.
    *   Each card should use `NoteCard` for its base styling.

4.  **Implement `FloatingNotes.tsx`:** (completed)
    *   Container for all NoteCard components.
    *   Apply conditional display: `hidden md:block` (visible only on `md` screens and above).
    *   Apply positioning: `absolute inset-0 pointer-events-none`.
    *   Place each specific note card component with absolute positioning based on the provided desktop guide (top/left percentages).

5.  **Update `HeroSection.tsx` (Extend Structure):** (completed)
    *   Change the `<section>` tag to have `className="relative"`.
    *   Import `FloatingNotes` component.
    *   Add `<FloatingNotes />` inside the `<section>`, after `HeroCTA`.

6.  **Verification (Checklist):** (completed)
    *   Floating memo cards display correctly on desktop.
    *   Floating memo cards are hidden on mobile.
    *   Hero text readability is maintained.
    *   Hero section CTA is not obstructed by floating cards.

This list is intended to be updated during the implementation process.
