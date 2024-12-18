import { z } from 'zod'

export const JobSchema = z.object({
  description: z.string(),
  contractType: z.string(),
  duration: z.number().optional(),
  remote: z.boolean().optional(),
  studyLevel: z.string().optional(),
  startDate: z.string().datetime({ offset: true }).optional(),
})

export type Job = z.infer<typeof JobSchema>

export const validateJob = (data: unknown): Job => JobSchema.parse(data)
