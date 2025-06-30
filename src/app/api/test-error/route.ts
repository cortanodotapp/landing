import { NextRequest } from 'next/server'
import { withErrorHandling, createApiError } from '@/lib/api-error-handler'

export const GET = withErrorHandling(async (request: NextRequest) => {
  // Simulate different types of errors for testing
  const { searchParams } = new URL(request.url)
  const errorType = searchParams.get('type')

  switch (errorType) {
    case 'validation':
      throw createApiError('Invalid request parameters', 400, 'VALIDATION_ERROR')
    
    case 'unauthorized':
      throw createApiError('Unauthorized access', 401, 'UNAUTHORIZED')
    
    case 'not_found':
      throw createApiError('Resource not found', 404, 'NOT_FOUND')
    
    case 'server_error':
      throw createApiError('Internal server error', 500, 'INTERNAL_ERROR')
    
    case 'timeout':
      // Simulate a timeout error
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 100)
      })
      break
    
    case 'database':
      // Simulate a database error
      throw new Error('Database connection failed')
    
    default:
      return Response.json({
        message: 'Error testing endpoint',
        availableTypes: [
          'validation',
          'unauthorized', 
          'not_found',
          'server_error',
          'timeout',
          'database'
        ],
        usage: '/api/test-error?type=validation'
      })
  }
})
