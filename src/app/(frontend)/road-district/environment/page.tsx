import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, FileText, AlertTriangle, Leaf, Droplets, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

// Revalidate every 5 minutes so CMS changes appear without a redeploy,
// while one render serves all traffic in between (ISR)
export const revalidate = 300


export const metadata: Metadata = {
  title: 'Environment & Storm Sewer | Crete Township Road District',
  description:
    'Crete Township Road District storm sewer regulations, NPDES storm water documents, and environmental resources.',
}

// Map collection documentType values to display groups
const ENV_TYPES = [
  'storm-water-pollution',
  'storm-water-runoff',
  'maintaining-septic-system',
  'npdes-noi',
  'npdes-storm-water-management',
  'npdes-annual-facility-report',
  'environmental-justice',
]

const TYPE_LABELS: Record<string, string> = {
  'storm-water-pollution': 'Storm Water Pollution',
  'storm-water-runoff': 'Storm Water Runoff',
  'maintaining-septic-system': 'Maintaining Your Septic System',
  'npdes-noi': 'NOI',
  'npdes-storm-water-management': 'Storm Water Management',
  'npdes-annual-facility-report': 'Annual Facility Report',
  'environmental-justice': 'Illinois EPA EJ Map',
}

interface DocRow {
  id: string | number
  title: string
  date: string
  documentType: string
  file: { url: string; filename?: string }
}

async function getEnvironmentalDocs(): Promise<DocRow[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'road-district-reports',
      where: {
        and: [
          { status: { equals: 'published' } },
          { documentType: { in: ENV_TYPES } },
        ],
      },
      sort: '-date',
      limit: 200,
      depth: 1,
    })
    return (result.docs as unknown as DocRow[]).filter(
      (d) => d.file?.url,
    )
  } catch {
    return []
  }
}

function DocLink({ doc }: { doc: DocRow }) {
  return (
    <a
      href={doc.file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gold hover:bg-gold-pale transition-colors group"
    >
      <FileText className="w-4 h-4 text-gold flex-shrink-0" />
      <span className="text-sm text-gray-700 group-hover:text-navy flex-1">{doc.title}</span>
      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gold flex-shrink-0" />
    </a>
  )
}

function DocSection({
  heading,
  types,
  docs,
  icon: Icon,
}: {
  heading: string
  types: string[]
  docs: DocRow[]
  icon: React.ElementType
}) {
  const filtered = docs.filter((d) => types.includes(d.documentType))

  // Group by type within the section so sub-types get their own label
  const groups = types.reduce<Record<string, DocRow[]>>((acc, t) => {
    const rows = filtered.filter((d) => d.documentType === t)
    if (rows.length) acc[t] = rows
    return acc
  }, {})

  const hasMultipleTypes = Object.keys(groups).length > 1

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-gold flex-shrink-0" />
        <h3 className="font-display text-lg font-bold text-navy">{heading}</h3>
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 italic pl-8">
          No documents published yet — check back soon.
        </p>
      ) : (
        <div className="pl-8 space-y-4">
          {hasMultipleTypes
            ? Object.entries(groups).map(([type, rows]) => (
                <div key={type}>
                  <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">
                    {TYPE_LABELS[type] ?? type}
                  </p>
                  <div className="space-y-2">
                    {rows.map((d) => (
                      <DocLink key={d.id} doc={d} />
                    ))}
                  </div>
                </div>
              ))
            : filtered.map((d) => <DocLink key={d.id} doc={d} />)}
        </div>
      )}
    </div>
  )
}

export default async function EnvironmentPage() {
  const docs = await getEnvironmentalDocs()

  return (
    <>
      <PageHero
        title="Environment & Storm Sewer System"
        description="Protect our environment and our storm sewer system"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Road District', href: '/road-district' },
          { label: 'Environment & Storm Sewer', href: '/road-district/environment' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Intro / rules ── */}
        <section className="pt-8 pb-12 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Main content — 2/3 */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Protect Our Environment and Our Storm Sewer System
                </h2>
                <div className="w-16 h-[3px] bg-gold mb-6" />

                <p className="text-gray-700 leading-relaxed mb-4">
                  Crete Township Road District needs your help to ensure the storm sewer systems work to
                  promote the safety of the community and to help our environment.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Township Road District has implemented regulations as required by the{' '}
                  <strong className="text-navy">Environmental Protection Agency (EPA)</strong>. The goal
                  is to improve the water quality of our local ponds and creeks.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Storm water that is collected in our storm water system does{' '}
                  <strong className="text-navy">not</strong> get processed or cleaned (as water in the
                  sanitary sewer would) before it enters our ponds or creeks. Please help our Community
                  continue to enjoy our local water resources by following these simple rules:
                </p>

                {/* Rules */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 text-sm mb-1">Do Not Dump Hazardous Waste</p>
                      <p className="text-sm text-red-700">
                        Do not dump hazardous waste into the storm sewer system — paint, oil, household
                        cleaning supplies, etc.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 text-sm mb-1">Do Not Put Garbage in the Storm Sewer</p>
                      <p className="text-sm text-red-700">
                        Do not put other garbage in the storm sewer system — leaves, grass clippings, etc.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Report contact */}
                <div className="bg-gold-pale border border-gold/30 rounded-lg p-5 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy mb-1">
                      Questions or Reporting an Issue?
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      For more information, or to report an instance about the storm sewer system and
                      environmental protection, please contact the Highway Commissioner.
                    </p>
                    <a
                      href="tel:7086727732"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      708-672-7732
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar — 1/3 */}
              <div className="space-y-5">
                {/* Tony contact card */}
                <Card>
                  <div className="bg-navy-dark px-5 py-4 rounded-t-lg">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wide">Highway Commissioner</p>
                    <p className="font-display text-base font-bold text-white mt-1">Tony Recupito</p>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <a
                      href="tel:7086727732"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-672-7732
                    </a>
                    <a
                      href="mailto:arecupito@cretetownship.com"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      arecupito@cretetownship.com
                    </a>
                  </CardContent>
                </Card>

                {/* Quick links */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Road District</p>
                    <div className="space-y-2">
                      <a
                        href="/road-district"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        Road District Home
                      </a>
                      <a
                        href="/documents/highway-commissioner"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        Highway Commissioner Reports
                      </a>
                      <a
                        href="https://www.oxcartpermits.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        Overweight / Over-Dimension Permits
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* ── Dynamic document sections ── */}
        <section className="py-14 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Additional Information</h2>
            <div className="w-16 h-[3px] bg-gold mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Left: General info docs */}
              <Card>
                <CardContent className="p-6 space-y-8">
                  <DocSection
                    heading="Storm Water Pollution"
                    types={['storm-water-pollution']}
                    docs={docs}
                    icon={Droplets}
                  />
                  <DocSection
                    heading="Storm Water Runoff"
                    types={['storm-water-runoff']}
                    docs={docs}
                    icon={Droplets}
                  />
                  <DocSection
                    heading="Maintaining Your Septic System"
                    types={['maintaining-septic-system']}
                    docs={docs}
                    icon={Leaf}
                  />
                </CardContent>
              </Card>

              {/* Right: NPDES + Environmental Justice */}
              <div className="space-y-6">
                <Card>
                  <div className="bg-navy px-5 py-4 rounded-t-lg">
                    <h3 className="font-display text-sm font-bold text-white">NPDES Storm Water</h3>
                  </div>
                  <CardContent className="p-6 space-y-8">
                    <DocSection
                      heading="Notice of Intent (NOI)"
                      types={['npdes-noi']}
                      docs={docs}
                      icon={FileText}
                    />
                    <DocSection
                      heading="Storm Water Management"
                      types={['npdes-storm-water-management']}
                      docs={docs}
                      icon={FileText}
                    />
                    <DocSection
                      heading="Annual Facility Reports"
                      types={['npdes-annual-facility-report']}
                      docs={docs}
                      icon={FileText}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <div className="bg-navy px-5 py-4 rounded-t-lg">
                    <h3 className="font-display text-sm font-bold text-white">Environmental Justice</h3>
                  </div>
                  <CardContent className="p-6">
                    <DocSection
                      heading="Illinois EPA EJ Map"
                      types={['environmental-justice']}
                      docs={docs}
                      icon={Leaf}
                    />
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  )
}
