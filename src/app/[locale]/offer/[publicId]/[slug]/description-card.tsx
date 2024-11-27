'use client'

import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'

export const DescriptionCard = ({ offer }: { offer: Offer }) => {
  const t = useTranslations()
  const locale = useLocale()
  const date = new Date(offer.createdAt).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card>
      <CardHeader>{t('Offer.description')}</CardHeader>
      <CardContent>
        <ReactMarkdown className="text-muted-foreground">{offer.job.description}</ReactMarkdown>
        <CardDescription className="mt-5">
          {t('Offer.publishedOn')}
          <span className="underline underline-offset-4">{date}.</span>
        </CardDescription>
      </CardContent>
      {offer.tag ? (
        <CardFooter>
          <div className="space-x-2 space-y-2 text-sm text-muted-foreground">
            {offer.tag.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      ) : null}
    </Card>
  )
}
