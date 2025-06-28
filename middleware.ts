import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Prefix strategy - paths will be like /en, /pl, /es, /de
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames, exclude PostHog ingest routes
  matcher: ['/((?!api|ingest|_next/static|_next/image|favicon.ico).*)']
};
