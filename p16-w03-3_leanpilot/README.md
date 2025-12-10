# LeanPilot

## A Guided MVP Planning Platform based on Lean Startup Methodology

LeanPilot is a full-stack Next.js application designed to empower solopreneurs and single-person businesses to systematically plan, validate, and specify their Minimum Viable Products (MVPs). It provides a structured, guided experience through a 5-stage template process, leading to the automatic generation of a comprehensive Product Requirements Document (PRD) and other key assets.

## Features

*   **5-Stage Guided Process:** A step-by-step template guiding users from problem discovery to an executable roadmap.
*   **Automated PRD Generation:** Generates detailed Product Requirements Documents in Markdown format from user inputs.
*   **User Flow & Gantt Charts:** Integrates Mermaid.js to visualize user flows and project timelines within generated documents.
*   **Authentication:** Secure user registration, login, and session management.
*   **Project Management:** Create, view, and manage multiple MVP projects.
*   **Responsive UI:** Designed to work seamlessly across various devices.
*   **PDF Export:** Download generated documents as print-ready PDFs.

## Technology Stack

LeanPilot leverages a modern and robust technology stack:

*   **Frontend:** Next.js 16.x (App Router), React 19.x, Tailwind CSS, shadcn/ui
*   **Backend:** Next.js API Routes (Server Actions)
*   **Runtime:** Bun 1.x
*   **Database:** SQLite (local file via `@libsql/client`)
*   **ORM:** Drizzle ORM 0.45.x
*   **Authentication:** Lucia Auth 3.x with Argon2id for password hashing
*   **State Management:** Zustand 5.x
*   **Form Management:** React Hook Form with Zod for validation
*   **Markdown Rendering:** `react-markdown`, `remark-gfm`, `rehype-raw`
*   **PDF Generation:** Puppeteer
*   **Linting/Formatting:** Biome
*   **Testing:** Vitest (Unit), React Testing Library (Components), Playwright (E2E)

## Getting Started

Follow these instructions to set up and run LeanPilot locally for development.

### Prerequisites

*   **Bun:** (Recommended runtime and package manager) Install via `curl -fsSL https://bun.sh/install | bash` or `npm install -g bun`.
*   **Node.js:** (If not using Bun, ensure you have a recent version installed)
*   **Git:** For cloning the repository.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd leanpilot
    ```
    *(Replace `[repository-url]` with the actual repository URL)*

2.  **Install dependencies:**
    ```bash
    bun install
    # or npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the following for local development:
    ```env
    DATABASE_URL="file:./sqlite.db"
    SESSION_SECRET="your-super-secret-key-change-in-production"
    NEXT_PUBLIC_BASE_URL="http://localhost:3000" # Used for client-side API calls
    # Optional: AI API keys for future enhancements
    # OPENAI_API_KEY="sk-..."
    # ANTHROPIC_API_KEY="sk-ant-..."
    ```
    *Replace `your-super-secret-key-change-in-production` with a strong, unique secret.*

    **For Vercel Deployment:**
    You must configure the following environment variables in your Vercel project settings:
    *   `DATABASE_URL`: The connection string for your production database (e.g., Turso).
    *   `SESSION_SECRET`: A strong, unique secret for session management.
    *   `NEXT_PUBLIC_BASE_URL`: The public URL of your deployed application (e.g., `https://your-app-name.vercel.app`).
    *   Any other API keys (e.g., `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`) if you enable AI features.

4.  **Database Setup:**
    The project uses SQLite. The schema will be pushed automatically on the first `bun dev` or `bun db:push`.
    ```bash
    bun run db:push
    ```
    This script will initialize the SQLite database file (`sqlite.db`) and apply the Drizzle schema.

### Running the Development Server

```bash
bun dev
# or npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page auto-updates as you edit the files.

## Available Scripts

In the project directory, you can run:

*   `bun dev`: Runs the application in development mode.
*   `bun build`: Builds the application for production.
*   `bun start`: Starts a production Next.js server.
*   `bun lint`: Runs ESLint and Biome to check for code quality and style issues.
*   `bun db:push`: Pushes the Drizzle ORM schema to the SQLite database.
*   `bun test`: Runs unit and integration tests using Vitest.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For production, consider using a remote SQLite database like Turso for better scalability. Ensure your environment variables are correctly configured on your deployment platform.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT License](https://opensource.org/licenses/MIT) *(Placeholder, adjust as needed)*