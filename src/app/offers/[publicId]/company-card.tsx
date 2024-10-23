'use client'

import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'

export const CompanyCard = ({ offer }: { offer: Offer }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-center gap-x-4">
        <Avatar>
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}
          />
          <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold tracking-wide">{offer.company.name}</h3>
      </div>
    </CardHeader>
    <CardFooter className="grid grid-cols-3 divide-x text-center">
      <Link
        href={offer.company.websiteUrl}
        target="_blank"
        className="text-sm text-muted-foreground underline underline-offset-4"
      >
        Voir le site
      </Link>
      <p className="text-sm text-muted-foreground">
        {offer.company.offerNumber} {offer.company.offerNumber > 1 ? 'offres' : 'offre'}
      </p>
      <p className="flex items-center justify-center gap-x-1 text-sm text-muted-foreground">
        {offer.company.verified ? (
          <>
            Vérifié
            <CheckCircle className="h-4 w-auto" />
          </>
        ) : (
          'Non Vérifié'
        )}
      </p>
    </CardFooter>
  </Card>
)
