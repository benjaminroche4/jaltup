import { z } from 'zod'

export const PlaceSchema = z.object({
  city: z.string(),
  zipCode: z.string().or(z.number()),
  fullAddress: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export type Place = z.infer<typeof PlaceSchema>

export const validatePlace = (data: unknown): Place => PlaceSchema.parse(data)
