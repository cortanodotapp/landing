'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { initPostHog } from '@/lib/posthog'
import { getCookieConsent } from '@/lib/cookie-consent'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [cookieConsent, setCookieConsent] = useState<string | null>(null)

  // Initialize PostHog immediately
  useEffect(() => {
    console.log('PostHogProvider: Initializing PostHog...')
    initPostHog()
  }, [])

  // Check for cookie consent changes
  useEffect(() => {
    const checkConsent = () => {
      const consent = getCookieConsent()
      if (consent !== cookieConsent) {
        setCookieConsent(consent)
        if (consent === 'accepted') {
          console.log('PostHogProvider: Cookie notice acknowledged')
        }
      }
    }

    // Check immediately
    checkConsent()

    // Listen for storage changes (when user accepts in another tab)
    window.addEventListener('storage', checkConsent)
    
    // Also check periodically in case localStorage changes in same tab
    const interval = setInterval(checkConsent, 1000)

    return () => {
      window.removeEventListener('storage', checkConsent)
      clearInterval(interval)
    }
  }, [cookieConsent])

  useEffect(() => {
    // Track pageviews
    if (pathname && typeof window !== 'undefined') {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      
      console.log('PostHogProvider: Tracking pageview for URL:', url)
      console.log('PostHog loaded state:', posthog.__loaded)
      
      if (posthog.__loaded) {
        posthog.capture('$pageview', {
          $current_url: url,
        })
        console.log('PostHogProvider: Pageview captured')
      } else {
        console.warn('PostHogProvider: PostHog not loaded yet, skipping pageview')
      }
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
