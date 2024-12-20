'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { use } from 'react'
import { OfferLayout } from '@/app/[locale]/offre/[publicId]/[slug]/offer-layout'
import { ErrorBoundary } from '@/components/error-boundary'

type Params = Promise<{ publicId: string; slug: string }>

// eslint-disable-next-line import/no-default-export
export default function Page(props: { params: Params }) {
  const queryClient = new QueryClient()
  const params = use(props.params)

  return (
    <main>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <OfferLayout id={params.publicId} />
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
