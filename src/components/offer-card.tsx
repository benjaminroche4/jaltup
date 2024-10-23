import { differenceInDays } from 'date-fns'
import { Crown, MapPin, Star, TimerReset } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Offer } from '@/model/offer'

const OfferCardHeader = (offer: Offer) => {
  const createdAtDate = new Date(offer.createdAt)
  const isNew = differenceInDays(new Date(), createdAtDate) <= 5

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
            {offer.premium ? (
              <Badge
                variant="outline"
                className="flex gap-x-1 border border-yellow-500 bg-yellow-100/10 text-yellow-600"
              >
                <Crown className="h-3 w-auto" />
                Premium
              </Badge>
            ) : null}
            {isNew ? <Badge variant="outline">Nouveau</Badge> : null}
          </div>
        </div>
        <div>
          <Star className="stroke-gray-300 hover:fill-zinc-800 hover:stroke-zinc-800 dark:stroke-zinc-700 dark:hover:fill-white dark:hover:stroke-white" />
        </div>
      </div>
      <div>
        <CardTitle className="mt-3 text-xl font-bold tracking-normal">{offer.title}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">{offer.company.name}</p>
      </div>
    </CardHeader>
  )
}

const OfferCardFooter = (offer: Offer) => (
  <CardFooter className="mt-auto flex justify-between">
    <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-400">
      <MapPin className="h-5 w-auto" />
      {offer.place.city.length > 10
        ? `${offer.place.city.substring(0, 10)}...`
        : offer.place.city}, {offer.place.zipCode}
    </div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-400">
            <TimerReset className="h-5 w-auto" />
            {offer.dayLast} jours restant
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Pour postuler à l&#39;offre.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </CardFooter>
)

export default function OfferCard(offer: Offer) {
  return (
    <Card
      key={offer.publicId}
      className="relative flex h-full flex-col transition duration-100 hover:shadow-md dark:hover:shadow-gray-800"
    >
      <Link href={`/offers/${offer.publicId}`} className="flex h-full flex-col">
        {OfferCardHeader(offer)}
        {OfferCardFooter(offer)}
      </Link>
    </Card>
  )
}
