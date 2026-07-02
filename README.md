# Kara — A Dealership Without the Dealership

> Buy, service, and sell the world's rarest cars — entirely online. Kara is a cinematic, fully-digital luxury car experience: browse and reserve rare cars, have them delivered to your door, and never worry about maintenance again.

**🔗 Live demo:** [kara-pi.vercel.app](https://kara-pi.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Three.js](https://img.shields.io/badge/Three.js-r184-white)

---

## ✨ Overview

Kara reimagines luxury car ownership as a concierge, no-dealership experience. It's a design-led, motion-rich marketing site **and** a functional storefront: a browsable inventory, financing tools, a customer garage, and full buy / service / sell flows — all wrapped in a dark, neon-gold aesthetic with a site-wide animated background.

## 🚀 Features

**Buying experience**
- **Inventory** (`/inventory`) — filter by brand, body type, and price; live search and sorting
- **Car detail pages** (`/inventory/[slug]`) — image gallery, full specs, highlights, and structured data (SEO)
- **Financing calculator** — live monthly estimate from deposit, term, and trade-in
- **Reserve flow** — login-gated modal with a refundable deposit + delivery scheduling
- **Certification & trust** — 200-point inspection, history report, 7-day returns, warranty

**Ownership**
- **My Garage** (`/garage`) — reservations, saved cars (wishlist), and service history
- **Auth** (`/login`) — session-based sign-in with validation
- **Sell / Trade-In** — instant demo valuation

**Services & content**
- Repair & service tiers, test-drive / service **booking** (feeds the garage), sell/trade-in, testimonials, FAQ, contact & delivery coverage, Privacy & Terms

**Experience & craft**
- **3D configurator** (`/configure`) — customise a car in real-time with React Three Fiber
- **Site-wide animated background** — neon particle field + drifting glows (WebGL)
- Cinematic **preloader**, custom cursor, procedurally-synthesised **Web Audio** UI sounds (with a mute toggle)
- Buttery smooth scrolling (Lenis), scroll-reveal animations throughout
- Fully **responsive** with a mobile menu, and **`prefers-reduced-motion`** aware everywhere

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion + Lenis smooth scroll
- **3D:** Three.js via React Three Fiber & drei
- **Icons:** lucide-react
- **Deployment:** Vercel

## 📦 Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
# → http://localhost:3000

# production build
npm run build && npm start
```

## 📁 Project Structure

```
src/
├── app/                 # App Router pages & routes
│   ├── page.tsx         # Homepage
│   ├── inventory/       # Inventory grid + [slug] detail pages
│   ├── garage/          # Customer dashboard
│   ├── login/           # Auth
│   ├── configure/       # 3D car configurator
│   ├── privacy, terms/  # Legal pages
│   ├── sitemap.ts, robots.ts, not-found.tsx
│   └── layout.tsx       # Root layout (background, preloader, sound, cursor)
├── components/          # UI + sections (Hero, About, Trust, Financing, ...)
├── lib/                 # Data & helpers (cars, garage, site config)
└── utils/               # Web Audio sound engine
```

## 📝 Notes

This is a **front-end demonstration build**. Accounts, saved cars, reservations, and service records are persisted in the browser via `localStorage`, and form submissions are simulated. See the roadmap for making it fully backed by a server.

## 🗺️ Roadmap

- [ ] **Firebase** — real Auth (email/password + Google) and Firestore persistence
- [ ] Working form submissions (email / backend)
- [ ] Car comparison tool
- [ ] Delivery coverage map & live concierge chat

## 👤 Author

**Abdul Moeez Hassan** — Frontend Developer
[GitHub](https://github.com/sheikhmoeez756-code) · [LinkedIn](https://www.linkedin.com/in/abdul-moeez-hassan-670191332/)
