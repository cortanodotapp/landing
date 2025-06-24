"use client"

import { motion } from "motion/react"
import { ArrowRight, Phone, Mic, Brain, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'

export function VisualFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('visualFlow')

  const steps = [
    { label: t('step1'), color: "bg-blue-500", icon: Phone },
    { label: t('step2'), color: "bg-green-500", icon: Mic },
    { label: t('step3'), color: "bg-purple-500", icon: Brain },
    { label: t('step4'), color: "bg-orange-500", icon: MessageCircle }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null
  return (
    <div className="flex flex-col h-full justify-center">      <h3 className="text-lg font-semibold mb-6 text-card-foreground">
        {t('title')}
      </h3>
      
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center space-y-3 relative">            <motion.div
              className={`relative p-4 rounded-full border-2 transition-all duration-300 ${
                index <= activeStep 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted bg-muted/30'
              }`}
              animate={{
                scale: index === activeStep ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <step.icon className={`w-4 h-4 transition-all duration-300 ${
                index <= activeStep ? 'text-primary' : 'text-muted-foreground'
              }`} />
              {index === activeStep && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div><span className={`text-xs text-center transition-colors duration-300 max-w-16 leading-tight font-medium ${
              index <= activeStep ? 'text-card-foreground' : 'text-muted-foreground'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className="absolute left-full top-4 w-6 flex justify-center z-10">
                <ArrowRight 
                  className={`h-3 w-3 transition-colors duration-300 ${
                    index < activeStep ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
