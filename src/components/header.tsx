'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { BriefcaseBusiness, GraduationCap, Search, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { useState } from 'react'
import { Confirmation } from '@/components/confirmation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getUserAvatar, getUsername, isLogged, useLogout } from '@/lib/auth-service'
import { cn } from '@/lib/utils'

const MainMenu = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const t = useTranslations('NavBar')

  return (
    <nav className={cn('my-2 flex items-center space-x-8', className)} {...props}>
      <Link href="/" className="mt-1 transition-colors">
        <Image src={'logos/logo_black.svg'} alt={'Logo Jaltup'} width={'100'} height={'110'} />
      </Link>
      <div className="hidden items-center space-x-8 lg:flex">
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 text-sm font-medium text-gray-900 transition-colors
            hover:text-primary"
        >
          <Search size={20} />
          {t('offers')}
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 text-sm font-medium text-gray-900 transition-colors
            hover:text-primary"
        >
          <BriefcaseBusiness size={20} />
          {t('companies')}
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 text-sm font-medium text-gray-900 transition-colors
            hover:text-primary"
        >
          <GraduationCap size={20} />
          {t('training')}
        </Link>
      </div>
    </nav>
  )
}

export const Header = () => {
  const t = useTranslations('NavBar')
  const locale = useLocale()
  const router = useRouter()
  const { logout } = useLogout()
  const logged = isLogged()
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:p-2 lg:px-8"
      >
        <MainMenu />
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-7 text-gray-900" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <nav className="flex items-center gap-3">
            <Confirmation
              title={t('confirm')}
              open={isLogoutConfirmOpen}
              setOpen={setIsLogoutConfirmOpen}
              onOk={() => {
                logout()
                router.push('/')
              }}
            />
            {logged ? (
              <Link
                href=""
                onClick={() => {
                  setIsLogoutConfirmOpen(true)
                }}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t('logout')}
              </Link>
            ) : (
              <Button className="rounded-xl" variant="secondary" size="xl">
                <Link href={`/${locale}/connexion`}>{t('login')}</Link>
              </Button>
            )}
            <Button className="rounded-xl" size="xl">
              <Link href="/">{t('subscribe')}</Link>
            </Button>
            {logged ? (
              <Avatar>
                <AvatarImage src={getUserAvatar()} />
                <AvatarFallback>{(getUsername() ?? '?').charAt(0)}</AvatarFallback>
              </Avatar>
            ) : null}
          </nav>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-2 px-6 sm:max-w-sm sm:ring-1
            sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Jaltup</span>
              <Image
                src={'logos/logo_black.svg'}
                alt={'Logo Jaltup'}
                width={'100'}
                height={'110'}
                className={'mt-1'}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-7 text-gray-900" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 flex items-center justify-between gap-3.5 rounded-lg px-3 py-2 text-base/7 font-medium
                    transition duration-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <Search size={20} />
                    {t('offers')}
                  </div>
                  <Badge variant="secondary">3942</Badge>
                </Link>
                <Link
                  href="/"
                  className="-mx-3 flex items-center justify-between gap-3.5 rounded-lg px-3 py-2 text-base/7 font-medium
                    text-gray-900 transition duration-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <BriefcaseBusiness size={20} />
                    {t('companies')}
                  </div>
                  <Badge variant="secondary">324</Badge>
                </Link>
                <Link
                  href="/"
                  className="-mx-3 flex items-center justify-between gap-3.5 rounded-lg px-3 py-2 text-base/7 font-medium
                    text-gray-900 transition duration-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <GraduationCap size={20} />
                    {t('training')}
                  </div>
                  <Badge variant="secondary">139</Badge>
                </Link>
                <Link
                  href="/"
                  className="-mx-3 flex items-center justify-between gap-3.5 rounded-lg border border-dashed px-3 py-2
                    text-base/7 font-medium text-gray-900 transition duration-100 hover:border-solid hover:bg-yellow-400"
                >
                  <div className="flex items-center gap-3.5">
                    <Star size={20} className="fill-black" />
                    Premium
                  </div>
                  <Badge variant="secondary">Beta</Badge>
                </Link>
              </div>
              <div>
                <div className="mt-6 grid grid-cols-2 space-x-6">
                  <Button className="rounded-xl" variant="secondary" size="xl">
                    <Link href={`/${locale}/login`}>{t('login')}</Link>
                  </Button>
                  <Button className="rounded-xl" size="xl">
                    <Link href="/">{t('subscribe')}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
