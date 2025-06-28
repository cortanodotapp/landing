import posthog from 'posthog-js'
import { hasCookieConsent } from './cookie-consent'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || '/ingest'
    
    console.log('PostHog Init - Key exists:', !!posthogKey)
    console.log('PostHog Init - Host:', posthogHost)
    console.log('PostHog Init - Environment:', process.env.NODE_ENV)
    console.log('PostHog Init - Cookie consent:', hasCookieConsent())
    
    if (posthogKey && posthogKey.length > 0) {
      console.log('Initializing PostHog with key:', posthogKey.slice(0, 10) + '...')
      
      try {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
          capture_pageleave: true,
          debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
          loaded: (posthog) => {
            console.log('PostHog loaded successfully!')
            console.log('PostHog instance:', posthog)
          }
        })
      } catch (error) {
        console.error('Error initializing PostHog:', error)
      }
    } else {
      console.warn('PostHog key not found or empty. Please add NEXT_PUBLIC_POSTHOG_KEY to your .env.local file')
      console.warn('Expected format: NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here')
    }
  }
}
