import { z } from 'zod'

export const UserSchema = z.object({
  publicId: z.string().optional(),
  email: z.string(),
  roles: z.array(z.string()).optional(),
})

export type User = z.infer<typeof UserSchema>

export const validateUser = (data: unknown): User => UserSchema.parse(data)
