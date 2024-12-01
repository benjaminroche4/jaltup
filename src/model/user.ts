import { z } from 'zod'

export const UserSchema = z.object({
  publicId: z.string().optional(),
  email: z.string(),
  password: z.string().optional(),
  roles: z.array(z.string()).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  referralCode: z.string().optional(),
  profilePicture: z.string().optional(),
  study: z
    .object({
      school: z.string().optional(),
      city: z.string().optional(),
      level: z.string().optional(),
    })
    .optional()
    .nullable(),
  userInterest: z.array(z.string()).optional(),
})

export type User = z.infer<typeof UserSchema>

export const validateUser = (data: unknown): User => UserSchema.parse(data)
