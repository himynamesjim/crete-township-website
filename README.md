# Crete Township Website

Government website rebuild for Crete Township, Will County, Illinois.

## Monorepo Structure

```
crete-township-website/
├── apps/
│   ├── web/     # Next.js 14 App Router frontend
│   └── cms/     # Payload CMS 2.x backend
├── packages/
│   └── ui/      # Shared TypeScript types and utilities
└── turbo.json   # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL (for CMS)

### Installation

```bash
npm install
```

### Development

```bash
# Run both apps in development mode
npm run dev
```

Apps will be available at:
- Frontend: http://localhost:3000
- CMS Admin: http://localhost:3001/admin

### Environment Variables

#### apps/web/.env.local
```
NEXT_PUBLIC_CMS_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### apps/cms/.env
```
DATABASE_URI=postgresql://user:password@localhost:5432/crete-township
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
PORT=3001
```

## Project Documentation

See [CLAUDE.md](./CLAUDE.md) for complete project memory, design system, and technical specifications.
