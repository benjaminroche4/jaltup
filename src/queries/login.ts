import { useMutation } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { z } from 'zod'
import { EntityConsole } from '@/lib/entity-console'
import { TokenPayload } from '@/model/token'

export interface Credentials {
  email: string
  password: string
}

export interface Session {
  token: string
  refresh_token?: string
  decoded: TokenPayload
}

const TokenSchema = z.object({
  token: z.string(),
  refresh_token: z.string().optional(),
})

type Token = z.infer<typeof TokenSchema>

const validateToken = (data: unknown): Token => TokenSchema.parse(data)

const ErrorReponse = z.object({
  code: z.number(),
  message: z.string(),
})

const login = async (cred: Credentials): Promise<Session> => {
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
    let message
    try {
      const error = ErrorReponse.parse(json)
      message = error.message
    } catch {
      message = 'Unknown error'
    }
    throw new Error(message)
  }

  const token = validateToken(json)
  const decoded: TokenPayload = jwtDecode<TokenPayload>(token.token)

  return {
    ...token,
    decoded,
  }
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
