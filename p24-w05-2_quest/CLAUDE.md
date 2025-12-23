# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quest is a study accountability messenger app for Korean students (공시생, 취준생) requiring long-term focus and verification. It combines real-time chat, study timers, squad groups, and timestamped photo verification.

**Current Stage**: MVP Phase 1 - Local development with minimal infrastructure

## Essential Commands

### Server (Backend)

```bash
cd server

# Development (auto-reload with nodemon)
npm run dev

# Production mode
npm start

# Database initialization (creates quest.db)
npm run init-db

# Seed test data
npm run seed

# Kill process on port 3000
npm run kill
```

**Server runs on**: `http://localhost:3000` (listens on `0.0.0.0` for network access)
**Health check**: `http://localhost:3000/api/health`

### Mobile (React Native + Expo)

```bash
cd mobile

# Start Expo development server
npm start
# or
npx expo start

# Clear cache and restart
npx expo start -c

# Platform-specific
npm run android    # Android emulator
npm run ios        # iOS simulator (macOS only)
```

**Testing**: Use Expo Go app on physical device by scanning QR code

### Critical Setup Step

Before running mobile app, update the API URL to your local machine's IP address:

1. Find your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1` (macOS/Linux)
2. Edit `mobile/src/constants/config.js`:
   ```javascript
   export const API_URL = 'http://192.168.x.x:3000';
   ```
3. Both server and mobile device must be on the same WiFi network

## Architecture

### Technology Stack

**Backend**:
- Node.js + Express.js for REST API
- Socket.io for real-time messaging
- SQLite3 (file-based database: `quest.db`)
- JWT + bcrypt for authentication
- Multer for file uploads (stored in `uploads/` directory)

**Frontend**:
- React Native with Expo (managed workflow)
- React Navigation (Bottom Tabs)
- Zustand for state management
- Axios for HTTP requests
- Socket.io Client for WebSocket connections

**Key Design Decision**: MVP uses local SQLite database and filesystem storage instead of cloud services (PostgreSQL/S3) for rapid prototyping.

### Project Structure

```
p24-w05-2_quest/
├── server/              # Backend (Node.js/Express)
│   ├── src/
│   │   ├── index.js         # Main server file with Socket.io setup
│   │   ├── routes/          # REST API endpoints (empty - to be implemented)
│   │   ├── controllers/     # Business logic (empty - to be implemented)
│   │   ├── models/          # Database models (empty - to be implemented)
│   │   ├── middleware/      # Auth middleware (empty - to be implemented)
│   │   ├── socket/          # Socket.io handlers (empty - to be implemented)
│   │   └── utils/
│   │       ├── db.js        # SQLite wrapper with Promise-based API
│   │       └── init-db.js   # Database schema initialization
│   ├── uploads/         # Local file storage for images
│   ├── quest.db         # SQLite database file
│   └── package.json
│
├── mobile/              # Frontend (React Native/Expo)
│   ├── src/
│   │   ├── screens/         # Main screens (Home, Stats, Squad, Profile)
│   │   ├── components/      # Reusable UI components
│   │   ├── navigation/      # React Navigation setup
│   │   ├── api/             # API client configuration
│   │   ├── store/           # Zustand stores (to be implemented)
│   │   └── constants/
│   │       ├── config.js    # API_URL configuration (IMPORTANT)
│   │       └── theme.js     # Design tokens
│   ├── App.js
│   └── package.json
│
└── doc/                 # Documentation (Korean)
    ├── mvp-setup-guide.md   # Detailed setup instructions
    ├── tech-stack-mvp.md    # Technology choices and rationale
    ├── data-models-mvp.md   # SQLite schema and query examples
    └── design-tokens.md     # UI/UX design system
```

### Database Architecture

**SQLite Schema** (`quest.db`):
- `users`: Authentication and profile data
- `squads`: Group/team information
- `squad_members`: Many-to-many relationship between users and squads
- `study_sessions`: Timer data (start_time, end_time, duration)
- `messages`: Chat messages (text, image, system)
- `photos`: Timestamped photo metadata
- `reactions`: Emoji reactions to messages

**Database Wrapper** (`server/src/utils/db.js`):
- Promise-based API wrapping sqlite3
- Methods: `query()`, `get()`, `run()`, `close()`
- Performance optimizations enabled (WAL mode, cache size)

**In-Memory Stores** (in `server/src/index.js`):
- `onlineUsers`: Map of socketId -> user data
- `userSockets`: Map of userId -> Set of socketIds
- Used for real-time presence tracking (resets on server restart)

### Real-time Architecture

**Socket.io Events** (implemented in `server/src/index.js:60-219`):

Client -> Server:
- `user:connect`: User authentication and initial connection
- `squad:join`: Join a squad room
- `squad:leave`: Leave a squad room
- `message:send`: Send chat message
- `typing:start/stop`: Typing indicators
- `reaction:add`: Add emoji reaction

Server -> Client:
- `user:online/offline`: User presence updates
- `user:joined/left`: Squad membership changes
- `message:new`: New chat message broadcast
- `typing:user`: Typing indicator updates
- `reaction:added`: Reaction updates

### API Endpoints

Currently implemented:
- `GET /api/health`: Server health check
- `GET /api/test-db`: Database connection test

To be implemented (routes defined but not yet connected):
- `/api/auth`: Register, login
- `/api/users`: User management
- `/api/sessions`: Study timer sessions
- `/api/squads`: Squad CRUD operations
- `/api/messages`: Message history

### Authentication Flow (To Be Implemented)

1. User registers: `POST /api/auth/register` → bcrypt hash password → SQLite
2. User logs in: `POST /api/auth/login` → verify password → return JWT token
3. Protected routes: Use `authMiddleware` to verify JWT from `Authorization: Bearer <token>` header
4. Socket.io: Authenticate on `user:connect` event with userId/token

## Development Patterns

### Adding a New API Endpoint

1. Create route file in `server/src/routes/` (e.g., `auth.js`)
2. Create controller in `server/src/controllers/` (e.g., `authController.js`)
3. Import and use in `server/src/index.js`:
   ```javascript
   app.use('/api/auth', require('./routes/auth'));
   ```

### Adding a New Screen

1. Create component in `mobile/src/screens/` (e.g., `LoginScreen.js`)
2. Add to navigator in `mobile/src/navigation/MainNavigator.js`
3. Use design tokens from `mobile/src/constants/theme.js`

### Database Queries

Always use the Promise-based wrapper:
```javascript
const db = require('./utils/db');

// SELECT multiple rows
const users = await db.query('SELECT * FROM users WHERE is_active = ?', [1]);

// SELECT single row
const user = await db.get('SELECT * FROM users WHERE user_id = ?', [userId]);

// INSERT/UPDATE/DELETE
const result = await db.run('INSERT INTO users (...) VALUES (?)', [values]);
// result.lastID, result.changes
```

### File Uploads

Images are stored locally in `server/uploads/`:
- Use Multer middleware for file handling
- Generate unique filenames: `${Date.now()}-${originalname}`
- Store relative path in database: `/uploads/filename.jpg`
- Serve via: `app.use('/uploads', express.static(path.join(__dirname, '../uploads')))`

### State Management

Use Zustand for global state:
```javascript
// mobile/src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, token: null }),
}));
```

## Common Issues

### Port 3000 in Use
```bash
cd server && npm run kill
# or manually: lsof -i :3000 then kill -9 <PID>
```

### Mobile App Can't Connect to Server
1. Verify server is running: `curl http://localhost:3000/api/health`
2. Check both devices on same WiFi
3. Verify `mobile/src/constants/config.js` has correct IP (not localhost, not 127.0.0.1)
4. Check firewall allows port 3000
5. Server must bind to `0.0.0.0` (already configured in `server/src/index.js:240`)

### Database Issues
```bash
# Reinitialize database (WARNING: deletes all data)
cd server
rm quest.db
npm run init-db

# Or just create test data
npm run seed
```

### Expo Cache Issues
```bash
cd mobile
npx expo start -c
```

## Testing Workflow

1. Start server: `cd server && npm run dev`
2. Verify health: `curl http://localhost:3000/api/health`
3. Start mobile: `cd mobile && npm start` (in new terminal)
4. Scan QR code with Expo Go app
5. Check mobile app shows "Connected to server!" message

Test users (after running `npm run seed`):
- Email: `test1@quest.app` / Password: `test1234`
- Email: `test2@quest.app` / Password: `test1234`

## Important Notes

- **Korean documentation**: Most docs in `doc/` are in Korean (project target audience)
- **MVP philosophy**: Prioritize working features over perfect code; avoid premature optimization
- **No cloud services yet**: SQLite instead of PostgreSQL, local files instead of S3, in-memory instead of Redis
- **Phase 2 migration planned**: PostgreSQL, AWS (S3/EC2), Redis, CI/CD, Docker
- **Timestamps**: Always use `Date.now()` (Unix timestamp in milliseconds) for consistency
- **IDs**: Use `uuid.v4()` for all primary keys
- **Real-time updates**: All chat/presence features use Socket.io, not polling

## MVP Feature Checklist

Currently implemented:
- [x] Project structure
- [x] Server with Socket.io
- [x] SQLite database schema
- [x] Mobile app with bottom tab navigation
- [x] Server connection testing

To be implemented (Phase 1):
- [ ] User authentication (register/login)
- [ ] Study timer functionality
- [ ] Squad creation and management
- [ ] Real-time chat UI
- [ ] Camera integration with timestamp watermark
- [ ] Emoji reactions
- [ ] User statistics dashboard

## Reference Documentation

- `doc/mvp-setup-guide.md`: Step-by-step setup instructions (Korean)
- `doc/tech-stack-mvp.md`: Technology decisions and alternatives (Korean)
- `doc/data-models-mvp.md`: Complete SQLite schema with query examples (Korean)
- `README.md`: Project overview and quick start (Korean)
- `QUICK-START.md`: Condensed command reference (Korean)
