'use client'

import { differenceInDays } from 'date-fns'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

const MAX_DAYS_FOR_NEW = 5

export const NewBadge = ({ date }: { date: Date }) => {
  const t = useTranslations()
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    setIsNew(differenceInDays(new Date(), date) <= MAX_DAYS_FOR_NEW)
  }, [date])

  if (isNew) {
    return <Badge variant="outline">{t('Common.new')}</Badge>
  }

  return null
}
