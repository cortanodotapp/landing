"use client"

import { useTranslations } from 'next-intl'
import { Target, Lightbulb, Users } from "lucide-react"

export function AboutMission() {
  const t = useTranslations('about.mission')

  const missions = [
    {
      icon: Target,
      title: t('goals.title'),
      description: t('goals.description'),
    },
    {
      icon: Lightbulb,
      title: t('innovation.title'),
      description: t('innovation.description'),
    },
    {
      icon: Users,
      title: t('community.title'),
      description: t('community.description'),
    },
  ]

  return (
    <section className="relative bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <mission.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {mission.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
