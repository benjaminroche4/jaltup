'use client'

import { differenceInDays } from 'date-fns'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {PartyPopper} from "lucide-react";

const MAX_DAYS_FOR_NEW = 5

export const NewBadge = ({ date }: { date: Date }) => {
  const t = useTranslations()
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    setIsNew(differenceInDays(new Date(), date) <= MAX_DAYS_FOR_NEW)
  }, [date])

  if (isNew) {
    return <Badge variant="secondary" className="rounded-lg  px-2.5 py-1.5 text-xs border border-gray-100 bg-secondary text-secondary-foreground gap-x-1.5"><PartyPopper className="h-4 w-auto"/>{t('Common.new')}</Badge>
  }

  return null
}
