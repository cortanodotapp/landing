"use client"

import { motion } from "motion/react"
import { Phone, MessageSquare, Calendar, Zap, ArrowDown, ArrowDownRight, ArrowDownLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'

export function VisualWorkflowBuilder() {
  const [activeStep, setActiveStep] = useState(0)
  const t = useTranslations('visualWorkflow')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === 2) {
          // Reset to beginning after showing all steps (0: incoming, 1: analysis, 2: both actions)
          return 0
        }
        return prev + 1
      })
    }, 2000) // Each step stays active for 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-card-foreground mb-2">
          {t('title')}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* Simple Workflow Steps */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        
        {/* Step 1: Incoming Call */}
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: activeStep === 0 ? 1.1 : 1
          }}
          transition={{ 
            delay: 0.1, 
            duration: 0.6,
            scale: { duration: 0.3 }
          }}
        >          <motion.div 
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 shadow-sm transition-all duration-300 border-2 ${
              activeStep === 0 
                ? 'border-primary bg-primary/10' 
                : 'border-muted bg-muted/30'
            }`}
            animate={{
              scale: activeStep === 0 ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Phone className={`h-5 w-5 transition-colors duration-300 ${activeStep === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-medium transition-colors duration-300 ${activeStep === 0 ? 'text-card-foreground' : 'text-muted-foreground'}`}>{t('steps.incomingCall')}</span>
          </motion.div>
        </motion.div>

        {/* Arrow Down */}        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >          <ArrowDown className={`h-6 w-6 transition-colors duration-300 ${
            activeStep >= 1 ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </motion.div>

        {/* Step 2: AI Analysis */}
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: activeStep === 1 ? 1.1 : 1
          }}
          transition={{ 
            delay: 0.5, 
            duration: 0.6,
            scale: { duration: 0.3 }
          }}
        >          <motion.div 
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 shadow-sm transition-all duration-300 border-2 ${
              activeStep === 1 
                ? 'border-primary bg-primary/10' 
                : 'border-muted bg-muted/30'
            }`}
            animate={{
              scale: activeStep === 1 ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <MessageSquare className={`h-5 w-5 transition-colors duration-300 ${activeStep === 1 ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-medium transition-colors duration-300 ${activeStep === 1 ? 'text-card-foreground' : 'text-muted-foreground'}`}>{t('steps.aiAnalysis')}</span>
          </motion.div>
        </motion.div>

        {/* Branching Arrows */}
        <motion.div 
          className="flex justify-center space-x-12 md:space-x-20 lg:space-x-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >          <ArrowDownLeft className={`h-6 w-6 transition-colors duration-300 ${
            activeStep >= 2 ? 'text-primary' : 'text-muted-foreground'
          }`} />
          <ArrowDownRight className={`h-6 w-6 transition-colors duration-300 ${
            activeStep >= 2 ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </motion.div>

        {/* Step 3: Action Options */}
        <motion.div 
          className="flex items-center justify-between space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >          <motion.div 
            className={`flex items-center space-x-2 rounded-xl px-3 py-2 shadow-sm transition-all duration-300 border-2 ${
              activeStep === 2 
                ? 'border-primary bg-primary/10' 
                : 'border-muted bg-muted/30'
            }`}
            animate={{
              scale: activeStep === 2 ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Calendar className={`h-4 w-4 transition-colors duration-300 ${activeStep === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium transition-colors duration-300 ${activeStep === 2 ? 'text-card-foreground' : 'text-muted-foreground'}`}>{t('steps.bookMeeting')}</span>
          </motion.div>

          <motion.div 
            className={`flex items-center space-x-2 rounded-xl px-3 py-2 shadow-sm transition-all duration-300 border-2 ${
              activeStep === 2 
                ? 'border-primary bg-primary/10' 
                : 'border-muted bg-muted/30'
            }`}
            animate={{
              scale: activeStep === 2 ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Zap className={`h-4 w-4 transition-colors duration-300 ${activeStep === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium transition-colors duration-300 ${activeStep === 2 ? 'text-card-foreground' : 'text-muted-foreground'}`}>{t('steps.sendInfo')}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
