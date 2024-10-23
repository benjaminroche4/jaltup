'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { OfferLayout } from '@/app/offers/[publicId]/offer-layout'
import ErrorBoundary from '@/components/error-boundary'

export default function OfferPage({ params }: { params: { publicId: string } }) {
  const queryClient = new QueryClient()

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
