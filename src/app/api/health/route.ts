import { NextResponse } from 'next/server'
import { withErrorHandling } from '@/lib/api-error-handler'

export const GET = withErrorHandling(async () => {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'cortano-landing',
    },
    { status: 200 }
  )
})
