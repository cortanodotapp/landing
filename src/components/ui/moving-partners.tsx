"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'

type Partner = { name: string; logoUrl: string }

const DEFAULT_PARTNERS: Partner[] = [
  { 
    name: "OpenAI",
    logoUrl: "https://upload.cortano.app/logos/external/openai.svg"
  },
  { 
    name: "Google",
    logoUrl: "https://upload.cortano.app/logos/external/google.svg"
  },
  { 
    name: "Microsoft Azure",
    logoUrl: "https://upload.cortano.app/logos/external/azure.svg"
  },
  { 
    name: "Stripe",
    logoUrl: "https://upload.cortano.app/logos/external/stripe.svg"
  },
]

export function MovingPartners({ items = DEFAULT_PARTNERS }: { items?: Partner[] }) {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('movingPartners')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">
        {t('title')}
      </h3>
      <div className="relative overflow-hidden">
        {/* Seamless marquee: duplicate sequence and slide -50% */}
        <motion.div
          className="w-max flex gap-x-1 sm:gap-x-2 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((partner, index) => (
            <motion.div
              key={`${partner.name}-${index}`}
              className="shrink-0 flex items-center justify-center px-2 sm:px-3 py-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 sm:w-16 md:w-20 h-auto">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="w-full h-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
