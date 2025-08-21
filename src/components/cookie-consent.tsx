'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCookieConsent, setCookieConsent } from '@/lib/cookie-consent'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export function CookieConsent() {
  const locale = useLocale?.() as string | undefined
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has already seen the notification
    const hasConsented = getCookieConsent()
    if (!hasConsented) {
      setIsVisible(true)
    }
    setIsLoaded(true)
  }, [])

  const acceptCookies = () => {
    setCookieConsent('accepted')
    setIsVisible(false)
  }

  const closeNotification = () => {
    setCookieConsent('accepted') // Auto-accept when closing
    setIsVisible(false)
  }

  if (!isLoaded) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5
          }}
          className="fixed bottom-6 left-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="relative pointer-events-auto">
            {/* Glassy background */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10" />
            
            {/* Content */}
            <div className="relative p-6 text-white">
              <div className="flex items-start gap-3 mb-4">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0 p-2 bg-primary/20 rounded-full"
                >
                  <Cookie className="w-5 h-5 text-primary" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-2">
                    Cookie Notice
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    This website uses cookies to enhance your experience and analyze our website traffic.{' '}
                    <Link href={`/${locale || 'en'}/legal/cookies`} className="underline text-primary hover:text-primary/80">
                      Learn more
                    </Link>.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={acceptCookies}
                  size="sm"
                  className="bg-primary/20 hover:bg-primary/30 text-primary hover:text-primary border-primary/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 pointer-events-auto"
                >
                  Got it!
                </Button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={closeNotification}
              className="absolute -top-2 -right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 pointer-events-auto"
            >
              <X className="w-3 h-3 text-white" />
            </button>

            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(var(--primary), 0.1), transparent)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
