# ☁️ CLoud Computing

A high-performance, SEO-optimized landing page for **NovaCloud** — a VPS/Cloud Hosting provider. Built with Next.js 16, TypeScript, Tailwind CSS v4, Three.js, GSAP, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Theming](#-theming)
- [Component Guide](#-component-guide)
- [Performance](#-performance)
- [Browser Support](#-browser-support)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Category | Details |
|---|---|
| **3D Interactive Hero** | Three.js orb with mouse-tracking 360° rotation, orbital rings, sparkle particles, and connection lines |
| **Typewriter Text** | Typing-in / deleting-out animated headlines in Hero and Testimonials sections |
| **GSAP ScrollTrigger** | 3D scroll-linked reveal animations across all sections (open on scroll down, close on scroll up) |
| **Raindrop Testimonials** | Review cards fall from above like water drops with bounce-splash glow on landing |
| **Dark / Light Mode** | Theme toggle with smooth CSS variable transitions, localStorage persistence, `prefers-color-scheme` detection |
| **Adaptive Navbar** | Morphs from pill shape → near-full-width rounded bar on scroll |
| **3D Feature Cards** | Interactive mouse-tilt with per-card glow colors, animated gradient borders, and slide-in stat badges |
| **Responsive Design** | Fully responsive from mobile (320px) to ultra-wide (2560px+) |
| **SEO Optimized** | OpenGraph, Twitter Cards, meta description, semantic HTML, structured keywords |
| **Performance** | Static generation, dynamic Three.js imports, Turbopack builds in ~2s |

---

## 🛠 Tech Stack

### Core

| Package | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.1.6 | React framework (App Router, Turbopack) |
| [React](https://react.dev) | 19.2.3 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS (via `@tailwindcss/postcss`) |

### Animation & 3D

| Package | Version | Purpose |
|---|---|---|
| [Three.js](https://threejs.org) | 0.183.1 | WebGL 3D graphics |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | 9.5.0 | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | 10.7.7 | Three.js helpers (Float, Sparkles, MeshDistortMaterial) |
| [GSAP](https://gsap.com) | 3.14.2 | Timeline & ScrollTrigger animations |
| [Framer Motion](https://www.framer.com/motion) | 12.34.3 | React animation library |

### Utilities

| Package | Version | Purpose |
|---|---|---|
| [Lucide React](https://lucide.dev) | 0.575.0 | Icon library |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Conditional class names |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.5.0 | Merge Tailwind classes without conflicts |
| [class-variance-authority](https://cva.style) | 0.7.1 | Component variant authoring |

---

## 📁 Project Structure

```
novacloud/
├── app/
│   ├── globals.css          # Global styles, theme variables, animations
│   ├── layout.tsx           # Root layout with SEO metadata, fonts, ThemeProvider
│   ├── page.tsx             # Home page — assembles all sections
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx           # Floating pill nav, scroll morph, theme toggle
│   ├── Hero.tsx             # Hero section with typewriter text
│   ├── HeroScene3D.tsx      # Three.js 3D orb scene (dynamically imported)
│   ├── Features.tsx         # Bento grid with 3D tilt cards
│   ├── Pricing.tsx          # 3-tier pricing with monthly/yearly toggle
│   ├── Testimonials.tsx     # Raindrop-fall review cards with typewriter header
│   ├── Footer.tsx           # Multi-column footer
│   └── ThemeProvider.tsx    # Dark/light theme context provider
├── lib/
│   └── utils.ts             # cn() helper — clsx + tailwind-merge
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration (v4 inline via globals.css)
├── postcss.config.mjs       # PostCSS with @tailwindcss/postcss
├── eslint.config.mjs        # ESLint flat config
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

---

## 📋 Prerequisites

Ensure the following are installed on your system:

| Tool | Minimum Version | Check Command |
|---|---|---|
| **Node.js** | 18+ (LTS recommended: 20.x or 22.x) | `node -v` |
| **pnpm** | 9.0+ | `pnpm -v` |
| **Git** | 2.30+ | `git --version` |

### Installing pnpm

```bash
# via npm
npm install -g pnpm

# or via Corepack (built into Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/phanvantien2907/do-an-cloud.git
cd do-an-cloud
```

### 2. Install dependencies

```bash
pnpm install
```

> **Note:** This project uses `pnpm-workspace.yaml`. All dependencies are hoisted to the workspace root.

### 3. Verify installation

```bash
pnpm build
```

If the build completes with `✓ Compiled successfully`, you're good to go.

---

## 💻 Development

### Start the dev server

```bash
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000) with hot reloading via **Turbopack**.

### Lint the codebase

```bash
pnpm lint
```

### Type checking

```bash
npx tsc --noEmit
```

### Development tips

- **Hot Reload:** All component changes reflect instantly
- **Three.js:** The `HeroScene3D` component is dynamically imported with `ssr: false` — it only loads on the client
- **Theme:** Click the sun/moon icon in the navbar to toggle dark/light mode. Preference persists in `localStorage`
- **Scroll Animations:** GSAP ScrollTrigger effects are scrub-based — scroll slowly to see the full 3D reveal

---

## 🏗 Building for Production

### Build

```bash
pnpm build
```

Expected output:

```
✓ Compiled successfully in ~2s
✓ Generating static pages (4/4)

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

### Preview production build locally

```bash
pnpm start
```

Opens at [http://localhost:3000](http://localhost:3000) serving the optimized production build.

---

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no configuration needed
4. Deploy is triggered on every push to `main`

```bash
# Or deploy via CLI
npx vercel --prod
```

### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

> **Note:** For standalone Docker output, add `output: "standalone"` to `next.config.ts`:
>
> ```ts
> const nextConfig: NextConfig = {
>   output: "standalone",
> };
> ```

```bash
# Build and run
docker build -t novacloud .
docker run -p 3000:3000 novacloud
```

### Option 3: Static Export

For pure static hosting (Netlify, Cloudflare Pages, S3, etc.):

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
};
```

```bash
pnpm build
# Output in `out/` directory — deploy this folder
```

### Option 4: Node.js Server

```bash
# Install dependencies
pnpm install --prod

# Build
pnpm build

# Start production server
PORT=3000 NODE_ENV=production pnpm start
```

Use a process manager like **PM2** for production:

```bash
pm2 start pnpm --name "novacloud" -- start
pm2 save
pm2 startup
```

---

## 🔐 Environment Variables

This project currently requires no environment variables for basic operation. For production customization:

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `0` |

Create a `.env.local` file for local overrides:

```env
# .env.local
NEXT_TELEMETRY_DISABLED=1
```

> **Security:** Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## 🎨 Theming

The app supports **dark** and **light** modes via CSS custom properties defined in `app/globals.css`.

### Theme Architecture

```
ThemeProvider (React Context)
  └─ Toggles .dark / .light class on <html>
  └─ Persists to localStorage("theme")
  └─ Detects prefers-color-scheme on first visit
      └─ CSS variables update via :root/.dark/.light selectors
          └─ All components read var(--bg), var(--fg), etc.
```

### Key CSS Variables

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--bg` | `#000000` | `#fafafa` | Page background |
| `--fg` | `#ededed` | `#171717` | Text color |
| `--card-bg` | `#0a0a0a` | `#ffffff` | Card backgrounds |
| `--bd` | `#222222` | `#e5e7eb` | Borders |
| `--heading-color` | `#ffffff` | `#0f172a` | Headings |
| `--btn-primary-bg` | `#ffffff` | `#0f172a` | Primary button bg |
| `--nav-bg` | `rgba(0,0,0,0.6)` | `rgba(255,255,255,0.7)` | Navbar background |

### Customizing Colors

Edit the `:root` / `.dark` / `.light` blocks in `app/globals.css`. Accent colors are defined in the `@theme inline` block:

```css
@theme inline {
  --color-accent-cyan: #06b6d4;
  --color-accent-purple: #a855f7;
  --color-accent-blue: #3b82f6;
}
```

---

## 🧩 Component Guide

### Navbar (`components/Navbar.tsx`)
- **Scroll behavior:** Pill shape (900px) → rounded bar (1200px, `rounded-2xl`) on scroll
- **Theme toggle:** Sun/Moon icons with `AnimatePresence` rotation transition
- **Mobile:** Hamburger menu with slide-down panel

### Hero (`components/Hero.tsx`)
- **Typewriter:** Cycles through `["Cloud in Seconds", "Apps with Ease", "Scale Instantly", "Infrastructure Fast"]`
- **3D Scene:** Dynamically imported `HeroScene3D` as background layer (`z-0`)
- **GSAP:** Timeline entry animation + ScrollTrigger parallax fade

### HeroScene3D (`components/HeroScene3D.tsx`)
- **CoreOrb:** Icosahedron with `MeshDistortMaterial` — follows mouse with full 360° rotation
- **OrbitalRings:** 3 rings at different radii/speeds/colors
- **FloatingNodes:** 35 instanced spheres orbiting randomly
- **Sparkles:** 120 particles (cyan + purple)
- **Performance:** `dpr={[1, 1.5]}`, `powerPreference: "high-performance"`

### Features (`components/Features.tsx`)
- **3D Tilt:** `useMotionValue` + `useSpring` for ±12° mouse-reactive tilt
- **Per-card glow:** Each feature has a unique accent color
- **Stats badge:** Slides in on hover showing key metrics
- **GSAP:** Cards fly in from `z: -200` with `rotateX: 35°`

### Pricing (`components/Pricing.tsx`)
- **3 Tiers:** Starter ($9), Professional ($29, highlighted), Enterprise ($99)
- **Toggle:** Monthly/yearly with Framer Motion spring animation
- **GSAP:** 3D scroll reveal per card

### Testimonials (`components/Testimonials.tsx`)
- **Raindrop effect:** Cards fall from `y: -400` with wobble rotation, blur, and bounce-splash glow
- **Scroll up:** Cards drop off-screen downward
- **Typewriter header:** Cycles phrases in gradient text
- **Layout:** 2-column masonry grid

### Footer (`components/Footer.tsx`)
- **5-column grid:** Brand + 4 link groups
- **Theme-aware** via CSS variables

### ThemeProvider (`components/ThemeProvider.tsx`)
- **Context API** with `useTheme()` hook
- **SSR-safe:** Hides children until mounted to prevent hydration flash
- **Persistence:** `localStorage` with `prefers-color-scheme` fallback

---

## ⚡ Performance

| Metric | Value |
|---|---|
| Build time (Turbopack) | ~2s |
| Static pages generated | 4 |
| Three.js loading | Dynamic import, client-only |
| CSS | Tailwind v4 — no unused CSS in production |
| Fonts | `next/font` — zero layout shift (Geist Sans & Mono) |
| Images | Optimized via `next/image` (when used) |

### Optimization Checklist

- [x] Static Site Generation (SSG) — all pages prerendered
- [x] Dynamic imports for Three.js (`ssr: false`)
- [x] `will-change: transform, opacity` on animated elements
- [x] `dpr` capped at 1.5 for Three.js canvas
- [x] CSS transitions using `@layer base` for Tailwind v4 compatibility
- [x] `powerPreference: "high-performance"` on WebGL context
- [x] Scroll animations use `scrub` (GPU-composited, no JS per frame)

---

## 🌍 Browser Support

| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |
| Mobile Chrome | 90+ |
| Mobile Safari | 15+ |

> **WebGL requirement:** The Three.js hero scene requires WebGL 2.0. It gracefully falls back to an empty background on unsupported browsers.

---

## 🔧 Troubleshooting

### Build fails with CSS errors

Tailwind CSS v4 uses `@layer` nesting. Ensure custom CSS resets are inside `@layer base`:

```css
/* ✅ Correct */
@layer base {
  body { background: var(--bg); }
}

/* ❌ Wrong — will override Tailwind utilities */
body { background: var(--bg); }
```

### Three.js SSR errors

`HeroScene3D` must be dynamically imported:

```tsx
const HeroScene3D = dynamic(() => import("@/components/HeroScene3D"), {
  ssr: false,
});
```

### Theme flicker on load

`ThemeProvider` hides children until mounted. If you still see flash, ensure `<html>` has `suppressHydrationWarning`:

```tsx
<html lang="en" className="dark" suppressHydrationWarning>
```

### GSAP ScrollTrigger not reversing

Ensure `toggleActions` is set and cleanup runs on unmount:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => { /* animations */ });
  return () => ctx.revert();
}, []);
```

### pnpm install fails

```bash
# Clear cache and retry
pnpm store prune
rm -rf node_modules
pnpm install
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** changes: `git commit -m "feat: add my feature"`
4. **Push** to branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `style:` | CSS/styling changes |
| `refactor:` | Code refactoring |
| `docs:` | Documentation |
| `chore:` | Build/config changes |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with Phan Van Tien using Next.js, Three.js, GSAP & Tailwind CSS</p>
  <p><strong>Cloud Computing</strong> — Deploy Your Cloud in Seconds</p>
</div>
