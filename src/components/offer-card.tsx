'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { NewBadge } from '@/components/new-badge'
import { PremiumBadge } from '@/components/premium-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
            <NewBadge date={createdAtDate} />
          </div>
        </div>
        <div>
          <PremiumBadge offer={offer} />
        </div>
      </div>
      <div className="space-y-1.5 pt-2">
        <CardTitle className="mt-3 text-xl font-semibold tracking-normal">{offer.title}</CardTitle>
        <div className="flex items-center gap-x-1">
          <p className="text-sm text-gray-500">{offer.company.name}</p>
        </div>
      </div>
      <div className="relative pt-5">
        <div className="flex items-center">
          <div className="flex items-center gap-x-2">
            <p className="block w-full rounded-lg bg-gray-50 px-1.5 py-2.5 text-xs tracking-wide text-gray-600">
              #PHP
            </p>
            <p className="block w-full rounded-lg bg-gray-50 px-1.5 py-2.5 text-xs tracking-wide text-gray-600">
              #AJAX
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 pt-10">
        <div className="flex justify-between">
          <p className="text-xs text-gray-500/90">Il y a {offer.dayLast} jours</p>
          <p className="text-xs text-gray-500/90">{offer.dayLast} jours restant</p>
        </div>
        <Progress value="50" className="h-2" />
      </div>
    </CardHeader>
  )
}

const OfferCardFooter = ({ offer }: { offer: Offer }) => {
  const t = useTranslations()

  return (
    <CardFooter className="mt-auto grid grid-cols-4 gap-x-3">
      <div className="col-span-3">
        <Button className="w-full text-xs">Voir l'offre</Button>
      </div>
      <div>
        <Button className="group w-full" variant="secondary">
          <Heart className="h-5 w-auto stroke-gray-900 transition duration-100 group-hover:fill-gray-900" />
        </Button>
      </div>
    </CardFooter>
  )
}

export const OfferCard = ({ offer }: { offer: Offer }) => {
  const locale = useLocale()

  return (
    <Card key={offer.publicId} className="relative flex h-full flex-col border-gray-100">
      <Link
        href={`${locale}/offre/${offer.publicId}/${offer.slug}`}
        className="flex h-full flex-col"
      >
        <OfferCardHeader offer={offer} />
        <OfferCardFooter offer={offer} />
      </Link>
    </Card>
  )
}
