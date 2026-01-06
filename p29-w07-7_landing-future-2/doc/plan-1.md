# Step 1 Implementation Plan: Project Foundation & Design System

## Clarifications Applied

| Question | Decision |
|----------|----------|
| Tailwind Version | Use Tailwind CSS 4 with `@theme` inline |
| Pretendard Source | Download from https://github.com/orioncactus/pretendard |
| Scope | Main page only (no routing pages yet) |
| Verification | User will run dev server and verify visually |

---

## Phase 1: Project Initialization (5 min)

### 1.1 Initialize Next.js 16 Project
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app
```

### 1.2 Install Dependencies
```bash
npm install framer-motion gsap lucide-react
```

### 1.3 Cleanup Boilerplate
```bash
rm -f src/app/favicon.ico
```

---

## Phase 2: Tailwind CSS 4 Configuration (10 min)

### 2.1 Update `postcss.config.mjs`
Replace entire file with:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

### 2.2 Configure `src/app/globals.css` with @theme
Replace entire file with:
```css
@import "tailwindcss";

@theme {
  /* Color Palette */
  --color-background: #050505;
  --color-secondary: #121212;
  --color-accent-cyan: #00F0FF;
  --color-accent-purple: #BF00FF;
  --color-text-main: #FFFFFF;
  --color-text-sub: #A0A0A0;
  --color-border: rgba(255, 255, 255, 0.1);
  
  /* Fonts */
  --font-header: 'Orbitron', sans-serif;
  --font-body: 'Pretendard', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Effects */
  --backdrop-blur-md: blur(20px);
}

/* Background Color */
:root {
  background-color: #050505;
}

body {
  background-color: #050505;
}
```

---

## Phase 3: Font Configuration (10 min)

### 3.1 Create Font Directory
```bash
mkdir -p src/fonts
```

### 3.2 Download Pretendard Font
```bash
curl -L -o src/fonts/Pretendard-Regular.woff2 \
  https://github.com/orioncactus/pretendard/releases/download/v1.3.8/Pretendard-Regular.woff2
```

### 3.3 Create `src/fonts/fonts.ts`
```typescript
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const pretendard = localFont({
  src: './Pretendard-Regular.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '400',
})
```

---

## Phase 4: Layout Configuration (5 min)

### 4.1 Update `src/app/layout.tsx`
Replace with:
```typescript
import type { Metadata } from 'next'
import { orbitron, jetbrainsMono, pretendard } from '@/fonts/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Futurist Artist | Next Senses',
  description: '인공지능과 가상 현실의 융합을 통해 인류의 다음 감각을 설계하는 퓨처리스트 아티스트의 포트폴리오입니다.',
  openGraph: {
    title: 'Futurist Artist Portfolio',
    description: 'Designing the next senses for humanity.',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrainsMono.variable} ${pretendard.variable}`}>
      <body className="font-body bg-background text-text-main antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## Phase 5: Component Architecture (10 min)

### 5.1 Create Component Directories
```bash
mkdir -p src/components/layout
mkdir -p src/components/ui
```

### 5.2 Create `src/components/layout/Navbar.tsx`
```typescript
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-background/70 backdrop-blur-md border border-border rounded-full px-6 py-3 flex items-center gap-8">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="relative group">
            <span className="text-sm font-medium text-text-main transition-colors group-hover:text-accent-cyan">
              {link.name}
            </span>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-accent-cyan"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
```

### 5.3 Create `src/components/layout/Footer.tsx`
```typescript
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-10 text-text-sub text-sm text-center border-t border-border/10">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-accent-cyan transition-colors">
          <Instagram size={20} />
        </a>
        <a href="#" className="hover:text-accent-cyan transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="#" className="hover:text-accent-cyan transition-colors">
          <Github size={20} />
        </a>
        <a href="mailto:contact@example.com" className="hover:text-accent-cyan transition-colors">
          <Mail size={20} />
        </a>
      </div>
      <p>&copy; 2025 Futurist Artist. All rights reserved.</p>
    </footer>
  )
}
```

---

## Phase 6: Main Page Setup (5 min)

### 6.1 Update `src/app/page.tsx`
Replace with:
```typescript
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-6xl font-header font-bold tracking-widest text-center">
          Futurist Artist
        </h1>
      </div>
      <Footer />
    </main>
  )
}
```

---

## Phase 7: Verification Checklist

After completing all phases, run:
```bash
npm run dev
```

### Visual Verification Items:
- [ ] Background is `#050505` (Deep Space Black)
- [ ] Navbar is floating and centered at top-10
- [ ] Navbar has glassmorphism effect (backdrop-blur + semi-transparent background)
- [ ] Hover animation works: underline expands left to right on nav links
- [ ] Orbitron font is applied to the "Futurist Artist" title
- [ ] Pretendard font is applied to body text
- [ ] Browser tab shows title: "Futurist Artist | Next Senses"
- [ ] Footer displays with social icons at the bottom
- [ ] Responsive: Navbar stays centered on mobile

### Browser DevTools Check (Optional):
```javascript
// In browser console:
window.getComputedStyle(document.body).backgroundColor 
// Should return rgb(5, 5, 5)
```

---

## Final Folder Structure (After Step 1)

```
p29-w07-7_landing-future-2/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Fonts + metadata
│   │   ├── page.tsx             # Main page (Navbar + Hero + Footer)
│   │   └── globals.css          # Tailwind 4 @theme + styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Floating glassmorphism navbar
│   │   │   └── Footer.tsx       # Footer with social links
│   │   └── ui/                  # (empty - for future components)
│   └── fonts/
│       ├── fonts.ts             # Font configuration
│       └── Pretendard-Regular.woff2
├── postcss.config.mjs           # Tailwind 4 postcss config
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── next.config.ts               # Next.js config
```

---

## Summary

| Item | Detail |
|------|--------|
| Estimated Time | ~50 minutes |
| Files Created/Modified | 8 files |
| Lines of Code | ~200 lines |
| Dependencies | framer-motion, gsap, lucide-react |
| Tailwind Version | CSS 4 with @theme inline |
| Fonts | Orbitron, Pretendard, JetBrains Mono |

---

*Last Updated: 2026-01-05*
