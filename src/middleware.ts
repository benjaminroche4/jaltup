import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// eslint-disable-next-line import/no-default-export
export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*'],
}
