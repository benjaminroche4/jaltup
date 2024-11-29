import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import * as React from 'react'
import { Header } from '@/components/header'
import '../globals.css'
import {Footer} from "@/components/footer";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// eslint-disable-next-line import/no-default-export
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
