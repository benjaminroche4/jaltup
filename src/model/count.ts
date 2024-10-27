import { z } from 'zod'

export const CountSchema = z.object({
  count: z.number(),
})

export type Count = z.infer<typeof CountSchema>

export const validateCount = (data: unknown): Count => CountSchema.parse(data)
