import { useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { EntityConsole } from '@/lib/entity-console'
import { Offer, validateOffers } from '@/model/offer'

export interface OffersType {
  items: Offer[]
  total: number
}

const getOffers = async (
  title?: string,
  place?: string,
  page?: number,
  ascending?: boolean,
): Promise<OffersType> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/offers`
  const zbPage = page && page > 0 ? page - 1 : undefined
  const order = ascending ? 'asc' : 'desc'

  const params: string[] = [`order[createdAt]=${order}`, 'status=published']
  if (title && title.length > 0) {
    params.push(`title=${title}`)
  }
  if (place && place.length > 0) {
    params.push(`place=${place}`)
  }
  if (zbPage) {
    params.push(`page=${zbPage}`)
  }
  const url = params.length > 0 ? `${baseurl}?${params.join('&')}` : baseurl

  const response = await fetch(url, { next: { revalidate: 1 } })

  if (!response.ok) {
    throw new Error(`failed to fetch offers: status='${response.statusText}'`)
  }

  const json = await response.json()
  const items = validateOffers(json['hydra:member'])
  const total = z.number().parse(json['hydra:totalItems'])

  return { items, total }
}

export const useGetOffers = (
  title?: string,
  place?: string,
  page?: number,
  ascending?: boolean,
) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['offers'],
    queryFn: () => getOffers(title, place, page, ascending),
    throwOnError: true,
    staleTime: 60000, // a minute in milliseconds
  })

  if (error) {
    EntityConsole.log(error)
  }

  return { offers: data, isLoading, isError, refetch }
}

export const useInvalidateOffers = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: ['offers'], exact: true })
}
