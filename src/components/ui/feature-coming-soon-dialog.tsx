"use client"

import * as React from "react"
import { Mail } from "lucide-react"
import { useLocale, useTranslations } from 'next-intl'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { signupForNewsletter } from "@/lib/actions/newsletter"
import type { SupportedLocale } from "@/lib/mail"

interface FeatureComingSoonDialogProps {
  children: React.ReactNode
  featureName: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FeatureComingSoonDialog({
  children,
  featureName,
  open,
  onOpenChange,
}: FeatureComingSoonDialogProps) {
  const t = useTranslations('dialog')
  const locale = useLocale() as SupportedLocale
  
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setSubmitStatus({
        type: 'error',
        message: t('emailRequired')
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        type: 'error',
        message: t('invalidEmail')
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await signupForNewsletter({
        email: email.trim().toLowerCase(),
        locale,
        source: `coming-soon-${featureName.toLowerCase().replace(/\s+/g, '-')}`
      })

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: t('signupSuccess')
        })
        // Clear form after success
        setEmail("")
      } else {
        if (result.rateLimited) {
          setSubmitStatus({
            type: 'error',
            message: t('rateLimited')
          })
        } else if (result.message.includes('already subscribed')) {
          setSubmitStatus({
            type: 'error',
            message: t('alreadySubscribed')
          })
        } else {
          setSubmitStatus({
            type: 'error',
            message: t('signupError')
          })
        }
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setSubmitStatus({
        type: 'error',
        message: t('signupError')
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-3">
          <div className="space-y-2">
            <DialogTitle className="text-xl font-semibold">
              {t('openBetaTitle')}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm leading-relaxed">
            {t('openBetaDescription', { featureName })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="text-center">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {t('newsletterSignup')}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {submitStatus.type && (
              <div
                className={cn(
                  "text-xs p-2 rounded-md text-center",
                  submitStatus.type === 'success' 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                )}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || submitStatus.type === 'success'}
                className="w-full"
              >
                {isSubmitting ? t('signingUp') : t('signMeUp')}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook for easy usage
export function useFeatureComingSoon() {
  const [dialogState, setDialogState] = React.useState<{
    open: boolean
    featureName: string
  }>({
    open: false,
    featureName: "",
  })

  const openDialog = React.useCallback((featureName: string) => {
    setDialogState({
      open: true,
      featureName,
    })
  }, [])

  const closeDialog = React.useCallback(() => {
    setDialogState(prev => ({ ...prev, open: false }))
  }, [])

  return {
    ...dialogState,
    openDialog,
    closeDialog,
    setOpen: (open: boolean) => setDialogState(prev => ({ ...prev, open })),
  }
}
