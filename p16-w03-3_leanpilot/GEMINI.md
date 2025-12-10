# LeanPilot Project Overview

This project, "LeanPilot," is a full-stack Next.js application designed to guide users through the process of planning their Minimum Viable Products (MVPs) using the Lean Startup methodology. It facilitates project creation, gathers structured input across various development stages, and culminates in the generation of comprehensive Product Requirements Documents (PRDs) in Markdown format.

## Technologies Used

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Database:** SQLite (with Drizzle ORM for type-safe database interactions)
*   **Authentication:** Lucia (for user authentication and session management)
*   **Styling:** Tailwind CSS (for utility-first CSS styling)
*   **State Management:** Zustand
*   **Validation:** Zod
*   **Diagrams:** Mermaid (for generating flowcharts and Gantt charts within PRDs)
*   **Headless Browser:** Puppeteer (likely used for PDF generation or similar tasks)
*   **Linting & Formatting:** ESLint, Biome
*   **Testing:** Vitest

## Project Structure Highlights

*   `src/app/`: Contains Next.js App Router routes, API endpoints, and UI components.
*   `src/lib/db/`: Database schema definitions (Drizzle ORM).
*   `src/lib/utils/`: Utility functions, including `generate-prd.ts` which is central to the PRD generation logic.
*   `src/components/`: Reusable React components, including stage-specific forms.
*   `public/`: Static assets.
*   `scripts/`: Contains database migration scripts (e.g., `db-push.ts`).

## Building and Running

### Prerequisites

*   Node.js (version specified in `package.json` dependencies, or latest LTS)
*   bun (or npm/yarn/pnpm)

### Commands

To get started with the project, use the following commands:

*   **Install Dependencies:**
    ```bash
    bun install
    # or npm install
    # or yarn install
    # or pnpm install
    ```

*   **Run Development Server:**
    ```bash
    bun dev
    # or npm run dev
    # or yarn dev
    # or pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

*   **Build for Production:**
    ```bash
    bun build
    # or npm run build
    # or yarn build
    # or pnpm build
    ```

*   **Start Production Server:**
    ```bash
    bun start
    # or npm run start
    # or yarn start
    # or pnpm start
    ```

*   **Push Database Schema (Development):**
    ```bash
    bun run db:push
    ```
    This command applies the Drizzle schema to the SQLite database.

*   **Run Linter:**
    ```bash
    bun lint
    # or npm run lint
    # or yarn lint
    # or pnpm lint
    ```

*   **Run Tests:**
    ```bash
    bun test
    # or npm run test
    # or yarn test
    # or pnpm test
    ```

## Development Conventions

*   **Code Formatting:** Enforced by Biome, using tabs for indentation and double quotes for strings.
*   **Linting:** Uses ESLint with Next.js specific configurations to maintain code quality.
*   **Path Aliases:** Uses `@/*` to refer to the `src/` directory for easier imports.
*   **Database Interactions:** All database operations are performed using Drizzle ORM, ensuring type safety and robust schema management.
*   **Authentication:** Handled via Lucia, with validation functions available in `src/lib/auth.ts`.
*   **Component Structure:** Components generally reside in `src/components/` and `src/app/` specific directories.