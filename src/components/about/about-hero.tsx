"use client"

import { Badge } from "@/components/ui/badge"
import { useTranslations } from 'next-intl'

export function AboutHero() {
  const t = useTranslations('about.hero')

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20">
            {t('badge')}
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
            {t('title')}
            <span className="text-primary"> {t('titleHighlight')}</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground lg:text-xl">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  )
}
