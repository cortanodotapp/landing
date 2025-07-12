"use client"

import { useTranslations } from 'next-intl'
import { Phone, MessageSquare, Bot, Zap } from "lucide-react"

export function AboutJourney() {
  const t = useTranslations('about.journey')

  const journeySteps = [
    {
      icon: Phone,
      title: t('phone.title'),
      description: t('phone.description'),
    },
    {
      icon: MessageSquare,
      title: t('conversation.title'),
      description: t('conversation.description'),
    },
    {
      icon: Bot,
      title: t('ai.title'),
      description: t('ai.description'),
    },
    {
      icon: Zap,
      title: t('automation.title'),
      description: t('automation.description'),
    },
  ]

  return (
    <section className="relative py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      
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
          {journeySteps.map((step, index) => (
            <div
              key={index}
              className="group relative text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
              
              {/* Connection line (except for last item) */}
              {index < journeySteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 transform translate-y-0.5"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}