'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ASCENDING = 'Ascendant'
const DESCENDING = 'Descendant'

interface OrderButtonProps {
  ascending: boolean
  setAscending: React.Dispatch<React.SetStateAction<boolean>>
}

export function OrderButton({ ascending, setAscending }: OrderButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{ascending ? `Tri: ${ASCENDING}` : `Tri: ${DESCENDING}`}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem checked={ascending} onCheckedChange={() => setAscending(true)}>
          {ASCENDING}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={!ascending} onCheckedChange={() => setAscending(false)}>
          {DESCENDING}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
