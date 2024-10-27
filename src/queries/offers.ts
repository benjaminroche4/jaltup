import { useQuery, useQueryClient } from '@tanstack/react-query'
import { EntityConsole } from '@/lib/entity-console'
import { Offer, validateOffers } from '@/model/offer'

const getOffers = async (title?: string, place?: string): Promise<Offer[] | undefined> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/offers`

  const params: string[] = ['order[createdAt]=desc', 'status=published']
  if (title && title.length > 0) {
    params.push(`title=${title}`)
  }
  if (place && place.length > 0) {
    params.push(`place=${place}`)
  }
  const url = params.length > 0 ? `${baseurl}?${params.join('&')}` : baseurl

  const response = await fetch(url, { next: { revalidate: 1 } })

  if (!response.ok) {
    throw new Error(`failed to fetch offers: status='${response.statusText}'`)
  }

  const offers = response
    .json()
    .then((data) => data['hydra:member'])
    .then((data) => validateOffers(data))

  return offers
}

export const useGetOffers = (title?: string, place?: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['offers'],
    queryFn: () => getOffers(title, place),
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
