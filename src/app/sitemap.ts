import { MetadataRoute } from 'next'

const BASE = 'https://www.cretetownship.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core pages
    { url: BASE,                                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/officials`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/events`,                          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    // Documents
    { url: `${BASE}/documents`,                       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/documents/agendas`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/documents/meeting-minutes`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/documents/annual-town-meetings`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/documents/audited-financial-statements`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/documents/cash-balance-reports`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/documents/town-fund-levy-minutes`,lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/documents/assessor-minutes`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/documents/highway-commissioner`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/documents/newsletters`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Offices
    { url: `${BASE}/assessor`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/assessor/hoa`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/assessor/will-county-phones`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/clerk`,                           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/clerk/polling-places`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/road-district`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/road-district/branch-pickup`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/road-district/environment`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/community-center`,                lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/community-center/application`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/community-center/survey`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    // Services
    { url: `${BASE}/services/foia`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/services/general-assistance`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/marriage-licenses`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/services/planning-commission`,    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // Legal / info
    { url: `${BASE}/sitemap`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/privacy-policy`,                  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/accessibility`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  return staticRoutes
}
