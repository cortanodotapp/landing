"use client"

import { BentoCard } from "@/components/ui/bento-card"
import { FeatureHighlight } from "@/components/ui/feature-highlight"
import { MovingPartners } from "@/components/ui/moving-partners"
import { LanguageShowcase } from "@/components/ui/language-showcase"
import { VisualWorkflowBuilder } from "@/components/ui/visual-workflow-builder"
import { VisualFlow } from "@/components/ui/visual-flow"

import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { useTranslations } from 'next-intl'

export function Features() {
  const t = useTranslations('features')
  
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2"
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            {t('badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-card-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {/* Main Feature - Visual Builder */}
          <BentoCard size="lg" background="gradient" className="lg:col-span-2 lg:row-span-2">
            <VisualWorkflowBuilder />
          </BentoCard>          {/* Quick Deployment */}
          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title={t('deployInMinutes.title')}
              description={t('deployInMinutes.description')}
            />
          </BentoCard>

          {/* Moving Partners */}
          <BentoCard size="sm" background="solid">
            <MovingPartners />
          </BentoCard>

          {/* Language Support */}
          <BentoCard size="sm" background="solid">
            <LanguageShowcase />
          </BentoCard>          {/* Enterprise Grade */}
          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title={t('enterpriseSecurity.title')}
              description={t('enterpriseSecurity.description')}
            />
          </BentoCard>

          {/* Global Scale */}
          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title={t('globalInfrastructure.title')}
              description={t('globalInfrastructure.description')}
            />
          </BentoCard>

          {/* Visual Flow - How it Works */}
          <BentoCard size="md" background="gradient" className="lg:col-span-2">
            <VisualFlow />
          </BentoCard>          {/* Advanced Analytics */}
          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title={t('advancedAnalytics.title')}
              description={t('advancedAnalytics.description')}
            />
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
