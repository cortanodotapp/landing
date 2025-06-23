"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

const partners = [
  { 
    name: "OpenAI",
    logoUrl: "https://upload.cortano.app/brandbird-OpenAI-logotype.svg"
  },
  { 
    name: "Google",
    logoUrl: "https://upload.cortano.app/brandbird-Google-logotype.svg"
  },
  { 
    name: "Microsoft Azure",
    logoUrl: "https://upload.cortano.app/brandbird-Microsoft%20Azure-logotype.svg"
  },  { 
    name: "Stripe",
    logoUrl: "https://upload.cortano.app/brandbird-Stripe-logotype.svg"
  },
]

export function MovingPartners() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">
        Backed by Industry Leaders
      </h3>      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-3"
          animate={{
            x: [0, -200, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >          {[...partners, ...partners].map((partner, index) => (
            <motion.div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center px-6 py-4 min-w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-auto">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name}
                  className="w-full h-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
