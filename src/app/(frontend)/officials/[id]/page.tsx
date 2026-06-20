import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayload({ config })

  const official = await payload.findByID({
    collection: 'officials',
    id,
  })

  if (!official) {
    return {
      title: 'Official Not Found | Crete Township',
    }
  }

  return {
    title: `${official.name} - ${official.title} | Crete Township`,
    description: official.bio || `Contact information for ${official.name}, ${official.title} at Crete Township.`,
  }
}

export default async function OfficialProfilePage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })

  let official
  try {
    official = await payload.findByID({
      collection: 'officials',
      id,
    })
  } catch (error) {
    notFound()
  }

  if (!official || official.status !== 'published') {
    notFound()
  }

  const departmentLabels: Record<string, string> = {
    board: 'Board of Trustees',
    assessor: "Assessor's Office",
    'road-district': 'Road & Bridge',
    clerk: 'Township Clerk',
    collector: 'Township Collector',
    'general-assistance': 'General Assistance',
  }

  return (
    <>
      <PageHero
        title={official.name}
        description={official.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Officials', href: '/officials' },
          { label: official.name, href: `/officials/${id}` },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          {/* Back Button */}
          <Link
            href="/officials"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Officials
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Photo & Contact */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {/* Photo */}
                  {official.photo?.url ? (
                    <div className="mb-6">
                      <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gray-200 border-4 border-gold">
                        <Image
                          src={official.photo.url}
                          alt={official.photo.alt || official.name}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="w-48 h-48 mx-auto rounded-full bg-navy flex items-center justify-center border-4 border-gold">
                        <span className="text-5xl font-display font-bold text-white">
                          {official.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Name & Title */}
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-display font-bold text-navy mb-2">
                      {official.name}
                    </h1>
                    <p className="text-base font-semibold text-gold mb-1">{official.title}</p>
                    <p className="text-sm text-gray-600">{departmentLabels[official.department]}</p>
                    {official.responsibilities && (
                      <p className="text-xs text-gray-500 italic mt-2">
                        {official.responsibilities}
                      </p>
                    )}
                  </div>

                  {/* Contact Info */}
                  {(official.phone || official.email) && (
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-navy text-sm mb-3">Contact Information</h3>
                      {official.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Phone</p>
                            <a
                              href={`tel:${official.phone}`}
                              className="text-navy hover:text-gold font-medium"
                            >
                              {official.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      {official.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Email</p>
                            <a
                              href={`mailto:${official.email}`}
                              className="text-navy hover:text-gold font-medium break-words text-sm"
                            >
                              {official.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Bio */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display font-bold text-navy mb-4">Biography</h2>
                  {official.bio ? (
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {official.bio}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No biography available.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
