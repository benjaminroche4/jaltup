'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { OfferCard } from './offer-card'
import { ErrorPage } from '@/components/error-page'
import { Spinner } from '@/components/ui/spinner'
import { useDebounce } from '@/lib/debounce'
import { EntityConsole } from '@/lib/entity-console'
import { useGetOffers } from '@/queries/offers'

const NB_ITEMS_PER_PAGE = 25 // number of displayed items per page.

const DEBOUNCE_DELAY = 500 // milliseconds.

interface OffersListProps {
  searchText: string
  searchPlace: string
  currentPage?: number
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
}

export const OffersList = ({
  searchText,
  searchPlace,
  currentPage,
  setTotalPages,
}: OffersListProps) => {
  //Remove from prod
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY)
  const debouncedSearchPlace = useDebounce(searchPlace, DEBOUNCE_DELAY)
  const { offers, isLoading, isError, refetch } = useGetOffers(
    debouncedSearchText,
    debouncedSearchPlace,
    currentPage,
  )

  useEffect(() => {
    refetch().catch((err) => EntityConsole.log(err))
  }, [debouncedSearchText, debouncedSearchPlace, currentPage, refetch])

  if (isLoading) {
    return <Spinner size="large">Chargement ...</Spinner>
  }

  if (isError || !offers) {
    return <ErrorPage />
  }

  setTotalPages(Math.floor(offers.total / NB_ITEMS_PER_PAGE) + 1)

  if (offers.total > 0) {
    return (
      <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.items.map((offer) => (
          <OfferCard key={offer.publicId} offer={offer} />
        ))}
      </section>
    )
  }

  return (
    <section className="mx-auto text-center">
      <h4 className="mb-3 text-[22px] font-semibold leading-tight">
        Désolé, nous n&apos;avons trouvé aucune offre correspondant à vos critères de recherche !
      </h4>
    </section>
  )
}
