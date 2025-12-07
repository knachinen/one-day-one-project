# Pictory Implementation Plan

This document outlines the step-by-step implementation plan for the **Pictory** image and story sharing community service.

## Phase 1: Project Setup & Environment Configuration

**Goal:** Initialize the monorepo structure (if applicable) or project folders, configure the development environment, and set up the database.

- **Initialize Project Definition**
  - Setup React (Vite/CRA) with TypeScript for Frontend (`client`).
  - Setup Node.js (Express) with TypeScript for Backend (`server`).
  - Configure ESLint, Prettier, and basic directory structure.
- **Database Setup**
  - Install PostgreSQL/MySQL.
  - Initialize Sequelize/TypeORM.
  - Create initial User schema migration.
- **Design System Setup**
  - Install `styled-components` (or chosen library).
  - Implement Global Styles (Reset, Fonts).
  - Define Theme variables (Colors, Typography) based on DRD.

## Phase 2: Authentication & User Management

**Goal:** Implement secure user registration, login, and profile management.

- **Backend: Auth API**
  - Implement Sign Up (Email, Password Hash).
  - Implement Login (JWT Issue).
  - Implement Middleware (Auth Guard).
- **Frontend: Auth Pages**
  - Create Login/Signup UI (including Social Login buttons mockup).
  - Integrate API glue code (Axios/React Query).
- **User Profile**
  - **Backend:** Get Profile, Update Profile (Bio, Image) API.
  - **Frontend:** Profile Page UI (Header, Info).

## Phase 3: Core Features - Posting & Feed

**Goal:** Enable users to upload content and view a feed of posts.

- **Backend: Posts API**
  - Create `Posts`, `PostImages` Tables.
  - Implement Create Post API (Multi-image upload handling).
  - Implement Get Feed API (Pagination/Infinite Scroll).
- **Frontend: Create Post**
  - Image Crop/Ratio Select UI (1:1, 4:5, 16:9).
  - Caption Input and Upload logic.
- **Frontend: Main Feed**
  - Post Card Component.
  - Infinite Scroll Feed implementation.
  - Sidebar Navigation.

## Phase 4: Interactions (Like, Comment, Follow)

**Goal:** Add social features to drive engagement.

- **Backend: Interaction APIs**
  - Create `Likes`, `Comments`, `Follows` Tables.
  - Implement Toggle Like, Add/Delete Comment endpoints.
  - Implement Follow/Unfollow endpoints.
- **Frontend: Interaction UI**
  - Like Button styling and optimistic update.
  - Comment Section (Expandable/Modal).
  - Follow Button on Profile/Hover.

## Phase 5: Real-time Direct Messages (DM)

**Goal:** Implement 1:1 real-time messaging.

- **Backend: Socket.IO Setup**
  - Configure Socket.io server.
  - Create `DMChats`, `DMMessages` Tables.
  - Implement connection/room logic.
- **Frontend: DM UI**
  - Chat Room UI (Bubble layout).
  - Chat List UI (Recent messages).
  - Socket client integration (Join room, Send/Receive events).

## Phase 6: Search & Polish

**Goal:** Improve discoverability and refine UI/UX.

- **Search**
  - Backend: Simple keyword search (User/Post content).
  - Frontend: Top Search Bar integration.
- **Refinement**
  - Profile Grid View (3-Column).
  - Responsive adjustments (Mobile Sidebar/Tab bar).
  - Loading States (Skeletons) & Error handling.
