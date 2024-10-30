'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'

export const ApplyCard = ({ offer }: { offer: Offer }) => {
  const t = useTranslations()

  return (
    <Card>
      <CardHeader>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-1 rounded-2xl bg-muted px-2 py-4 text-center">
            <p className="text-2xl font-semibold">44</p>
            <p className="text-sm text-muted-foreground">{t('Offer.applications')}</p>
          </div>
          <div className="space-y-1 rounded-2xl bg-muted px-2 py-4 text-center">
            <p className="text-2xl font-semibold">{offer.dayLast}</p>
            <p className="text-sm text-muted-foreground">{t('Offer.daysLeft')}</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button variant="default" size="xl" className="w-full">
          <Link href={offer.url} target="_blank">
            {t('Offer.applyJob')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
