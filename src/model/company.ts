import { z } from 'zod'

export const CompanySchema = z.object({
  name: z.string(),
  verified: z.boolean(),
  offerNumber: z.number(),
  websiteUrl: z.string().url().or(z.string().length(0)).optional(),
  logo: z.string().optional(),
})

export type Company = z.infer<typeof CompanySchema>

export const validateCompany = (data: unknown): Company => CompanySchema.parse(data)
