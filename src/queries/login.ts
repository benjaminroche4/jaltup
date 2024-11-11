import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { EntityConsole } from '@/lib/entity-console'
import { Token, validateToken } from '@/model/token'

export interface Credentials {
  email: string
  password: string
}

const ErrorReponse = z.object({
  code: z.number(),
  message: z.string(),
})

const login = async (cred: Credentials): Promise<Token> => {
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/login`

  const response = await fetch(baseurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cred),
  })

  const json = await response.json()

  if (!response.ok) {
    let message = 'Unknown error'
    try {
      const error = ErrorReponse.parse(json)
      message = error.message
    } catch {
      message = 'Unknown error'
    }
    throw new Error(message)
  }

  const token = validateToken(json)

  return token
}

export const useLogin = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: Credentials) => login(data),
  })

  if (error) {
    EntityConsole.error(error)
  }

  return { mutate, isLoading: isPending, isError, error }
}
