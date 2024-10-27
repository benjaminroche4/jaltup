'use client'

import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Company } from '@/model/company'

export const CompanyCard = ({ company }: { company: Company }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-center gap-x-4">
        <Avatar>
          <AvatarImage src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${company.logo}`} />
          <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold tracking-wide">{company.name}</h3>
      </div>
    </CardHeader>
    <CardFooter className="grid grid-cols-3 divide-x text-center">
      {company.websiteUrl ? (
        <Link
          href={company.websiteUrl}
          target="_blank"
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          Voir le site
        </Link>
      ) : null}
      <p className="text-sm text-muted-foreground">
        {company.offerNumber} {company.offerNumber > 1 ? 'offres' : 'offre'}
      </p>
      <p className="flex items-center justify-center gap-x-1 text-sm text-muted-foreground">
        {company.verified ? (
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
