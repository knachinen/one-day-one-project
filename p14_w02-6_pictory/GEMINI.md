# Pictory Project Overview

**Project Name:** Pictory (Picture + Story)

**Purpose:** Pictory is a community web service designed for users to share visual content (images) and short texts, communicate in real-time via direct messages (DM), and connect safely with others. It targets users aged 10s to 30s who want to visually record and share their daily lives, hobbies, and interests, and engage in personal conversations.

**Key Technologies:**

- **Frontend:** React, TypeScript, Vite, styled-components
- **Backend:** Node.js, Express.js, TypeScript, TypeORM
- **Database:** PostgreSQL (or MySQL)
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT-based
- **Linting:** ESLint

**Architecture:**
The project follows a client-server architecture. The frontend is a Single Page Application (SPA) built with React, communicating with a RESTful API backend built with Node.js and Express. Real-time features like direct messaging are handled via WebSockets using Socket.IO.

## Building and Running the Project

This project consists of two main parts: a client-side (frontend) and a server-side (backend).

### 1. Client (Frontend)

The client application is built with React, TypeScript, and Vite.

**Setup:**
Navigate to the `client/` directory and install dependencies:

```bash
cd client
npm install # or yarn install or pnpm install
```

**Available Scripts:**

- **`npm run dev`**: Starts the development server with hot module reloading.
- **`npm run build`**: Builds the client application for production to the `dist` folder.
- **`npm run lint`**: Runs ESLint to check for code quality issues.
- **`npm run preview`**: Serves the production build locally for previewing.

### 2. Server (Backend)

The server application is built with Node.js, Express.js, and TypeScript, using TypeORM for database interaction and `pg` for PostgreSQL.

**Setup:**
Navigate to the `server/` directory and install dependencies:

```bash
cd server
npm install # or yarn install or pnpm install
```

**Environment Variables:**
The server requires environment variables, typically managed with `dotenv`. Create a `.env` file in the `server/` directory and configure your database connection and other sensitive information as needed. Refer to the server's source code for required variables.

**Available Scripts:**

- **`npm run start`**: Starts the compiled server (production mode).
- **`npm run dev`**: Starts the development server using `nodemon` and `ts-node` for live reloading during development.
- **`npm run build`**: Compiles the TypeScript source code to JavaScript in the `dist` folder.

## Development Conventions

- **Frontend:**
  - Developed using React with TypeScript.
  - Styling is managed with `styled-components`.
  - ESLint is configured for code quality.
- **Backend:**
  - Developed using Node.js and Express.js with TypeScript.
  - TypeORM is used as the ORM for database operations.
  - RESTful API design principles are followed.
- **Documentation:**
  - Detailed functional requirements, non-functional requirements, and database schema can be found in `doc/prd.md`.
  - Additional design and implementation notes might be available in other files within the `doc/` directory.

---

**Note:** This `GEMINI.md` file was automatically generated based on an analysis of the project structure and existing documentation.
