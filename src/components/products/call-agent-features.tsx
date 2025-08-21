"use client"

import { CheckCircle2, Headphones, Clock, CalendarDays, Shield, BarChart } from "lucide-react"
import { useTranslations } from "next-intl"

const featuresIcons = [Headphones, Clock, CalendarDays, Shield, BarChart]

export function CallAgentFeatures() {
  const t = useTranslations('callAgentPage.features')

  const items = [
    { title: t('items.0.title'), description: t('items.0.description'), Icon: featuresIcons[0] },
    { title: t('items.1.title'), description: t('items.1.description'), Icon: featuresIcons[1] },
    { title: t('items.2.title'), description: t('items.2.description'), Icon: featuresIcons[2] },
    { title: t('items.3.title'), description: t('items.3.description'), Icon: featuresIcons[3] },
    { title: t('items.4.title'), description: t('items.4.description'), Icon: featuresIcons[4] },
  ]

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{t('title')}</h2>
          <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, description, Icon }, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-md bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
