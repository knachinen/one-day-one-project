# Kkobagi - Habit Tracker

## Project Overview

This is a Next.js application for tracking habits. The project's name is "Kkobagi," which is Korean for "꼬박이," meaning "regularly" or "steadily." It helps users build and maintain good habits by providing a simple and intuitive interface for tracking their daily progress. The application features a character that visually represents the user's habit completion percentage, a habit tree that grows as habits are completed, and a weekly chart to visualize progress over time.

## Tech Stack

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **Animation:** Framer Motion
*   **Charts:** Recharts

## Building and Running

### Prerequisites

*   Node.js
*   npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

### Starting the Production Server

```bash
npm run start
```

## Linting

To run the linter, use the following command:

```bash
npm run lint
```

## Development Conventions

*   The project uses ESLint for code linting, with the configuration extending from `eslint-config-next`.
*   Prettier is used for code formatting, with a custom configuration in `.prettierrc.json`.
*   The application's state is managed using Zustand, with the store persisted to local storage.
*   The codebase is structured with a clear separation of concerns, with components, hooks, stores, and types located in their respective directories.
