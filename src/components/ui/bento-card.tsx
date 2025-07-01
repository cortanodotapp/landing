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

const sizeClasses = {
  sm: "col-span-1 row-span-1",
  md: "col-span-1 row-span-2 md:col-span-2 md:row-span-1",
  lg: "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
  xl: "col-span-1 row-span-3 md:col-span-3 md:row-span-2"
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
        "group relative overflow-hidden rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5",
        sizeClasses[size],
        backgroundClasses[background],
        compact && "min-h-[140px] md:min-h-[200px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  )
}
