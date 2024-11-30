'use client'

import { Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { NewBadge } from '@/components/new-badge'
import { PremiumBadge } from '@/components/premium-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Offer } from '@/model/offer'
import {Progress} from "@/components/ui/progress";

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
      <div className="space-y-1.5">
        <CardTitle className="mt-3 text-xl font-semibold tracking-normal">{offer.title}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">{offer.company.name}</p>
      </div>
        <Progress value="50" className="fill-yellow-500 h-2"/>

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
        <Button className="w-full" variant="secondary">
          <Heart className="h-5 w-auto stroke-gray-900" />
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
