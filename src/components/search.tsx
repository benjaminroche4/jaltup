'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useGetOffersCount } from '@/queries/offers-count'
import {
  useNbResults,
  useSearchPlace,
  useSearchText,
  useSetSearchPlace,
  useSetSearchText,
} from '@/store/filtersStore'

export const Search = () => {
  const { count } = useGetOffersCount()
  const nbResults = useNbResults()
  const searchText = useSearchText()
  const searchPlace = useSearchPlace()
  const setSearchText = useSetSearchText()
  const setSearchPlace = useSetSearchPlace()

  const t = useTranslations('Search')

  const title =
    (searchText || searchPlace) && nbResults > 0
      ? t('title1', { nb: nbResults })
      : t('title2', { nb: count })

  return (
    <Card
      className="relative flex size-full flex-col gap-6 p-6 transition duration-100 hover:shadow-md
        dark:hover:shadow-gray-800"
    >
      <CardTitle className="text-xl font-bold tracking-normal">{title}</CardTitle>
      <div className="flex flex-col gap-6 md:flex-row">
        <Input
          className="md:basis-3/4"
          placeholder={t('placeholderText')}
          value={searchText}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchText(event.currentTarget.value)
          }
        />
        <Input
          className="md:basis-1/4"
          placeholder={t('placeholderPlace')}
          value={searchPlace}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchPlace(event.currentTarget.value)
          }
        />
      </div>
    </Card>
  )
}
