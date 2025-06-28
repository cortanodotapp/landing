"use client"

import { useTranslations } from 'next-intl'
import { Badge } from "@/components/ui/badge"

export function AboutTeam() {
  const t = useTranslations('about.team')

  const teamMembers = [
    {
      name: "Jakub Krzyżanowski",
      role: t('members.cto.role'),
      description: t('members.cto.description'),
    },
    {
      name: "Mikołaj Ciesielski", 
      role: t('members.sales.role'),
      description: t('members.sales.description'),
    },
    {
      name: "Klaudiusz Kapiszka",
      role: t('members.design.role'),
      description: t('members.design.description'),
    }
  ]

  return (
    <section className="relative bg-card/30 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:bg-white/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-muted-foreground">
            {t('joinTeam')}
          </p>
        </div>
      </div>
    </section>
  )
}
