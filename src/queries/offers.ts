import { useQuery } from '@tanstack/react-query'
import { Offer } from '@/model/offer'

const getOffers = async (): Promise<Offer[]> => {
  const offers: Offer[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/offers?order[createdAt]=desc&status=published`,
    { next: { revalidate: 1 } },
  )
    .then((response) => response.json())
    .then((data) => data['hydra:member'])

  return offers
}

export const useGetOffers = () => {
  const { data } = useQuery({
    queryKey: ['offers'],
    queryFn: getOffers,
  })

  return data
}
