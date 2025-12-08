# 작업 목록 (Task List)

## Phase 1: 기반 구축 (Foundation)
- [ ] **Project Setup**
    - [ ] Initialize Next.js 15 + TS + Tailwind project
    - [ ] Install & Config Shadcn/UI
    - [ ] Setup folder structure (`components`, `lib`, `features`, `types`)
- [ ] **Database & Env**
    - [ ] Setup Neon PostgreSQL instance
    - [ ] Install Drizzle ORM & Kit
    - [ ] Configure `drizzle.config.ts` and DB connection
- [ ] **Authentication**
    - [ ] Install Lucia Auth (or NextAuth) & Drizzle adapter
    - [ ] Create `User` schema
    - [ ] Implement Sign Up / Sign In pages
    - [ ] Setup Auth Guards (Middleware)
- [ ] **Global UI**
    - [ ] Create `Header` (Logo, Nav, UserMenu)
    - [ ] Create `Footer`
    - [ ] Implement Dark/Light Mode toggle

## Phase 2: 아이디어 관리 (Idea Core)
- [ ] **Schema Design**
    - [ ] Define `ideas` table (title, content, tags, status, etc.)
    - [ ] Define `idea_images` table
    - [ ] Migrate DB
- [ ] **Create Idea Feature**
    - [ ] Build `CreateIdeaForm` component (Zod validation)
    - [ ] Create Server Action for `createIdea`
    - [ ] Implement basic image upload (local/blob fallback initially)
- [ ] **Idea Detail View**
    - [ ] Build `IdeaDetailHeader` (Title, Author, Status)
    - [ ] Build `IdeaContent` renderer (Markdown support)
    - [ ] Fetch data via Server Components
- [ ] **Idea Feed**
    - [ ] Create `IdeaCard` component
    - [ ] Implement `IdeaList` with grid layout
    - [ ] Create Server Action to fetch ideas (supports pagination)

## Phase 3: 상호작용 (Interaction)
- [ ] **Voting System**
    - [ ] Define `votes` schema
    - [ ] Add Vote buttons (`I'd use this`, `Interesting`) to UI
    - [ ] Implement `toggleVote` action
- [ ] **Comment System**
    - [ ] Define `comments` schema
    - [ ] Build `CommentList` & `CommentForm`
    - [ ] Implement Nested Comments (Reply)
- [ ] **Tags & Categories**
    - [ ] Implement Tag selection in Create Form
    - [ ] Add Category filter to Main Feed

## Phase 4: 커뮤니티 & 마이페이지 (Community)
- [ ] **User Profile**
    - [ ] Create Profile Page (`/u/[username]`)
    - [ ] Display User Stats & Idea History
- [ ] **Updates (DevLOG)**
    - [ ] Define `updates` schema
    - [ ] Allow authors to post updates on Idea Detail page
- [ ] **Follow System** (Optional/Later)
    - [ ] Define `follows` schema
    - [ ] Implement Follow button

## Phase 5: 마무리 (Polish & Deploy)
- [ ] **Refinement**
    - [ ] Check responsive design (Mobile/Tablet/Desktop)
    - [ ] Improve Loading States (Skeletons)
    - [ ] SEO Meta tags (Title, Description, OG Image)
- [ ] **Deployment**
    - [ ] Check Build (`pnpm build`)
    - [ ] Deploy to Vercel
