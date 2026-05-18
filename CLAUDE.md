# Crete Township Website — Claude Code Project Memory
> InterPeak Managed Services | Last updated: May 2026
> **Read this file at the start of every session before writing any code.**

---

## Project Overview

Government website rebuild for Crete Township, Will County, Illinois.
Replacing existing WordPress site at cretetownship.com.
Client assets in hand — logos, logins, all existing PDFs accessible.

**Live site (current):** https://www.cretetownship.com
**Staging (Vercel):** TBD — add URL here once deployed
**CMS Admin:** TBD — will be at /admin on same Vercel deployment

---

## Architecture Decision (Final)

**Payload CMS 3.x embedded inside Next.js 14 — single app, single deployment.**

Payload 3.x ("The One") runs as a Next.js plugin. The admin panel lives
at /admin on the same Vercel deployment. No separate CMS server needed.
Database: Neon serverless Postgres (free tier).

Chosen over Payload 2.x monorepo for:
- Zero monthly operating cost (Vercel free + Neon free + R2 free)
- Single deployment — simpler client handoff and maintenance
- Identical CMS admin experience for township staff
- Same REST API available for Phase 2 FlutterFlow mobile app

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | TypeScript, server components by default |
| CMS | Payload CMS 3.x | Runs inside Next.js as a plugin |
| Database | Neon serverless Postgres | Free tier, no server to manage |
| Styling | Tailwind CSS | Custom tokens defined below |
| File Storage | Cloudflare R2 | PDF/doc storage, zero egress cost |
| Hosting | Vercel | Free tier, single deployment |
| Rich Text | @payloadcms/richtext-lexical | Payload 3.x default editor |

---

## Repository Structure

```
crete-township-website/
├── app/
│   ├── (payload)/                      ← Payload admin — auto-handled by plugin
│   │   └── admin/[[...segments]]/
│   ├── (frontend)/                     ← Township website pages
│   │   ├── layout.tsx                  ← Frontend layout (Header + Footer)
│   │   ├── page.tsx                    ← Homepage
│   │   ├── documents/page.tsx
│   │   ├── events/page.tsx
│   │   ├── officials/page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── assessor/page.tsx
│   │   ├── road-district/page.tsx
│   │   ├── community-center/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx                      ← Root layout with fonts
│   └── globals.css
├── collections/                        ← Payload collection definitions
│   ├── BoardAgendas.ts
│   ├── MeetingMinutes.ts
│   ├── FinancialReports.ts
│   ├── AssessorDocuments.ts
│   ├── RoadDistrictReports.ts
│   ├── Newsletters.ts
│   ├── Events.ts
│   ├── Announcements.ts
│   ├── Officials.ts
│   └── Users.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── SectionTitle.tsx
│       ├── AlertBanner.tsx
│       ├── DocCard.tsx
│       ├── EventCard.tsx
│       └── AnnouncementCard.tsx
├── lib/
│   ├── payload.ts                      ← getPayload() helper
│   └── utils.ts
├── public/
│   └── assets/                         ← Logo, seal, static images
├── payload.config.ts                   ← Payload configuration
├── next.config.mjs                     ← withPayload() plugin wrapper
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                          ← Never commit
├── .env.example                        ← Commit this (safe template)
├── CLAUDE.md                           ← THIS FILE
└── package.json
```

---

## Design System

### Color Palette

```css
--navy:        #1B3A5C   /* headers, nav, primary buttons */
--navy-dark:   #0F2540   /* topbar, footer background */
--navy-light:  #2A5080   /* hover states */
--gold:        #C8960C   /* CTAs, borders, highlights */
--gold-light:  #E8AE1A   /* hover gold */
--gold-pale:   #FDF4DC   /* gold tinted backgrounds, date boxes */
--cream:       #F8F5F0   /* page background */
--gray-100:    #F4F6F9
--gray-200:    #E8EDF3
--gray-400:    #9BA5B5
--gray-600:    #5A6478   /* body text */
--gray-800:    #2C3444   /* headings */
```

### Tailwind Config Extension

```ts
// tailwind.config.ts
colors: {
  navy: {
    DEFAULT: '#1B3A5C',
    dark:    '#0F2540',
    light:   '#2A5080',
  },
  gold: {
    DEFAULT: '#C8960C',
    light:   '#E8AE1A',
    pale:    '#FDF4DC',
  },
  cream: '#F8F5F0',
},
fontFamily: {
  display: ['Playfair Display', 'Georgia', 'serif'],
  body:    ['DM Sans', 'system-ui', 'sans-serif'],
},
```

### Typography Scale

| Element | Size | Font | Weight | Color |
|---------|------|------|--------|-------|
| h1 hero | 42px | display | 700 | white (on navy) |
| h2 section | 26px | display | 700 | navy |
| h3 | 20px | body | 600 | navy |
| Body | 16px | body | 400 | gray-600 |
| Meta/small | 12px | body | 400 | gray-400 |
| Nav links | 13.5px | body | 500 | gray-600 |
| Buttons | 14px | body | 600 | — |

### Component Conventions

```
Cards:         bg-white border border-gray-200 rounded-lg, shadow-sm on hover
Section wrap:  max-w-[1100px] mx-auto px-8
Section title: font-display text-2xl font-bold text-navy + 3px gold bar below
Buttons:       rounded px-6 py-3, primary=bg-navy text-white, outline=border-navy
Gold accent:   border-b-[3px] border-gold — topbar bottom, under h2 headings
Navy banners:  bg-navy-dark text-white — topbar, footer, section labels
Alert banner:  bg-navy-dark text-gold-light — full width top of page
```

---

## Payload CMS Collections

### Data Fetching (Payload 3.x — server components)
```ts
// Direct DB access in server components — no HTTP overhead
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const result = await payload.find({
  collection: 'board-agendas',
  where: { status: { equals: 'published' } },
  sort: '-date',
  limit: 10,
})

// REST API also works for Phase 2 FlutterFlow:
// GET /api/board-agendas?where[status][equals]=published&sort=-date
```

### Shared Fields (all document collections)
```ts
title:       text      (required)
date:        date      (required)
description: textarea  (optional)
status:      select    ['draft', 'published', 'archived'] default: 'draft'
publishedAt: date      (auto-set on publish via beforeChange hook)
```

### 1. BoardAgendas — slug: 'board-agendas'
```ts
documentType: select ['Regular Board Meeting', 'Special Meeting', 'Annual Town Meeting']
file:         upload → Cloudflare R2 (PDF)
```

### 2. MeetingMinutes — slug: 'meeting-minutes'
```ts
documentType: select ['Regular Board', 'Special Board', 'Assessor Minutes']
file:         upload → Cloudflare R2 (PDF)
```

### 3. FinancialReports — slug: 'financial-reports'
```ts
documentType: select ['Audited Statement', 'Cash Balance', 'Budget Ordinance', 'Other']
fiscalYear:   number
file:         upload → Cloudflare R2 (PDF)
```

### 4. AssessorDocuments — slug: 'assessor-documents'
```ts
documentType: select ['Assessor Minutes', 'HOA', 'Exemption Forms', 'Other']
file:         upload → Cloudflare R2 (PDF)
```

### 5. RoadDistrictReports — slug: 'road-district-reports'
```ts
documentType: select ['Highway Commissioner', 'Environmental', 'Storm Sewer', 'Other']
file:         upload → Cloudflare R2 (PDF)
```

### 6. Newsletters — slug: 'newsletters'
```ts
file:        upload → Cloudflare R2 (PDF)
coverImage:  upload → Cloudflare R2 (optional)
```

### 7. Events — slug: 'events'
```ts
startDate:   date (required)
endDate:     date (optional)
location:    text
description: richText (lexical)
category:    select ['Board Meeting','Community','Senior Programs','Recreational','Food Pantry']
featured:    checkbox
```

### 8. Announcements — slug: 'announcements'
```ts
body:       textarea (required)
category:   select ['Board', 'Road District', 'Assessor', 'Community', 'General']
expiresAt:  date (optional — auto-hide after this date)
active:     checkbox (default: true)
```

### 9. Officials — slug: 'officials'
```ts
name:         text (required)
title:        text (required)
department:   select ['Township Board','Assessor','Road District','Clerk','General Assistance']
phone:        text
email:        email
photo:        upload (optional)
displayOrder: number
```

### Users — slug: 'users' (Payload built-in auth)
```ts
role: select ['admin', 'editor']
```

---

## Environment Variables

### .env.local (never commit)
```
DATABASE_URI=postgresql://[neon-connection-string]
PAYLOAD_SECRET=[random-32-char-string]
R2_BUCKET=crete-township-docs
R2_ACCESS_KEY=[cloudflare-r2-access-key]
R2_SECRET_KEY=[cloudflare-r2-secret-key]
R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
R2_PUBLIC_URL=https://[public-r2-url]
NEXT_PUBLIC_SITE_URL=https://cretetownship.com
```

### .env.example (safe to commit)
```
DATABASE_URI=
PAYLOAD_SECRET=
R2_BUCKET=
R2_ACCESS_KEY=
R2_SECRET_KEY=
R2_ENDPOINT=
R2_PUBLIC_URL=
NEXT_PUBLIC_SITE_URL=
```

---

## Key Decisions (Do Not Reverse Without Updating This File)

- **Payload 3.x not 2.x** — single app inside Next.js, one Vercel deployment
- **Neon for database** — serverless Postgres free tier, no Railway needed
- **App Router only** — Next.js 14 App Router, NOT Pages Router
- **Server components by default** — use client only when interactivity required
- **getPayload() in server components** — direct DB access, no HTTP overhead
- **REST API preserved** — /api/* endpoints available for Phase 2 FlutterFlow
- **Tailwind only** — no CSS modules, no styled-components, no inline styles
- **No third-party UI library** — all components built from Tailwind
- **TypeScript strict** — no .js files, avoid any types
- **Cloudflare R2** — zero egress cost for PDF document serving

---

## Pages & Status

| Page | Route | Status |
|------|-------|--------|
| Homepage | / | 🔲 Not started |
| Document Library | /documents | 🔲 Not started |
| Events | /events | 🔲 Not started |
| Offices & Officials | /officials | 🔲 Not started |
| About | /about | 🔲 Not started |
| Services | /services | 🔲 Not started |
| Assessor | /assessor | 🔲 Not started |
| Road District | /road-district | 🔲 Not started |
| Community Center | /community-center | 🔲 Not started |
| Contact | /contact | 🔲 Not started |

---

## Components & Status

| Component | Path | Status |
|-----------|------|--------|
| Tailwind tokens | tailwind.config.ts | 🔲 Not started |
| Button | components/ui/Button.tsx | 🔲 Not started |
| Badge / Pill | components/ui/Badge.tsx | 🔲 Not started |
| SectionTitle | components/ui/SectionTitle.tsx | 🔲 Not started |
| AlertBanner | components/ui/AlertBanner.tsx | 🔲 Not started |
| DocCard | components/ui/DocCard.tsx | 🔲 Not started |
| EventCard | components/ui/EventCard.tsx | 🔲 Not started |
| AnnouncementCard | components/ui/AnnouncementCard.tsx | 🔲 Not started |
| Header | components/layout/Header.tsx | 🔲 Not started |
| Footer | components/layout/Footer.tsx | 🔲 Not started |

---

## CMS Collections & Status

| Collection | Status |
|------------|--------|
| BoardAgendas | 🔲 Not started |
| MeetingMinutes | 🔲 Not started |
| FinancialReports | 🔲 Not started |
| AssessorDocuments | 🔲 Not started |
| RoadDistrictReports | 🔲 Not started |
| Newsletters | 🔲 Not started |
| Events | 🔲 Not started |
| Announcements | 🔲 Not started |
| Officials | 🔲 Not started |

---

## Infrastructure & Status

| Item | Status | Notes |
|------|--------|-------|
| GitHub repo | ✅ Done | crete-township-website (private) |
| CLAUDE.md | ✅ Done | Committed to main, updated for 3.x |
| Payload 3.x scaffold | ✅ Done | Next.js 14 + Payload 3.x, PostgreSQL configured |
| Neon database | 🔲 Not started | Set up when CMS collections card starts |
| Vercel project | 🔲 Not started | Set up after scaffold verified |
| Cloudflare R2 bucket | 🔲 Not started | Set up when CMS collections card starts |
| Domain access | ✅ Have access | cretetownship.com — manage current WP site |
| Client assets | ✅ Have access | Logo, seal, all docs — InterPeak manages site |
| Existing PDFs | ✅ Have access | WP admin + FTP available |

---

## Session Log

| Date | Built | Next |
|------|-------|------|
| 2026-05-18 | ✅ Payload 3.x scaffold complete: Next.js 14 App Router, Payload 3.x plugin, PostgreSQL adapter, .env files configured. Dev server verified at localhost:3000, /admin route works (requires DB connection to fully start). | Connect Neon PostgreSQL database + build Tailwind design system |

---

## Current Session Goal
**Active Trello card:** Project Setup — Scaffold (Payload 3.x)
**Working on:** Payload 3.x + Next.js 14 single-app scaffold
**Next after this:** Tailwind design tokens (Design System list)

---

## How to Start Each Session
```
"Read CLAUDE.md. Tell me what was completed last session and what we are building today."
```
