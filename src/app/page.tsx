'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import ErrorBoundary from '@/components/error-boundary'
import OffersList from '@/components/offers-list'

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <main>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <OffersList />
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
