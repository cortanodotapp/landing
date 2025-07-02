"use client"

import Link from "next/link"
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog"
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const tFeatures = useTranslations('featureNames')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  return (
    <footer className="relative bg-background border-t border-white/10">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <img
                src="https://upload.cortano.app/Logo-Green.svg"
                alt="Cortano Logo"
                className="h-6 w-auto"
              />
              <span className="text-xl font-bold text-foreground">{tCommon('cortano')}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/cortanodotapp/"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://threads.com/@cortanodotapp"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Threads"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.790-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.72-1.817-.345-.485-.788-.857-1.29-1.119-.464-.243-.98-.364-1.543-.364-.827 0-1.616.187-2.265.538l-.295-1.848c.683-.391 1.675-.742 2.942-.742 1.39 0 2.572.405 3.510 1.207.875.747 1.473 1.819 1.803 3.193.062-.069.124-.135.189-.202.833-.859 1.955-1.314 3.246-1.314 1.418 0 2.722.52 3.670 1.466.949.945 1.471 2.2 1.471 3.532 0 2.168-.828 4.178-2.333 5.658C18.184 22.789 15.498 24 12.186 24z" />
                </svg>
              </Link>
              <Link
                href="https://x.com/cortanodotapp"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://github.com/CortanoAPP"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('product.title')}</h3>
            <ul className="space-y-3">              <li>                <FeatureComingSoonDialog
              featureName={tFeatures('callFlowBuilder')}
            >
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                {t('product.callFlows')}
              </span>
            </FeatureComingSoonDialog>
            </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('voiceCustomization')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('product.voiceOptions')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('thirdPartyIntegrations')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('product.integrations')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('analyticsDashboard')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                  {t('product.analytics')}
                </span>
              </FeatureComingSoonDialog>
              </li>
            </ul>
          </div>          {/* Use Cases */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('useCases.title')}</h3>
            <ul className="space-y-3">              <li>
              <FeatureComingSoonDialog
                featureName={tFeatures('customerSupportUseCases')}
              >
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                  {t('useCases.customerSupport')}
                </span>
              </FeatureComingSoonDialog>
            </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('leadQualificationExamples')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('useCases.leadQualification')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('appointmentBookingSolutions')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('useCases.appointmentBooking')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('salesAutomationWorkflows')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('useCases.salesAutomation')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
            </ul>
          </div>          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('company.title')}</h3>
            <ul className="space-y-3">              <li>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('company.aboutUs')}
              </Link>
            </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  {t('company.blog')}
                </Link>
              </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('careerOpportunities')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('company.careers')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
              <li>
                <FeatureComingSoonDialog
                  featureName={tFeatures('contactSupport')}
                >
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {t('company.contact')}
                  </span>
                </FeatureComingSoonDialog>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              {t('legal.copyright')}
            </div>            <div className="flex space-x-6">
              <Link 
                href={`/${locale}/legal/privacy`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('legal.privacyPolicy')}
              </Link>
              <Link 
                href={`/${locale}/legal/terms`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('legal.termsOfService')}
              </Link>
              <FeatureComingSoonDialog
                featureName={tFeatures('cookiePolicy')}
              >
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                  {t('legal.cookiePolicy')}
                </span>
              </FeatureComingSoonDialog>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
