import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FOIA Request | Public Records',
  description: 'Submit a Freedom of Information Act (FOIA) request to Crete Township. Request access to public records including agendas, minutes, financial reports, and more.',
  keywords: ['FOIA', 'Freedom of Information Act', 'public records', 'Crete Township', 'Illinois FOIA'],
}

export default function FOIALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
