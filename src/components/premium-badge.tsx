'use client'

import { Star } from 'lucide-react'
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
        className="flex gap-x-1.5 rounded-lg border-none bg-[#F9BF4B] px-2.5 py-1.5 text-xs text-gray-900"
      >
        <Star className="h-4 w-auto fill-gray-900" />
        {t('Common.premium')}
      </Badge>
    )
  }

  return null
}
