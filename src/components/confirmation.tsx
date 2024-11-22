'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ConfirmationProps {
  title: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onOk?: () => void
  onCancel?: () => void
}

export const Confirmation = ({ title, open, setOpen, onOk, onCancel }: ConfirmationProps) => {
  const t = useTranslations()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{t('Common.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onOk}>{t('Common.ok')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
