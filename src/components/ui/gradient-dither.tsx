"use client"

import { cn } from "@/lib/utils"
import React from "react"

type GradientDitherProps = {
  className?: string
  /** Opacity multiplier, default 0.06 */
  strength?: number
  /**
   * Blend mode to use; overlay works well on dark themes.
   * Try soft-light if overlay is too strong.
   */
  blendMode?: React.CSSProperties["mixBlendMode"]
}

/**
 * Lightweight grain overlay to reduce visible gradient banding.
 * Uses inline SVG noise as background-image for broad blend support.
 * Place inside a relatively positioned parent.
 */
export function GradientDither({ className, strength = 0.06, blendMode = "overlay" }: GradientDitherProps) {
  const clamped = Math.max(0, Math.min(0.15, strength))
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/><feColorMatrix type="saturate" values="0"/></filter>` +
      `<rect width="100%" height="100%" filter="url(#n)"/></svg>`
  )
  const dataUrl = `url("data:image/svg+xml,${svg}")`
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-10",
        className
      )}
      style={{
        mixBlendMode: blendMode,
        opacity: clamped,
        backgroundImage: dataUrl,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  )
}

export default GradientDither
