"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Mail, ArrowRight, Clock, Bell } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'

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
  const [email, setEmail] = React.useState("")
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const t = useTranslations('dialog')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call - replace with actual newsletter signup logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("")
      setIsSubscribed(false)
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            {featureName} {t('comingSoon')}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t('featureNotPublished')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium text-sm">{t('getNotified')}</h3>
              </div>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder={t('enterEmail')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !email}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-2 py-4"
              >
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>
                </div>                <p className="font-medium text-green-700">{t('thanksSubscribing')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('notifyWhenAvailable')}
                </p>
              </motion.div>
            )}
          </motion.div>
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
