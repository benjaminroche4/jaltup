import {
  BriefcaseBusiness,
  CheckCircle,
  Crown,
  GraduationCap,
  LucideHome,
  MapPin,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'
import { getOffer } from '@/queries/offer'

const HeaderCard = (offer: Offer) => (
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

const DescriptionCard = (offer: Offer) => (
  <Card>
    <CardHeader>Description du poste</CardHeader>
    <CardContent>
      <ReactMarkdown className="text-muted-foreground">{offer.job.description}</ReactMarkdown>
      <CardDescription className="mt-5">
        Publié le{' '}
        <span className="underline underline-offset-4">
          {new Date(offer.createdAt).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          .
        </span>
      </CardDescription>
    </CardContent>
    <CardFooter>
      <div className="space-x-2 space-y-2 text-sm text-muted-foreground">
        {offer.tag.map((tag: string) => (
          <Badge key={offer.publicId} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </CardFooter>
  </Card>
)

const CompanyCard = (offer: Offer) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-center gap-x-4">
        <Avatar>
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}
          />
          <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold tracking-wide">{offer.company.name}</h3>
      </div>
    </CardHeader>
    <CardFooter className="grid grid-cols-3 divide-x text-center">
      <Link
        href={offer.company.websiteUrl}
        target="_blank"
        className="text-sm text-muted-foreground underline underline-offset-4"
      >
        Voir le site
      </Link>
      <p className="text-sm text-muted-foreground">
        {offer.company.offerNumber} {offer.company.offerNumber > 1 ? 'offres' : 'offre'}
      </p>
      <p className="flex items-center justify-center gap-x-1 text-sm text-muted-foreground">
        {offer.company.verified ? (
          <>
            Vérifié
            <CheckCircle className="h-4 w-auto" />
          </>
        ) : (
          'Non Vérifié'
        )}
      </p>
    </CardFooter>
  </Card>
)

const applyCard = (offer: Offer) => (
  <Card>
    <CardHeader>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1 rounded-2xl bg-muted px-2 py-4 text-center">
          <p className="text-2xl font-semibold">44</p>
          <p className="text-sm text-muted-foreground">candidatures</p>
        </div>
        <div className="space-y-1 rounded-2xl bg-muted px-2 py-4 text-center">
          <p className="text-2xl font-semibold">{offer.dayLast}</p>
          <p className="text-sm text-muted-foreground">jours restant</p>
        </div>
      </div>
    </CardHeader>
    <CardFooter>
      <Button variant="default" size="xl" className="w-full">
        <Link href={offer.url} target="_blank">
          Postuler à l&apos;offre
        </Link>
      </Button>
    </CardFooter>
  </Card>
)

export default async function OfferPage({ params }: { params: { publicId: string } }) {
  const offer: Offer = await getOffer(params.publicId)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-12">
      {HeaderCard(offer)}
      <div className="mt-6 grid grid-cols-3 gap-6 md:mt-8 md:gap-8">
        <div className="col-span-3 lg:col-span-2">{DescriptionCard(offer)}</div>
        <div className="col-span-3 space-y-6 md:space-y-8 lg:col-span-1">
          {CompanyCard(offer)}
          {applyCard(offer)}
        </div>
      </div>
    </main>
  )
}
