import { useQuery } from '@tanstack/react-query'
import { EntityConsole } from '@/lib/entity-console'
import { validateCount } from '@/model/count'

const getOffersCount = async (): Promise<number> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/offers/count`

  const response = await fetch(baseurl, {
    next: { revalidate: 1 },
  })

  if (!response.ok) {
    throw new Error(`failed to fetch offers: status='${response.statusText}'`)
  }

  const count = response
    .json()
    .then((data) => validateCount(data))
    .then((data) => data.count)

  return count
}

export const useGetOffersCount = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['offers-count'],
    queryFn: getOffersCount,
    throwOnError: true,
  })

  if (error) {
    EntityConsole.log(error)
  }

  return { count: data, isLoading, isError }
}
