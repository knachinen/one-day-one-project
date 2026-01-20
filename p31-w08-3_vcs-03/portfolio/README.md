# 🎨 **Minimalist Portfolio Website**

A clean, minimalist personal portfolio website built with Next.js and Supabase, showcasing professional work with modern web development practices.

## ✨ **Features**

- **🎯 Minimalist Design**: Clean, focused user experience with minimal visual elements
- **📱 Responsive Layout**: Mobile-first design that works on all devices
- **⚡ Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **🗄️ Database Integration**: Supabase for project management and CRUD operations
- **🔐 Admin Dashboard**: Secure project management system
- **🎭 Dynamic Routing**: Individual project pages with SEO optimization
- **🌐 Performance Optimized**: ISR caching and optimized image loading

## 🚀 **Technology Stack**

### **Frontend**
- **Next.js 16.1.1** (App Router) - React framework with server components
- **React 19.2.3** - Modern React with latest features
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React** - Icon library

### **Backend & Database**
- **Supabase** - PostgreSQL database with real-time capabilities
- **@supabase/ssr** - Server-side rendering support
- **@supabase/supabase-js** - Client library

### **Form Handling & Validation**
- **React Hook Form 7.71.1** - Form management
- **@hookform/resolvers 5.2.2** - Form validation integration
- **Zod 4.3.5** - Schema validation

## 📁 **Project Structure**

```
portfolio/
├── app/                          # Next.js App Router pages
│   ├── admin/                   # Admin dashboard
│   │   ├── login/              # Admin authentication
│   │   └── projects/           # Project management
│   ├── work/                   # Work showcase
│   │   ├── [id]/              # Dynamic project details
│   │   └── page.tsx           # Work listing
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/                  # Reusable UI components
│   ├── home/                  # Home page specific components
│   ├── layout/                # Layout components
│   ├── ui/                    # Generic UI components
│   └── admin/                 # Admin specific components
├── lib/                        # Utility libraries
│   ├── projects.ts            # Project data operations
│   └── supabase/              # Database client setup
├── types/                      # TypeScript type definitions
├── public/                     # Static assets
└── supabase/                   # Database schema
```

## 🛠 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**
   
   - Create a Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Set up Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 **Database Schema**

### **Projects Table**
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  role TEXT,
  tech_stack TEXT[],
  thumbnail TEXT,
  status TEXT CHECK (status IN ('in_progress', 'completed')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Project Images Table**
```sql
CREATE TABLE project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);
```

## 🔐 **Security Features**

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for portfolio viewing
- **Authenticated admin access** for CRUD operations
- **Environment variables** for sensitive data

## 🎯 **Pages & Features**

### **Public Pages**
- **Home (`/`)**: Hero section with recent projects preview
- **Work (`/work`)**: Project portfolio grid
- **Work Detail (`/work/[id]`)**: Individual project showcase

### **Admin System**
- **Admin Login (`/admin/login`)**: Secure authentication
- **Admin Dashboard (`/admin`)**: Project management
- **Create/Edit Projects**: Full CRUD operations

### **Key Components**
- **Header**: Navigation with responsive design
- **Hero**: Landing section with profile and CTA
- **ProjectCard**: Project preview with hover effects
- **ProjectForm**: Admin project creation/editing

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Environment Variables for Production**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🎨 **Design Philosophy**

This portfolio follows **minimalist design principles**:
- **Less but better** - Minimal elements, maximum impact
- **Clean typography** - Inter font family for readability
- **Monochromatic palette** - White, black, gray with single accent color
- **Subtle interactions** - Fade and slide animations only

## 📝 **Development Commands**

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🔮 **Future Enhancements**

- [ ] About page implementation
- [ ] Contact page with form
- [ ] Footer component
- [ ] Framer Motion animations
- [ ] Dark mode support
- [ ] Search functionality
- [ ] Image optimization with Next.js Image

## 📚 **Documentation**

Detailed documentation is available in the `/doc` directory:
- `plan.md` - Project planning and specifications
- `tech-stack.md` - Technology choices and rationale
- `design.md` - UI/UX design specifications
- `impl-*.md` - Step-by-step implementation guides

## 🤝 **Contributing**

This is a personal portfolio project. For questions or suggestions about the codebase and architecture, please open an issue.

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and Supabase**