# Gemini Project: Quest

## 🚀 Project Overview

**Quest** is a mobile messenger application designed for students and professionals who need to track and share their study or work sessions. It aims to create an immersive environment through real-time learning sharing and mutual monitoring.

This project is a monorepo containing:
-   `./mobile`: A React Native (Expo) application for the user interface.
-   `./server`: A Node.js (Express) backend that provides the API and WebSocket services.

### Key Features
-   **Learning Timer & Statistics:** Track and analyze study sessions.
-   **Squads:** Form groups for accountability and collaboration.
-   **Real-time Chat:** Communicate with squad members.
-   **Timestamped Photos:** Authenticate learning sessions with photo proof.
-   **Reactions:** Engage with other users' progress.

## 🛠️ Tech Stack

### MVP (Current)
-   **Backend:** Node.js, Express, SQLite3, Socket.io
-   **Mobile:** React Native, Expo, Zustand (for state management), Axios (for HTTP requests), Socket.io Client

### Future Roadmap
The project plans to evolve to a more robust stack:
-   **Backend:** NestJS, PostgreSQL, Redis
-   **Real-time:** WebRTC for live video
-   **Infrastructure:** AWS (EC2, RDS, S3), Docker, Kubernetes

## ⚙️ Running the Project

### 1. Start the Server
Open a terminal and run the following commands:
```bash
cd server
npm run init-db # Run only once to initialize the database
npm run dev
```
The server will be running at `http://localhost:3000`.

### 2. Start the Mobile App
Open a **new terminal** and run the following:
```bash
cd mobile
# The user needs to ensure their local IP is configured in mobile/app.config.js
npx expo start
```
Follow the instructions in the terminal to open the app on your phone using the Expo Go app or in an emulator.

### Important: API URL Configuration
For the mobile app to communicate with the local server, you must configure the `apiUrl` in `mobile/app.config.js` with your computer's local IP address.

```javascript
// In mobile/app.config.js
extra: {
  apiUrl: 'http://<YOUR_LOCAL_IP>:3000'
}
```

## 📋 Development Conventions

### Scripts

#### Server (`./server/package.json`)
-   `npm run dev`: Starts the server with `nodemon` for auto-restarting on file changes.
-   `npm start`: Starts the server in production mode.
-   `npm run init-db`: Initializes the SQLite database file (`quest.db`).

#### Mobile (`./mobile/package.json`)
-   `npm start` or `npx expo start`: Starts the Expo development server.
-   `npm run android`: Starts the app on a connected Android device or emulator.
-   `npm run ios`: Starts the app on an iOS simulator.

### Code Structure

-   The backend follows a standard MVC-like pattern with `routes`, `controllers`, and `models`.
-   The mobile app separates concerns into `screens`, `components`, `navigation`, `api`, and `store` (using Zustand).
