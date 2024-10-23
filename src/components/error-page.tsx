'use client'

import * as React from 'react'

const ErrorPage = (): React.ReactNode => (
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-12">
    <h1 className="whitespace-pre-wrap text-3xl font-bold tracking-normal sm:text-4xl">
      Oups, une erreur est survenue !
    </h1>
    <h2 className="whitespace-pre-wrap text-3xl font-bold tracking-normal sm:text-4xl">
      Veuillez réessayer plus tard.
    </h2>
  </div>
)
export default ErrorPage
