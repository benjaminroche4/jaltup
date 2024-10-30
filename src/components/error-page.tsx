'use client'

import Link from 'next/link'
import * as React from 'react'

export const ErrorPage = (): React.ReactNode => (
  <section className="relative z-10 bg-sky-600 py-[120px]">
    <div className="container mx-auto">
      <div className="-mx-4 flex">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[400px] text-center">
            <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
              Oups, une erreur est survenue !
            </h4>
            <p className="mb-8 text-lg text-white">Veuillez réessayer plus tard.</p>
            <Link
              href="/"
              className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white
                transition hover:bg-white hover:text-primary"
            >
              Retour
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)
