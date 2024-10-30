import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { EntityConsole } from '@/lib/entity-console'
import { Offer, validateOffers } from '@/model/offer'

export interface OffersType {
  items: Offer[]
  total: number
}

export interface GetOffersParams {
  title?: string
  place?: string
  page?: number
  ascending?: boolean
}

const getOffers = async (params: GetOffersParams): Promise<OffersType> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/offers`
  const zbPage = params.page && params.page > 0 ? params.page - 1 : undefined
  const order = params.ascending ? 'asc' : 'desc'

  const urlParams: string[] = [`order[createdAt]=${order}`, 'status=published']
  if (params.title && params.title.length > 0) {
    urlParams.push(`title=${params.title.toLocaleLowerCase()}`)
  }
  if (params.place && params.place.length > 0) {
    urlParams.push(`place=${params.place.toLocaleLowerCase()}`)
  }
  if (zbPage) {
    urlParams.push(`page=${zbPage}`)
  }
  const url = urlParams.length > 0 ? `${baseurl}?${urlParams.join('&')}` : baseurl

  const response = await fetch(url, { next: { revalidate: 1 } })

  if (!response.ok) {
    throw new Error(`failed to fetch offers: status='${response.statusText}'`)
  }

  const json = await response.json()
  const items = validateOffers(json['hydra:member'])
  const total = z.number().parse(json['hydra:totalItems'])

  return { items, total }
}

export const useGetOffers = (params: GetOffersParams) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['offers'],
    queryFn: () => getOffers(params),
    throwOnError: true,
    staleTime: 60000, // a minute in milliseconds
  })

  if (error) {
    EntityConsole.log(error)
  }

  return { offers: data, isLoading, isError, refetch }
}
