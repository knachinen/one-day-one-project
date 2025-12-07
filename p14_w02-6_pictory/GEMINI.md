# Pictory Project Overview

**Project Name:** Pictory (Picture + Story)

**Purpose:** Pictory is a community web service designed for users to share visual content (images) and short texts, communicate in real-time via direct messages (DM), and connect safely with others. It targets users aged 10s to 30s who want to visually record and share their daily lives, hobbies, and interests, and engage in personal conversations.

**Key Technologies:**

- **Frontend & Backend:** Next.js (React, TypeScript), integrated API Routes
- **Styling:** Styled-components, Tailwind CSS
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Real-time Communication:** Socket.IO (planned)
- **Authentication:** JWT-based
- **Linting:** ESLint

**Architecture:**
The project is an integrated full-stack Next.js application. Next.js handles both the frontend (React Single Page Application) and the backend functionalities (API Routes for RESTful interactions, TypeORM for database management, and potentially Server Components for data fetching). All server-side logic, including database connection and API endpoints, is now integrated within the Next.js project. Real-time features via WebSockets (Socket.IO) are planned.

## Building and Running the Project

This project is a single, integrated Next.js application.

### Full-stack Application

The application is built with Next.js, TypeScript, and utilizes pnpm as the package manager.

**Setup:**
Navigate to the `client/` directory and install dependencies using pnpm:

```bash
cd client
pnpm install
```

**Environment Variables:**
The application requires environment variables for database connection and JWT secret. Create a `.env.local` file inside the `client/` directory and configure:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=pictory
JWT_SECRET=your_very_strong_and_random_secret_key_here
```
Replace placeholders with your actual database credentials and a strong random string for `JWT_SECRET`.

**Available Scripts:**

- **`pnpm dev`**: Starts the Next.js development server with hot module reloading. This runs both the frontend and integrated API routes.
- **`pnpm build`**: Builds the Next.js application for production.
- **`pnpm start`**: Starts the production server after building.
- **`pnpm lint`**: Runs ESLint to check for code quality issues.

## Development Conventions

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Styled-components, Tailwind CSS
- **Database ORM:** TypeORM (integrated within Next.js API Routes)
- **API:** Next.js API Routes for RESTful interactions.
- **Authentication:** JWT-based.
- **Linting:** ESLint is configured for code quality.
- **Documentation:**
  - Detailed functional requirements, non-functional requirements, and database schema can be found in `doc/prd.md`.
  - Additional design and implementation notes are in `error/server_debug_plan.md`.

---

**Note:** This `GEMINI.md` file was automatically generated based on an analysis of the project structure and existing documentation. It has been updated to reflect the migration to an integrated Next.js full-stack application.