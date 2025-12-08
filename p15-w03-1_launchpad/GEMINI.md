# Project Overview

This is a Next.js project bootstrapped with `create-next-app` that serves as an MVP platform for sharing and collaborating on ideas. It features user authentication, idea submission, tagging, voting, and commenting.

## Key Technologies

*   **Framework:** Next.js (React 19)
*   **Styling:** Tailwind CSS
*   **Database:** Drizzle ORM with SQLite (using `better-sqlite3` for development)
*   **Authentication:** Lucia with Argon2id for password hashing
*   **API/Backend:** Hono (potentially for API routes)
*   **Validation:** Zod

## Project Structure

*   `src/app/`: Contains the main application routes, including login, signup, and idea-related pages.
*   `src/components/`: Reusable UI components.
*   `src/features/`: Feature-specific logic, such as authentication actions and idea forms.
*   `src/lib/`: Core utilities, including authentication setup (`auth/index.ts`) and database schema (`db/schema.ts`).
*   `public/`: Static assets.
*   `drizzle.config.ts`: Configuration for Drizzle ORM.
*   `sqlite.db`: The SQLite database file used in development.
*   `test_signup_logic.ts`: A test file for signup logic.

## Building and Running

### Prerequisites

*   Node.js (version compatible with Next.js 16)
*   bun (or npm/yarn)

### Development Server

To run the development server:

```bash
bun dev
# or
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`.

### Build

To build the application for production:

```bash
bun build
# or
npm run build
# or
yarn build
```

### Start Production Server

To start the built production server:

```bash
bun start
# or
npm run start
# or
yarn start
```

### Linting

To run the linter:

```bash
bun lint
# or
npm run lint
# or
yarn lint
```

## Development Conventions

*   **Authentication:** Uses Lucia for session management and Argon2id for secure password storage.
*   **Database:** Drizzle ORM is used for type-safe database interactions with SQLite. The schema is defined in `src/lib/db/schema.ts`.
*   **Server Actions:** Authentication and other server-side logic are implemented using Next.js Server Actions, located in `src/features/`.
*   **UI Components:** Follows a component-based architecture with shared components in `src/components/`.
*   **Styling:** Utilizes Tailwind CSS for utility-first styling.
*   **Testing:** Basic testing is indicated by `test_signup_logic.ts`. Further testing practices would need to be inferred or defined.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Refer to the Next.js deployment documentation for more details.