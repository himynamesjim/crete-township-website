import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Crete Township',
  description: 'Privacy policy for the Crete Township official website.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page Hero */}
      <div className="bg-navy-dark py-10 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Legal</p>
          <h1 className="text-white font-display text-3xl font-bold">Privacy Policy</h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: January 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Introduction</h2>
            <p>
              Crete Township, Will County, Illinois ("Township," "we," "us," or "our") is committed to
              protecting the privacy of visitors to our official website at{' '}
              <strong>cretetownship.com</strong>. This Privacy Policy explains what information we collect,
              how we use it, and your rights regarding that information.
            </p>
            <p className="mt-3">
              As a unit of local government, Crete Township operates in accordance with the Illinois
              Freedom of Information Act (FOIA), the Illinois Personal Information Protection Act (PIPA),
              and other applicable state and federal laws governing public records and data privacy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Information We Collect</h2>
            <h3 className="font-semibold text-navy mb-2">Automatically Collected Information</h3>
            <p>
              When you visit our website, our servers may automatically record the following information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Your IP address (anonymized)</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on each page</li>
              <li>Date and time of your visit</li>
              <li>Referring website address</li>
            </ul>
            <p className="mt-3">
              This information is used solely for statistical analysis to improve our website and services.
              It is not used to identify individual visitors.
            </p>

            <h3 className="font-semibold text-navy mb-2 mt-5">Information You Provide</h3>
            <p>We collect personal information only when you voluntarily provide it, such as when you:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Submit a Freedom of Information Act (FOIA) request</li>
              <li>Sign up for our newsletter or email notifications</li>
              <li>Contact us through our online contact form</li>
              <li>Submit a General Assistance inquiry</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">How We Use Your Information</h2>
            <p>Information you provide is used only for the purpose for which it was submitted:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>FOIA request submissions are processed according to Illinois FOIA requirements (5 ILCS 140)</li>
              <li>Newsletter sign-ups are used to send you township news and updates you requested</li>
              <li>Contact form submissions are used to respond to your inquiry</li>
              <li>General Assistance information is used to determine program eligibility</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, trade, or otherwise transfer your personal information to third parties
              for commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Public Records</h2>
            <p>
              Please be aware that information submitted to a government body may be subject to disclosure
              under the Illinois Freedom of Information Act (5 ILCS 140). If you submit a FOIA request or
              other official communication, it may become part of the public record and subject to
              disclosure upon request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Cookies</h2>
            <p>
              Our website uses only essential cookies necessary for the website to function. We use a small
              number of cookies to remember your accessibility preferences (text size, contrast settings).
              These cookies are stored locally on your device and are not transmitted to our servers or
              used for tracking purposes.
            </p>
            <p className="mt-3">
              We do not use advertising cookies, tracking pixels, or third-party analytics cookies that
              identify individual users.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Third-Party Services</h2>
            <p>Our website may include content from or links to third-party services, including:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Google Calendar</strong> — for displaying public township events</li>
              <li><strong>Facebook</strong> — for displaying the township's public Facebook page feed</li>
              <li><strong>U.S. Census Bureau Geocoder</strong> — for the polling place lookup tool</li>
            </ul>
            <p className="mt-3">
              These third-party services have their own privacy policies, which govern how they handle
              your data. Crete Township is not responsible for the privacy practices of external websites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Data Security</h2>
            <p>
              We implement reasonable technical and administrative security measures to protect information
              submitted through our website. Our website uses HTTPS encryption for all data transmission.
              However, no method of internet transmission is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Children's Privacy</h2>
            <p>
              Our website is not directed at children under 13 years of age, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how Crete Township handles your personal
              information, please contact us:
            </p>
            <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-navy">Crete Township Clerk</p>
              <p>1367 Wood Street</p>
              <p>Crete, Illinois 60417</p>
              <p className="mt-2">
                <strong>Phone:</strong>{' '}
                <a href="tel:708-672-8279" className="text-navy hover:text-gold transition-colors">
                  708-672-8279
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:administrator@cretetownship.com" className="text-navy hover:text-gold transition-colors">
                  administrator@cretetownship.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Changes to This Policy</h2>
            <p>
              Crete Township reserves the right to update this Privacy Policy at any time. Changes will
              be posted on this page with an updated revision date. We encourage you to review this policy
              periodically.
            </p>
          </section>

        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-navy hover:text-gold text-sm font-semibold transition-colors">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
