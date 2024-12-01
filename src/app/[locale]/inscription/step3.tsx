'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export const Step3Content = ({
  approved,
  setApproved,
}: {
  approved: boolean
  setApproved: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const t = useTranslations('Register')

  return (
    <div className="flex h-16 items-center space-x-2">
      <Checkbox
        id="terms"
        checked={approved}
        onCheckedChange={(checked: boolean) => {
          setApproved(checked)
        }}
      />
      <span className="leading-none">{t('terms')}</span>
    </div>
  )
}
