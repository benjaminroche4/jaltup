import { useQuery, useQueryClient } from '@tanstack/react-query'
import { EntityConsole } from '@/lib/entity-console'
import { Offer, validateOffer } from '@/model/offer'

const getOffer = async (publicId: string): Promise<Offer> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/offers/${publicId}`

  const response = await fetch(baseurl, {
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
    EntityConsole.error(error)
  }

  return { offer: data, isLoading, isError }
}

export const useInvalidateOffer = (publicId: string) => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: ['offer', publicId], exact: true })
}
