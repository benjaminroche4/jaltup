import { Company } from './company'
import { job } from './job'
import { Place } from './place'

export interface Offer {
  publicId: string
  title: string
  url: string
  place: Place
  dayLast: number
  company: Company
  job: job
  slug: string
  createdAt: string
  premium: boolean
  tag: string[]
}
