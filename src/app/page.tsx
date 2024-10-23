'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import OffersList from '@/components/offers-list'

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <OffersList />
      </QueryClientProvider>
    </main>
  )
}
