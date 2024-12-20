'use client'

import { XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useGetOffersCount } from '@/queries/offers-count'
import {
  useNbResults,
  useSearchPlace,
  useSearchText,
  useSetSearchPlace,
  useSetSearchText,
} from '@/store/filtersStore'

interface SearchInputProps {
  text: string
  setText: (text: string) => void
  placeholder?: string
}

const SearchInput = ({ text, setText, placeholder }: SearchInputProps) => (
  <div className="relative">
    <Input
      className={cn('pr-10')}
      placeholder={placeholder}
      value={text}
      onInput={(event: React.FormEvent<HTMLInputElement>) => setText(event.currentTarget.value)}
    />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-gray-500 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-gray-100"
      onClick={() => {
        setText('')
      }}
    >
      <XIcon className="size-4" />
      <span className="sr-only">Clear</span>
    </Button>
  </div>
)

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
    <div className="relative flex size-full flex-col gap-6 bg-red-50 p-6 py-24">
      <CardTitle className="text-xl font-bold tracking-normal">{title}</CardTitle>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:basis-3/4">
          <SearchInput
            text={searchText}
            setText={setSearchText}
            placeholder={t('placeholderText')}
          />
        </div>
        <div className="md:basis-1/4">
          <SearchInput
            text={searchPlace}
            setText={setSearchPlace}
            placeholder={t('placeholderPlace')}
          />
        </div>
      </div>
    </div>
  )
}
