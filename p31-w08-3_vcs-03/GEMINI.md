# Project Context: Portfolio Website

## Overview
This project is a personal portfolio website built with **Next.js 16** and **Tailwind CSS**. It is designed to be a high-performance, visually appealing site for a designer/developer, featuring a clean UI and smooth interactions.

## Tech Stack
*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Libraries (Planned):** Framer Motion, shadcn/ui (as per `doc/tech-stack.md`)
*   **Linting & Formatting:** ESLint, Prettier

## Project Structure
*   `portfolio/`: Root directory of the Next.js application.
    *   `app/`: Application source code (Pages, Layouts).
    *   `public/`: Static assets (images, icons).
*   `doc/`: Project documentation.
    *   `design.md`: Detailed UI/UX design specifications.
    *   `tech-stack.md`: Technology choices and rationale.
    *   `plan.md`: Project roadmap and status.
    *   `implement.md`: Implementation details.

## Building and Running
All commands should be run from the `portfolio/` directory.

### Development Server
```bash
npm run dev
```
Starts the development server at [http://localhost:3000](http://localhost:3000).

### Production Build
```bash
npm run build
```
Builds the application for production.

### Start Production Server
```bash
npm run start
```
Runs the built application.

### Linting
```bash
npm run lint
```
Runs ESLint to check for code quality issues.

## Development Conventions
*   **Styling:** Use Tailwind CSS utility classes for styling.
*   **Components:** Follow the App Router structure (`app/` directory).
*   **State Management:** Use React Hooks for local state. Avoid global state unless necessary.
*   **Design:** Adhere strictly to the specifications in `doc/design.md` regarding typography, colors, and spacing.
*   **Icons:** Use SVG icons as inline components or via a library like `lucide-react`.

## Key Files for AI Context
*   `portfolio/package.json`: Dependencies and scripts.
*   `doc/design.md`: **CRITICAL**. Contains the exact design specs (colors, fonts, layout). Always refer to this when implementing UI.
*   `doc/tech-stack.md`: Approved technology stack and architecture decisions.
