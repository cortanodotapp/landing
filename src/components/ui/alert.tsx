import React from 'react'
import { cn } from '@/lib/utils'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'warning' | 'error' | 'success' | 'info'
  children: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-background border-border text-foreground',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/20 dark:border-yellow-800 dark:text-yellow-300',
      error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300',
      success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300',
      info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300'
    }

    const icons = {
      default: null,
      warning: AlertTriangle,
      error: XCircle,
      success: CheckCircle,
      info: Info
    }

    const Icon = icons[variant]

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border p-4 flex items-start gap-3',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {Icon && <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }
