import { NextRequest, NextResponse } from 'next/server';

// Rewrite every incoming request to the site root `/`.
// This middleware intentionally does not use any i18n or next-intl logic.
export function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // Don't rewrite asset, API, or internal Next.js requests
    const isFavicon = pathname === '/favicon.ico';
    const isApi = pathname.startsWith('/api');
    const isIngest = pathname.startsWith('/ingest');
    const isNextInternal = pathname.startsWith('/_next');
    const isStatic = pathname.startsWith('/static') || pathname.startsWith('/public');
    // Also ignore requests that look like files (have an extension)
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathname);

    if (isFavicon || isApi || isIngest || isNextInternal || isStatic || hasExtension) {
      return NextResponse.next();
    }

    // Rewrite all other requests to the site root
    url.pathname = '/';
    return NextResponse.rewrite(url);
  } catch (error) {
    // On error, continue without rewriting
    return NextResponse.next();
  }
}

// Match all incoming requests
export const config = {
  matcher: ['/:path*']
};
