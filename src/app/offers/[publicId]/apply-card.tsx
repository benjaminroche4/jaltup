'use client'

import Link from 'next/link'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'

export const ApplyCard = ({ offer }: { offer: Offer }) => (
  <Card>
    <CardHeader>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1 rounded-2xl bg-muted px-2 py-4 text-center">
          <p className="text-2xl font-semibold">44</p>
          <p className="text-sm text-muted-foreground">candidatures</p>
        </div>
        <div className="space-y-1 rounded-2xl bg-muted px-2 py-4 text-center">
          <p className="text-2xl font-semibold">{offer.dayLast}</p>
          <p className="text-sm text-muted-foreground">jours restant</p>
        </div>
      </div>
    </CardHeader>
    <CardFooter>
      <Button variant="default" size="xl" className="w-full">
        <Link href={offer.url} target="_blank">
          Postuler à l&apos;offre
        </Link>
      </Button>
    </CardFooter>
  </Card>
)
