import { useQuery } from '@tanstack/react-query'
import { Offer, validateOffer } from '@/model/offer'

const getOffer = async (publicId: string): Promise<Offer> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${publicId}`, {
    next: { revalidate: 1 },
  })

  if (!response.ok) {
    throw new Error(`failed to fetch offer: status='${response.statusText}'`)
  }

  const offer = response.json().then(validateOffer)

  return offer
}

export const useGetOffer = (publicId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['offer', publicId],
    queryFn: () => getOffer(publicId),
    throwOnError: true,
  })

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return { offer: data, isLoading, isError }
}
