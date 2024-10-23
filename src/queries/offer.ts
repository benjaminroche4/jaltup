import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Offer } from '@/model/offer'

const getOffer = async (publicId: string): Promise<Offer> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${publicId}`, {
    next: { revalidate: 1 },
  })

  if (!response.ok) {
    redirect('/')
  }

  const offer: Promise<Offer> = response.json()

  return offer
}

export const useGetOffer = (publicId: string) => {
  const { data } = useQuery({
    queryKey: ['offer', publicId],
    queryFn: () => getOffer(publicId),
  })

  return data
}
