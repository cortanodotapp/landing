"use client"

import { useTranslations } from 'next-intl'
import { Heart, Shield, Zap, Globe } from "lucide-react"

export function AboutValues() {
  const t = useTranslations('about.values')

  const values = [
    {
      icon: Heart,
      title: t('customerFirst.title'),
      description: t('customerFirst.description'),
    },
    {
      icon: Shield,
      title: t('reliability.title'),
      description: t('reliability.description'),
    },
    {
      icon: Zap,
      title: t('innovation.title'),
      description: t('innovation.description'),
    },
    {
      icon: Globe,
      title: t('accessibility.title'),
      description: t('accessibility.description'),
    },
  ]

  return (
    <section className="relative py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
