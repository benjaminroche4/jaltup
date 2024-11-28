'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { OffersList } from '@/components/offers-list'
import { Paginator } from '@/components/paginator'
import { Search } from '@/components/search'
import { useTotalPages } from '@/store/filtersStore'

// eslint-disable-next-line import/no-default-export
export default function Home() {
  const queryClient = new QueryClient()
  const totalPages = useTotalPages()

  return (
    <main className="mx-auto max-w-7xl px-6 lg:px-8">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-col items-center gap-4">
            <Search />
            <OffersList />
            {totalPages > 1 ? <Paginator showPreviousNext={true} /> : null}
          </div>
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
