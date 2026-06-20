import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Official website of Crete Township, Will County, Illinois. Access board agendas, meeting minutes, financial reports, events, and township services.',
  images: [
    {
      url: `${getServerSideURL()}/crete-logo.jpeg`,
      width: 1200,
      height: 630,
      alt: 'Crete Township — Will County, Illinois',
    },
  ],
  siteName: 'Crete Township',
  title: 'Crete Township | Will County, Illinois',
  locale: 'en_US',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
