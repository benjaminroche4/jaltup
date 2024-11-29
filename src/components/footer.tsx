import Link from 'next/link'
import * as React from 'react'
import Image from "next/image";

export const Footer: React.FC = () => (
  <footer className="bg-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex justify-between py-12">
        <div>
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Jaltup</span>
            <Image
              src={'logos/logo_black.svg'}
              alt={'Logo Jaltup'}
              width={'100'}
              height={'110'}
              className={'mt-1'}
            />
          </Link>
        </div>
        <div className="space-x-12">
          <Link href="/" className="text-sm font-medium text-gray-900">
            Offre d'alternance
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-900">
            Entreprise
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-900">
            Formation
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-900">
            Contactez-nous
          </Link>
        </div>
        <p>eef</p>
      </div>
      <div
        className="flex flex-col-reverse flex-wrap items-center justify-center gap-y-5 py-6 sm:flex-row
          sm:justify-between"
      >
        <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Jaltup SARL</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-sm font-light text-gray-500">
            Mentions Légales
          </Link>
          <Link href="/" className="text-sm font-light text-gray-500">
            Données personnelles
          </Link>
        </div>
      </div>
    </div>
  </footer>
)
