# LeanPilot: Development Task List

This document breaks down the work outlined in the Implementation Plan into a granular checklist.

## Phase 1: Core Infrastructure & Authentication (Weeks 1-2)

-   [x] **Environment Setup**
    -   [x] Initialize a new Next.js 16+ project (`bunx create-next-app`).
    -   [x] Configure `bun` as the package manager.
    -   [x] Install and configure `Biome` for linting and formatting.
    -   [x] Configure `tsconfig.json` with strict settings and path aliases.
    -   [x] Set up Docker and create a `docker-compose.yml` for PostgreSQL 17. (Deprecated, switched to SQLite)
-   [x] **Database & ORM**
    -   [x] Install `drizzle-orm` and `drizzle-kit`. (Drizzle Kit temporarily abandoned for migrations)
    -   [x] Create the database schema for `User`, `Session`, and `Project` in `/src/lib/db/schema.ts`.
    -   [x] Set up the Drizzle client and created initial tables via direct SQL execution in `scripts/db-push.ts`.
-   [x] **Styling & UI**
    -   [x] Install and configure Tailwind CSS.
    -   [x] Set up `shadcn/ui` and add initial components (Button, Input, Card).
    -   [x] Create a main `Layout` component with a header and footer.
-   [x] **Authentication**
    -   [x] Install and configure `lucia-auth` with the Drizzle adapter.
    -   [x] Implement password hashing using `argon2id`.
    -   [x] Create API endpoints (Next.js Server Actions) for register and login.
    -   [x] Build the UI forms for `Sign Up` and `Login`.
    -   [x] Implement client-side logic to handle authentication state (e.g., redirects).
    -   [x] Protect routes and create a `GET /api/auth/me` endpoint to fetch the current user.
-   [x] **Dashboard**
    -   [x] Create a basic dashboard page at `/dashboard`.
    -   [x] This page should be protected and only accessible to logged-in users.
    -   [x] Display a welcome message with the user's name.
-   [x] **Documentation Updates**
    -   [x] Update `implementation_plan.md` to reflect SQLite and no-Docker changes.
    -   [x] Update `prd.md` to reflect SQLite and no-Docker changes.

## Phase 2: Project & Stage Management (Weeks 3-5)

-   [ ] **Project Management**
    -   [x] Add `StageResponse` and `GeneratedDocument` tables to the Drizzle schema and migrate.
    -   [x] Create API endpoints for CRUD operations on projects (`/api/projects/...`).
    -   [x] On the dashboard, implement functionality to create a new project.
    -   [x] Display a list of existing projects on the dashboard.
-   [ ] **Stage-Based Form UI**
    -   [x] Create a dynamic page `/[projectId]/stage/[stageNumber]` to host the forms.
    -   [x] Build a sidebar or tab navigation to switch between the 5 stages.
    -   [x] Install and configure `zustand` to manage the state of the active project being edited.
-   [ ] **Stage 1 & 2 Forms**
    -   [x] Build the form for Stage 1 (Problem Discovery) using `react-hook-form` and `zod`.
    -   [x] Create an API endpoint (`POST /api/projects/:id/stages/1`) to save Stage 1 responses.
    -   [x] Build the form for Stage 2 (Solution Definition).
    -   [x] Create an API endpoint to save Stage 2 responses.
-   [ ] **Stage 3, 4, & 5 Forms**
    -   [x] Build the form for Stage 3 (MVP Scoping).
    -   [x] Build the form for Stage 4 (Validation Plan).
    -   [x] Build the form for Stage 5 (Execution Roadmap).
    -   [x] Implement backend endpoints to save responses for each stage.

## Phase 3: Document Generation & Preview (Weeks 6-8)

-   [x] **Document Generation Logic**
    -   [x] Create a server-side utility to fetch all `StageResponse` data for a given project.
    -   [x] Write a transformation function that converts the structured data into a complete Markdown string for the PRD.
    -   [x] Create an API endpoint (`GET /api/projects/:id/generate/prd`) that returns the generated Markdown.
-   [ ] **Live Preview Screen**
    -   [x] Create a new page at `/[projectId]/preview`.
    -   [x] Fetch the generated document from the API.
    -   [x] Install `react-markdown` and use it to render the PRD content.
-   [ ] **Diagram Integration**
    -   [x] Install `mermaid`.
    -   [x] Update the document generation logic to create Mermaid syntax for the User Flow and Gantt Chart.
    -   [x] Write a client-side component that finds and renders Mermaid diagrams within the `react-markdown` output.

## Phase 4: UX Polish, Export, & Testing (Weeks 9-12)

-   [ ] **UX Refinements**
    -   [x] Implement a progress bar in the stage-editing UI to show overall project completion.
    -   [x] Add a "Guide & Hints" panel to each question in the forms.
    -   [x] Implement auto-saving functionality for forms.
    -   [ ] Ensure the entire application is responsive and mobile-friendly.
-   [ ] **Export Functionality**
    -   [x] **Markdown Export**: Add a "Download .md" button that creates and downloads a `.md` file of the PRD.
    -   [x] **PDF Export**:
        -   [x] Install `puppeteer`.
        -   [x] Create a print-optimized CSS stylesheet.
        -   [x] Create an API route (`GET /api/documents/:id/pdf`) that uses Puppeteer to render the preview page and generate a PDF.
        -   [x] Add a "Download PDF" button to the UI.
-   [x] **Landing Page**
    -   [x] Create the main landing page (`/`) that describes the product.
    -   [x] Add a clear "Get Started" Call-To-Action (CTA) that links to the signup page.
-   [ ] **Testing**
    -   [ ] Write `vitest` unit tests for the document generation logic.
    -   [ ] Write component tests with `React Testing Library` for the main form components.
    -   [ ] Write `Playwright` E2E tests for the following user flows:
        -   User signup and login.
        -   Project creation.
        -   Filling out all 5 stages.
        -   Viewing and downloading the generated PRD.
-   [ ] **Finalization**
    -   [ ] Review all code for quality and consistency.
    -   [ ] Perform a final dependency audit for security vulnerabilities.
    -   [ ] Create a `README.md` with setup and deployment instructions.
    -   [ ] Prepare environment variables for Vercel deployment.
