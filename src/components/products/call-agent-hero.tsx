"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function CallAgentHero() {
  const t = useTranslations('callAgentPage.hero')
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-background pt-28 md:pt-32 lg:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,_var(--tw-gradient-stops))] from-primary/25 via-primary/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center flex flex-col items-center justify-center min-h-[calc(70vh-7rem)]">
        <div className="mb-6 flex justify-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5">
            <Phone className="mr-2 h-4 w-4" />
            {t('badge')}
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight max-w-4xl">
          {t('title')}
          <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('titleHighlight')}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t('description')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="mailto:hello@cortano.app?subject=Call%20Agent%20Demo" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {t('primaryCta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <Link href="/#pricing" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full">
              {t('secondaryCta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
