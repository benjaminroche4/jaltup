import { z } from 'zod'
import { CompanySchema } from '@/model/company'
import { JobSchema } from '@/model/job'
import { PlaceSchema } from '@/model/place'

const OfferSchema = z.object({
  publicId: z.string(),
  title: z.string(),
  url: z.string().url(),
  dayLast: z.number(),
  slug: z.string(),
  createdAt: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }).optional(),
  premium: z.boolean(),
  tag: z.array(z.string()).optional(),
  place: PlaceSchema,
  company: CompanySchema,
  job: JobSchema,
})

const OffersSchema = z.array(OfferSchema)

export type Offer = z.infer<typeof OfferSchema>

export const validateOffer = (data: unknown): Offer => OfferSchema.parse(data)

export const validateOffers = (data: unknown): Offer[] => OffersSchema.parse(data)
