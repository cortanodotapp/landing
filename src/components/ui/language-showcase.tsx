"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import ReactCountryFlag from "react-country-flag"
import { useTranslations } from 'next-intl'

const languages = [
  { name: "English", code: "US", isoCode: "EN" },
  { name: "Polish", code: "PL", isoCode: "PL" },
  { name: "Spanish", code: "ES", isoCode: "ES" },
  { name: "German", code: "DE", isoCode: "DE" },
]

export function LanguageShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('languageShowcase')

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % languages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">
        {t('title')}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {languages.map((language, index) => (
          <motion.div
            key={language.code}
            className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ 
              opacity: index === currentIndex % 4 ? 1 : 0.3,
              scale: index === currentIndex % 4 ? 1 : 0.95
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-shrink-0">
              <ReactCountryFlag
                countryCode={language.code}
                svg
                style={{
                  width: '16px',
                  height: '12px',
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-card-foreground truncate">
                {language.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {language.isoCode}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
