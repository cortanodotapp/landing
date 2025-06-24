"use client"

import * as React from "react"
import { Clock } from "lucide-react"

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
  const t = useTranslations('dialog')

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
        </DialogHeader>        <div className="flex justify-center pt-4">
          <Button 
            onClick={() => onOpenChange?.(false)}
            className="w-full"
          >
            {t('acknowledge')}
          </Button>
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
