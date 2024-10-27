'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { OfferCard } from './offer-card'
import { ErrorPage } from '@/components/error-page'
import { Spinner } from '@/components/ui/spinner'
import { useDebounce } from '@/lib/debounce'
import { EntityConsole } from '@/lib/entity-console'
import { useGetOffers } from '@/queries/offers'

interface OffersListProps {
  searchText: string
  searchPlace: string
}

export const OffersList = ({ searchText, searchPlace }: OffersListProps) => {
  //Remove from prod
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const debouncedSearchText = useDebounce(searchText, 500)
  const debouncedSearchPlace = useDebounce(searchPlace, 500)
  const { offers, isLoading, isError, refetch } = useGetOffers(
    debouncedSearchText,
    debouncedSearchPlace,
  )

  useEffect(() => {
    refetch().catch((err) => EntityConsole.log(err))
  }, [debouncedSearchText, debouncedSearchPlace, refetch])

  if (isLoading) {
    return <Spinner size="large">Chargement ...</Spinner>
  }

  if (isError || !offers) {
    return <ErrorPage />
  }

  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.publicId} offer={offer} />
      ))}
    </section>
  )
}
