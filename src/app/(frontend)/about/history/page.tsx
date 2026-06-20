import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'History | Crete Township',
  description:
    'Learn about the history of Crete Township, established in 1848. Township government in Illinois has served residents for over 175 years.',
}

const services = [
  {
    title: 'General Assistance',
    body: 'Townships provide food, shelter and emergency relief to people unable to support themselves or who do not qualify for other forms of assistance.',
  },
  {
    title: 'Property Assessment',
    body: 'The township assessor sets property values for all real property within the township.',
  },
  {
    title: 'Road & Bridge Maintenance',
    body: '53% of all roads in Illinois are maintained by township government. Township highway commissioners are responsible for some 71,000 miles of Illinois roads. Township road crews are not only responsible for the maintenance of these roads, but they also keep them free of snow and ice in the winter months.',
  },
]

export default function HistoryPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative bg-navy-dark overflow-hidden">
        {/* Bell image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/assets/township-bell.jpg"
            alt="Historic township bell at Crete Township Hall"
            fill
            className="object-cover object-center opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/60 to-navy-dark" />
        </div>

        <div className="relative max-w-[900px] mx-auto px-8 py-24 text-center">
          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Will County, Illinois</span>
            <div className="h-px w-16 bg-gold" />
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Crete Township
            <br />
            <span className="text-gold">History</span>
          </h1>

          {/* Est. badge */}
          <div className="inline-flex flex-col items-center mt-6 border border-gold/40 rounded px-8 py-3 bg-gold/10">
            <span className="text-gold/70 text-[10px] tracking-[0.4em] uppercase font-semibold">Established</span>
            <span className="text-gold font-display text-3xl font-bold leading-none">1848</span>
          </div>

          {/* Breadcrumb */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-gold transition-colors">About</Link>
            <span>/</span>
            <span className="text-white/80">History</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="bg-[#F7F3EC]">

        {/* ── Origin section ── */}
        <section className="max-w-[1000px] mx-auto px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

            {/* Text */}
            <div>
              {/* Section marker */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-6xl font-bold text-gold/20 leading-none select-none">1848</span>
                <div>
                  <div className="h-px w-12 bg-gold mb-1" />
                  <h2 className="font-display text-2xl font-bold text-navy">America&rsquo;s Oldest Form of Government</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-5">
                America&rsquo;s oldest form of government marks its 150th anniversary in Illinois this year.
                Township government was created in Illinois by the Constitution of 1848. Constitutional
                delegates gave each county the option to choose between the township form of government
                or a county commission form of government. In 1849, the first townships were formed in
                Illinois and began operating a year later.
              </p>
              <p className="text-gray-700 leading-relaxed mb-5">
                Today, 85 of Illinois&rsquo; 102 counties operate under the township government system
                and 1,433 townships serve more than 8 million people throughout the state.
              </p>

              {/* Pull quote */}
              <blockquote className="border-l-4 border-gold pl-5 my-8">
                <p className="font-display text-lg italic text-navy leading-relaxed">
                  &ldquo;Township government in Illinois still leans heavily on the annual meeting to give
                  each and every citizen an opportunity to give direct input into the governing process.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Bell photo */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/assets/township-bell.jpg"
                  alt="Historic bell at Crete Township Hall"
                  width={380}
                  height={420}
                  className="object-cover w-full"
                />
              </div>
              {/* Caption */}
              <p className="mt-3 text-center text-xs text-gray-500 italic">
                Historic bell at Crete Township Hall, 1367 Wood Street
              </p>
            </div>
          </div>
        </section>

        {/* ── Ornamental divider ── */}
        <div className="flex items-center justify-center gap-4 px-8">
          <div className="flex-1 max-w-xs h-px bg-gold/30" />
          <span className="text-gold text-lg">✦</span>
          <div className="flex-1 max-w-xs h-px bg-gold/30" />
        </div>

        {/* ── Pilgrim origin section ── */}
        <section className="max-w-[1000px] mx-auto px-8 py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-6xl font-bold text-gold/20 leading-none select-none">1636</span>
            <div>
              <div className="h-px w-12 bg-gold mb-1" />
              <h2 className="font-display text-2xl font-bold text-navy">The Pilgrim Origin</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-gray-700 leading-relaxed">
              The origin of township government in North America dates to the Pilgrims of 1636. Too
              often we take for granted the democratic freedoms enjoyed here in the United States, but
              we cannot forget that our forefathers came to the new world in search of political
              freedom. When they landed on American soil, they created the purest form of democracy
              known to the United States — the township.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Township government today operates under the same basic principles of democratic rule as
              it did more than 350 years ago. The first townships established town meetings as the
              cornerstone of citizen input. Today, township government in Illinois still leans heavily
              on the annual meeting to give each and every citizen an opportunity to give direct input
              into the governing process. Townships in Illinois hold their annual meetings on the second
              Tuesday each April.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Illinois township government today continues to provide the same basic services they did
              150 years ago.
            </p>
          </div>
        </section>

        {/* ── Services section — dark band ── */}
        <section className="bg-navy-dark py-16">
          <div className="max-w-[1000px] mx-auto px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gold/50" />
                <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-semibold">Core Services</span>
                <div className="h-px w-12 bg-gold/50" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white">
                Essential Township Services
              </h2>
              <p className="text-white/60 mt-2 text-sm">
                The same basic services provided for 175+ years
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-white/5 border border-gold/20 rounded-lg p-6 hover:border-gold/50 transition-colors"
                >
                  <div className="w-8 h-[3px] bg-gold mb-4" />
                  <h3 className="font-display text-lg font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Crete Township today ── */}
        <section className="max-w-[1000px] mx-auto px-8 py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gold" />
            <h2 className="font-display text-2xl font-bold text-navy">Crete Township Today</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            As we mark the sesquicentennial anniversary of the creation of township government in
            Illinois, township officials continue to give their neighbors the kind of service available
            only from the people next door. Townships today provide many services to senior citizens
            and the youth in the community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <p className="text-gray-700 leading-relaxed">
              Crete Township assists the Eastern Will County Senior Citizens group with a healthy
              donation each year which helps with transportation costs. Youth groups have also received
              vital funding through yearly donations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each year Crete Township offers Thanksgiving and Christmas baskets besides having an
              ongoing &ldquo;Pantry&rdquo; for the less fortunate in our township.
            </p>
          </div>

          {/* Closing callout */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center">
                <span className="text-gold font-display text-2xl font-bold">CT</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Illinois townships are as diverse governmentally as they are geographically. However,
                they all provide a basic set of services. Township government is accessible to you, our
                neighbor. Your elected township officials are only a phone call away.
              </p>
              <p className="font-display text-navy font-bold italic">
                &ldquo;Our system of government is but one of the intrinsic values handed down to us by our
                ancestors. Today, township government proves the wisdom of our forefathers and has stood
                the test of time — a century and a half of it.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer strip ── */}
        <div className="border-t border-gold/20 bg-[#EEE8DA] py-8">
          <div className="max-w-[1000px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Crete Township &mdash; Serving Will County Since 1848
            </p>
            <Link
              href="/officials"
              className="text-sm font-semibold text-navy hover:text-gold transition-colors border-b border-navy/30 hover:border-gold pb-px"
            >
              Meet Your Township Officials →
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
