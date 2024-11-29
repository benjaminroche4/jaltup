import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export const Footer: React.FC = () => (
  <footer className="bg-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex items-center justify-between py-12">
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
            Offre d&#39;alternance
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
        <div className="flex space-x-2">
          <Link href="/" target="_blank">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8"
            >
              <path
                d="M42 8.64706V39.3529C42 40.055 41.7211 40.7283 41.2247 41.2247C40.7283 41.7211 40.055 42 39.3529 42H8.64706C7.94502 42 7.27173 41.7211 6.77531 41.2247C6.27889 40.7283 6 40.055 6 39.3529V8.64706C6 7.94502 6.27889 7.27173 6.77531 6.77531C7.27173 6.27889 7.94502 6 8.64706 6H39.3529C40.055 6 40.7283 6.27889 41.2247 6.77531C41.7211 7.27173 42 7.94502 42 8.64706ZM16.5882 19.7647H11.2941V36.7059H16.5882V19.7647ZM17.0647 13.9412C17.0675 13.5407 16.9914 13.1436 16.8407 12.7726C16.69 12.4016 16.4677 12.0638 16.1866 11.7787C15.9054 11.4936 15.5707 11.2666 15.2018 11.1108C14.8329 10.955 14.4369 10.8734 14.0365 10.8706H13.9412C13.1268 10.8706 12.3458 11.1941 11.7699 11.7699C11.1941 12.3458 10.8706 13.1268 10.8706 13.9412C10.8706 14.7555 11.1941 15.5366 11.7699 16.1124C12.3458 16.6883 13.1268 17.0118 13.9412 17.0118C14.3417 17.0216 14.7402 16.9525 15.1139 16.8083C15.4877 16.664 15.8293 16.4476 16.1194 16.1713C16.4095 15.895 16.6423 15.5642 16.8045 15.1979C16.9667 14.8316 17.0551 14.437 17.0647 14.0365V13.9412ZM36.7059 26.4141C36.7059 21.3212 33.4659 19.3412 30.2471 19.3412C29.1932 19.2884 28.1438 19.5129 27.2037 19.9922C26.2637 20.4715 25.4657 21.189 24.8894 22.0729H24.7412V19.7647H19.7647V36.7059H25.0588V27.6953C24.9823 26.7725 25.273 25.8567 25.8678 25.1469C26.4625 24.4372 27.3133 23.9908 28.2353 23.9047H28.4365C30.12 23.9047 31.3694 24.9635 31.3694 27.6318V36.7059H36.6635L36.7059 26.4141Z"
                fill="black"
              />
            </svg>
          </Link>
          <Link href="/" target="_blank">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8"
            >
              <path
                d="M36.2311 12.0179C34.0764 10.613 32.5213 8.36524 32.0362 5.74493C31.9314 5.17879 31.8738 4.59614 31.8738 4H24.997L24.9859 31.5599C24.8703 34.6461 22.3302 37.1232 19.2163 37.1232C18.2485 37.1232 17.3372 36.8812 16.5348 36.459C14.6948 35.4907 13.4357 33.562 13.4357 31.3426C13.4357 28.155 16.029 25.5617 19.2163 25.5617C19.8113 25.5617 20.3821 25.6598 20.922 25.829V18.8085C20.3632 18.7324 19.7956 18.6848 19.2163 18.6848C12.2368 18.6848 6.55884 24.3631 6.55884 31.3426C6.55884 35.6248 8.69835 39.4144 11.9624 41.7059C14.0184 43.1493 16.5192 44 19.2163 44C26.1958 44 31.8738 38.3221 31.8738 31.3426V17.3673C34.571 19.3032 37.8754 20.444 41.4412 20.444V13.5672C39.5204 13.5672 37.7314 12.9962 36.2311 12.0179Z"
                fill="black"
              />
            </svg>
          </Link>
          <Link href="/" target="_blank">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.4578 17.4579C19.1929 15.7228 21.5462 14.748 24 14.748C26.4538 14.748 28.8071 15.7228 30.5421 17.4579C32.2772 19.1929 33.252 21.5462 33.252 24C33.252 26.4538 32.2772 28.8071 30.5421 30.5422C28.8071 32.2772 26.4538 33.252 24 33.252C21.5462 33.252 19.1929 32.2772 17.4578 30.5422C15.7228 28.8071 14.748 26.4538 14.748 24C14.748 21.5462 15.7228 19.1929 17.4578 17.4579ZM21.7016 29.5488C22.4303 29.8507 23.2113 30.006 24 30.006C25.5929 30.006 27.1205 29.3732 28.2469 28.2469C29.3732 27.1205 30.006 25.5929 30.006 24C30.006 22.4071 29.3732 20.8795 28.2469 19.7531C27.1205 18.6268 25.5929 17.994 24 17.994C23.2113 17.994 22.4303 18.1494 21.7016 18.4512C20.9729 18.753 20.3108 19.1954 19.7531 19.7531C19.1954 20.3108 18.753 20.9729 18.4512 21.7016C18.1493 22.4303 17.994 23.2113 17.994 24C17.994 24.7887 18.1493 25.5697 18.4512 26.2984C18.753 27.0271 19.1954 27.6892 19.7531 28.2469C20.3108 28.8046 20.9729 29.247 21.7016 29.5488Z"
                fill="black"
              />
              <path
                d="M35.303 16.1264C35.7132 15.7163 35.9436 15.16 35.9436 14.58C35.9436 14 35.7132 13.4437 35.303 13.0336C34.8929 12.6234 34.3366 12.393 33.7566 12.393C33.1766 12.393 32.6203 12.6234 32.2102 13.0336C31.8 13.4437 31.5696 14 31.5696 14.58C31.5696 15.16 31.8 15.7163 32.2102 16.1264C32.6203 16.5366 33.1766 16.767 33.7566 16.767C34.3366 16.767 34.8929 16.5366 35.303 16.1264Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5792 6.108C18.4992 6.0204 19.1112 6 24 6C28.89 6 29.5008 6.0216 31.4196 6.108C33.336 6.1956 34.6464 6.5016 35.7912 6.9444C36.9918 7.39663 38.0794 8.10507 38.9784 9.0204C39.894 9.91959 40.6025 11.0077 41.0544 12.2088C41.4996 13.3536 41.8044 14.6628 41.892 16.5792C41.9796 18.4992 42 19.1112 42 24C42 28.8888 41.9796 29.5008 41.892 31.4208C41.8044 33.3372 41.4996 34.6464 41.0556 35.7912C40.6034 36.9918 39.8949 38.0794 38.9796 38.9784C38.0796 39.8952 36.9912 40.6032 35.7912 41.0544C34.6464 41.4996 33.3372 41.8044 31.4208 41.892C29.5008 41.9796 28.8888 42 24 42C19.1112 42 18.4992 41.9796 16.5792 41.892C14.6628 41.8044 13.3536 41.4996 12.2088 41.0556C11.0082 40.6033 9.92058 39.8949 9.0216 38.9796C8.1048 38.0796 7.3968 36.9912 6.9456 35.7912C6.5004 34.6464 6.1956 33.3372 6.108 31.4208C6.0204 29.5008 6 28.89 6 24C6 19.11 6.0216 18.4992 6.108 16.5804C6.1956 14.664 6.5016 13.3536 6.9444 12.2088C7.39663 11.0082 8.10507 9.92056 9.0204 9.0216C9.9204 8.1048 11.0088 7.3968 12.2088 6.9456C13.3536 6.5004 14.6628 6.1956 16.5792 6.108ZM31.2744 9.348C29.376 9.2616 28.806 9.2436 24 9.2436C19.194 9.2436 18.624 9.2616 16.7256 9.348C14.9712 9.4284 14.0184 9.7212 13.3836 9.9684C12.6017 10.2564 11.8943 10.7161 11.3136 11.3136C10.6848 11.9436 10.2936 12.5436 9.9684 13.3836C9.72 14.0184 9.4284 14.9712 9.348 16.7256C9.2616 18.624 9.2436 19.194 9.2436 24C9.2436 28.806 9.2616 29.376 9.348 31.2744C9.4284 33.0288 9.7212 33.9816 9.9684 34.6164C10.2566 35.3982 10.7162 36.1055 11.3136 36.6864C11.8944 37.2839 12.6017 37.7435 13.3836 38.0316C14.0184 38.28 14.9712 38.5716 16.7256 38.652C18.624 38.7384 19.1928 38.7564 24 38.7564C28.8072 38.7564 29.376 38.7384 31.2744 38.652C33.0288 38.5716 33.9816 38.2788 34.6164 38.0316C35.3983 37.7437 36.1057 37.284 36.6864 36.6864C37.2839 36.1056 37.7435 35.3983 38.0316 34.6164C38.28 33.9816 38.5716 33.0288 38.652 31.2744C38.7384 29.376 38.7564 28.806 38.7564 24C38.7564 19.194 38.7384 18.624 38.652 16.7256C38.5716 14.9712 38.2788 14.0184 38.0316 13.3836C37.7064 12.5436 37.3164 11.9436 36.6864 11.3136C36.0564 10.6848 35.4564 10.2936 34.6164 9.9684C33.9816 9.72 33.0288 9.4284 31.2744 9.348Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>
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
