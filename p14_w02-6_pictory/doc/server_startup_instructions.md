# Server Startup Instructions

To run the server in development mode with live-reloading, you need to execute two commands in **separate terminal windows** (both navigated to the `server/` directory):

## Terminal 1: TypeScript Compiler (Watcher)

In the first terminal, run the TypeScript compiler in watch mode:

```bash
cd server && npm run dev:build
```

*   This command will continuously compile your TypeScript files (`.ts`) into JavaScript files (`.js`) in the `dist` directory.
*   You should see output indicating that `tsc` is watching for file changes.
*   **Leave this terminal running.**

## Terminal 2: Node.js Server (Nodemon)

In the second terminal, run the Node.js server using `nodemon`:

```bash
cd server && npm run dev
```

*   This command will watch for changes in the compiled JavaScript files in the `dist` directory and restart the Node.js application whenever new changes are detected.
*   You should see `nodemon` starting the server, and eventually, the message: `Server is running at http://localhost:3000`.

---

**Once both commands are running without errors and the server reports `Server is running at http://localhost:3000`, please try your `curl` command again and share the response:**

```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"email": "testuser@example.com", "password": "testpassword123", "nickname": "TestUser"}'
```
