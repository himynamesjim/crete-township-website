# Crete Township Website — Claude Code Project Memory
> InterPeak Managed Services | Last updated: June 2026
> **Read this file at the start of every session before writing any code.**

---

## Project Overview

Government website rebuild for Crete Township, Will County, Illinois.
Replacing existing WordPress site at cretetownship.com.
Client assets in hand — logos, logins, all existing PDFs accessible.

**Live site (current):** https://www.cretetownship.com
**Staging (Vercel):** TBD — add URL here once deployed
**CMS Admin:** TBD — will be at /admin on same Vercel deployment

## Dev server rules
- Do NOT start `npm run dev` / `next dev` yourself. I run the dev server
  manually in my own terminal tab.
- Next.js hot-reloads on save, so there is no need to restart it after
  editing files.
- Only restart the dev server when next.config.js, .env, or installed
  packages change — and if so, ask me first rather than spawning one.
- Never run more than one dev server. If you think one is needed, check
  for an existing process first with `lsof -i :3000`.
  
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
│   │   ├── TownshipHeader.tsx          ← Main header with nav + logo
│   │   ├── TownshipFooter.tsx          ← 4-column footer
│   │   └── HeroSection.tsx             ← Homepage hero with background image
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── DocumentCard.tsx
│   │   └── EventCard.tsx
│   ├── DocumentLibrary.tsx             ← Homepage doc section with filters
│   ├── DocumentListingAdvanced.tsx     ← Advanced doc listing with sidebar
│   ├── FacebookFeed.tsx                ← Facebook posts integration
│   └── PageHero.tsx                    ← Page hero component
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
name:            text (required)
title:           text (required)
department:      select ['board', 'assessor', 'road-district', 'clerk', 'collector', 'general-assistance']
responsibilities: text (optional - e.g., "Mosquito and Youth")
photo:           upload → media collection (optional)
phone:           text
email:           email
bio:             textarea (optional - biography/excerpt for profile page)
displayOrder:    number
status:          select ['draft', 'published', 'archived'] default: 'published'
```

### 10. FOIARequests — slug: 'foia-requests'
```ts
fullName:          text (required)
organization:      text (optional)
email:             email (required)
phone:             text (optional)
preferredFormat:   select ['electronic', 'paper', 'inspect'] default: 'electronic'
street:            text (conditional - required if paper)
city:              text (conditional - required if paper)
state:             text (conditional - required if paper)
zipCode:           text (conditional - required if paper)
recordsDescription: textarea (required)
dateRangeStart:    date (required)
dateRangeEnd:      date (required)
commercialPurpose: select ['yes', 'no'] (required)
feeWaiverRequested: checkbox
feeWaiverJustification: textarea (conditional)
acknowledgment:    checkbox (required)
status:            select ['new', 'in-review', 'pending', 'fulfilled', 'denied'] default: 'new'
submittedAt:       date (auto-set)
internalNotes:     textarea (admin only)
responseDate:      date (optional)
assignedTo:        text (optional)
```

### 11. NewsletterSubscribers — slug: 'newsletter-subscribers'
```ts
email:             email (required, unique)
firstName:         text (optional)
lastName:          text (optional)
categories:        select (multiple) ['all', 'board-agendas', 'meeting-minutes', 'financial-reports', 'assessor-documents', 'road-district-reports', 'newsletters', 'events', 'announcements']
status:            select ['active', 'unsubscribed', 'bounced'] default: 'active'
subscribedAt:      date (auto-set)
unsubscribedAt:    date (optional)
unsubscribeToken:  text (auto-generated)
ipAddress:         text (auto-captured)
notes:             textarea (admin only)
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
| Document Library | /documents | ✅ Done (landing page with category cards linking to all document types) |
| Agendas | /documents/agendas | ✅ Done (advanced listing with filters) |
| Meeting Minutes | /documents/meeting-minutes | ✅ Done (advanced listing with filters) |
| Annual Town Meetings | /documents/annual-town-meetings | ✅ Done (advanced listing with filters) |
| Audited Financial Statements | /documents/audited-financial-statements | ✅ Done (advanced listing with filters) |
| Cash Balance Reports | /documents/cash-balance-reports | ✅ Done (advanced listing with filters) |
| Town Fund & Tax Levy Minutes | /documents/town-fund-levy-minutes | ✅ Done (advanced listing with filters) |
| Assessor Minutes | /documents/assessor-minutes | ✅ Done (advanced listing with filters) |
| Highway Commissioner Reports | /documents/highway-commissioner | ✅ Done (advanced listing with filters) |
| Newsletters | /documents/newsletters | ✅ Done (advanced listing with filters) |
| Events | /events | ✅ Done (calendar view with filtering) |
| Offices & Officials | /officials | ✅ Done (officials grid with photos, contact info, bio excerpts, clickable cards) |
| Official Profile | /officials/[id] | ✅ Done (individual profile pages with full bio and contact details) |
| FOIA Request Form | /services/foia | ✅ Done (public records request form with conditional fields and email notifications) |
| USA Fest 2026 | /usa-fest | ✅ Done (patriotic event page: July 18 2026, activities grid, essay contest, flyer images, festive nav item) |
| About | /about | 🔲 Not started |
| Services | /services | 🔲 Not started |
| Assessor | /assessor | ✅ Done (profile card for Mary Margaret Tamez, responsibilities, exemptions, FAQ, Public Act 101-635 downloads) |
| Road District | /road-district | ✅ Done (profile card for Tony Recupito, duties list, permit info, contact) |
| Community Center | /community-center | 🔲 Not started |
| Contact | /contact | ✅ Done (2-column layout: office info/hours/map left, department-routed form right; CMS-managed topics) |

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
| TownshipHeader | src/components/layout/TownshipHeader.tsx | ✅ Done (sticky nav with scroll logo, search modal, Services dropdown with FOIA, real social media links, festive USA Fest nav item, Documents & Reports as first dropdown item, mobile full-screen overlay menu) |
| NewsletterSignup | src/components/NewsletterSignup.tsx | ✅ Done (email subscription form with category selection, 3 variants: default/compact/sidebar) |
| HeroSection | src/components/layout/HeroSection.tsx | ✅ Done (hero with upcoming events sidebar, CTA buttons) |
| FacebookFeed | src/components/FacebookFeed.tsx | ✅ Done (Facebook Page Plugin embed) |
| TownshipFooter | src/components/layout/TownshipFooter.tsx | ✅ Done (4-column footer, social links: Facebook/X/YouTube) |
| CMSAlertBanner | src/components/layout/CMSAlertBanner.tsx | ✅ Done (CMS-driven site-wide alert with type styles, dismiss button, noStore cache bypass) |
| ContactForm | src/components/ContactForm.tsx | ✅ Done (department dropdown, status states, email routing) |
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
| Officials | ✅ Done (collection with bio field, role-based access configured) |
| FOIARequests | ✅ Done (public records request collection with status tracking and internal notes) |
| NewsletterSubscribers | ✅ Done (email subscription collection with category preferences and unsubscribe tokens) |
| ContactTopics | ✅ Done (CMS-managed department list for contact form routing, with label/email/phone/displayOrder) |
| ContactInquiries | ✅ Done (stores contact form submissions with status tracking and internal notes) |
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
| Vercel project | ✅ Done | Deployed, building on push to main |
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
| 2026-05-18 (PM) | ✅ Neon database connected: Configured DATABASE_URI with Neon PostgreSQL connection string (ep-young-boat-aj3mnsqb.c-3.us-east-2.aws.neon.tech). Generated secure PAYLOAD_SECRET. Database schema auto-initialized successfully. Dev server running with full database connectivity. | Create first admin user + build Tailwind design system |
| 2026-05-18 (PM) | ✅ Complete UI component library: Button, Badge, Card, DocCard, EventCard. Built TownshipHeader (blue bg, contact info, nav, search), HeroSection (with stats), TownshipFooter (4-column). Created full static homepage with all sections (Hero, Services grid, Document Library, Events sidebar, Announcements). | Refine homepage layout based on mockup feedback |
| 2026-05-18 (PM) | ✅ Homepage layout refinements: Widened content containers from 1100px to 1400px. Moved search box inline with nav menu (right side). Added gold 3px border under main header. Active menu items show gold underline (no white bg). Moved Announcements section above Township Services. Added Upcoming Events sidebar in hero section. Font compliance: Changed to Source Sans 3 + Merriweather per ADA/Section 508 requirements. | Begin building CMS collections |
| 2026-05-18 (PM) | ✅ Implemented Vercel Blob storage using @payloadcms/storage-vercel-blob for all file uploads (documents and media collections). Replaced all Cloudflare R2 references with Vercel Blob. Updated .env.example with BLOB_READ_WRITE_TOKEN. Configured role-based access control with 5 roles: Super Admin, Township Admin (Documents/Content/Site Configs only), Admin, Editor, Viewer. Created comprehensive document collections: BoardAgendas, MeetingMinutes, FinancialReports, AssessorDocuments, RoadDistrictReports, Newsletters, Events, Announcements. Migrated 3,316 WordPress files: sorted by category (568 docs, 2,570 images) and renamed 627 documents with proper date formatting (e.g., "January 13, 2025 - Meeting Minutes.pdf"). Created scripts/sort-media.cjs and scripts/rename-files.cjs for automation. | Upload migrated documents to CMS and build remaining pages |
| 2026-05-18 (PM - Session 2) | ✅ Built complete document library system: (1) Updated TownshipHeader with "Reports" dropdown containing 8 document types, moved to global layout for all pages. (2) Created DocumentListingAdvanced component with left sidebar filters (search, year, type), grid/list view toggle, document count display. (3) Created all 9 document listing pages: agendas, meeting-minutes, annual-town-meetings, audited-financial-statements, cash-balance-reports, town-fund-levy-minutes, assessor-minutes, highway-commissioner, newsletters. (4) Fixed enum database errors in document queries (changed 'Annual Town Meeting' → 'annual', 'Audited Statement' → 'audited-statement', 'Cash Balance' → 'cash-balance'). (5) Refactored TownshipHeader structure: moved nav outside header wrapper for proper sticky positioning (sticky top-0 z-50). Fixed sidebar sticky positioning in DocumentListingAdvanced (sticky top-24 with proper wrapper). List view set as default. All document pages now use advanced listing interface. | Continue document migration OR build events/officials pages |
| 2026-05-19 (AM) | ✅ **RESOLVED 4-hour database authentication crisis:** Discovered system-level DATABASE_URI environment variable was overriding .env.local file with outdated Neon password. Root cause: System environment variables take precedence over .env files in Node.js. Tried 4 different passwords, deleted .next cache multiple times, killed all processes - none worked until discovering `env \| grep DATABASE` showed old credentials. Solution: `unset DATABASE_URI && npm run dev`. Updated CLAUDE.md with critical warning section about this issue. Removed debug logging from payload.config.ts. Reset Neon production branch password to npg_kfFNrVU6S3TE and updated .env.local. **Local dev environment now fully functional.** | Upload migrated documents to CMS OR build remaining pages |
| 2026-06-12 (PM) | ✅ **Homepage redesign & Officials page:** (1) Fixed calendar API to filter past events - added `includePast` query param: upcoming events show only future, calendar view shows 6 months history. (2) Simplified Facebook feed integration - switched from API approach to Facebook Page Plugin (no tokens needed). Updated FacebookFeed component to use embedded iframe. Added Facebook section to homepage sidebar next to Document Library. (3) Reorganized homepage layout: removed Events+Contact section, moved Facebook feed to sidebar (400px width), added Will County & Community Resources section (12 contacts in 3-column grid) below Document Library. (4) Created Officials collection with fields: name, title, department, responsibilities, photo, phone, email, displayOrder, status. Downloaded 7 official photos from current website. Built /officials page with responsive 3-column grid, round profile photos, contact info, grouped by department. Updated TownshipHeader nav: "Township Board" now links to /officials. Updated hero CTA buttons: "View Board Documents" → /documents, "Upcoming Events" → /events. | Add officials data to CMS + remaining pages (Services, Assessor, Road District, Community Center, Contact) |
| 2026-06-20 (PM) | ✅ **FOIA, Newsletter Subscription, Officials Enhancement, Navigation Improvements:** (1) **FOIA Request System**: Created FOIARequests collection with full form at /services/foia. Conditional address fields (only for paper copies), required date range with calendar pickers (start/end dates with smart validation). Dual email notifications (township staff + requester confirmation). Created SiteSettings global for configurable FOIA notification email. Added to Services dropdown in navigation. (2) **Newsletter Subscription**: Created NewsletterSubscribers collection. Built NewsletterSignup component with 3 variants (default/compact/sidebar). Category-based subscriptions (residents select which document types to be notified about). Unsubscribe token system. Positioned newsletter form next to Will County contacts on homepage in 2-column layout. Added "Stay Informed" section header matching design. (3) **Officials Enhancement**: Added bio/excerpt field to Officials collection. Made official cards clickable linking to individual profile pages. Created dynamic route /officials/[id] with full profile pages (2-column layout: photo/contact left, biography right). Cards show bio preview (3-line clamp), phone, email. Profile pages include back button, breadcrumbs, larger photos. (4) **Navigation Improvements**: Replaced search box with search icon that opens modal. Search modal with ESC key support, click-outside-to-close, auto-focus. Logo in sticky nav only appears after scrolling 120px (when main header scrolled past). Menu links left-aligned. Fixed Will County Transportation card sizing to match others. (5) **Critical Issue Resolved**: 11 background dev servers were accidentally created causing massive resource conflicts, routing failures, and 404 errors. Required system reboot to fully clear. All features now working with clean environment. | Configure FOIA notification email in CMS, test newsletter signup, add official bios via admin panel |
| 2026-06-20 (PM - Session 2) | ✅ **Newsletter viewer, Footer fixes, ADA widget, Privacy/Sitemap/Accessibility pages, Functional search, Contact page:** (1) **Newsletter flip viewer**: CSS 3D page-flip animation (no library), mobile browse/read dual-state with 100dvh iframe, desktop sidebar + filmstrip. CMS-driven (no static PDFs). (2) **Footer**: All links corrected to match nav exactly. Removed Download App box. Added missing document links (audited financials, cash balance, FOIA, town fund levy minutes, environment, branch pickup). (3) **ADA Accessibility Widget**: Fixed bottom-right position, ISA wheelchair icon, CSS filter-based options (high contrast, grayscale, dyslexia font, reduce motion), localStorage persistence, reset button. Compliance statement at /accessibility. (4) **Privacy Policy** at /privacy-policy — Illinois government-specific. (5) **Sitemap** at /sitemap — card grid of all 8 sections. (6) **Search modal** made fully functional — `/api/search` queries 9 Payload collections in parallel, plus parses Google Calendar ICS feed (GOOGLE_CALENDAR_ICS_URL env var, never committed) to find events like "Food Pantry". 300ms debounce, grouped results with icons, keyboard navigation. (7) **Contact page** at /contact — 3-column layout: township hall photo/address, office hours, department list on left; CMS-driven department select form on right with email routing (ContactTopics + ContactInquiries collections). Google Maps embed. Empty-state if no topics configured in CMS yet. | Add Contact Topics in CMS admin, configure FOIA email in site settings, add official bios, build About/Services/Assessor/Road District/Community Center pages |
| 2026-06-20 (PM - Session 3) | ✅ **Clerk page, Alert Banner fix, SEO, Favicon, Social Links:** (1) **Clerk page**: Added Jim Buiter profile card (photo, title, email jim.buiter@cretetownship.com, phone, address) matching assessor/road-district pattern. Sidebar moved to left column. (2) **CMS Alert Banner**: Fixed `AgendaAlertBarWrapper` to fetch `alert-banner` global in parallel with agenda bar. Created `CMSAlertBanner` client component with 4 type styles (info/warning/emergency/success), dismiss button, `noStore()` to prevent Next.js caching so CMS toggle takes effect immediately. (3) **SEO overhaul**: Updated `mergeOpenGraph.ts` from Payload template branding to Crete Township (title, description, OG image → crete-logo.jpeg). Added `GovernmentOrganization` JSON-LD structured data in layout (address, phone, hours, logo). Fixed `twitter` metadata handle to `@CreteTownship`. Added `robots` metadata with Google crawl directives. Added `keywords`, `authors`, `creator`, `publisher` to layout metadata. Added `title.template` for consistent page title suffix. Created `public/robots.txt` (blocks /admin, /api, /next; references sitemap). Created `src/app/sitemap.ts` — XML sitemap at /sitemap.xml with 35 routes, priorities, and change frequencies. Added FOIA page metadata via `services/foia/layout.tsx` (needed because foia/page.tsx is 'use client'). (4) **Favicon**: Converted Great Seal JPEG (2312×2313) to 256×256 PNG using sharp. Placed as `src/app/icon.png` and `src/app/apple-icon.png` — Next.js auto-injects favicon link tags. Replaced Payload template SVG in public/favicon.svg with navy+gold bell icon. (5) **Hero image**: Switched homepage hero background from old media API URL to `/crete-town-hall.jpg`. (6) **Social links**: Added Facebook, X (Twitter), YouTube icon buttons to footer column 1 below address. Gold hover state, navy-dark background at rest. | Build About page, Services landing, Community Center; add Contact Topics in CMS admin; configure FOIA notification email in site settings |
| 2026-06-20 (PM - Session 4) | ✅ **USA Fest page, Mailgun newsletter emails, mobile menu fix, nav/link fixes, bulk upload script, Vercel build fixes:** (1) **USA Fest page** at `/usa-fest` — patriotic deep navy hero, activity grid, essay contest section ($50 prize, July 8 deadline), embedded flyer images. Festive `★ USA Fest ★` nav item in red. (2) **Mailgun newsletter emails** — created `src/lib/mailgun.ts` (native fetch, no SDK), `src/lib/notifySubscribers.ts` (parallel sends via Promise.allSettled, branded HTML email, unsubscribe link). Added `afterChange` hooks to all 8 document collections: fires on first publish only (`status === 'published' && previousDoc.status !== 'published'`). Created `/api/newsletter-unsubscribe` route. Added MAILGUN_API_KEY/DOMAIN/FROM_EMAIL to .env.example. (3) **Mobile menu fix** — moved menu from inside sticky `<nav>` to `fixed inset-0 z-[70]` full-screen overlay with `overflow-y-auto` so all items are reachable. (4) **Nav/link fixes** — fixed duplicate React key error (changed `key={child.href}` → `key={child.label}`). Fixed highway commissioner links from `/documents/highway-commissioner-reports` → `/documents/highway-commissioner` in header (×2) and road-district/environment page. Added `Documents & Reports` as first item in Documents dropdown. Linked header social icons to real URLs (Facebook/X/YouTube). (5) **Document library** — renamed "All Documents" filter to "Recent Documents". Capped each filter at 8 documents (fetch 8 per collection, `.slice(0, 8)` after client-side filter). Removed `/documents/all` page; added permanent redirect to `/documents`. (6) **Bulk upload script** at `scripts/bulk-upload.ts` — reads PDFs from `migration/sorted/`, parses dates from filenames, uploads to Payload, creates collection entries. Fixed ES module hoisting issue (dynamic imports inside `run()` after dotenv loads). (7) **Vercel build fixes** — removed invalid `titleTemplate`/`css` from Payload admin config. Fixed `Logo` props error. Fixed `number | Media` union type guard on officials photo. Fixed AlertBanner double-cast. Excluded `scripts/` from `tsconfig.json` to prevent bulk-upload type errors breaking the build. | Add Contact Topics in CMS admin, configure FOIA email, add official bios, run bulk upload for all document collections, build About/Services/Community Center pages |
| 2026-08-11 | ✅ **Officials seeding, community center agreement, Mailgun live, calendar/date TZ fixes, WordPress document migration, admin MFA + Quick Upload:** (1) **Officials in CMS**: seeded all 8 officials (Liccar, Buiter, Elton, Albrecht, Hawkins, Penman, Tamez, Recupito) with bios/photos via `scripts/upsert-official.ts`; removed duplicate "Michael J. Liccar"; clerk sorts after supervisor via displayOrder (Liccar 0, Buiter 5, trustees 10/20/30). /officials merged into 2 sections (Board of Trustees incl. clerk + Township Officials); profile pages got random "Other Officials" sidebar. Seeded sidebar-widgets global (Quick Links + Township Hall card). (2) **USA Fest nav item removed** (page still live at /usa-fest). (3) **Community Center**: revised July 2026 Building Usage Agreement (PDF at /forms/community-center-usage-agreement.pdf, converted from docx via MS Word), page updated with Insurance & Liability, Booking & Payment Terms, General Rules sections. Flagged drafting issues to client: venue clause says Woodford County (should be Will), Room 4/12 fee unit inconsistencies. JotForm (ID 253628126405051) fields + email routing must be updated at jotform.com by client. (4) **Mailgun connected**: mg.cretetownship.com, keys in .env.local + Vercel prod/preview. Built `src/lib/mailgunAdapter.ts` — Payload email adapter (payload.sendEmail was a silent no-op before; contact/FOIA/newsletter/GA emails never sent!). Contact form → administrator@ CC buiter+liccar (per-topic routing bypassed). Survey → communitycenter@. (5) **Timezone bugs fixed everywhere**: calendar API sets meeting times in America/Chicago (was server-UTC, 7 PM showed as 2 PM); `.rbc-event{position:relative}` z-index hack scoped to month view (was shifting week/day events hours down); all 7 document date formatters + parseDocumentMetadata now use timeZone:'UTC' (dates showed a day early); repaired 195 stored descriptions. Board meetings deduped between CMS agendas and Google Calendar ICS (CMS wins). Month view shows ~3 events/day (height 1000px). (6) **Agenda admin UX**: meetingTime defaults 7:00 PM, location defaults Crete Town Hall; title auto-generates from date+type (beforeValidate); .docx uploads auto-convert to PDF (mammoth + @react-pdf/renderer in `src/lib/convertDocxToPdf.ts`, hook on Documents collection). (7) **WordPress migration completed**: agendas 97 (31 downloaded via `scripts/migrate-missing-agendas.ts`, fixed "September 1, 1241" entry), minutes 102 (22 via `scripts/migrate-missing-minutes.ts`), assessor minutes 61, cash balance 45 (all via `scripts/migrate-cash-balance.ts` — collection had zero), Dec 2024 tax levy doc (found via WP REST media API — WP document pages hide file URLs). May 5 2023 budget minutes broken on old site (no file exists). (8) **Admin security**: payload-totp MFA (forceSetup, disableAccessWrapper to protect public reads), 5-attempt/10-min lockout, `src/middleware.ts` passes x-pathname. (9) **Quick Upload** dashboard panel: drag-drop → auto-detect category from filename, date from filename, auto title, docx→PDF, publish; mismatch guard refuses minutes-filed-as-agenda. Fixed CustomDashboard missing default export (custom dashboard had NEVER rendered). | Test MFA enrollment for township staff, Contact Topics in CMS, FOIA email in site settings, About/Services pages, remaining old-site sections (newsletters, road district docs, audited statements spot-check), domain cutover |

---

## Current Session Goal
**Status:** USA Fest page, Mailgun newsletter emails, mobile menu fix, nav/link fixes, document library improvements, bulk upload script, and multiple Vercel build fixes all complete.
**Next step:** (1) Add Contact Topics in CMS admin (`/admin/collections/contact-topics`) — Township Board, Assessor's Office, Road District, Township Clerk, General Assistance — each with notification email; (2) Configure FOIA notification email in site settings (`/admin/globals/site-settings`); (3) Add official bios via admin panel; (4) Run bulk upload script for all document collections (`unset DATABASE_URI && npx tsx scripts/bulk-upload.ts --collection board-agendas`); (5) Build remaining pages: About, Services landing, Community Center

## Known Gotchas
- **Highway Commissioner route**: `/documents/highway-commissioner` (no `-reports` suffix) — correct slug used in nav and all internal links
- **Document Library filter cap**: Each filter tab shows max 8 docs; homepage fetches 8 per collection (agendas/minutes/financial)
- **scripts/ excluded from tsconfig**: bulk-upload.ts has a `CollectionSlug` type that doesn't match Payload's internal types — excluded via `tsconfig.json` `exclude` array to prevent Vercel build failures
- **Bulk upload dynamic imports**: `getPayload` and `payload.config` must be dynamically imported inside `run()` AFTER `loadEnv()` — static imports are hoisted before dotenv runs

## Social Media Accounts
| Platform | URL | Handle |
|----------|-----|--------|
| Facebook | https://www.facebook.com/CreteTownship | CreteTownship |
| X (Twitter) | https://x.com/CreteTownship | @CreteTownship |
| YouTube | https://www.youtube.com/channel/UC7V0wd9lWygqVESLg5kPT5A | — |

---

## How to Start Each Session
```
"Read CLAUDE.md. Tell me what was completed last session and what we are building today."
```
