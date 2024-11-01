'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { OfferCard } from './offer-card'
import { ErrorPage } from '@/components/error-page'
import { OrderButton } from '@/components/order-button'
import { Spinner } from '@/components/ui/spinner'
import { useDebounce } from '@/lib/debounce'
import { EntityConsole } from '@/lib/entity-console'
import { useGetOffers } from '@/queries/offers'
import {
  useCurrentPage,
  useSearchPlace,
  useSearchText,
  useSetNbResults,
  useSetTotalPages,
} from '@/store/filtersStore'

const NB_ITEMS_PER_PAGE = 25 // number of displayed items per page.

const DEBOUNCE_DELAY = 500 // milliseconds.

export const OffersList = () => {
  //Remove from prod
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const t = useTranslations()
  const searchText = useSearchText()
  const searchPlace = useSearchPlace()
  const currentPage = useCurrentPage()
  const setTotalPages = useSetTotalPages()
  const setNbResults = useSetNbResults()
  const [ascending, setAscending] = useState<boolean>(false)

  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY)
  const debouncedSearchPlace = useDebounce(searchPlace, DEBOUNCE_DELAY)
  const { offers, isLoading, isError, refetch } = useGetOffers({
    title: debouncedSearchText,
    place: debouncedSearchPlace,
    page: currentPage,
    ascending,
  })

  useEffect(() => {
    refetch().catch((err) => EntityConsole.log(err))
  }, [debouncedSearchText, debouncedSearchPlace, currentPage, ascending, refetch])

  if (isLoading) {
    return <Spinner size="large">{t('Common.loading')}</Spinner>
  }

  if (isError || !offers) {
    return <ErrorPage />
  }

  setTotalPages(Math.floor(offers.total / NB_ITEMS_PER_PAGE) + 1)
  setNbResults(offers.total)

  if (offers.total > 0) {
    return (
      <section className="flex w-full flex-col gap-4">
        <div className="items-start">
          <OrderButton ascending={ascending} setAscending={setAscending} />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.items.map((offer) => (
            <OfferCard key={offer.publicId} offer={offer} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto text-center">
      <h4 className="mb-3 text-[22px] font-semibold leading-tight">{t('Common.noResultFound')}</h4>
    </section>
  )
}
