# Walkthrough - Pictory PRD Improvements

This document summarizes the improvements made to the `p14_w02-6_pictory.md` Product Requirement Document.

## Summary of Changes

The PRD has been updated to include essential features for a community application and refined requirements based on the provided mockup design.

### 1. Authentication & User Management (FR-A-xxx)
- Added **Sign Up** (Email/Password).
- Added **Social Login** (Google, Kakao) based on mockup buttons.
- Added **Login/Logout** (JWT/Session).
- Added **Profile Management** (Edit Profile, Bio, Stats).

### 2. Enhanced Interaction & UI (FR-B/C/D-xxx)
- **Layout:** Specified **Sidebar Navigation** for desktop and Responsive design.
- **Content:** Added **Aspect Ratio selection** (1:1, 4:5, 16:9).
- **Feeds:** Card view for Home Feed, **3-Column Grid View** for Profile.
- **Search:** Added Top Search Bar requirements.
- **Comments:** Added Write, Delete, List functionality.

### 3. Database Schema Updates
- **New Tables:**
    - `Comments`: For storing post comments.
- **Refined Tables:**
    - `DMChats`, `DMParticipants`: Structured for scalable 1:1 messaging.
    - `Users`: Added `password_hash`, `bio`, `provider` (local/google/kakao).
    - `Posts`: Added `ratio` column.

### 4. Non-Functional Requirements
- Added **Security** requirements (Password Hashing, JWT).
- Clarified **Tech Stack** (React, styled-components, Node.js/Express, PostgreSQL/MySQL).

## Verification
- **File Checked:** `p14_w02-6_pictory.md`
## Phase 1: Project Setup (Completed)

Successfully initialized the **Pictory** project environment.

### 1. Project Structure
-   Created `p14_w02-6_pictory` directory.
-   Initialized **Client**: React + TypeScript + Vite (`/client`).
-   Initialized **Server**: Node.js + Express + TypeScript (`/server`).

### 2. Configuration & Dependencies
-   **Server:**
    -   Configured `tsconfig.json` for CommonJS/Node.
    -   Installed `typeorm`, `pg` (PostgreSQL driver).
    -   Created `src/data-source.ts` for Database connection.
    -   Created `src/index.ts` entry point.
-   **Client:**
    -   Installed `styled-components`.
    -   Implemented `GlobalStyle` and `theme` (Colors, Typography compatible with DRD).
    -   Integrated `ThemeProvider` in `main.tsx`.

### 3. Verification
-   Client application builds successfully (`npm run build`).
-   Server application is configured to connect to PostgreSQL via TypeORM.
-   Project documents (`implementation_plan.md`, `task.md`) generated in `doc/`.

