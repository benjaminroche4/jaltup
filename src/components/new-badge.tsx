'use client'

import { differenceInDays } from 'date-fns'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'

export const NewBadge = ({ date }: { date: Date }) => {
  const t = useTranslations()
  const isNew = differenceInDays(new Date(), date) <= 5

  if (isNew) {
    return <Badge variant="outline">{t('Common.new')}</Badge>
  }

  return null
}
