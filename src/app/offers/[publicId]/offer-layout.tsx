'use client'

import * as React from 'react'
import { ApplyCard } from '@/app/offers/[publicId]/apply-card'
import { CompanyCard } from '@/app/offers/[publicId]/company-card'
import { DescriptionCard } from '@/app/offers/[publicId]/description-card'
import { HeaderCard } from '@/app/offers/[publicId]/header-card'
import ErrorPage from '@/components/error-page'
import { Spinner } from '@/components/ui/spinner'
import { useGetOffer } from '@/queries/offer'

export const OfferLayout = ({ id }: { id: string }) => {
  const { offer, isLoading, isError } = useGetOffer(id)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-12">
        <Spinner size="large" />
      </div>
    )
  }

  if (isError || !offer) {
    return <ErrorPage />
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-12">
      <HeaderCard offer={offer} />
      <div className="mt-6 grid grid-cols-3 gap-6 md:mt-8 md:gap-8">
        <div className="col-span-3 lg:col-span-2">
          <DescriptionCard offer={offer} />
        </div>
        <div className="col-span-3 space-y-6 md:space-y-8 lg:col-span-1">
          <CompanyCard offer={offer} />
          <ApplyCard offer={offer} />
        </div>
      </div>
    </div>
  )
}
