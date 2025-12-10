# LeanPilot: Implementation Plan

This document outlines the technical strategy and development roadmap for building LeanPilot, a guided template platform for MVP planning based on the Lean Startup methodology.

## 1. Project Overview

- **Product**: LeanPilot
- **Vision**: To provide a structured, guided experience for solopreneurs and single-person businesses to systematically plan, validate, and specify an MVP.
- **Core Process**: A 5-stage template process that guides users from problem discovery to an executable roadmap, automatically generating a Product Requirements Document (PRD) and other key assets.

## 2. Core Philosophy & Guiding Principles

- **Lean Methodology First**: The entire UX and feature set will be designed to naturally guide the user through the Build-Measure-Learn loop.
- **Security by Default**: Adherence to modern security best practices is paramount. All chosen technologies will have the latest security patches applied, and dependencies will be monitored.
- **Developer Experience (DX)**: The development environment will be optimized for speed and efficiency using modern tools like Bun, Next.js with Turbopack, and Biome.
- **Local-First Development**: The entire application will be runnable on a local machine without required cloud dependencies.
- **Type Safety**: The project will be fully type-safe from the database to the frontend, utilizing TypeScript, Drizzle ORM, and Zod for validation.

## 3. Recommended Technology Stack

This stack is based on the analysis in the PRD, prioritizing modern, high-performance, and secure technologies as of late 2025.

- **Runtime**: Bun 1.x
- **Package Manager**: Bun (built-in)
- **Frontend Framework**: Next.js 16.0.8+ (with latest security patches)
- **UI Library**: React 19.2.1+ (with latest security patches)
- **Backend Framework**: Next.js API Routes (Server Actions)
- **Database**: SQLite (local file via @libsql/client)
- **ORM**: Drizzle ORM 0.45.0+ (libSQL dialect)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui
- **State Management**: Zustand 5.0+
- **Authentication**: Lucia Auth 3+
- **Form Management**: React Hook Form 7.54+ with Zod 3.24+ for validation.
- **Linting/Formatting**: Biome 1.9+
- **Testing**: Vitest 3+ (Unit), React Testing Library (Components), Playwright 1.50+ (E2E).
- **Diagrams**: Mermaid.js for Gantt and flowcharts.
- **Document Export**: `react-markdown` for Markdown, Puppeteer for PDF generation.

## 4. System Architecture

The application will be a monolithic, full-stack Next.js application.

- **`/src/app`**: Contains all page routes, layouts, and server components for the frontend.
- **`/src/app/api`**: Next.js API Routes (Server Actions) for backend logic.
- **`/src/lib`**:
    - **`/db`**: Drizzle ORM schema and client.
    - **`/auth`**: Lucia configuration and authentication utilities.
    - **`/validators`**: Reusable Zod schemas.
- **`/src/components/ui`**: Unmodified `shadcn/ui` components.
- **`/src/components/shared`**: Custom, reusable components built for the application.
- **`/src/features`**: Contains domain-specific logic and components (e.g., `project-dashboard`, `stage-forms`, `document-generator`).
- **`/src/store`**: Zustand store definitions for global client-side state.

## 5. Development Phases & Milestones

The project will be developed over approximately 12 weeks, broken into the following phases.

### Phase 1: Core Infrastructure & Authentication (Weeks 1-2)
- **Goal**: Establish a working development environment with a solid foundation for authentication and data management.
- **Key Outcomes**:
    - Project initialized with the complete tech stack.
    - SQLite database initialized and tables created.
    - Users can register, log in, and log out.
    - A basic dashboard page is visible to logged-in users.

### Phase 2: Project & Stage Management (Weeks 3-5)
- **Goal**: Implement the core functionality of creating projects and filling out the 5-stage templates.
- **Key Outcomes**:
    - Users can create, view, and delete projects.
    - The 5-stage UI is implemented.
    - Users can input and save data for all 5 stages.
    - Data is persisted to the database via API endpoints.
    - State is managed effectively with Zustand.

### Phase 3: Document Generation & Preview (Weeks 6-8)
- **Goal**: Automatically generate the PRD and other documents from user input.
- **Key Outcomes**:
    - A live-preview screen that shows the generated PRD in Markdown format.
    - `react-markdown` is integrated to render the document.
    - `Mermaid.js` is integrated to render user flow and Gantt charts.
    - The final document generation logic is complete.

### Phase 4: UX Polish, Export, & Testing (Weeks 9-12)
- **Goal**: Refine the user experience, add critical export functionality, and ensure the application is robust and bug-free.
- **Key Outcomes**:
    - UI elements like progress bars and guides are implemented.
    - PDF and Markdown export functionalities are working.
    - The application has comprehensive unit, integration, and E2E tests.
    - Final landing page is created.
    - The application is ready for an initial production deployment.

## 6. Testing Strategy

- **Unit Testing**: `Vitest` will be used to test individual functions and utilities, particularly business logic for document generation and data transformation.
- **Component Testing**: `React Testing Library` will be used to test individual React components in isolation.
- **Integration Testing**: `Vitest` and `Supertest` (or a similar library) will be used to test the API endpoints to ensure they behave as expected.
- **End-to-End (E2E) Testing**: `Playwright` will be used to automate browser-based tests that simulate complete user journeys, such as "register -> create project -> fill all stages -> download PRD".

## 7. Deployment Strategy

- **Frontend**: The Next.js application will be deployed to **Vercel**, leveraging its tight integration for optimal performance and CI/CD.
- **Backend & Database**: For production, a remote SQLite database (e.g., Turso) will be used. The Next.js API routes will be deployed alongside the frontend on Vercel.
- **Environment Variables**: Vercel's environment variable management will be used to store secrets and configuration for production, staging, and preview environments.
