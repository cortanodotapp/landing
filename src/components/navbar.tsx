"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { useTranslations } from 'next-intl'
import { Workflow, Link2, Boxes, BarChart3 } from "lucide-react"
import React from "react"

export function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const t = useTranslations('navbar')
  const tFeatures = useTranslations('featureNames')
  const tCommon = useTranslations('common')

  const components = [
    {
      title: t('components.callFlows.title'),
      href: "/features/event-workflows",
      description: t('components.callFlows.description'),
      featureName: tFeatures('callFlowBuilder'),
      icon: Workflow
    },
    {
      title: t('components.voiceOptions.title'),
      href: "/features/integrations",
      description: t('components.voiceOptions.description'),
      featureName: tFeatures('voiceCustomization'),
      icon: Link2
    },
    {
      title: t('components.integrations.title'),
      href: "/features/mcp-builder",
      description: t('components.integrations.description'),
      featureName: tFeatures('thirdPartyIntegrations'),
      icon: Boxes,
      comingSoon: true
    },
    {
      title: t('components.analytics.title'),
      href: "/features/analytics",
      description: t('components.analytics.description'),
      featureName: tFeatures('analyticsDashboard'),
      icon: BarChart3
    },
  ]

  // Determine if navbar should be hidden
  const isHidden = scrollDirection === "down" && !isAtTop

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 p-4 transition-transform duration-300 ease-in-out",
        isHidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <nav className="mx-auto max-w-7xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl backdrop-saturate-150">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">

            <img src={"https://upload.cortano.app/Logo-Green.svg"} alt="Cortano Logo" className="h-5 w-auto" />

            <span className="text-xl font-bold text-foreground">cortano</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-white/10">
                  {t('features')}
                </NavigationMenuTrigger>                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">                    {components.map((component) => (
                      <li key={component.title}>
                        <FeatureComingSoonDialog
                          featureName={component.featureName}
                        >
                          <div className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <component.icon className="h-4 w-4 text-primary" />
                                <div className="text-sm font-medium leading-none">{component.title}</div>
                              </div>
                              {component.comingSoon && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5">
                                  {tCommon('soon')}
                                </Badge>
                              )}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {component.description}
                            </p>
                          </div>
                        </FeatureComingSoonDialog>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>              <NavigationMenuItem>
                <FeatureComingSoonDialog
                  featureName={tFeatures('useCasesExamples')}
                >
                  <div className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-white/10 cursor-pointer")}>
                    {t('useCases')}
                  </div>
                </FeatureComingSoonDialog>
              </NavigationMenuItem>              <NavigationMenuItem>
                <Link href="/#pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-white/10")}>
                    {t('pricing')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList></NavigationMenu>          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">            <FeatureComingSoonDialog
              featureName={tFeatures('accountRegistration')}
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('getStarted')}
              </Button>
            </FeatureComingSoonDialog>
          </div>
        </div>
      </nav>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
