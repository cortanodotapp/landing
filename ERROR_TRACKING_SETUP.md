# PostHog Error Tracking Setup

This document explains the comprehensive error tracking setup implemented for both client-side and server-side error monitoring using PostHog.

## Features Implemented

### 1. Client-Side Error Tracking

#### Automatic Error Capture
- **JavaScript Errors**: All unhandled JavaScript errors are automatically captured
- **Promise Rejections**: Unhandled promise rejections are tracked
- **Console Errors**: Console error logs are monitored (filtered to avoid debug noise)

#### React Error Boundaries
- **ErrorBoundary Component**: Wraps the entire application to catch React component errors
- **Custom Fallback UI**: Provides user-friendly error pages while tracking errors
- **Development Details**: Shows error stack traces in development mode

#### Performance Monitoring
- **Page Load Metrics**: DNS lookup, TCP connection, server response times
- **Core Web Vitals**: LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
- **Slow API Requests**: Tracks requests taking longer than 2 seconds
- **Failed API Requests**: Monitors and reports failed fetch requests

### 2. Server-Side Error Tracking

#### API Route Error Handling
- **Automatic Wrapping**: API routes can be wrapped with `withErrorHandling`
- **Structured Error Responses**: Consistent error response format
- **Error Classification**: Different error types (validation, auth, server, etc.)

#### Middleware Error Tracking
- **Request Pipeline Errors**: Catches errors in Next.js middleware
- **Internationalization Errors**: Tracks i18n-related failures

## Usage Examples

### Client-Side Error Tracking

#### Using Error Boundaries
```tsx
import { ErrorBoundary } from '@/components/error-boundary'

// Wrap components that might throw errors
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

#### Manual Error Tracking
```tsx
import { trackError } from '@/lib/posthog'
import { useErrorTracking } from '@/lib/error-tracking'

const MyComponent = () => {
  const { trackError: trackBusinessError } = useErrorTracking()

  const handleAction = async () => {
    try {
      await riskyOperation()
    } catch (error) {
      // Track business logic errors
      trackBusinessError('user_action_failed', error, {
        userId: user.id,
        action: 'submit_form'
      })
    }
  }
}
```

### Server-Side Error Tracking

#### API Route with Error Handling
```typescript
import { withErrorHandling, createApiError } from '@/lib/api-error-handler'

export const POST = withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  
  if (!body.email) {
    throw createApiError('Email is required', 400, 'VALIDATION_ERROR')
  }
  
  // Your API logic here
  return NextResponse.json({ success: true })
})
```

#### Manual Server Error Tracking
```typescript
import { trackServerError } from '@/lib/posthog'

try {
  await databaseOperation()
} catch (error) {
  await trackServerError({
    type: 'database_error',
    message: error.message,
    stack: error.stack,
    route: '/api/users',
    method: 'POST',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    additionalContext: {
      userId: user.id,
      operation: 'create_user'
    }
  })
  throw error
}
```

## Error Types Tracked

### Client-Side Events
- `javascript_error`: Unhandled JavaScript errors
- `unhandled_promise_rejection`: Promise rejections
- `console_error`: Console error messages
- `manual_error`: Manually tracked errors
- `business_logic_error`: Application-specific errors
- `user_interaction_error`: UI interaction failures
- `navigation_error`: Routing/navigation issues

### Server-Side Events
- `api_error`: API route errors
- `middleware_error`: Middleware failures
- `database_error`: Database operation failures
- `validation_error`: Input validation errors
- `authentication_error`: Auth-related errors

### Performance Events
- `page_performance`: Page load metrics
- `web_vital_lcp`: Largest Contentful Paint
- `web_vital_fid`: First Input Delay
- `web_vital_cls`: Cumulative Layout Shift
- `slow_api_request`: Requests > 2 seconds
- `failed_api_request`: Failed HTTP requests

## PostHog Dashboard

### Setting Up Dashboards

1. **Error Overview Dashboard**
   - Total errors by type
   - Error rate trends
   - Most common error messages
   - Affected user count

2. **Performance Dashboard**
   - Core Web Vitals trends
   - Page load time distribution
   - Slow API request analysis
   - Failed request patterns

3. **User Impact Dashboard**
   - Users affected by errors
   - Error frequency per user
   - Geographic error distribution
   - Device/browser error patterns

### Useful Queries

#### Most Common Errors
```sql
SELECT 
  properties.$exception_type as error_type,
  properties.$exception_message as error_message,
  count() as occurrences
FROM events 
WHERE event = '$exception'
  AND timestamp > now() - interval 7 day
GROUP BY error_type, error_message
ORDER BY occurrences DESC
LIMIT 20
```

#### Error Rate by Page
```sql
SELECT 
  properties.$current_url as page,
  count() as error_count,
  countIf(event = '$pageview') as page_views,
  (error_count / page_views) * 100 as error_rate
FROM events
WHERE timestamp > now() - interval 1 day
GROUP BY page
HAVING page_views > 10
ORDER BY error_rate DESC
```

## Configuration

### Environment Variables Required
```env
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com  # or your custom host
NODE_ENV=production  # or development
```

### PostHog Configuration
The PostHog client is configured with:
- Exception tracking enabled
- Session recording for error replay
- Performance monitoring
- Debug mode in development

## Testing Error Tracking

### Test Client-Side Errors
```javascript
// Throw a test error in browser console
throw new Error('Test client error')

// Test promise rejection
Promise.reject(new Error('Test promise rejection'))
```

### Test Server-Side Errors
Visit these endpoints to test different error types:
- `/api/test-error?type=validation` - 400 error
- `/api/test-error?type=server_error` - 500 error
- `/api/test-error?type=timeout` - Timeout error

## Best Practices

### Do's
- ✅ Use structured error messages
- ✅ Include relevant context (user ID, action, etc.)
- ✅ Set up alerts for critical errors
- ✅ Monitor error trends regularly
- ✅ Use error boundaries for component isolation

### Don'ts
- ❌ Don't track sensitive information (passwords, tokens)
- ❌ Don't track every console.log as an error
- ❌ Don't ignore performance impact of error tracking
- ❌ Don't track expected errors (validation failures)

## Monitoring and Alerts

### Recommended Alerts
1. **High Error Rate**: > 5% error rate in 5 minutes
2. **Critical Errors**: Any 500-level errors
3. **Performance Degradation**: Core Web Vitals above thresholds
4. **New Error Types**: First occurrence of new error patterns

### Key Metrics to Monitor
- Error rate percentage
- Mean time to error resolution
- User impact (% of users affected)
- Error recurrence rate
- Performance regression indicators
