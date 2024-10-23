'use client'

import * as React from 'react'
import OfferCard from './offer-card'
import { useGetOffers } from '@/queries/offers'

export default function OffersList() {
  //Remove from prod
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const offers = useGetOffers()

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-12">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers?.map((offer) => <OfferCard key={offer.publicId} offer={offer} />)}
      </section>
    </main>
  )
}
