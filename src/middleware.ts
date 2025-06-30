import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextRequest, NextResponse } from 'next/server';
import { trackServerError } from './lib/posthog';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Prefix strategy - paths will be like /en, /pl, /es, /de
  localePrefix: 'as-needed'
});

export async function middleware(request: NextRequest) {
  try {
    // Run the internationalization middleware
    const response = intlMiddleware(request);
    
    // Add error tracking headers for better debugging
    if (response) {
      response.headers.set('x-error-tracking', 'enabled');
    }
    
    return response;
  } catch (error) {
    // Track middleware errors
    if (error instanceof Error) {
      await trackServerError({
        type: 'middleware_error',
        message: error.message,
        stack: error.stack,
        route: request.nextUrl.pathname,
        method: request.method,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        additionalContext: {
          userAgent: request.headers.get('user-agent'),
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          pathname: request.nextUrl.pathname,
          searchParams: request.nextUrl.searchParams.toString()
        }
      });
    }
    
    // Return a basic response to prevent complete failure
    return NextResponse.next();
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|es|pl)/:path*', '/((?!api|ingest|_next/static|_next/image|favicon.ico).*)']
};
