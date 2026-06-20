import React from 'react'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Phone,
  ExternalLink,
  Download,
} from 'lucide-react'
import InquiryForm from './InquiryForm'

export const metadata = {
  title: 'General Assistance | Crete Township',
  description:
    'Crete Township General Assistance provides financial help for eligible residents facing hardship. Learn about eligibility, required documents, and how to apply.',
}

// ── Resource data ─────────────────────────────────────────────────────────────

interface Resource {
  name: string
  description: string
  address?: string
  phone?: string
  phoneRaw?: string
  website?: string
  hours?: string
  hotline?: string
  hotlineRaw?: string
}

interface ResourceCategory {
  id: string
  label: string
  resources: Resource[]
}

const resourceCategories: ResourceCategory[] = [
  {
    id: 'state-federal',
    label: 'State & Federal Benefits',
    resources: [
      {
        name: 'ABE — Apply for Benefits Eligibility',
        description: 'Apply online for SNAP, cash assistance, healthcare, and Medicare Savings.',
        phone: '(800) 843-6154',
        phoneRaw: '8008436154',
        website: 'https://abe.illinois.gov/abe/access/#program-options',
      },
      {
        name: 'IDHS — Illinois Department of Human Services',
        description:
          'Link Card, cash assistance, medical, SNAP, TANF, and WIC. Use the site to find your nearest office.',
        phone: '1-800-843-6154',
        phoneRaw: '8008436154',
        website: 'https://www.dhs.state.il.us/page.aspx?item=27894',
      },
      {
        name: 'Healthcare.gov',
        description:
          'Federal Health Insurance Marketplace for individuals not eligible for Medicaid.',
        website: 'https://www.healthcare.gov',
      },
    ],
  },
  {
    id: 'energy',
    label: 'Energy Assistance',
    resources: [
      {
        name: 'LIHEAP — Low-Income Home Energy Assistance Program',
        description: 'Heating and utility cost assistance for income-qualified households.',
        address: '90 Town Center, University Park, IL',
        phone: '(815) 722-0722',
        phoneRaw: '8157220722',
        hours: 'Tue & Thu 9 AM–1 PM',
      },
      {
        name: 'Will County Center for Community Concerns (WCCCC)',
        description:
          'LIHEAP, housing counseling, employment support, prescription drug assistance, VITA free tax help, and Veterans Dental Assistance.',
        address: '2455 Glenwood Ave, Joliet, IL 60435',
        phone: '(815) 722-0722',
        phoneRaw: '8157220722',
        website: 'https://www.wcccc.net',
      },
    ],
  },
  {
    id: 'housing',
    label: 'Housing & Rent Help',
    resources: [
      {
        name: 'Will County Comeback Grants & Assistance Program',
        description:
          'Mortgage, rent, and utility help for households under 80% AMI who are at least one month behind due to hardship.',
        phone: '(815) 722-0722',
        phoneRaw: '8157220722',
        website: 'https://willcountyillinois.org/housing/',
      },
      {
        name: 'Catholic Charities',
        description:
          'Free food, emergency rental assistance (eviction prevention), DAYBREAK shelter for the homeless, and transitional housing for single mothers.',
        address: '611 E. Cass Street, Joliet, IL 60432',
        phone: '(815) 774-4663',
        phoneRaw: '8157744663',
      },
      {
        name: 'Salvation Army — Joliet',
        description:
          'Food, groceries, meals, rent/housing assistance, utility help, healthcare, and low-interest loans.',
        address: '300 3rd Ave, Joliet, IL 60433',
        phone: '(815) 726-4834',
        phoneRaw: '8157264834',
        website: 'https://centralusa.salvationarmy.org/joliet/',
      },
      {
        name: 'Veterans Assistance Commission of Will County',
        description: 'Rent help, housing advocacy, and financial services for veterans and families.',
        address: '128 N. Scott St., Joliet, IL 60432',
        phone: '(815) 740-8389',
        phoneRaw: '8157408389',
      },
      {
        name: 'Housing Authority of Joliet',
        description: 'Section 8 and public housing.',
        address: '6 S. Broadway Street, Joliet, IL 60436',
        phone: '(815) 727-0611',
        phoneRaw: '8157270611',
      },
      {
        name: 'Housing Authority of Park Forest',
        description: 'Section 8 and public housing.',
        address: '350 Victory Drive, Park Forest, IL 60466',
        phone: '(708) 748-1112',
        phoneRaw: '7087481112',
      },
      {
        name: "Senior Services of Will County",
        description:
          'Home-delivered meals, home maintenance, housekeeping, caregiver assistance, Mini-Bus/Shuttle, Volunteer Driving, and free tax preparation.',
        address: '251 N. Center Street, Joliet, IL 60435',
        phone: '(815) 723-9713',
        phoneRaw: '8157239713',
        website: 'https://www.willcountyseniors.org',
      },
      {
        name: 'Continuum of Care — Homeless Services',
        description: 'Low-income apartments, rent loans, referrals, and case management.',
        phone: '(815) 722-0722',
        phoneRaw: '8157220722',
      },
      {
        name: "Martha's Youth Service Center",
        description: 'Crisis intervention, housing assistance, referrals, and case management.',
        address: '409 W. Jefferson Street, Joliet, IL 60432',
        phone: '(815) 768-8750',
        phoneRaw: '8157688750',
      },
      {
        name: 'Prairie State Legal Services — Housing',
        description:
          'Free civil legal aid for eviction prevention, landlord-tenant mediation, and housing or utility shut-off issues.',
        phone: '(815) 727-5123',
        phoneRaw: '8157275123',
        hours: 'Mon–Thu 9 AM–1 PM. Callers 60+: (800) 531-7057',
      },
    ],
  },
  {
    id: 'food',
    label: 'Food Pantries',
    resources: [
      {
        name: 'Crete Township Food Pantry',
        description: 'Crete Township residents only.',
        address: '1367 Wood St, Crete, IL 60417',
        phone: '(708) 672-8279',
        phoneRaw: '7086728279',
        hours: 'Wednesday 9 AM–12 PM',
      },
      {
        name: "Alicia's House",
        description: 'Open to area residents.',
        address: '17 Paulsen Ave, South Chicago Heights, IL 60411',
        phone: '(708) 946-3002',
        phoneRaw: '7089463002',
        hours: 'Every Tuesday 9–11 AM',
      },
      {
        name: 'Community Outreach Program',
        description: 'Allowed twice per month.',
        address: '3440 Halsted Blvd, Steger, IL 60475',
        phone: '(708) 732-4504',
        phoneRaw: '7087324504',
        hours: 'Saturdays after 1st & 3rd Friday 9–11 AM; other weeks Tuesday 7–9 PM',
      },
      {
        name: 'Emmanuel Christian Reformed Church',
        description: 'Lynwood & Sauk Village residents only for Saturday pantry; mobile pantry open to everyone.',
        address: '22515 Torrence Ave, Sauk Village, IL 60411',
        phone: '(708) 758-3343',
        phoneRaw: '7087583343',
        hours: 'Every Saturday 10 AM–12 PM; Mobile: 2nd Wednesday monthly at 3:30 PM',
      },
      {
        name: 'Monee Township Food Pantry',
        description: '',
        address: '26121 Egyptian Trail, Monee, IL 60449',
        phone: '(708) 534-6020',
        phoneRaw: '7085346020',
        hours: 'Monday–Friday 9 AM–4 PM',
      },
      {
        name: 'Peace Community Church',
        description: '',
        address: '130 S US Route 45, Frankfort, IL 60423',
        phone: '(815) 469-2868',
        phoneRaw: '8154692868',
        hours: '1st Sunday of month 11 AM–12 PM',
      },
      {
        name: 'Rich Township Food Pantry',
        description: '',
        address: '22013 Governors Highway, Richton Park, IL 60471',
        phone: '(708) 748-6722',
        phoneRaw: '7087486722',
        hours: 'Monday–Friday 1:30–3:30 PM',
      },
    ],
  },
  {
    id: 'community',
    label: 'Community Support',
    resources: [
      {
        name: 'United Way of Will County',
        description: 'Funds local nonprofits; help finding resources in the area.',
        address: '54 N. Ottawa Street Suite 300, Joliet, IL 60432',
        phone: '(815) 723-2500',
        phoneRaw: '8157232500',
      },
      {
        name: 'American Red Cross',
        description: 'Disaster assistance: lodging, food, medication, and emotional support.',
        address: '2200 W. Harrison St., Chicago, IL 60612',
        phone: '(312) 729-6100',
        phoneRaw: '3127296100',
      },
      {
        name: 'Christians Against Poverty',
        description: 'Free debt help, financial coaching, credit counseling, and budgeting.',
        phone: '888-777-4620',
        phoneRaw: '8887774620',
        website: 'https://capamerica.org/debthelp',
      },
      {
        name: 'Spanish Community Center',
        description:
          'Bilingual childcare, citizenship/immigration assistance, food pantry, and family advocacy.',
        address: '309 N. Eastern Ave, Joliet, IL 60432',
        phone: '(815) 727-3683',
        phoneRaw: '8157273683',
      },
      {
        name: 'Community Service Council (CSC)',
        description:
          'HUD Certified; foreclosure prevention, rental counseling, anger management, drug/alcohol counseling, and post-traumatic stress services.',
        address: '440 Quadrangle Drive, Suite C, Bolingbrook, IL 60440',
        phone: '(815) 886-5000',
        phoneRaw: '8158865000',
        website: 'https://www.thecsc.org',
      },
    ],
  },
  {
    id: 'mental-health',
    label: 'Mental Health',
    resources: [
      {
        name: 'Will County Health Department & Community Health Center',
        description:
          'Behavioral health for adults and children, family support, vision/hearing screening, and food nutrition education.',
        address: '1106 Neal Avenue, Joliet, IL 60433',
        phone: '(815) 727-8670',
        phoneRaw: '8157278670',
        website: 'https://willcountyhealth.org',
      },
      {
        name: 'Catholic Charities of the Diocese of Joliet',
        description: 'Mental health services.',
        address: '203 N Ottawa St, Joliet, IL 60432',
        phone: '(815) 730-4891',
        phoneRaw: '8157304891',
      },
      {
        name: 'Cornerstone Services, Inc.',
        description: 'Mental health services.',
        address: '777 Joyce Rd, Joliet, IL 60436',
        phone: '(815) 727-6666',
        phoneRaw: '8157276666',
      },
      {
        name: 'Karing Initiatives, Inc.',
        description: 'Mental health services.',
        address: '600 Holiday Plaza Dr., Suite 130, Matteson, IL 60423',
        phone: '(708) 248-5009',
        phoneRaw: '7082485009',
      },
      {
        name: 'Stepping Stones Inc.',
        description: 'Mental health services.',
        address: '1621 Theodore St, Joliet, IL 60435',
        phone: '(815) 744-4555',
        phoneRaw: '8157444555',
      },
      {
        name: 'Trinity Services, Inc.',
        description: 'Mental health services.',
        address: '301 Veterans Pkwy, New Lenox, IL 60451',
        phone: '(815) 485-6197',
        phoneRaw: '8154856197',
      },
    ],
  },
  {
    id: 'domestic-violence',
    label: 'Domestic Violence',
    resources: [
      {
        name: 'Guardian Angel Community Services',
        description: 'On-site emergency shelter, counseling, and support.',
        address: '1550 Plainfield Rd., Joliet, IL 60435',
        phone: '(815) 729-0930',
        phoneRaw: '8157290930',
        hotline: '24-hour hotline: (815) 729-1228',
        hotlineRaw: '8157291228',
      },
      {
        name: 'South Suburban Family Shelter',
        description: 'Off-site emergency shelter and counseling.',
        address: 'PO Box 937, Homewood, IL 60430',
        phone: '(708) 794-2140',
        phoneRaw: '7087942140',
        hotline: '24-hour hotline: (877) 335-3020',
        hotlineRaw: '8773353020',
      },
      {
        name: 'Domestic Violence Helpline (DHS)',
        description: 'Toll-free, confidential, 24-hour, multilingual helpline.',
        phone: '1-877-TO-END-DV (1-877-863-6338)',
        phoneRaw: '18778636338',
        hotline: 'TTY: 1-877-863-6339',
        hotlineRaw: '18778636339',
      },
      {
        name: 'Partner Abuse Intervention Services',
        description: "Men's, women's, LGBT, and adolescent assessments in English and Spanish.",
        address: '12 W Cass St, Joliet, IL 60432',
        phone: '(815) 727-2830',
        phoneRaw: '8157272830',
      },
      {
        name: 'Connections for Abused Women & Their Children (CAWC)',
        description: '',
        address: '1116 N Kedzie Ave, Chicago, IL 60651',
        phone: '(773) 489-9081',
        phoneRaw: '7734899081',
        hotline: '24-hour hotline: (773) 278-4566',
        hotlineRaw: '7732784566',
      },
    ],
  },
  {
    id: 'veterans',
    label: 'Veterans Services',
    resources: [
      {
        name: 'Veterans Assistance Commission of Will County',
        description: 'Rent help, housing advocacy, and financial services.',
        address: '128 N. Scott St., Joliet, IL 60432',
        phone: '(815) 740-8389',
        phoneRaw: '8157408389',
      },
      {
        name: 'Road Home Program at Rush',
        description:
          'Confidential support and health services for veterans and families healing from the invisible wounds of war.',
        phone: '(312) 942-8387',
        phoneRaw: '3129428387',
        website: 'https://www.rush.edu/news/road-home-program-rush',
      },
    ],
  },
  {
    id: 'other',
    label: 'Rehabilitation & Other Services',
    resources: [
      {
        name: 'Rehabilitation Services (DHS)',
        description: '',
        address: '1617 Jefferson Street, Joliet, IL 60435',
        phone: '(815) 730-4200',
        phoneRaw: '8157304200',
      },
      {
        name: 'Developmental Disability Services',
        description: '',
        address: '1740 McDonough Street, Joliet, IL 60436',
        phone: '(815) 741-0800',
        phoneRaw: '8157410800',
      },
      {
        name: 'Child Care Resource & Referral',
        description: '',
        address: '801 N Larkin Ave, Joliet, IL 60435',
        phone: '(800) 552-5526',
        phoneRaw: '8005525526',
      },
      {
        name: 'Prairie State Legal Services',
        description:
          'Free civil legal aid for eviction prevention, landlord-tenant mediation, housing/utility/shut-off issues, and Illinois law info.',
        phone: '(815) 727-5123',
        phoneRaw: '8157275123',
        hours: 'Mon–Thu 9 AM–1 PM. Callers 60+: (800) 531-7057',
      },
    ],
  },
]

const categoryColors: Record<string, string> = {
  'state-federal': 'bg-blue-100 text-blue-800',
  energy: 'bg-yellow-100 text-yellow-800',
  housing: 'bg-green-100 text-green-800',
  food: 'bg-orange-100 text-orange-800',
  community: 'bg-purple-100 text-purple-800',
  'mental-health': 'bg-teal-100 text-teal-800',
  'domestic-violence': 'bg-red-100 text-red-800',
  veterans: 'bg-navy/10 text-navy',
  other: 'bg-gray-100 text-gray-700',
}

// ── Document checklist items ──────────────────────────────────────────────────

const docChecklist = [
  {
    item: 'Social Security Cards or numbers for everyone in the household',
  },
  {
    item: 'Proof of all income for everyone age 18+ — last 30 days and last 3 check stubs',
  },
  {
    item: 'Proof of unemployment benefits (if applicable)',
  },
  {
    item: 'Federal Form 1040 and W-2s for everyone age 18+',
  },
  {
    item: 'Proof of all benefits currently being received',
  },
  {
    item: 'Current utility bills: Nicor, ComEd, other — plus any Shut-Off Notices (REQUIRED if seeking utility help)',
  },
  {
    item: 'Copy of your lease (must show 6-month Crete Township residency)',
  },
  {
    item: 'If lease does not show 6 months: additional proof of residency for the past 6 months',
  },
  {
    item: '"5-Day Notice" from your landlord (required if seeking rent assistance)',
  },
  {
    item: 'Illinois SNAP (Link Card) — proof of application AND proof of current benefits',
  },
  {
    item: 'Illinois TANF cash assistance — application and proof of benefits',
  },
  {
    item: 'Bank and savings account statements for everyone age 18+ — last 3 months',
  },
]

// ── Page component ─────────────────────────────────────────────────────────────

export default function GeneralAssistancePage() {
  return (
    <>
      <PageHero
        title="General Assistance"
        description="Financial help for Crete Township residents in need"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'General Assistance', href: '/services/general-assistance' },
        ]}
      />

      {/* ── 1. Introduction ─────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">
              How Township Assistance Works
            </h2>
            <div className="w-16 h-[3px] bg-gold mb-6" />
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Crete Township offers two types of financial assistance to eligible residents facing
              hardship. Both programs are administered through the Township General Assistance
              office, and both require an in-person application with original supporting documents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-navy/20">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-navy text-lg mb-2">
                    General Assistance
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monthly financial assistance to help meet basic needs such as utilities and
                    rent. Subject to a work requirement — recipients must register with IDES and
                    must not refuse suitable employment.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/40 bg-gold-pale">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-navy text-lg mb-2">
                    Emergency Assistance
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    One-time assistance (once per 12 months) for situations that are
                    life-threatening or that directly jeopardize your employment. You must be
                    denied General Assistance before Emergency Assistance is considered.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-lg p-5">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <strong>Township assistance is the last resort.</strong> Before applying, you must
                first apply for all eligible state and federal benefits (SNAP, TANF, IDES) and
                provide written proof. The township will review your completed application —
                including all documents and your signature — within 30 days.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Who Qualifies ────────────────────────────────────────── */}
      <section className="py-14 bg-cream">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="font-display text-2xl font-bold text-navy mb-2">Who Qualifies</h2>
          <div className="w-16 h-[3px] bg-gold mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Residency */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-2 text-base">Residency Requirement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You must be a continuous Crete Township resident for at least{' '}
                  <strong>6 months</strong> prior to the date your completed application is received.
                  The application date is the date all documents and your signature are in hand.
                </p>
              </CardContent>
            </Card>

            {/* Other benefits */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-2 text-base">
                  Apply for All Eligible Benefits First
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You must apply for TANF and SNAP through the Illinois DHS (
                  <a
                    href="https://abe.illinois.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy underline hover:text-navy-light"
                  >
                    abe.illinois.gov
                  </a>
                  ) and provide written proof of application and current benefit status.
                </p>
              </CardContent>
            </Card>

            {/* Employment / IDES */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-2 text-base">Employment Requirement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You must have registered with IDES (Illinois Department of Employment Security)
                  within the preceding 30 days, unless exempt. You must not have refused suitable
                  employment. Applicants must report any change in circumstances within{' '}
                  <strong>5 days</strong>.
                </p>
              </CardContent>
            </Card>

            {/* Utility help */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-2 text-base">Utility Help</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Utility assistance is available for <strong>ComEd</strong>,{' '}
                  <strong>Nicor</strong>, and <strong>Village of Crete water</strong> only. A
                  disconnection notice is required. The grant is a flat amount up to{' '}
                  <strong>$240</strong>. Late fees are not covered.
                </p>
              </CardContent>
            </Card>

            {/* Rent help */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-2 text-base">Rent Help</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A <strong>&quot;5-Day Notice&quot;</strong> from your landlord is required.
                  Assistance is partial payment only — not full rent. Late fees are not covered.
                  Mortgage assistance is not available through this program.
                </p>
              </CardContent>
            </Card>

            {/* Ineligibility */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-red-800 mb-2 text-base">Not Eligible If</h3>
                <ul className="text-sm text-red-700 leading-relaxed space-y-1 list-disc list-inside">
                  <li>Currently receiving SSI (Supplemental Security Income)</li>
                  <li>Currently receiving SSDI (Social Security Disability Insurance)</li>
                  <li>Currently receiving TANF (Temporary Assistance for Needy Families)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── 3. Required Documents ───────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="font-display text-2xl font-bold text-navy mb-2">Required Documents</h2>
          <div className="w-16 h-[3px] bg-gold mb-4" />
          <p className="text-gray-600 mb-8 ">
            You must bring <strong>original</strong> documents to the township office. Copies may
            not be accepted. Gather everything before your visit.
          </p>

          {/* Warning banner */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-lg px-5 py-4 mb-8">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 font-semibold">
              Any missing documents or information will deem your application INCOMPLETE. The 30-day
              review period does not begin until a completed application with all documents and your
              signature is received.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docChecklist.map((doc, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{doc.item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How to Apply ─────────────────────────────────────────── */}
      <section className="py-14 bg-navy-dark text-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="font-display text-2xl font-bold text-white mb-2">How to Apply</h2>
          <div className="w-16 h-[3px] bg-gold mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Step 1 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-gold text-navy font-bold font-display flex items-center justify-center text-lg mb-4 flex-shrink-0">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">Gather Documents</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Collect all required original documents from the checklist above before visiting the
                office.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-gold text-navy font-bold font-display flex items-center justify-center text-lg mb-4 flex-shrink-0">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">Apply for State Benefits First</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Apply for SNAP and TANF through Illinois DHS before visiting the township. Bring
                proof of application and current benefit status.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href="https://abe.illinois.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold-light hover:text-gold text-xs font-medium transition-colors"
                >
                  abe.illinois.gov
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.dhs.state.il.us/page.aspx?item=27894"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold-light hover:text-gold text-xs font-medium transition-colors"
                >
                  DHS Benefits Apply
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-gold text-navy font-bold font-display flex items-center justify-center text-lg mb-4 flex-shrink-0">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">Download the Application</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Download and complete the official General Assistance application packet.
              </p>
              <a
                href="/forms/crete-ga-packet.pdf"
                className="inline-flex items-center gap-2 bg-gold text-navy font-semibold text-sm px-4 py-2 rounded hover:bg-gold-light transition-colors mt-auto w-fit"
              >
                <Download className="w-4 h-4" />
                Download Application
              </a>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-gold text-navy font-bold font-display flex items-center justify-center text-lg mb-4 flex-shrink-0">
                4
              </div>
              <h3 className="font-semibold text-white mb-2">Submit In Person</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Bring your completed application and all original documents to the Crete Township
                office. Staff will review once your file is complete.
              </p>
            </div>
          </div>

          {/* Contact callout */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-navy rounded-lg px-6 py-5">
            <Phone className="w-6 h-6 text-gold flex-shrink-0" />
            <p className="text-white font-semibold">
              Questions? Call the Crete Township General Assistance office at{' '}
              <a
                href="tel:708-672-8279"
                className="text-gold-light hover:text-gold transition-colors underline"
              >
                (708) 672-8279
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Request Assistance Form ──────────────────────────────── */}
      <section className="py-14 bg-cream" id="contact-form">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="font-display text-2xl font-bold text-navy mb-2">Request Assistance</h2>
          <div className="w-16 h-[3px] bg-gold mb-4" />
          <p className="text-gray-600 mb-8 ">
            Not sure where to start? Send us a preliminary inquiry and a staff member will reach out
            to guide you through the process. This is not a formal application — you will still
            need to visit the office in person with your documents.
          </p>
          <div className="">
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* ── 6. Resources Directory ──────────────────────────────────── */}
      <section className="py-14 bg-white" id="resources">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="font-display text-2xl font-bold text-navy mb-2">
            Community Resources Directory
          </h2>
          <div className="w-16 h-[3px] bg-gold mb-4" />
          <p className="text-gray-600 mb-10 ">
            The following organizations serve Will County and surrounding areas. Many offer
            assistance regardless of General Assistance eligibility.
          </p>

          <div className="space-y-12">
            {resourceCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="font-display font-bold text-navy text-xl">{category.label}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[category.id] ?? 'bg-gray-100 text-gray-700'}`}
                  >
                    {category.resources.length} resource
                    {category.resources.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-navy mb-1 text-sm leading-snug">
                          {resource.name}
                        </h4>
                        {resource.description && (
                          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                            {resource.description}
                          </p>
                        )}
                        <div className="space-y-1">
                          {resource.address && (
                            <p className="text-xs text-gray-500 flex items-start gap-1">
                              <FileText className="w-3 h-3 flex-shrink-0 mt-0.5" />
                              {resource.address}
                            </p>
                          )}
                          {resource.hours && (
                            <p className="text-xs text-gray-500">{resource.hours}</p>
                          )}
                          {resource.phone && (
                            <a
                              href={`tel:${resource.phoneRaw}`}
                              className="text-xs text-navy font-medium hover:text-navy-light transition-colors flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              {resource.phone}
                            </a>
                          )}
                          {resource.hotline && (
                            <a
                              href={`tel:${resource.hotlineRaw}`}
                              className="text-xs text-red-700 font-medium hover:text-red-800 transition-colors flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              {resource.hotline}
                            </a>
                          )}
                          {resource.website && (
                            <a
                              href={resource.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gold hover:text-gold-light transition-colors flex items-center gap-1 font-medium"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit website
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Will County Township GA Phone Directory */}
          <div className="mt-12 bg-navy-dark text-white rounded-lg p-8">
            <h3 className="font-display font-bold text-white text-lg mb-4">
              Will County Township General Assistance Phone Directory
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: 'Channahon', phone: '(815) 467-2569', raw: '8154672569' },
                { name: 'Crete', phone: '(708) 672-8279', raw: '7086728279' },
                { name: 'Custer', phone: '(815) 458-2252', raw: '8154582252' },
                { name: 'DuPage', phone: '(630) 759-1317', raw: '6307591317' },
                { name: 'Florence', phone: '(815) 478-3150', raw: '8154783150' },
                { name: 'Frankfort', phone: '(815) 469-4907', raw: '8154694907' },
                { name: 'Green Garden', phone: '(815) 277-9884', raw: '8152779884' },
                { name: 'Homer', phone: '(708) 301-0522', raw: '7083010522' },
              ].map((township) => (
                <div key={township.name} className="bg-navy rounded p-3">
                  <p className="text-gray-300 text-xs font-semibold mb-1">{township.name}</p>
                  <a
                    href={`tel:${township.raw}`}
                    className="text-gold-light hover:text-gold transition-colors text-xs"
                  >
                    {township.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
