import { redirect } from 'next/navigation'
import { Offer } from '@/model/offer'

export async function getOffer(publicId: string): Promise<Offer> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${publicId}`, {
    next: { revalidate: 1 },
  })

  if (!response.ok) {
    redirect('/')
  }

  const offer: Promise<Offer> = response.json()

  return offer
}
