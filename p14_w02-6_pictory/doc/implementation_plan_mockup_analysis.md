# PRD Refinement Plan: Mockup Integration

## Goal
To refine the "Pictory" PRD (`p14_w02-6_pictory.md`) by incorporating specific UI/UX requirements derived from the provided mockup design.

## Mockup Analysis & Mapped Requirements

Based on the provided mockup images, the following specific requirements will be added:

### 1. Authentication (Login/Signup)
-   **Social Login:** Add support for "Google" and "Kakao" login (inferred from generic "Social Login" buttons often seen in such designs).
-   **Welcome UI:** Mention "Welcome Back" greeting and intuitive form layout.

### 2. Create Post
-   **Aspect Ratio Selection:** User must be able to select image ratios: **1:1**, **4:5**, **16:9**.
-   **Filters/Colors:** Add requirement for basic image filtering or background color selection if shown in "Mood/Color" selection areas.
-   **Caption:** text input area with character count.

### 3. Main Feed & Navigation
-   **Layout:** Sidebar navigation (Left side) vs Top/Bottom bar. (Will specify **Sidebar** based on desktop-like mockup or **Responsive** requirement).
-   **Search:** Top search bar usage.

### 4. Profile
-   **Grid View:** Display user posts in a 3-column grid.
-   **Stats:** Explicitly track and display "Posts", "Followers", "Following" counts.

### 5. DM (Direct Messages)
-   **Chat List:** Show user avatar, last message, and timestamp.
-   **Chat Room:** Bubble interface, ability to send images/files.

## Execution Steps
1.  **Modify FR-A-101/102**: Add Social Login details.
2.  **Modify FR-B-201**: Add Aspect Ratio (1:1, 4:5, 16:9) and Filter requirements.
3.  **Modify FR-C-301**: Specify Layout and Navigation structure.
4.  **Modify FR-A-104 (Profile)**: formatting requirements (Grid view, Stats).
5.  **Modify NFR-T-101**: Mention Responsive Design or specific UI Framework preference if tailored to the mockup style (e.g., "Clean, Minimalist, possibly using styled-components").

## Output
-   Updated `p14_w02-6_pictory.md` with high-fidelity requirements.
-   Update `task.md`.
