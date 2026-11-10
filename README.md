# J38 Corporation — Web Platform & Growth Audit Engine

The official web platform and growth audit engine for **J38 Corporation** ([https://j38.co](https://j38.co)).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and Three.js.

---

## 🚀 Overview

- **Landing Experience:** High-performance responsive presentation with 3D WebGL Three.js infinity sculpture interactive canvas.
- **5 Growth Engines:** Digital Marketing, AI, Automation, Branding, and Web Solutions.
- **Interactive 3-Step Growth Audit:** Real-time form with validation, conversion tracking, and multi-channel lead dispatching.
- **Admin Portal:** Secure `/admin` dashboard for tracking, managing, filtering, and updating lead stages.
- **Automated Notifications:** Dual-dispatch email alerts to admin and confirmation emails to prospects via SMTP / Resend API / Webhook fallback.
- **SEO & Compliance:** Custom `robots.txt`, `sitemap.xml`, OpenGraph tags, and dedicated Privacy Policy (`/privacy`) and Terms (`/terms`) pages.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/nayem-ads/j38-corporation.git
cd j38-corporation
npm install
```

### Environment Configuration

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Key configuration variables:
- `ADMIN_PASSWORD`: Password for the `/admin` portal.
- `NOTIFICATION_EMAIL`: Email where new growth audit leads will be sent (default: `raselrehman222@gmail.com`).
- `NEXT_PUBLIC_SITE_URL`: Base domain for SEO, sitemaps, and OpenGraph.
- `DATA_DIR`: Optional persistent storage path (e.g. `/data` when using Railway volume mounts).

### Running in Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Type-Check, Lint & Build

```bash
npm run type-check    # Strict TypeScript checks
npm run lint          # ESLint validation
npm run build         # Production optimized build
npm start             # Start production server
```

---

## 🚢 Deployment (Railway)

This repository is configured for direct deployment on [Railway](https://railway.app):

1. Connect your GitHub repository `nayem-ads/j38-corporation`.
2. Set Environment Variables in Railway settings (`ADMIN_PASSWORD`, `NOTIFICATION_EMAIL`, etc.).
3. (Optional) Add a Railway Volume mount at `/data` for long-term lead persistence without an external DB.
4. Any push to `main` triggers automatic build and deployment.

---

## 🔒 Security

- Admin routes (`/api/admin/leads`) are strictly guarded with session validation and Bearer tokens.
- Audit submission API (`/api/audit`) includes IP rate-limiting to mitigate spam and automated bots.
- Production build strips unnecessary console output while preserving warnings and errors for logging.
