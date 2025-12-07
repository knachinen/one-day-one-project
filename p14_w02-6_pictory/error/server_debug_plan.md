# Server Debug Action Plan: Persistent EntityMetadataNotFoundError

## Problem Summary

The Node.js server, written in TypeScript, now successfully starts in development mode using `node --loader ts-node/esm src/index.ts`. However, when attempting to register a user via the `/api/auth/register` endpoint, the server returns an "Internal server error" with the specific message `EntityMetadataNotFoundError: No metadata for "User" was found`. This indicates that TypeORM is failing to discover or load the metadata for the `User` entity, despite the `User` entity being defined (`server/src/entity/User.ts`) and `AppDataSource` being configured to include entities. Attempts to fix previous `ERR_UNKNOWN_FILE_EXTENSION` errors during server startup, including configuring `tsc` for emission (which remained problematic) and simplifying `ts-node` invocation, have led to this new persistent TypeORM metadata loading issue. The `tsc` compiler still inexplicably fails to emit files to the `dist` directory, preventing the "Compile First, Then Run" strategy for development.

## Action Plan: Address EntityMetadataNotFoundError

The current approach to resolve the `EntityMetadataNotFoundError` focuses on ensuring TypeORM correctly discovers and loads the `User` entity's metadata.

### Phase 1: Address `EntityMetadataNotFoundError`

*   **Action 1.1: Verify `User` Entity Decorators and Imports:**
    *   **Problem:** TypeORM reports `No metadata for "User" was found`.
    *   **Hypothesis:** The `User` entity's decorators (`@Entity`, `@PrimaryGeneratedColumn`, etc.) are not being processed correctly by TypeScript/TypeORM in the `ts-node/esm` environment, or the `User` class is not correctly being registered with TypeORM's `AppDataSource`.
    *   **Step 1.1.1: Ensure `User.ts` is correctly defined:** Re-check `server/src/entity/User.ts` for any typos or missing decorators. (Looks good from previous checks).
    *   **Step 1.1.2: Verify `reflect-metadata` import:** Ensure `import "reflect-metadata"` is the very first line in `server/src/data-source.ts` (which it is).
    *   **Step 1.1.3: Experiment with `entities` array in `data-source.ts`:**
        *   **(Attempted - Failed)** Explicitly listing `entities: [User]` (failed because `User` not imported in `data-source.ts`).
        *   **(Attempted - Failed)** Explicitly listing `entities: [User]` (after importing `User` in `data-source.ts`).
        *   **(Attempted - Failed)** Using glob pattern `entities: ["src/entity/**/*.ts"]`.
        *   **Step 1.1.4: Use absolute paths for entities in `data-source.ts` for `ts-node/esm`:**
            *   **Goal:** Ensure TypeORM resolves entity paths correctly in the `node --loader ts-node/esm` environment.
            *   **Action:** Change `entities: ["src/entity/**/*.ts"]` to `entities: [__dirname + "/entity/**/*.ts"]`.
            *   **Reasoning:** `__dirname` provides the absolute path to the current directory (`server/src`), ensuring the glob pattern is correctly resolved regardless of the working directory from which `node` is invoked.

### Phase 2: Further TypeORM Debugging (if needed)

*   **Action 2.1: Add `synchronize: false` and run migrations:**
    *   **Problem:** `synchronize: true` can sometimes have issues or mask metadata problems.
    *   **Hypothesis:** Manually running migrations might help TypeORM create the table and metadata more reliably.
    *   **Step:** For debugging, set `synchronize: false` in `data-source.ts`.
    *   **Step:** Create and run a TypeORM migration to create the `User` table. (This is a significant step that requires TypeORM CLI setup).

### Phase 3: Development Environment Stability (Revisiting `tsc` and `nodemon`)

*   **Action 3.1: Diagnose why `tsc` is not emitting files to `dist` (PRIMARY BLOCKER for "Compile First" strategy):**
    *   **(Attempted)** Verified `tsconfig.json` settings (`outDir`, `rootDir`, `include`).
    *   **(Attempted)** Explicitly cleaned `dist` before `tsc`.
    *   **(Attempted)** Ran `npx tsc` directly. `dist` remains empty.
    *   **(Attempted)** Investigated `tsc --showConfig` for discrepancies.
    *   **(Confirmed)** The server can run with `node --loader ts-node/esm src/index.ts`, proving code is runnable.
*   **Action 3.2: Re-integrate `nodemon` for live reloading:**
    *   **Problem:** `nodemon` integration with `ts-node` for ESM is problematic.
    *   **Hypothesis:** Need to find a stable `nodemon` configuration.
    *   **Step:** Explore alternative `nodemon` configurations (e.g., specific `ts-node` flags in `nodemon.json` or `package.json` scripts) once `tsc` emission is resolved or a stable `ts-node` development flow is established.

### Phase 4: Final Verification

*   **Action 4.1: Run server:** `cd server && node --loader ts-node/esm src/index.ts`
*   **Action 4.2: Test with `curl`:**
    *   `curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"email": "testuser@example.com", "password": "testpassword123", "nickname": "TestUser"}'`

## Current TODO List

*   Implement email registration backend API (FR-A-101).
    *   **(Completed)** Create `server/src/entity/User.ts`.
    *   **(Completed)** Create `server/src/routes/auth.ts`.
    *   **(Completed)** Install `bcrypt` and `@types/bcrypt`.
    *   **(Completed)** Integrate `auth` router into `server/src/index.ts`.
    *   **(In Progress)** Debug server startup and API issues.
        *   **(Resolved)** `ERR_UNKNOWN_FILE_EXTENSION` during direct execution of `node --loader ts-node/esm src/index.ts`. (Server now starts).
        *   **(PRIMARY BLOCKER)** `EntityMetadataNotFoundError: No metadata for "User" was found` when calling `/api/auth/register`.
            *   **(Attempted - Failed)** Explicitly listing `User` in `data-source.ts` `entities`.
            *   **(Attempted - Failed)** Using glob pattern `src/entity/**/*.ts` in `data-source.ts` `entities`.
            *   **(Next Step)** Try using absolute paths with glob pattern `[__dirname + "/entity/**/*.ts"]` for `entities` in `server/src/data-source.ts`.
        *   (Sub-task) If TypeORM metadata still fails, investigate setting `synchronize: false` and running migrations.
        *   (Sub-task) Re-integrate `nodemon` for live reloading (Blocked by above TypeORM issue).
        *   (Sub-task) Verify server starts and responds to `curl`.
