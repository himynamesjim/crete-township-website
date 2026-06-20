import React from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, FileText, ExternalLink, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Township Assessor | Crete Township',
  description:
    'The Crete Township Assessor uniformly assesses properties at 33⅓% of market value. Learn about property exemptions, assessed values, tax rates, and your rights as a property owner.',
}

const faqs = [
  {
    q: 'What is market value?',
    a: "Finding the market value of your property involves discovering the most likely price that unrelated individuals — both acting with full knowledge of the facts and in their best interest — would pay for it in its present condition. This is known as an 'arm's length transaction.' The assessor must estimate this value for every property each year, sold or unsold, because market values are constantly changing.",
  },
  {
    q: 'Why have property taxes?',
    a: "The theory behind property tax is that members of the community who benefit from good schools, fire and police protection, and other public services absorb their fair share of the cost — in direct proportion to the value of their individual properties. This is the concept of 'Ad Valorem,' or according to value. Property tax is a more stable revenue source than sales and income taxes because it does not fluctuate during recessions.",
  },
  {
    q: 'Why do assessed values change from year to year?',
    a: 'When market value changes, so does the assessed value. For instance, adding a garage would increase your assessed value; a property in poor condition would see a decrease. The assessor does not create value — people establish value through marketplace transactions. The assessor studies those transactions and appraises property accordingly.',
  },
  {
    q: 'What is the relationship between assessed value and tax rate?',
    a: "The assessor's primary responsibility is to find the fair market value of your property so that you pay only your fair share of taxes. The amount you pay is determined by a tax rate applied to your property's assessed value. That tax rate is set by all taxing agencies — city, county, school districts, etc. — based on the services they provide.",
  },
  {
    q: 'What else does the assessor do?',
    a: "The assessor's office also tracks ownership changes, maintains maps of parcel boundaries, keeps building and property descriptions up to date, tracks exemption eligibility, and analyzes trends in sales prices, construction costs, and rents to estimate the value of all assessable property.",
  },
  {
    q: 'What are your rights and responsibilities?',
    a: "If you believe the value of your property differs from the assessor's assessment, visit the office to discuss it. Staff will explain the appraisal and how to appeal if an agreement cannot be reached. If after talking with the local assessor you still feel your assessment is too high, you have the right to formally appeal — a legal process involving the property owner, the Board of Review, and often the Township Assessor.",
  },
]

export default function AssessorPage() {
  return (
    <>
      <PageHero
        title="Township Assessor"
        description="Uniform property assessments for Crete Township, Will County, Illinois"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Assessor', href: '/assessor' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Assessor profile + Public Act ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Assessor card */}
              <div>
                <Card className="overflow-hidden">
                  <div className="bg-navy-dark px-6 pt-8 pb-0 flex flex-col items-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gold shadow-lg mb-4">
                      <Image
                        src="/assets/officials/tamez.jpeg"
                        alt="Mary Margaret Tamez, Township Assessor"
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-display text-xl font-bold text-white text-center leading-tight">
                      Mary Margaret Tamez
                    </h2>
                    <p className="text-gold text-sm font-semibold mt-1 mb-6">Township Assessor</p>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <a
                      href="mailto:mary@creteassessor.com"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      mary@creteassessor.com
                    </a>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">
                        Assessor's Office
                      </p>
                      <p className="text-sm text-gray-700">1367 Wood Street<br />Crete, IL 60417</p>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <a
                        href="https://www.willcountysoa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Will County Supervisor of Assessments
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Forms &amp; property info</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Public Act downloads */}
                <Card className="mt-5">
                  <CardContent className="p-6">
                    <h3 className="font-display text-base font-bold text-navy mb-1">Public Act 101-635</h3>
                    <p className="text-xs text-gray-500 mb-4">Official documents</p>
                    <div className="space-y-2">
                      <a
                        href="/forms/brochure_PUBLIC_ACT_101-635.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors bg-gray-50 hover:bg-gold-pale border border-gray-200 rounded-lg px-3 py-2.5"
                      >
                        <FileText className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>Brochure – Public Act 101-635</span>
                      </a>
                      <a
                        href="/forms/press_release_PUBLIC_ACT_101-635.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors bg-gray-50 hover:bg-gold-pale border border-gray-200 rounded-lg px-3 py-2.5"
                      >
                        <FileText className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>Press Release – Public Act 101-635</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">

                {/* Responsibilities */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">The Assessor's Responsibilities</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Township Assessor is charged with the task of uniformly assessing properties at a
                    median level of <strong>33⅓% (one third) of market value</strong>. Equitable assessments
                    ensure a fair distribution of the property tax burden among all property owners. Local
                    property taxes pay for such services as schools, villages, libraries, park districts,
                    and fire protection districts. The Assessor has no control over the levies of taxing
                    bodies or the tax rate.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong className="text-navy">Local Tax Rate</strong> is determined by the combined
                    spending of all taxing districts, including the county, the forest preserve district,
                    townships, community colleges, schools, villages, fire districts, libraries, parks, and
                    more. Each government prepares a budget and submits its revenue request to the county
                    clerk, who calculates the tax rate. That rate is then applied against all property
                    assessments in the district to produce each property's tax amount.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Property taxes are paid in two installments, due <strong>June 1st</strong> and{' '}
                    <strong>September 1st</strong> of every year.
                  </p>
                </div>

                {/* Exemptions */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Property Exemptions</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Exemptions are a form of partial property tax relief. Each exemption type is designed
                    to provide tax relief for a specific class of property owners. Eligibility requirements
                    vary for each type, as does the amount of tax relief. A property owner may be eligible
                    for more than one exemption type.
                  </p>
                  <div className="bg-gold-pale border border-gold/30 rounded-lg p-5 flex items-start gap-4">
                    <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-navy mb-1">We Are Here to Help</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Should you have any questions regarding exemptions or any other assessment questions,
                        please contact our office. You may also visit the{' '}
                        <a
                          href="https://www.willcountysoa.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy font-semibold hover:text-gold transition-colors underline underline-offset-2"
                        >
                          Supervisor of Assessments website
                        </a>{' '}
                        for forms and property information.
                      </p>
                      <a
                        href="mailto:mary@creteassessor.com"
                        className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-navy hover:text-gold transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        mary@creteassessor.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Common Questions</h2>
            <div className="w-16 h-[3px] bg-gold mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-start gap-3 px-5 py-4 bg-navy/5 border-b border-gray-200">
                    <ChevronRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-navy text-sm">{faq.q}</h3>
                  </div>
                  <p className="px-5 py-4 text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <div className="bg-navy-dark py-10">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold mb-1">Questions about your property assessment?</p>
              <p className="text-white/60 text-sm">Contact the Assessor's office directly.</p>
            </div>
            <a
              href="mailto:mary@creteassessor.com"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-6 py-2.5 rounded transition-colors"
            >
              <Mail className="w-4 h-4" />
              mary@creteassessor.com
            </a>
          </div>
        </div>

      </div>
    </>
  )
}
