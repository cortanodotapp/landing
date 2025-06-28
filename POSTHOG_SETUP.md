# PostHog Integration Setup (EU Region)

This project includes PostHog analytics integration with same-domain proxying for better performance and privacy compliance. The integration is configured for PostHog's EU region for GDPR compliance.

## Setup

1. **Get PostHog credentials:**
   - Sign up at [PostHog.com](https://posthog.com)
   - Create a new project in the **EU region**
   - Copy your Project API Key from the project settings

2. **Environment Variables:**
   Copy `.env.example` to `.env.local` and fill in your PostHog credentials:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_project_key_here
   NEXT_PUBLIC_POSTHOG_HOST=/ingest
   ```

3. **Configuration:**
   - PostHog is proxied through `/ingest/*` routes for same-domain analytics
   - Configured for **EU region** (eu.i.posthog.com)
   - Automatic pageview tracking is enabled
   - GDPR-compliant with `person_profiles: 'identified_only'`

## Usage

### Basic Event Tracking
```tsx
import { trackEvent } from '@/lib/analytics'

// Track custom events
trackEvent('button_clicked', { button_name: 'signup', location: 'hero' })
```

### Using the Hook
```tsx
import { usePostHog } from '@/hooks/usePostHog'

export function MyComponent() {
  const { posthog, isLoaded } = usePostHog()
  
  const handleClick = () => {
    if (isLoaded) {
      posthog?.capture('custom_event', { property: 'value' })
    }
  }
}
```

### Common Analytics Functions
```tsx
import { 
  trackButtonClick, 
  trackFeatureUsed, 
  trackSignup, 
  identifyUser 
} from '@/lib/analytics'

// Track button clicks
trackButtonClick('cta_button', 'homepage')

// Track feature usage
trackFeatureUsed('search', { query: 'example' })

// Track user signup
trackSignup('email')

// Identify users (after login)
identifyUser('user123', { email: 'user@example.com', plan: 'pro' })
```

## Features

- ✅ Same-domain proxying for better performance
- ✅ Automatic pageview tracking
- ✅ GDPR compliance ready
- ✅ TypeScript support
- ✅ Development environment detection
- ✅ Easy-to-use utility functions
- ✅ Custom hook for React components

## Privacy & GDPR

The integration is configured with privacy in mind:
- `person_profiles: 'identified_only'` - Only creates profiles for identified users
- Same-domain proxying reduces third-party tracking concerns
- No automatic user identification without explicit consent
