'use client'

import { Crown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Offer } from '@/model/offer'

export const PremiumBadge = ({ offer }: { offer: Offer }) => {
  const t = useTranslations()

  if (offer.premium) {
    return (
      <Badge
        variant="outline"
        className="flex gap-x-1 border border-yellow-500 bg-yellow-100/10 text-sm text-yellow-600"
      >
        <Crown className="h-3 w-auto" />
        {t('Common.premium')}
      </Badge>
    )
  }

  return null
}
