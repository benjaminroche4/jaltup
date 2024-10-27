'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { useState } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { OffersList } from '@/components/offers-list'
import { Paginator } from '@/components/paginator'
import { Search } from '@/components/search'

export default function Home() {
  const queryClient = new QueryClient()
  const [searchText, setSearchText] = useState('')
  const [searchPlace, setSearchPlace] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <main>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <main className="px-4 py-12 sm:px-12">
            <div className="flex flex-col items-center gap-4">
              <Search
                searchText={searchText}
                setSearchText={setSearchText}
                searchPlace={searchPlace}
                setSearchPlace={setSearchPlace}
              />
              <OffersList
                searchText={searchText}
                searchPlace={searchPlace}
                currentPage={currentPage}
                setTotalPages={setTotalPages}
              />
              {totalPages > 1 ? (
                <Paginator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={function (pageNumber: number): void {
                    setCurrentPage(pageNumber)
                  }}
                  showPreviousNext={true}
                />
              ) : null}
            </div>
          </main>
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
