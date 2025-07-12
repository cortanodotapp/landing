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
import { Phone, Globe, Code, BookOpen, Users, Briefcase, FileText, Activity, BarChart3 } from "lucide-react"
import React from "react"

export function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const t = useTranslations('navbar')
  const tFeatures = useTranslations('featureNames')
  const tCommon = useTranslations('common')

  const products = [
    {
      title: t('productItems.callAgent.title'),
      href: "/products/call-agent",
      description: t('productItems.callAgent.description'),
      featureName: tFeatures('callAgent'),
      icon: Phone
    },
    {
      title: t('productItems.digitalCallAgent.title'),
      href: "/products/digital-call-agent",
      description: t('productItems.digitalCallAgent.description'),
      featureName: tFeatures('digitalCallAgent'),
      icon: Globe,
      comingSoon: true
    },
    {
      title: t('productItems.pricing.title'),
      href: "/#pricing",
      description: t('productItems.pricing.description'),
      icon: BarChart3
    }
  ]

  const developer = [
    {
      title: t('developerItems.documentation.title'),
      href: "/docs",
      description: t('developerItems.documentation.description'),
      featureName: tFeatures('developerDocs'),
      icon: BookOpen
    },
    {
      title: t('developerItems.apiStatus.title'),
      href: "/status",
      description: t('developerItems.apiStatus.description'),
      featureName: tFeatures('apiStatus'),
      icon: Activity
    },
    {
      title: t('developerItems.apiChangelog.title'),
      href: "/changelog",
      description: t('developerItems.apiChangelog.description'),
      featureName: tFeatures('apiChangelog'),
      icon: Code
    }
  ]

  const resources = [
    {
      title: t('resourceItems.legal.title'),
      href: "/legal",
      description: t('resourceItems.legal.description'),
      icon: FileText
    },
    {
      title: t('resourceItems.about.title'),
      href: "/about",
      description: t('resourceItems.about.description'),
      icon: Users
    },
    {
      title: t('resourceItems.hiring.title'),
      href: "/hiring",
      description: t('resourceItems.hiring.description'),
      featureName: tFeatures('hiring'),
      icon: Briefcase
    },
    {
      title: t('resourceItems.blog.title'),
      href: "/blog",
      description: t('resourceItems.blog.description'),
      icon: BookOpen
    }
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-white/10">
                  {t('products')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {products.map((product) => (
                      <li key={product.title}>
                        {product.comingSoon ? (
                          <FeatureComingSoonDialog
                            featureName={product.featureName}
                          >
                            <div className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <product.icon className="h-4 w-4 text-primary" />
                                  <div className="text-sm font-medium leading-none">{product.title}</div>
                                </div>
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5">
                                  {tCommon('soon')}
                                </Badge>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </FeatureComingSoonDialog>
                        ) : (
                          <Link href={product.href}>
                            <div className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                              <div className="flex items-center space-x-2">
                                <product.icon className="h-4 w-4 text-primary" />
                                <div className="text-sm font-medium leading-none">{product.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-white/10">
                  {t('developer')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {developer.map((item) => (
                      <li key={item.title}>
                        <FeatureComingSoonDialog
                          featureName={item.featureName}
                        >
                          <div className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                            <div className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4 text-primary" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </FeatureComingSoonDialog>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-white/10">
                  {t('resources')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {resources.map((resource) => (
                      <li key={resource.title}>
                        {resource.featureName ? (
                          <FeatureComingSoonDialog
                            featureName={resource.featureName}
                          >
                            <div className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                              <div className="flex items-center space-x-2">
                                <resource.icon className="h-4 w-4 text-primary" />
                                <div className="text-sm font-medium leading-none">{resource.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {resource.description}
                              </p>
                            </div>
                          </FeatureComingSoonDialog>
                        ) : (
                          <Link href={resource.href}>
                            <div className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                              <div className="flex items-center space-x-2">
                                <resource.icon className="h-4 w-4 text-primary" />
                                <div className="text-sm font-medium leading-none">{resource.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {resource.description}
                              </p>
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>          {/* CTA Buttons */}
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
