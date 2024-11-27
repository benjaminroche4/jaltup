import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { EntityConsole } from '@/lib/entity-console'
import { User } from '@/model/user'

const ErrorReponse = z.object({
  code: z.number(),
  message: z.string(),
})

const register = async (registerUser: User) => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/register`

  const response = await fetch(baseurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
    },
    body: JSON.stringify(registerUser),
  })

  const json = await response.json()

  if (!response.ok) {
    let message = 'Unknown error'
    try {
      const error = ErrorReponse.parse(json)
      message = error.message
    } catch {
      message = 'Failed to register a new user'
    }
    throw new Error(message)
  }
}

export const useRegister = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: User) => register(data),
  })

  if (error) {
    EntityConsole.error(error)
  }

  return { mutate, isLoading: isPending, isError, error }
}
