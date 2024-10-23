'use client'

import { BriefcaseBusiness, Crown, GraduationCap, LucideHome, MapPin, Star } from 'lucide-react'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'

export const HeaderCard = ({ offer }: { offer: Offer }) => (
  <Card>
    <CardHeader>
      <div className="mb-5 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Offres</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{offer.company.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-x-2">
          {offer.premium ? (
            <Badge
              variant="outline"
              className="flex gap-x-1 border border-yellow-500 bg-yellow-100/10 text-sm text-yellow-600"
            >
              <Crown className="h-3 w-auto" />
              Premium
            </Badge>
          ) : null}
          <Star className="stroke-gray-300 hover:fill-zinc-800 hover:stroke-zinc-800 dark:stroke-zinc-700 dark:hover:fill-white dark:hover:stroke-white" />
        </div>
      </div>
      <div className="sm:max-w-3xl">
        <h1 className="whitespace-pre-wrap text-3xl font-bold tracking-normal sm:text-4xl">
          {offer.title}
        </h1>
      </div>
    </CardHeader>
    <CardFooter>
      <div className="mt-3 grid w-full grid-cols-2 items-center gap-5 text-sm sm:flex sm:w-auto sm:gap-x-8">
        <div className="flex items-center gap-x-1.5 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-5 w-auto" />
          {offer.place.city}
        </div>
        <div className="flex items-center gap-x-1.5 text-sm text-gray-500 dark:text-gray-400">
          <GraduationCap className="h-5 w-auto" />
          {offer.job.studyLevel}
        </div>
        <div className="flex items-center gap-x-1.5 text-sm text-gray-500 dark:text-gray-400">
          <BriefcaseBusiness className="h-5 w-auto" />
          {offer.job.contractType}
        </div>
        <div className="flex items-center gap-x-1.5 text-sm text-gray-500 dark:text-gray-400">
          <LucideHome className="h-5 w-auto" />
          {offer.job.remote ? 'Télétravail' : 'Sur site'}
        </div>
      </div>
    </CardFooter>
  </Card>
)
