'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { OfferLayout } from '@/app/offers/[publicId]/offer-layout'

export default function OfferPage({ params }: { params: { publicId: string } }) {
  const queryClient = new QueryClient()

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <OfferLayout id={params.publicId} />
      </QueryClientProvider>
    </main>
  )
}
