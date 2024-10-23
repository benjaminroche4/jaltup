'use client'

import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Offer } from '@/model/offer'

export const DescriptionCard = ({ offer }: { offer: Offer }) => (
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
