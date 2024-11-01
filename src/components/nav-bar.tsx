'use client'

import { HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { cn } from '@/lib/utils'

const MainMenu = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const t = useTranslations('NavBar')

  return (
    <nav className={cn('my-2 flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link href="" className="text-sm font-medium transition-colors hover:text-primary">
        <HomeIcon className="size-[1.2rem] scale-100 transition-all" />
      </Link>
      <Link
        href=""
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('offers')}
      </Link>
      <Link
        href=""
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('companies')}
      </Link>
      <Link
        href=""
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('trainings')}
      </Link>
    </nav>
  )
}

export const NavBar = () => {
  const t = useTranslations('NavBar')

  return (
    <header
      className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur
        supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex max-w-screen-2xl flex-wrap items-center p-3 px-6">
        <MainMenu />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-3">
            <Link
              href=""
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t('login')}
            </Link>
            <Link
              href=""
              className="rounded-xl border bg-slate-200 p-2 text-sm font-medium text-muted-foreground transition-colors
                hover:text-primary"
            >
              {t('subscribe')}
            </Link>
            <LocaleSwitcher />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
