import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Card } from '@/components/ui/card'
import { FileText, Calendar, DollarSign, File, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documents & Reports | Crete Township',
  description:
    'Access township documents including board agendas, meeting minutes, financial reports, and more.',
}

const documentCategories = [
  {
    title: 'Meeting Agendas',
    href: '/documents/agendas',
    description: 'Board meeting agendas and special meeting notices',
    icon: Calendar,
    color: 'text-navy',
  },
  {
    title: 'Meeting Minutes',
    href: '/documents/meeting-minutes',
    description: 'Official records of board meetings and proceedings',
    icon: FileText,
    color: 'text-navy',
  },
  {
    title: 'Annual Town Meetings',
    href: '/documents/annual-town-meetings',
    description: 'Annual town meeting documents and reports',
    icon: Calendar,
    color: 'text-navy',
  },
  {
    title: 'Assessor Minutes',
    href: '/documents/assessor-minutes',
    description: 'Board of Review and assessor meeting minutes',
    icon: FileText,
    color: 'text-navy',
  },
  {
    title: 'Audited Financial Statements',
    href: '/documents/audited-financial-statements',
    description: 'Annual audited financial reports and statements',
    icon: DollarSign,
    color: 'text-navy',
  },
  {
    title: 'Cash Balance Reports',
    href: '/documents/cash-balance-reports',
    description: 'Monthly cash balance and treasurer reports',
    icon: DollarSign,
    color: 'text-navy',
  },
  {
    title: 'Highway Commissioner Reports',
    href: '/documents/highway-commissioner',
    description: 'Road district reports and highway commissioner documents',
    icon: File,
    color: 'text-navy',
  },
  {
    title: 'Town Fund & Tax Levy Minutes',
    href: '/documents/town-fund-levy-minutes',
    description: 'Tax levy ordinances and town fund budget minutes',
    icon: DollarSign,
    color: 'text-navy',
  },
  {
    title: 'Newsletters',
    href: '/documents/newsletters',
    description: 'Township newsletters and community updates',
    icon: Newspaper,
    color: 'text-navy',
  },
]

export default function DocumentsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Documents & Reports"
        description="Access township documents, meeting minutes, financial reports, and public records"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Documents' }]}
      />

      {/* Document Categories Grid */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.href} href={category.href}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gold-pale rounded-lg flex-shrink-0 group-hover:bg-gold transition-colors duration-200">
                      <Icon className={`w-6 h-6 ${category.color} group-hover:text-white`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-display font-bold text-navy mb-4">
            Document Information
          </h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p className="mb-4">
              All documents are available in PDF format. You may need Adobe Acrobat Reader to view
              these documents. If you don't have Adobe Acrobat Reader installed on your computer,
              you can download it for free from the Adobe website.
            </p>
            <p className="mb-4">
              Documents are organized by category for easy access. Use the search and filter
              options on each category page to find specific documents by date, type, or keyword.
            </p>
            <p>
              If you need assistance locating a specific document or require a document that is not
              available online, please contact the Township Office at{' '}
              <a href="tel:708-672-8279" className="text-gold hover:text-gold-light">
                708-672-8279
              </a>{' '}
              or email{' '}
              <a
                href="mailto:administrator@cretetownship.com"
                className="text-gold hover:text-gold-light"
              >
                administrator@cretetownship.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
