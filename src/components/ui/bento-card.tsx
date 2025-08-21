"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BentoCardProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  background?: "gradient" | "solid" | "pattern"
  compact?: boolean
}

export function BentoCard({ 
  children, 
  className, 
  size = "sm",
  background = "solid",
  compact = false
}: BentoCardProps) {
  const backgroundClasses = {
    gradient: "bg-gradient-to-br from-primary/5 via-background to-accent/5",
    solid: "bg-card",
    pattern: "bg-gradient-to-br from-card via-muted/5 to-card"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5",
        backgroundClasses[background],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 h-full p-4 flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}
