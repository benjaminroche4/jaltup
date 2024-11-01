'use client'

import { GlobeIcon } from '@radix-ui/react-icons'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { useCallback, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routing, usePathname, useRouter } from '@/i18n/routing'

export const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter()
  const params = useParams()
  const locale = useLocale()
  const pathname = usePathname()
  const startTransition = useTransition()[1]

  const onSelectChange = useCallback(
    (nextLocale: string) => {
      startTransition(() => {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: nextLocale },
        )
      })
    },
    [params, pathname, router, startTransition],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-2">
          <GlobeIcon className="mr-1 size-[1.2rem] rotate-0 scale-100 transition-all" />
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {routing.locales.map((cur) => (
          <DropdownMenuCheckboxItem
            key={cur}
            checked={cur === locale}
            onCheckedChange={() => onSelectChange(cur)}
          >
            {t('locale', { locale: cur })}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
