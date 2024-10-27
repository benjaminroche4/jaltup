'use client'

import * as React from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useGetOffersCount } from '@/queries/offers-count'

interface SearchBarProps {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  searchPlace: string
  setSearchPlace: React.Dispatch<React.SetStateAction<string>>
}

export const Search = ({
  searchText,
  setSearchText,
  searchPlace,
  setSearchPlace,
}: SearchBarProps) => {
  const { count } = useGetOffersCount()

  return (
    <Card
      className="relative flex size-full flex-col gap-6 p-6 transition duration-100 hover:shadow-md
        dark:hover:shadow-gray-800"
    >
      <CardTitle className="text-xl font-bold tracking-normal">
        Trouver une alternance parmi {count ?? ''} annonces.
      </CardTitle>
      <div className="flex flex-col gap-6 md:flex-row">
        <Input
          className="md:basis-3/4"
          placeholder="Recherche par intitulé, mot clé..."
          value={searchText}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchText(event.currentTarget.value)
          }
        />
        <Input
          className="md:basis-1/4"
          placeholder="Ville..."
          value={searchPlace}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchPlace(event.currentTarget.value)
          }
        />
      </div>
    </Card>
  )
}
