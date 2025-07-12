"use client"

import { motion } from "motion/react"
import { ArrowRight, Phone, MessageSquare, Brain, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'

export function VisualFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('visualFlow')

  const steps = [
    { label: t('step1'), color: "bg-blue-500", icon: Phone },
    { label: t('step2'), color: "bg-green-500", icon: MessageSquare },
    { label: t('step3'), color: "bg-purple-500", icon: Brain },
    { label: t('step4'), color: "bg-orange-500", icon: CheckCircle }
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
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">
        {t('title')}
      </h3>
      
      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex items-center justify-center space-x-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                className={`relative p-3 rounded-full border-2 transition-all duration-300 ${
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
              </motion.div>
              
              <span className={`text-xs text-center transition-colors duration-300 max-w-20 leading-tight font-medium ${
                index <= activeStep ? 'text-card-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
            
            {/* Horizontal Arrow */}
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center mx-3 mb-8">
                <ArrowRight 
                  className={`h-4 w-4 transition-colors duration-300 ${
                    index < activeStep ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout - Vertical */}
      <div className="flex md:hidden flex-col space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col">
            {/* Step Row */}
            <div className="flex items-center space-x-3">
              <motion.div
                className={`relative p-2 rounded-full border-2 transition-all duration-300 flex-shrink-0 ${
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
              </motion.div>
              
              <span className={`text-sm transition-colors duration-300 font-medium ${
                index <= activeStep ? 'text-card-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex justify-start ml-5 mt-1 mb-0">
                <div className={`w-0.5 h-4 transition-colors duration-300 ${
                  index < activeStep ? 'bg-primary' : 'bg-muted'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
