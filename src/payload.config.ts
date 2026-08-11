import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { payloadTotp } from 'payload-totp'
import { mailgunAdapter } from './lib/mailgunAdapter'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Documents } from './collections/Documents'
import { BoardAgendas } from './collections/BoardAgendas'
import { MeetingMinutes } from './collections/MeetingMinutes'
import { FinancialReports } from './collections/FinancialReports'
import { AssessorDocuments } from './collections/AssessorDocuments'
import { RoadDistrictReports } from './collections/RoadDistrictReports'
import { Newsletters } from './collections/Newsletters'
import { Events } from './collections/Events'
import { Announcements } from './collections/Announcements'
import { Officials } from './collections/Officials'
import { FOIARequests } from './collections/FOIARequests'
import { GAInquiries } from './collections/GAInquiries'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { ContactTopics } from './collections/ContactTopics'
import { ContactInquiries } from './collections/ContactInquiries'
import { CommunityCenterSurveys } from './collections/CommunityCenterSurveys'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { AlertBanner } from './globals/AlertBanner'
import { SiteSettings } from './globals/SiteSettings'
import { SidebarWidgets } from './globals/SidebarWidgets'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  email: mailgunAdapter(),
  admin: {
    meta: {
      titleSuffix: '- Crete Township CMS',
      description: 'Content management system for Crete Township, Will County, Illinois.',
    },
    components: {
      graphics: {
        Logo: '@/components/Logo/Logo#Logo',
        Icon: '@/components/Logo/Logo#Icon',
      },
      beforeLogin: ['@/components/BeforeLogin/index#default'],
      // Custom dashboard for Crete Township
      beforeDashboard: ['@/components/CustomDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
    },
  }),
  collections: [
    // Township Document Collections
    BoardAgendas,
    MeetingMinutes,
    FinancialReports,
    AssessorDocuments,
    RoadDistrictReports,
    Newsletters,
    // Township Content Collections
    Events,
    Announcements,
    Officials,
    FOIARequests,
    GAInquiries,
    NewsletterSubscribers,
    ContactTopics,
    ContactInquiries,
    CommunityCenterSurveys,
    // System Collections
    Documents,
    Users,
    // Default Payload Collections (can remove if not needed)
    Pages,
    Posts,
    Media,
    Categories,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    AlertBanner,
    SiteSettings,
    SidebarWidgets,
    Header,
    Footer,
  ],
  plugins: [
    ...plugins,
    // Vercel Blob storage for all file uploads
    vercelBlobStorage({
      enabled: true,
      collections: {
        // PDF documents for township records
        documents: true,
        // Images for media library
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Public Vercel Blob store for township documents
      access: 'public',
    }),
    // TOTP multi-factor authentication for the admin panel.
    // MUST stay last in this array (it wraps all collections).
    // disableAccessWrapper keeps public REST/local API reads unaffected —
    // MFA gates the admin panel itself.
    payloadTotp({
      collection: 'users',
      forceSetup: true,
      disableAccessWrapper: true,
      forceWhiteBackgroundOnQrCode: true,
      totp: {
        issuer: 'Crete Township CMS',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
