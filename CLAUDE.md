# Crete Township Website — Claude Code Project Memory
> InterPeak Managed Services | Last updated: May 2026
> **Read this file at the start of every session before writing any code.**

---

## Project Overview

Government website rebuild for Crete Township, Will County, Illinois.
Replacing existing WordPress site at cretetownship.com.
Client assets are in hand. All logins, logos, and documents available.

**Live site (current):** https://www.cretetownship.com
**Staging (Vercel):** TBD — add URL here once deployed
**CMS Admin:** TBD — add Railway URL here once deployed

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 14 (App Router) | TypeScript, server components by default |
| CMS | Payload CMS 2.x | Headless, REST API, PostgreSQL |
| Styling | Tailwind CSS | Custom tokens defined below |
| File Storage | Cloudflare R2 | PDF/doc storage, zero egress cost |
| Frontend Host | Vercel | Free tier, auto-deploy from main |
| CMS + DB Host | Railway | PostgreSQL + Payload service, ~$5-10/mo |
| Package Manager | npm workspaces + Turborepo | Monorepo |

---

## Repository Structure

```
crete-township-website/
├── apps/
│   ├── web/                  ← Next.js 14 frontend
│   │   ├── app/              ← App Router pages
│   │   ├── components/
│   │   │   ├── layout/       ← Header, Footer, Navigation
│   │   │   ├── ui/           ← Buttons, Cards, Badges, Pills
│   │   │   └── sections/     ← Page section components
│   │   ├── lib/              ← API fetch helpers, utilities
│   │   └── tailwind.config.ts
│   └── cms/                  ← Payload CMS
│       ├── src/
│       │   ├── collections/  ← All 9 content collections
│       │   ├── access/       ← Role-based access control
│       │   └── payload.config.ts
│       └── Dockerfile
├── packages/
│   └── ui/                   ← Shared types and utilities
├── CLAUDE.md                 ← THIS FILE — project memory
├── turbo.json
└── package.json              ← Workspace root
```

---

## Design System

### Color Palette

```css
/* Primary */
--navy:        #1B3A5C   /* headers, nav, primary buttons */
--navy-dark:   #0F2540   /* topbar, footer background */
--navy-light:  #2A5080   /* hover states on navy elements */

/* Accent */
--gold:        #C8960C   /* CTAs, borders, highlights */
--gold-light:  #E8AE1A   /* hover states on gold elements */
--gold-pale:   #FDF4DC   /* gold-tinted backgrounds, date boxes */

/* Neutrals */
--cream:       #F8F5F0   /* page background */
--gray-100:    #F4F6F9
--gray-200:    #E8EDF3
--gray-400:    #9BA5B5
--gray-600:    #5A6478   /* body text */
--gray-800:    #2C3444   /* headings */
```

### Tailwind Config Extension (tailwind.config.ts)

```ts
colors: {
  navy: {
    DEFAULT: '#1B3A5C',
    dark: '#0F2540',
    light: '#2A5080',
  },
  gold: {
    DEFAULT: '#C8960C',
    light: '#E8AE1A',
    pale: '#FDF4DC',
  },
  cream: '#F8F5F0',
},
fontFamily: {
  display: ['Playfair Display', 'Georgia', 'serif'],
  body: ['DM Sans', 'system-ui', 'sans-serif'],
},
```

### Typography

| Element | Size | Font | Weight | Color |
|---------|------|------|--------|-------|
| h1 (hero) | 42px | display | 700 | white (on navy) |
| h2 (section) | 26px | display | 700 | navy |
| h3 | 20px | body | 600 | navy |
| Body | 16px | body | 400 | gray-600 |
| Small/meta | 12px | body | 400 | gray-400 |
| Nav links | 13.5px | body | 500 | gray-600 |
| Buttons | 14px | body | 600 | — |

### Component Conventions

```
Cards:        bg-white, border border-gray-200, rounded-lg, shadow-sm on hover
Section wrap: max-w-[1100px] mx-auto px-8
Section title: font-display text-2xl font-bold text-navy + 3px gold bar below
Buttons:      rounded px-6 py-3, primary=bg-navy text-white, outline=border-navy
Gold accent:  3px solid gold — used under h2 headings and topbar bottom border
Navy banners: bg-navy-dark text-white — used for topbar, footer, section labels
Alert banner: bg-navy-dark text-gold-light — emergency/meeting notices, full width
```

---

## Payload CMS Collections

### Shared Fields (applied to all document collections)
```ts
title:       text      (required)
date:        date      (required — meeting date or report date)
description: textarea  (optional)
status:      select    ['draft', 'published', 'archived'] default: 'draft'
publishedAt: date      (auto-set on publish)
```

### 1. BoardAgendas
```ts
documentType: select ['Regular Board Meeting', 'Special Meeting', 'Annual Town Meeting']
file:         upload  → Cloudflare R2 (PDF)
```

### 2. MeetingMinutes
```ts
documentType: select ['Regular Board', 'Special Board', 'Assessor Minutes']
file:         upload  → Cloudflare R2 (PDF)
```

### 3. FinancialReports
```ts
documentType: select ['Audited Statement', 'Cash Balance', 'Budget Ordinance', 'Other']
fiscalYear:   number
file:         upload  → Cloudflare R2 (PDF)
```

### 4. AssessorDocuments
```ts
documentType: select ['Assessor Minutes', 'HOA', 'Exemption Forms', 'Other']
file:         upload  → Cloudflare R2 (PDF)
```

### 5. RoadDistrictReports
```ts
documentType: select ['Highway Commissioner', 'Environmental', 'Storm Sewer', 'Other']
file:         upload  → Cloudflare R2 (PDF)
```

### 6. Newsletters
```ts
file:         upload  → Cloudflare R2 (PDF)
coverImage:   upload  → Cloudflare R2 (optional)
```

### 7. Events
```ts
startDate:   date      (required)
endDate:     date      (optional)
location:    text
description: richText
category:    select ['Board Meeting', 'Community', 'Senior Programs', 'Recreational', 'Food Pantry']
featured:    checkbox
```

### 8. Announcements
```ts
body:       textarea  (required)
category:   select ['Board', 'Road District', 'Assessor', 'Community', 'General']
expiresAt:  date      (optional — auto-hide after this date)
active:     checkbox  (default: true)
```

### 9. Officials
```ts
name:         text    (required)
title:        text    (required)
department:   select ['Township Board', 'Assessor', 'Road District', 'Clerk', 'General Assistance']
phone:        text
email:        email
photo:        upload  (optional)
displayOrder: number  (controls sort order on officials page)
```

### Users Collection
```ts
email:    email  (required)
role:     select ['admin', 'editor']
```

---

## Environment Variables

### apps/web (.env.local)
```
NEXT_PUBLIC_CMS_URL=https://[railway-url]
NEXT_PUBLIC_SITE_URL=https://cretetownship.com
```

### apps/cms (.env)
```
DATABASE_URI=postgresql://[railway-postgres-url]
PAYLOAD_SECRET=[random-32-char-string]
R2_BUCKET=crete-township-docs
R2_ACCESS_KEY=[cloudflare-r2-access-key]
R2_SECRET_KEY=[cloudflare-r2-secret-key]
R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
R2_PUBLIC_URL=https://[public-bucket-url]
```

---

## API Conventions

All data fetched from Payload REST API. Base URL from env.

```ts
// Fetch helpers live in apps/web/lib/api.ts
// Always filter by status=published for public pages
// Always sort documents by date descending (newest first)
// Always sort events by startDate ascending (next upcoming first)

// Example endpoints:
GET /api/board-agendas?where[status][equals]=published&sort=-date&limit=10
GET /api/events?where[startDate][greater_than]=now&sort=startDate&limit=20
GET /api/announcements?where[active][equals]=true&sort=-createdAt&limit=5
GET /api/officials?sort=displayOrder
```

**Important:** REST API must remain clean and well-structured throughout Phase 1.
Phase 2 (FlutterFlow mobile app) will consume the same API. Do not add frontend-only
fields to collections — keep the data model clean.

---

## Key Decisions (Do Not Reverse Without Updating This File)

- **No WordPress** — full rebuild, no WP plugins or theme code reused
- **App Router only** — use Next.js 14 App Router, NOT Pages Router
- **Server components by default** — only use `'use client'` when interactivity requires it
- **Payload 2.x** — not 3.x, separate deployment from Next.js frontend
- **Tailwind only** — no CSS modules, no styled-components, no inline styles
- **R2 over S3** — zero egress fees for PDF document serving
- **No third-party UI library** — build all components from scratch using Tailwind
- **REST API over GraphQL** — simpler for FlutterFlow Phase 2 integration
- **TypeScript everywhere** — no .js files in apps/web or apps/cms

---

## Pages & Status

| Page | Route | Status | Trello Card |
|------|-------|--------|-------------|
| Homepage | / | 🔲 Not started | Pages — Build |
| Document Library | /documents | 🔲 Not started | Pages — Build |
| Events | /events | 🔲 Not started | Pages — Build |
| Offices & Officials | /officials | 🔲 Not started | Pages — Build |
| About | /about | 🔲 Not started | Interior pages card |
| Services | /services | 🔲 Not started | Interior pages card |
| Assessor | /assessor | 🔲 Not started | Interior pages card |
| Road District | /road-district | 🔲 Not started | Interior pages card |
| Community Center | /community-center | 🔲 Not started | Interior pages card |
| Contact | /contact | 🔲 Not started | Interior pages card |

---

## Components & Status

| Component | Location | Status |
|-----------|----------|--------|
| Tailwind tokens | tailwind.config.ts | 🔲 Not started |
| Button | components/ui/Button.tsx | 🔲 Not started |
| Badge / Pill | components/ui/Badge.tsx | 🔲 Not started |
| SectionTitle | components/ui/SectionTitle.tsx | 🔲 Not started |
| AlertBanner | components/ui/AlertBanner.tsx | 🔲 Not started |
| DocCard | components/ui/DocCard.tsx | 🔲 Not started |
| EventCard | components/ui/EventCard.tsx | 🔲 Not started |
| AnnouncementCard | components/ui/AnnouncementCard.tsx | 🔲 Not started |
| Header / Topbar | components/layout/Header.tsx | 🔲 Not started |
| Navigation | components/layout/Navigation.tsx | 🔲 Not started |
| Footer | components/layout/Footer.tsx | 🔲 Not started |

---

## CMS Collections & Status

| Collection | Status | Notes |
|------------|--------|-------|
| BoardAgendas | 🔲 Not started | |
| MeetingMinutes | 🔲 Not started | |
| FinancialReports | 🔲 Not started | |
| AssessorDocuments | 🔲 Not started | |
| RoadDistrictReports | 🔲 Not started | |
| Newsletters | 🔲 Not started | |
| Events | 🔲 Not started | |
| Announcements | 🔲 Not started | |
| Officials | 🔲 Not started | |

---

## Infrastructure & Status

| Item | Status | URL / Notes |
|------|--------|-------------|
| GitHub repo | 🔲 Not started | crete-township-website (private) |
| Vercel project | 🔲 Not started | — |
| Railway project | 🔲 Not started | — |
| Cloudflare R2 bucket | 🔲 Not started | crete-township-docs |
| Monorepo scaffold | 🔲 Not started | — |
| Domain (existing) | ✅ Have access | cretetownship.com |
| Client logo/assets | ✅ Have access | InterPeak manages current site |
| Existing PDFs | ✅ Have access | WP admin + FTP available |

---

## Session Log
> Update this section at the END of every Claude Code session.
> Format: [Date] — What was built — What's next

| Date | Built | Next |
|------|-------|------|
| — | Project initialized | Create GitHub repo + scaffold monorepo |

---

## Current Session Goal
**Active Trello card:** Project Setup — Scaffold monorepo
**Working on:** GitHub repo creation + Next.js/Payload skeleton
**Next after this:** Configure Tailwind tokens (Design System list)

---

## How to Start Each Session
Open Claude Code from the repo root and say:
> "Read CLAUDE.md. Tell me what was completed last session and what we're building today."

Claude Code will orient from this file before writing any code.
