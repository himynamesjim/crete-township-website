import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Phone, Mail, Printer, MapPin, Clock, ExternalLink } from 'lucide-react'
import ContactForm, { ContactTopic } from '@/components/ContactForm'

// Revalidate every 5 minutes so CMS changes appear without a redeploy,
// while one render serves all traffic in between (ISR)
export const revalidate = 300


export const metadata: Metadata = {
  title: 'Contact Us | Crete Township',
  description: 'Contact Crete Township offices. Send a message to the right department or visit us at 1367 Wood Street, Crete, IL.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'contact-topics',
    where: { active: { equals: true } },
    sort: 'displayOrder',
    limit: 50,
  })

  const topics: ContactTopic[] = docs.map((doc) => ({
    id: String(doc.id),
    label: doc.label as string,
    description: (doc.description as string) ?? null,
    phone: (doc.phone as string) ?? null,
    email: (doc.email as string) ?? null,
  }))

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-navy-dark py-12 px-8">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="text-white font-display text-3xl font-bold">Contact Crete Township</h1>
          <p className="text-white/60 mt-2 max-w-xl">
            Have a question? Use the form to reach the right department directly, or visit us at Township Hall.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column — office info */}
          <div className="space-y-5">

            {/* Township Hall photo */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img
                src="/crete-town-hall.jpg"
                alt="Crete Township Hall"
                className="w-full h-44 object-cover"
              />
              <div className="bg-white px-4 py-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Township Hall</p>
                <a
                  href="https://maps.google.com/?q=1367+Wood+Street+Crete+IL+60417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-navy hover:text-gold transition-colors group"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold" />
                  <span>
                    1367 Wood Street<br />Crete, Illinois 60417
                  </span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Information</p>
              <a href="tel:708-672-8279" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors">
                <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-navy" />
                </div>
                <span>(708) 672-8279</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Printer className="w-4 h-4 text-navy" />
                </div>
                <span>(708) 672-3327 (Fax)</span>
              </div>
              <a href="mailto:administrator@cretetownship.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors">
                <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-navy" />
                </div>
                <span className="break-all">administrator@cretetownship.com</span>
              </a>
            </div>

            {/* Office hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gold" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Office Hours</p>
              </div>
              <div className="space-y-1.5 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 4:30 PM' },
                  { day: 'Saturday – Sunday', hours: 'Closed' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-gray-700">
                    <span>{day}</span>
                    <span className={hours === 'Closed' ? 'text-gray-400' : 'font-semibold text-navy'}>{hours}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                  Hours may vary on holidays. Call ahead to confirm.
                </p>
              </div>
            </div>

            {/* Department quick-contacts from CMS */}
            {topics.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Departments</p>
                <div className="space-y-3">
                  {topics.map((t) => (
                    <div key={t.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-navy">{t.label}</p>
                      {t.description && <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>}
                      {t.phone && (
                        <a href={`tel:${t.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 text-xs text-navy hover:text-gold-dark transition-colors mt-1">
                          <Phone className="w-3 h-3 text-gold flex-shrink-0" aria-hidden="true" />
                          {t.phone}
                        </a>
                      )}
                      {t.email && (
                        <a href={`mailto:${t.email}`} className="flex items-center gap-1.5 text-xs text-navy hover:text-gold-dark transition-colors mt-1 break-all">
                          <Mail className="w-3 h-3 text-gold flex-shrink-0" aria-hidden="true" />
                          {t.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column — contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="bg-navy rounded-t-xl px-6 py-5">
                <h2 className="text-white font-display font-bold text-lg">Send Us a Message</h2>
                <p className="text-white/60 text-sm mt-1">
                  Select a department below and your message will be routed to the right person.
                </p>
              </div>
              <div className="p-6">
                {topics.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <p className="font-semibold mb-1">Contact form not yet configured</p>
                    <p className="text-sm">
                      Add department contacts in the CMS at{' '}
                      <strong>Admin → Contact Topics</strong>.
                    </p>
                    <p className="text-sm mt-4">
                      In the meantime, please call <a href="tel:708-672-8279" className="text-navy font-semibold">708-672-8279</a>.
                    </p>
                  </div>
                ) : (
                  <ContactForm topics={topics} />
                )}
              </div>
            </div>

            {/* Map embed */}
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 280 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d-87.6256!3d41.4153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e0c4e6a2ed3a5%3A0x1b2c3d4e5f6a7b8c!2s1367%20Wood%20St%2C%20Crete%2C%20IL%2060417!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Crete Township Hall location"
                className="block"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
