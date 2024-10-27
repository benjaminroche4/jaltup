import { useQuery } from '@tanstack/react-query'
import { Offer, validateOffers } from '@/model/offer'

const getOffers = async (): Promise<Offer[] | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/offers?order[createdAt]=desc&status=published`,
    { next: { revalidate: 1 } },
  )

  if (!response.ok) {
    throw new Error(`failed to fetch offers: status='${response.statusText}'`)
  }

  const offers = response
    .json()
    .then((data) => data['hydra:member'])
    .then((data) => validateOffers(data))

  return offers
}

export const useGetOffers = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['offers'],
    queryFn: getOffers,
    throwOnError: true,
  })

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return { offers: data, isLoading, isError }
}
