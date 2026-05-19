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
- Zero monthly operating cost (Vercel free + Neon free + Vercel Blob free tier)
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
| File Storage | Vercel Blob | Integrated file storage for PDFs and images |
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
// tailwind.config.mjs
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
  // ADA/Section 508 compliant fonts for government websites
  body:    ['Source Sans 3', 'Source Sans Pro', 'system-ui', 'sans-serif'], // All UI text
  display: ['Merriweather', 'Georgia', 'serif'], // Headings only (accessible serif)
},
```

**Font Compliance Note:**
Government websites must use ADA/Section 508 compliant fonts. We use:
- **Source Sans 3** (formerly Source Sans Pro) for all body text, navigation, and UI elements
- **Merriweather** for headings only (conservative, accessible serif alternative to decorative fonts)
- Minimum 16px body text size with strong contrast ratios maintained

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
file:         upload → Vercel Blob (PDF)
```

### 2. MeetingMinutes — slug: 'meeting-minutes'
```ts
documentType: select ['Regular Board', 'Special Board', 'Assessor Minutes']
file:         upload → Vercel Blob (PDF)
```

### 3. FinancialReports — slug: 'financial-reports'
```ts
documentType: select ['Audited Statement', 'Cash Balance', 'Budget Ordinance', 'Other']
fiscalYear:   number
file:         upload → Vercel Blob (PDF)
```

### 4. AssessorDocuments — slug: 'assessor-documents'
```ts
documentType: select ['Assessor Minutes', 'HOA', 'Exemption Forms', 'Other']
file:         upload → Vercel Blob (PDF)
```

### 5. RoadDistrictReports — slug: 'road-district-reports'
```ts
documentType: select ['Highway Commissioner', 'Environmental', 'Storm Sewer', 'Other']
file:         upload → Vercel Blob (PDF)
```

### 6. Newsletters — slug: 'newsletters'
```ts
file:        upload → Vercel Blob (PDF)
coverImage:  upload → Vercel Blob (optional)
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
BLOB_READ_WRITE_TOKEN=[vercel-blob-token]
NEXT_PUBLIC_SITE_URL=https://cretetownship.com
```

### .env.example (safe to commit)
```
DATABASE_URI=
PAYLOAD_SECRET=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

### ⚠️ CRITICAL: System Environment Variable Issue
**If you get "password authentication failed" errors even after updating `.env.local`:**

There is a `DATABASE_URI` environment variable set at the **system level** that overrides `.env.local` files. This was accidentally set during initial development and causes authentication failures with outdated credentials.

**Workaround:** Always start the dev server with:
```bash
unset DATABASE_URI && npm run dev
```

**Permanent fix:** Find and remove the system-level DATABASE_URI from:
- Claude Code settings
- VS Code workspace/user settings (.vscode/settings.json)
- Terminal profile (~/.zshrc, ~/.bash_profile)
- macOS LaunchAgents

To check if it's set: `env | grep DATABASE_URI`

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
- **Vercel Blob for file storage** — integrated with Vercel deployment, simpler than R2 configuration

---

## Pages & Status

| Page | Route | Status |
|------|-------|--------|
| Homepage | / | ✅ Done (static demo version with all sections) |
| Document Library | /documents | 🔲 Not started (main landing page) |
| Agendas | /documents/agendas | ✅ Done (advanced listing with filters) |
| Meeting Minutes | /documents/meeting-minutes | ✅ Done (advanced listing with filters) |
| Annual Town Meetings | /documents/annual-town-meetings | ✅ Done (advanced listing with filters) |
| Audited Financial Statements | /documents/audited-financial-statements | ✅ Done (advanced listing with filters) |
| Cash Balance Reports | /documents/cash-balance-reports | ✅ Done (advanced listing with filters) |
| Town Fund & Tax Levy Minutes | /documents/town-fund-levy-minutes | ✅ Done (advanced listing with filters) |
| Assessor Minutes | /documents/assessor-minutes | ✅ Done (advanced listing with filters) |
| Highway Commissioner Reports | /documents/highway-commissioner | ✅ Done (advanced listing with filters) |
| Newsletters | /documents/newsletters | ✅ Done (advanced listing with filters) |
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
| Tailwind tokens | tailwind.config.ts | ✅ Done |
| Button | src/components/ui/button.tsx | ✅ Done (gold primary, navy outline variants) |
| Badge | src/components/ui/badge.tsx | ✅ Done (category pills + DateBadge) |
| Card | src/components/ui/card.tsx | ✅ Done (base card with Crete styling) |
| DocumentCard | src/components/ui/DocumentCard.tsx | ✅ Done (document cards with grid/list view support) |
| EventCard | src/components/ui/EventCard.tsx | ✅ Done (event cards with date badge) |
| TownshipHeader | src/components/layout/TownshipHeader.tsx | ✅ Done (sticky nav, Reports dropdown with 8 document types) |
| HeroSection | src/components/layout/HeroSection.tsx | ✅ Done (hero with upcoming events sidebar) |
| TownshipFooter | src/components/layout/TownshipFooter.tsx | ✅ Done (4-column footer) |
| DocumentListingAdvanced | src/components/DocumentListingAdvanced.tsx | ✅ Done (filters sidebar, grid/list toggle, search, year/type filters) |
| PageHero | src/components/PageHero.tsx | ✅ Done (page hero with breadcrumbs) |

---

## CMS Collections & Status

| Collection | Status |
|------------|--------|
| BoardAgendas | ✅ Done (collection created, role-based access configured) |
| MeetingMinutes | ✅ Done (collection created, role-based access configured) |
| FinancialReports | ✅ Done (collection created, role-based access configured) |
| AssessorDocuments | ✅ Done (collection created, role-based access configured) |
| RoadDistrictReports | ✅ Done (collection created, role-based access configured) |
| Newsletters | ✅ Done (collection created, role-based access configured) |
| Events | ✅ Done (collection created, role-based access configured) |
| Announcements | ✅ Done (collection created, role-based access configured) |
| Officials | 🔲 Not started |
| Users | ✅ Done (5 roles configured: Super Admin, Township Admin, Admin, Editor, Viewer) |

---

## Infrastructure & Status

| Item | Status | Notes |
|------|--------|-------|
| GitHub repo | ✅ Done | crete-township-website (private) |
| CLAUDE.md | ✅ Done | Committed to main, updated for 3.x |
| Payload 3.x scaffold | ✅ Done | Next.js 14 + Payload 3.x, PostgreSQL configured |
| Neon database | ✅ Done | Connected - schema initialized automatically |
| Tailwind design system | ✅ Done | Colors, fonts, weights configured per spec |
| Vercel project | 🔲 Not started | Set up after scaffold verified |
| Vercel Blob storage | ✅ Done | @payloadcms/storage-vercel-blob configured, BLOB_READ_WRITE_TOKEN added |
| WordPress migration | ✅ Done | 3,316 files sorted, 627 documents renamed with proper dates |
| Domain access | ✅ Have access | cretetownship.com — manage current WP site |
| Client assets | ✅ Have access | Logo, seal, all docs — InterPeak manages site |
| Existing PDFs | ✅ Migrated | All files sorted and renamed in ./migration/sorted/ |

---

## Session Log

| Date | Built | Next |
|------|-------|------|
| 2026-05-18 (AM) | ✅ Payload 3.x scaffold complete: Next.js 14 App Router, Payload 3.x plugin, PostgreSQL adapter, .env files configured. Dev server verified at localhost:3000, /admin route works (requires DB connection to fully start). | Connect Neon PostgreSQL database + build Tailwind design system |
| 2026-05-18 (PM) | ✅ Neon database connected, admin user created. Tailwind design system complete (navy/gold colors, Playfair Display + DM Sans fonts, all weights). SSL mode fixed to verify-full. | Build UI component library |
| 2026-05-18 (PM) | ✅ Complete UI component library: Button, Badge, Card, DocCard, EventCard. Built TownshipHeader (blue bg, contact info, nav, search), HeroSection (with stats), TownshipFooter (4-column). Created full static homepage with all sections (Hero, Services grid, Document Library, Events sidebar, Announcements). | Refine homepage layout based on mockup feedback |
| 2026-05-18 (PM) | ✅ Homepage layout refinements: Widened content containers from 1100px to 1400px. Moved search box inline with nav menu (right side). Added gold 3px border under main header. Active menu items show gold underline (no white bg). Moved Announcements section above Township Services. Added Upcoming Events sidebar in hero section. Font compliance: Changed to Source Sans 3 + Merriweather per ADA/Section 508 requirements. | Begin building CMS collections |
| 2026-05-18 (PM) | ✅ Implemented Vercel Blob storage using @payloadcms/storage-vercel-blob for all file uploads (documents and media collections). Replaced all Cloudflare R2 references with Vercel Blob. Updated .env.example with BLOB_READ_WRITE_TOKEN. Configured role-based access control with 5 roles: Super Admin, Township Admin (Documents/Content/Site Configs only), Admin, Editor, Viewer. Created comprehensive document collections: BoardAgendas, MeetingMinutes, FinancialReports, AssessorDocuments, RoadDistrictReports, Newsletters, Events, Announcements. Migrated 3,316 WordPress files: sorted by category (568 docs, 2,570 images) and renamed 627 documents with proper date formatting (e.g., "January 13, 2025 - Meeting Minutes.pdf"). Created scripts/sort-media.cjs and scripts/rename-files.cjs for automation. | Upload migrated documents to CMS and build remaining pages |
| 2026-05-18 (PM - Session 2) | ✅ Built complete document library system: (1) Updated TownshipHeader with "Reports" dropdown containing 8 document types, moved to global layout for all pages. (2) Created DocumentListingAdvanced component with left sidebar filters (search, year, type), grid/list view toggle, document count display. (3) Created all 9 document listing pages: agendas, meeting-minutes, annual-town-meetings, audited-financial-statements, cash-balance-reports, town-fund-levy-minutes, assessor-minutes, highway-commissioner, newsletters. (4) Fixed enum database errors in document queries (changed 'Annual Town Meeting' → 'annual', 'Audited Statement' → 'audited-statement', 'Cash Balance' → 'cash-balance'). (5) Refactored TownshipHeader structure: moved nav outside header wrapper for proper sticky positioning (sticky top-0 z-50). Fixed sidebar sticky positioning in DocumentListingAdvanced (sticky top-24 with proper wrapper). List view set as default. All document pages now use advanced listing interface. | Continue document migration OR build events/officials pages |
| 2026-05-19 (AM) | ✅ **RESOLVED 4-hour database authentication crisis:** Discovered system-level DATABASE_URI environment variable was overriding .env.local file with outdated Neon password. Root cause: System environment variables take precedence over .env files in Node.js. Tried 4 different passwords, deleted .next cache multiple times, killed all processes - none worked until discovering `env \| grep DATABASE` showed old credentials. Solution: `unset DATABASE_URI && npm run dev`. Updated CLAUDE.md with critical warning section about this issue. Removed debug logging from payload.config.ts. Reset Neon production branch password to npg_kfFNrVU6S3TE and updated .env.local. **Local dev environment now fully functional.** | Upload migrated documents to CMS OR build remaining pages |

---

## Current Session Goal
**Status:** Local development environment fixed — database connection working after resolving system environment variable conflict
**Next step:** Upload migrated documents to Payload CMS via admin panel OR build /documents main landing page OR build /events page

---

## How to Start Each Session
```
"Read CLAUDE.md. Tell me what was completed last session and what we are building today."
```
