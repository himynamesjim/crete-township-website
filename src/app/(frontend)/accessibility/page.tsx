import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Crete Township',
  description: 'Crete Township\'s commitment to web accessibility under ADA and Section 508.',
}

export default function AccessibilityPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page Hero */}
      <div className="bg-navy-dark py-10 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Legal</p>
          <h1 className="text-white font-display text-3xl font-bold">Accessibility Statement</h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: January 1, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Commitment banner */}
        <div className="bg-navy rounded-xl p-6 mb-8 flex items-start gap-4">
          <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-navy-dark" aria-hidden="true">
              <circle cx="12" cy="4" r="2" />
              <path d="M12 7c-2.8 0-5 2.2-5 5v1h2v-1c0-1.7 1.3-3 3-3s3 1.3 3 3v1h2v-1c0-2.8-2.2-5-5-5z" />
              <path d="M9 13v5l2 3 2-3v-5H9z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-display font-bold text-lg mb-1">Our Commitment to Accessibility</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Crete Township is committed to ensuring that our website is accessible to all residents,
              including those with disabilities, in accordance with the Americans with Disabilities Act
              (ADA) and Section 508 of the Rehabilitation Act.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Standards We Follow</h2>
            <p>
              We aim to conform to the{' '}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong> published by
              the World Wide Web Consortium (W3C). These guidelines help make web content more accessible
              to people with a wide range of disabilities, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[
                'Visual impairments (blindness, low vision, color blindness)',
                'Hearing impairments',
                'Cognitive and learning disabilities',
                'Motor disabilities',
                'Speech disabilities',
                'Photosensitive conditions',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Built-In Accessibility Features</h2>
            <p className="mb-4">
              This website includes the following accessibility features:
            </p>
            <ul className="space-y-2">
              {[
                { title: 'Accessible Fonts', desc: 'We use Source Sans 3 and Merriweather — fonts chosen for readability and ADA compliance.' },
                { title: 'High Color Contrast', desc: 'Text and background combinations meet or exceed WCAG AA contrast ratios.' },
                { title: 'Keyboard Navigation', desc: 'All interactive elements are accessible via keyboard without requiring a mouse.' },
                { title: 'Screen Reader Support', desc: 'Pages use semantic HTML, ARIA labels, and landmark roles for screen reader compatibility.' },
                { title: 'Descriptive Link Text', desc: 'Links use descriptive text rather than generic phrases like "click here."' },
                { title: 'Skip Navigation', desc: 'A skip-to-content link is available for keyboard users.' },
                { title: 'Responsive Design', desc: 'The site works on all screen sizes, from mobile phones to large desktop monitors.' },
                { title: 'Alt Text', desc: 'Images include descriptive alternative text for screen readers.' },
              ].map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy text-sm">{title}: </span>
                    <span className="text-sm">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Accessibility Widget</h2>
            <p>
              This website includes a built-in <strong>Accessibility Options</strong> widget, accessible
              via the button in the bottom-left corner of every page. It provides the following options:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-sm">
              <li><strong>Text Size</strong> — Increase font size in four steps (Default, Large, Larger, Largest)</li>
              <li><strong>High Contrast</strong> — Increases visual contrast for users with low vision</li>
              <li><strong>Grayscale</strong> — Removes color for users with color blindness or photosensitivity</li>
              <li><strong>Dyslexia-Friendly</strong> — Adjusts font, spacing, and line height to aid readability</li>
              <li><strong>Reduce Motion</strong> — Disables animations and transitions</li>
            </ul>
            <p className="mt-3">
              Preferences are saved in your browser and applied automatically on future visits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Known Limitations</h2>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-800 mb-1">PDF Documents</p>
                <p className="text-amber-700">
                  Some older PDF documents may not be fully accessible to screen readers. We are working to
                  remediate legacy documents. If you need an accessible version of any document, please
                  contact us and we will provide it in an alternative format.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm">
              We are actively working to improve accessibility across all parts of this website. If you
              encounter barriers not listed here, please let us know.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">Legal Compliance</h2>
            <p>
              This website is maintained in accordance with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-sm">
              <li>Title II of the Americans with Disabilities Act (ADA)</li>
              <li>Section 508 of the Rehabilitation Act of 1973, as amended</li>
              <li>Illinois Information Technology Accessibility Act (IITAA)</li>
              <li>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-4">Report an Accessibility Issue</h2>
            <p className="mb-4">
              We welcome feedback about the accessibility of this website. If you experience barriers to
              accessing any content, or need information in an alternative format, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <p className="font-semibold text-navy mb-3">Crete Township Administrator</p>
              <div className="space-y-2">
                <a
                  href="mailto:administrator@cretetownship.com"
                  className="flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm"
                >
                  <Mail size={14} />
                  administrator@cretetownship.com
                </a>
                <a
                  href="tel:708-672-8279"
                  className="flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm"
                >
                  <Phone size={14} />
                  708-672-8279
                </a>
                <p className="text-sm text-gray-500 mt-2">
                  1367 Wood Street, Crete, Illinois 60417
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200">
                We aim to respond to accessibility requests within <strong>2 business days</strong> and
                resolve issues within <strong>10 business days</strong>.
              </p>
            </div>
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
