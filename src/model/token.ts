import { z } from 'zod'

export const TokenSchema = z.object({
  token: z.string(),
  refresh_token: z.string().optional(),
})

export type Token = z.infer<typeof TokenSchema>

export const validateToken = (data: unknown): Token => TokenSchema.parse(data)
