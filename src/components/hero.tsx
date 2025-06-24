"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog"
import { ArrowRight } from "lucide-react"
import TrustedPartnersSection from "@/components/mvpblocks/sparkles-logo"
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')
  const tFeatures = useTranslations('featureNames')
  
  return (    <section className="relative min-h-screen overflow-hidden bg-background pt-28 md:pt-32 lg:pt-28">
      {/* Main Ambient Light Effect from Top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-primary/30 via-primary/10 via-primary/5 to-transparent"></div>
      
      {/* Additional concentrated glow at the very top */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_var(--tw-gradient-stops))] from-primary/20 via-primary/8 to-transparent"></div>
      
      {/* Subtle overall atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero content positioned properly with navbar clearance */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 pt-20 md:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Status Badge */}
            <div className="mb-6 md:mb-8 flex justify-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 md:px-4 md:py-2 text-sm">
                <div className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                {t('badge')}
              </Badge>
            </div>
            
            {/* Main Heading */}
            <h1 className="mb-4 md:mb-6 text-3xl md:text-4xl font-bold tracking-tight text-foreground sm:text-4xl md:sm:text-5xl lg:text-6xl leading-tight">
              {t('headline')}{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('headlineHighlight')}
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mb-6 md:mb-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed px-4 md:px-0">
              {t('description')}
            </p>              {/* CTA Button */}
            <div className="mb-2 md:mb-4">              <FeatureComingSoonDialog
                featureName={tFeatures('aiCallAgentPlatform')}
              >
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold">
                  {t('cta')}
                  <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Button>
              </FeatureComingSoonDialog>
            </div>
          </div>
        </div>

        {/* Bottom section for logos */}
        <div className="flex-shrink-0">
          <TrustedPartnersSection />
        </div>
      </div>
    </section>
  )
}
