'use client'

import { MapPin, Star, TimerReset } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { NewBadge } from '@/components/new-badge'
import { PremiumBadge } from '@/components/premium-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Offer } from '@/model/offer'

const OfferCardHeader = ({ offer }: { offer: Offer }) => {
  const createdAtDate = new Date(offer.createdAt)

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-x-5">
          <Avatar>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}
            />
            <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex gap-x-1">
            <PremiumBadge offer={offer} />
            <NewBadge date={createdAtDate} />
          </div>
        </div>
        <div>
          <Star
            className="stroke-gray-300 hover:fill-zinc-800 hover:stroke-zinc-800 dark:stroke-zinc-700 dark:hover:fill-white
              dark:hover:stroke-white"
          />
        </div>
      </div>
      <div>
        <CardTitle className="mt-3 text-xl font-bold tracking-normal">{offer.title}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">{offer.company.name}</p>
      </div>
    </CardHeader>
  )
}

const OfferCardFooter = ({ offer }: { offer: Offer }) => {
  const t = useTranslations()

  return (
    <CardFooter className="mt-auto flex justify-between">
      <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-400">
        <MapPin className="h-5 w-auto" />
        {offer.place.city.length > 10
          ? `${offer.place.city.substring(0, 10)}...`
          : offer.place.city}
        , {offer.place.zipCode}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-400">
              <TimerReset className="h-5 w-auto" />
              {offer.dayLast} {t('Offer.daysLeft')}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('Offer.applyJob')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardFooter>
  )
}

export const OfferCard = ({ offer }: { offer: Offer }) => {
  const locale = useLocale()

  return (
    <Card
      key={offer.publicId}
      className="relative flex h-full flex-col transition duration-100 hover:shadow-md dark:hover:shadow-gray-800"
    >
      <Link
        href={`${locale}/offer/${offer.publicId}/${offer.slug}`}
        className="flex h-full flex-col"
      >
        <OfferCardHeader offer={offer} />
        <OfferCardFooter offer={offer} />
      </Link>
    </Card>
  )
}
