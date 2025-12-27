# DataFlow Deployment Guide

This document provides step-by-step instructions for deploying the DataFlow landing page application, which consists of a **Next.js frontend** and a **NestJS backend** with a **PostgreSQL** database.

---

## 1. Prerequisites

*   **Vercel Account:** For deploying the frontend.
*   **Railway, Render, or AWS Account:** For deploying the backend and database.
*   **Domain Name (Optional):** Custom domain for your service.

---

## 2. Database Deployment (PostgreSQL)

You need a hosted PostgreSQL database. We recommend **Railway** or **Neon** for easy setup.

1.  **Create a Project:** Sign up for [Railway](https://railway.app/) or [Neon](https://neon.tech/).
2.  **Add PostgreSQL:** Create a new PostgreSQL database service.
3.  **Get Connection URL:** Copy the `DATABASE_URL` (e.g., `postgresql://user:password@host:port/dbname`).
4.  **Migrate Schema:**
    *   Locally, update your `backend/.env` file with the production `DATABASE_URL`.
    *   Run migration command:
        ```bash
        cd backend
        npx prisma migrate deploy
        ```

---

## 3. Backend Deployment (NestJS)

Deploy the NestJS API to a cloud provider like **Railway** or **Render**.

### **Deployment on Railway:**

1.  **Connect GitHub:** Link your repository to Railway.
2.  **Configure Service:**
    *   **Root Directory:** `backend`
    *   **Build Command:** `pnpm install && pnpm build`
    *   **Start Command:** `node dist/main`
3.  **Environment Variables:** Add the following variables in the Railway dashboard:
    *   `DATABASE_URL`: (Your production database URL)
    *   `PORT`: `3000` (or `8080`, depending on the platform)
    *   `CORS_ORIGIN`: (Your frontend URL, add this *after* deploying frontend)

### **Deployment on Render:**

1.  **New Web Service:** Select "Build and deploy from a Git repository".
2.  **Settings:**
    *   **Root Directory:** `backend`
    *   **Build Command:** `pnpm install && pnpm build`
    *   **Start Command:** `node dist/main`
3.  **Environment Variables:** Add `DATABASE_URL` and `NODE_ENV=production`.

---

## 4. Frontend Deployment (Next.js)

Deploy the Next.js app to **Vercel** (recommended).

1.  **Import Project:** Go to [Vercel Dashboard](https://vercel.com/new) and import your Git repository.
2.  **Configure Project:**
    *   **Framework Preset:** Next.js
    *   **Root Directory:** `frontend`
3.  **Environment Variables:**
    *   No specific env vars are strictly required for the static landing page unless you are using dynamic features that need API keys (e.g., `NEXT_PUBLIC_API_URL` pointing to your deployed backend).
4.  **Deploy:** Click "Deploy". Vercel will build and host your site.

---

## 5. Post-Deployment Configuration

1.  **Connect Frontend to Backend:**
    *   In your **Frontend** code (`frontend/src/components/sections/ContactForm.tsx`), update the fetch URL from `http://localhost:3001` to your production backend URL (e.g., `https://dataflow-api.railway.app/leads`).
    *   *Tip:* Use an environment variable like `NEXT_PUBLIC_API_URL` for cleaner configuration.
    
2.  **Update CORS:**
    *   Go back to your **Backend** deployment settings.
    *   Update `CORS_ORIGIN` or the allowed origin in `main.ts` to match your Vercel frontend domain (e.g., `https://dataflow-landing.vercel.app`).

3.  **Verify:**
    *   Visit your Vercel URL.
    *   Submit a test lead in the contact form.
    *   Check your backend logs or database to ensure the data was saved.

---

## 6. SEO & Analytics Verification

1.  **Google Analytics:**
    *   Create a GA4 property.
    *   Update `gaId` in `frontend/src/app/layout.tsx` with your Measurement ID (`G-XXXXXXXXXX`).
2.  **Sitemap:**
    *   Verify `https://your-domain.com/sitemap.xml` is accessible.
    *   Submit the sitemap to **Google Search Console**.
3.  **Robots.txt:**
    *   Verify `https://your-domain.com/robots.txt` allows indexing.
