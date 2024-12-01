import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getToken } from '@/lib/auth-service'
import { EntityConsole } from '@/lib/entity-console'
import { User, validateUser } from '@/model/user'

const getUser = async (): Promise<User | undefined> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/me`
  const token = getToken()

  if (token === undefined) {
    return undefined
  }

  const response = await fetch(baseurl, {
    next: { revalidate: 1 },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    return undefined
  }

  const user = response.json().then(validateUser)

  return user
}

export const useGetUser = (): User | undefined => {
  const { data, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    throwOnError: false,
  })

  if (error) {
    EntityConsole.error(error)
    return undefined
  }

  return data
}

export const useInvalidateUser = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: ['user'], exact: true })
}
