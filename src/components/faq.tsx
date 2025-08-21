"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Plus, Minus } from "lucide-react"
import GradientDither from "@/components/ui/gradient-dither"
import { useTranslations } from 'next-intl'

export function FAQ() {
  const t = useTranslations('faqSection')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Get FAQ items from translations
  const faqItems = [
    {
      question: t('questions.0.question'),
      answer: t('questions.0.answer'),
    },
    {
      question: t('questions.1.question'),
      answer: t('questions.1.answer'),
    },
    {
      question: t('questions.2.question'),
      answer: t('questions.2.answer'),
    },
    {
      question: t('questions.3.question'),
      answer: t('questions.3.answer'),
    },
    {
      question: t('questions.4.question'),
      answer: t('questions.4.answer'),
    },
    {
      question: t('questions.5.question'),
      answer: t('questions.5.answer'),
    },
  ]

  return (
  <section className="relative py-24 overflow-hidden">
      {/* Dither overlay to prevent gradient banding in subtle backgrounds */}
      <GradientDither strength={0.05} />
      {/* Subtle background glow */}
  <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-primary/1 to-background" />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 right-20 text-primary/6"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Plus className="w-6 h-6" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 left-16 text-primary/8"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -90, -180],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <Minus className="w-5 h-5" />
      </motion.div>

  <div className="relative z-20 mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 inline-block"
          >
            <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
              {t('badge')}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Question */}
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors duration-200"
                  whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.div>
                </motion.button>

                {/* Answer */}
                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="pt-2 border-t border-border/30">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card/30 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t('contactTitle')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('contactDescription')}
            </p>
            <motion.a
              href="mailto:support@cortano.app"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('contactButton')}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
