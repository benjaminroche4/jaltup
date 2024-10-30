'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface OrderButtonProps {
  ascending: boolean
  setAscending: React.Dispatch<React.SetStateAction<boolean>>
}

export function OrderButton({ ascending, setAscending }: OrderButtonProps) {
  const t = useTranslations('Common')

  const ascendingText = t('ascending')
  const descendingText = t('descending')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t('order', { value: ascending ? ascendingText : descendingText })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem checked={ascending} onCheckedChange={() => setAscending(true)}>
          {ascendingText}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={!ascending} onCheckedChange={() => setAscending(false)}>
          {descendingText}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
