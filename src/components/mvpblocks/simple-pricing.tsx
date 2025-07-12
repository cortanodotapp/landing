'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeatureComingSoonDialog } from '@/components/ui/feature-coming-soon-dialog';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, Check, Star, Zap, Crown, Calculator, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import ReactCountryFlag from 'react-country-flag';

export default function SimplePricing() {
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const t = useTranslations('pricing');
  const tFeatures = useTranslations('featureNames');
  const locale = useLocale();

  // Extended country list with pricing
  const countries = [
    { code: 'us', name: 'United States', flag: 'US', currency: 'USD', symbol: '$' },
    { code: 'uk', name: 'United Kingdom', flag: 'GB', currency: 'GBP', symbol: '£' },
    { code: 'de', name: 'Germany', flag: 'DE', currency: 'EUR', symbol: '€' },
    { code: 'fr', name: 'France', flag: 'FR', currency: 'EUR', symbol: '€' },
    { code: 'es', name: 'Spain', flag: 'ES', currency: 'EUR', symbol: '€' },
    { code: 'it', name: 'Italy', flag: 'IT', currency: 'EUR', symbol: '€' },
    { code: 'nl', name: 'Netherlands', flag: 'NL', currency: 'EUR', symbol: '€' },
    { code: 'pl', name: 'Poland', flag: 'PL', currency: 'PLN', symbol: 'zł' },
    { code: 'ca', name: 'Canada', flag: 'CA', currency: 'CAD', symbol: 'C$' },
    { code: 'au', name: 'Australia', flag: 'AU', currency: 'AUD', symbol: 'A$' },
    { code: 'jp', name: 'Japan', flag: 'JP', currency: 'JPY', symbol: '¥' },
    { code: 'kr', name: 'South Korea', flag: 'KR', currency: 'KRW', symbol: '₩' },
    { code: 'sg', name: 'Singapore', flag: 'SG', currency: 'SGD', symbol: 'S$' },
    { code: 'in', name: 'India', flag: 'IN', currency: 'INR', symbol: '₹' },
    { code: 'br', name: 'Brazil', flag: 'BR', currency: 'BRL', symbol: 'R$' },
    { code: 'mx', name: 'Mexico', flag: 'MX', currency: 'MXN', symbol: '$' },
  ];

  // Pricing data for different countries/currencies
  const pricingData = {
    starter: {
      us: { price: 29, currency: 'USD', symbol: '$' },
      uk: { price: 24, currency: 'GBP', symbol: '£' },
      de: { price: 27, currency: 'EUR', symbol: '€' },
      fr: { price: 27, currency: 'EUR', symbol: '€' },
      es: { price: 27, currency: 'EUR', symbol: '€' },
      it: { price: 27, currency: 'EUR', symbol: '€' },
      nl: { price: 27, currency: 'EUR', symbol: '€' },
      pl: { price: 119, currency: 'PLN', symbol: 'zł' },
      ca: { price: 39, currency: 'CAD', symbol: 'C$' },
      au: { price: 42, currency: 'AUD', symbol: 'A$' },
      jp: { price: 4200, currency: 'JPY', symbol: '¥' },
      kr: { price: 38000, currency: 'KRW', symbol: '₩' },
      sg: { price: 40, currency: 'SGD', symbol: 'S$' },
      in: { price: 2400, currency: 'INR', symbol: '₹' },
      br: { price: 145, currency: 'BRL', symbol: 'R$' },
      mx: { price: 580, currency: 'MXN', symbol: '$' }
    },
    medium: {
      us: { price: 99, currency: 'USD', symbol: '$' },
      uk: { price: 82, currency: 'GBP', symbol: '£' },
      de: { price: 92, currency: 'EUR', symbol: '€' },
      fr: { price: 92, currency: 'EUR', symbol: '€' },
      es: { price: 92, currency: 'EUR', symbol: '€' },
      it: { price: 92, currency: 'EUR', symbol: '€' },
      nl: { price: 92, currency: 'EUR', symbol: '€' },
      pl: { price: 399, currency: 'PLN', symbol: 'zł' },
      ca: { price: 132, currency: 'CAD', symbol: 'C$' },
      au: { price: 145, currency: 'AUD', symbol: 'A$' },
      jp: { price: 14500, currency: 'JPY', symbol: '¥' },
      kr: { price: 129000, currency: 'KRW', symbol: '₩' },
      sg: { price: 135, currency: 'SGD', symbol: 'S$' },
      in: { price: 8200, currency: 'INR', symbol: '₹' },
      br: { price: 495, currency: 'BRL', symbol: 'R$' },
      mx: { price: 1980, currency: 'MXN', symbol: '$' }
    },
    payAsYouGo: {
      callMinute: {
        us: { price: 0.20, currency: 'USD', symbol: '$' },
        uk: { price: 0.17, currency: 'GBP', symbol: '£' },
        de: { price: 0.18, currency: 'EUR', symbol: '€' },
        fr: { price: 0.18, currency: 'EUR', symbol: '€' },
        es: { price: 0.18, currency: 'EUR', symbol: '€' },
        it: { price: 0.18, currency: 'EUR', symbol: '€' },
        nl: { price: 0.18, currency: 'EUR', symbol: '€' },
        pl: { price: 0.80, currency: 'PLN', symbol: 'zł' },
        ca: { price: 0.27, currency: 'CAD', symbol: 'C$' },
        au: { price: 0.29, currency: 'AUD', symbol: 'A$' },
        jp: { price: 29, currency: 'JPY', symbol: '¥' },
        kr: { price: 260, currency: 'KRW', symbol: '₩' },
        sg: { price: 0.27, currency: 'SGD', symbol: 'S$' },
        in: { price: 16, currency: 'INR', symbol: '₹' },
        br: { price: 1.0, currency: 'BRL', symbol: 'R$' },
        mx: { price: 4, currency: 'MXN', symbol: '$' }
      },
      phoneNumber: {
        us: { price: 5, currency: 'USD', symbol: '$' },
        uk: { price: 4.2, currency: 'GBP', symbol: '£' },
        de: { price: 4.5, currency: 'EUR', symbol: '€' },
        fr: { price: 4.5, currency: 'EUR', symbol: '€' },
        es: { price: 4.5, currency: 'EUR', symbol: '€' },
        it: { price: 4.5, currency: 'EUR', symbol: '€' },
        nl: { price: 4.5, currency: 'EUR', symbol: '€' },
        pl: { price: 20, currency: 'PLN', symbol: 'zł' },
        ca: { price: 6.7, currency: 'CAD', symbol: 'C$' },
        au: { price: 7.3, currency: 'AUD', symbol: 'A$' },
        jp: { price: 730, currency: 'JPY', symbol: '¥' },
        kr: { price: 6500, currency: 'KRW', symbol: '₩' },
        sg: { price: 6.8, currency: 'SGD', symbol: 'S$' },
        in: { price: 415, currency: 'INR', symbol: '₹' },
        br: { price: 25, currency: 'BRL', symbol: 'R$' },
        mx: { price: 100, currency: 'MXN', symbol: '$' }
      },
      aiAgents: {
        us: { price: 2.50, currency: 'USD', symbol: '$' },
        uk: { price: 2.1, currency: 'GBP', symbol: '£' },
        de: { price: 2.3, currency: 'EUR', symbol: '€' },
        fr: { price: 2.3, currency: 'EUR', symbol: '€' },
        es: { price: 2.3, currency: 'EUR', symbol: '€' },
        it: { price: 2.3, currency: 'EUR', symbol: '€' },
        nl: { price: 2.3, currency: 'EUR', symbol: '€' },
        pl: { price: 10, currency: 'PLN', symbol: 'zł' },
        ca: { price: 3.4, currency: 'CAD', symbol: 'C$' },
        au: { price: 3.6, currency: 'AUD', symbol: 'A$' },
        jp: { price: 365, currency: 'JPY', symbol: '¥' },
        kr: { price: 3250, currency: 'KRW', symbol: '₩' },
        sg: { price: 3.4, currency: 'SGD', symbol: 'S$' },
        in: { price: 207, currency: 'INR', symbol: '₹' },
        br: { price: 12.5, currency: 'BRL', symbol: 'R$' },
        mx: { price: 50, currency: 'MXN', symbol: '$' }
      }
    }
  };

  // Map locale to default country
  useEffect(() => {
    if (locale === 'pl') {
      setSelectedCountry('pl');
    } else if (locale === 'de') {
      setSelectedCountry('de');
    } else if (locale === 'es') {
      setSelectedCountry('es');
    } else {
      setSelectedCountry('us');
    }
  }, [locale]);

  // Get current country data
  const getCurrentCountryData = (country: string) => {
    return countries.find(c => c.code === country) || countries[0];
  };

  // Safe pricing data access with fallback
  const getPricingData = (plan: 'starter' | 'medium', country: string) => {
    const planData = pricingData[plan];
    const countryData = planData[country as keyof typeof planData];
    return countryData || planData.us; // Fallback to US pricing
  };

  const getPayAsYouGoPricingData = (item: 'callMinute' | 'phoneNumber' | 'aiAgents', country: string) => {
    const itemData = pricingData.payAsYouGo[item];
    const countryData = itemData[country as keyof typeof itemData];
    return countryData || itemData.us; // Fallback to US pricing
  };

  const plans = [
    {
      id: 'starter',
      name: t('plans.starter.name'),
      icon: Star,
      price: t('plans.starter.price', { 
        price: getPricingData('starter', selectedCountry).price,
        currency: getPricingData('starter', selectedCountry).symbol 
      }),
      description: t('plans.starter.description'),
      features: [
        t('plans.starter.features.minutes'),
        t('plans.starter.features.agents'),
        t('plans.starter.features.integrations'),
        t('plans.starter.features.support'),
        t('plans.starter.features.apiAccess'),
      ],
      cta: t('plans.starter.cta'),
    },
    {
      id: 'medium',
      name: t('plans.medium.name'),
      icon: Zap,
      price: t('plans.medium.price', { 
        price: getPricingData('medium', selectedCountry).price,
        currency: getPricingData('medium', selectedCountry).symbol 
      }),
      description: t('plans.medium.description'),
      features: [
        t('plans.medium.features.minutes'),
        t('plans.medium.features.agents'),
        t('plans.medium.features.integrations'),
        t('plans.medium.features.support'),
        t('plans.medium.features.apiAccess'),
      ],
      cta: t('plans.medium.cta'),
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name'),
      icon: Crown,
      price: t('plans.enterprise.price'),
      description: t('plans.enterprise.description'),
      features: [
        t('plans.enterprise.features.minutes'),
        t('plans.enterprise.features.agents'),
        t('plans.enterprise.features.integrations'),
        t('plans.enterprise.features.support'),
        t('plans.enterprise.features.apiAccess'),
      ],
      cta: t('plans.enterprise.cta'),
    },
    {
      id: 'payAsYouGo',
      name: t('plans.payAsYouGo.name'),
      icon: Calculator,
      price: t('plans.payAsYouGo.price', { 
        price: getPayAsYouGoPricingData('callMinute', selectedCountry).price,
        currency: getPayAsYouGoPricingData('callMinute', selectedCountry).symbol 
      }),
      description: t('plans.payAsYouGo.description'),
      features: [
        t('plans.payAsYouGo.features.minutes', { 
          price: getPayAsYouGoPricingData('callMinute', selectedCountry).price,
          currency: getPayAsYouGoPricingData('callMinute', selectedCountry).symbol 
        }),
        t('plans.payAsYouGo.features.phoneNumber', { 
          price: getPayAsYouGoPricingData('phoneNumber', selectedCountry).price,
          currency: getPayAsYouGoPricingData('phoneNumber', selectedCountry).symbol 
        }),
        t('plans.payAsYouGo.features.agents', { 
          price: getPayAsYouGoPricingData('aiAgents', selectedCountry).price,
          currency: getPayAsYouGoPricingData('aiAgents', selectedCountry).symbol 
        }),
        t('plans.payAsYouGo.features.support'),
        t('plans.payAsYouGo.features.apiAccess'),
        t('plans.payAsYouGo.features.integrations'),
      ],
      cta: t('plans.payAsYouGo.cta'),
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="pricing" className="relative py-24 overflow-hidden scroll-mt-20">
      {/* Ambient background effects matching your theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_var(--tw-gradient-stops))] from-primary/15 via-primary/5 to-transparent blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2"
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            {t('badge')}
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-card-foreground mb-4 sm:text-5xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Country/Currency Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('currencySelector.label')}</span>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[280px]">
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={getCurrentCountryData(selectedCountry).flag}
                      svg
                      style={{ width: '16px', height: '12px' }}
                    />
                    <span>{getCurrentCountryData(selectedCountry).name}</span>
                    <span className="text-muted-foreground">({getCurrentCountryData(selectedCountry).currency})</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2 w-full">
                        <ReactCountryFlag
                          countryCode={country.flag}
                          svg
                          style={{ width: '16px', height: '12px' }}
                        />
                        <span>{country.name}</span>
                        <span className="ml-auto text-muted-foreground text-xs">
                          {country.currency}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>

        {/* Main pricing cards - first 3 plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.slice(0, 3).map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex"
            >
              <Card
                className={cn(
                  'relative h-full w-full bg-card border border-border text-left transition-all duration-300 hover:shadow-lg',
                  plan.popular
                    ? 'ring-2 ring-primary/30 shadow-lg shadow-primary/10'
                    : 'hover:border-primary/30 hover:shadow-md',
                  plan.popular &&
                    'bg-gradient-to-b from-primary/5 to-card',
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                    <Badge className="rounded-full bg-primary px-4 py-1 text-primary-foreground shadow-sm">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      {t('popular')}
                    </Badge>
                  </div>
                )}
                <CardHeader className={cn('pb-4', plan.popular && 'pt-8')}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        plan.popular
                          ? 'bg-primary/15 text-primary'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <plan.icon className="h-4 w-4" />
                    </div>
                    <CardTitle
                      className={cn(
                        'text-xl font-bold',
                        plan.popular && 'text-primary',
                      )}
                    >
                      {plan.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-4 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                    <div className="pt-3">
                      <span
                        className={cn(
                          'text-3xl font-bold',
                          plan.popular ? 'text-primary' : 'text-card-foreground',
                        )}
                      >
                        {plan.price}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-6">
                  {plan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5',
                          plan.popular
                            ? 'bg-primary/15 text-primary'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm leading-relaxed text-card-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter className="pt-6">
                  <FeatureComingSoonDialog
                    featureName={tFeatures(
                      plan.id === 'starter' ? 'starterPlan' : 
                      plan.id === 'medium' ? 'mediumPlan' : 
                      plan.id === 'enterprise' ? 'enterprisePlan' :
                      'payAsYouGoPlan'
                    )}
                  >
                    <Button
                      variant={plan.popular ? 'default' : 'outline'}
                      className={cn(
                        'w-full font-medium transition-all duration-300 group',
                        plan.popular
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/25'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary',
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </FeatureComingSoonDialog>
                </CardFooter>

                {/* Subtle gradient effects */}
                {plan.popular && (
                  <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pay as you go horizontal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {(() => {
            const payAsYouGoPlan = plans[3]; // Get the Pay as you go plan
            return (
              <Card className="relative bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <payAsYouGoPlan.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-card-foreground">{payAsYouGoPlan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{payAsYouGoPlan.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <FeatureComingSoonDialog
                        featureName={tFeatures('payAsYouGoPlan')}
                      >
                        <Button
                          variant="outline"
                          className="font-medium transition-all duration-300 group border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary px-8"
                        >
                          {payAsYouGoPlan.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </FeatureComingSoonDialog>
                    </div>
                  </div>

                  {/* Pricing Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Call Minutes */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.labels.callMinutes')}</span>
                        <span className="text-lg font-bold text-primary">
                          {t('plans.payAsYouGo.pricing.callMinutes', { 
                            price: getPayAsYouGoPricingData('callMinute', selectedCountry).price,
                            currency: getPayAsYouGoPricingData('callMinute', selectedCountry).symbol 
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('plans.payAsYouGo.descriptions.callMinutes')}</p>
                    </motion.div>

                    {/* Phone Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.65 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.labels.phoneNumber')}</span>
                        <span className="text-lg font-bold text-primary">
                          {t('plans.payAsYouGo.pricing.phoneNumber', { 
                            price: getPayAsYouGoPricingData('phoneNumber', selectedCountry).price,
                            currency: getPayAsYouGoPricingData('phoneNumber', selectedCountry).symbol 
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('plans.payAsYouGo.descriptions.phoneNumber')}</p>
                    </motion.div>

                    {/* AI Agents */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.labels.aiAgents')}</span>
                        <span className="text-lg font-bold text-primary">
                          {t('plans.payAsYouGo.pricing.aiAgents', { 
                            price: getPayAsYouGoPricingData('aiAgents', selectedCountry).price,
                            currency: getPayAsYouGoPricingData('aiAgents', selectedCountry).symbol 
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('plans.payAsYouGo.descriptions.aiAgents')}</p>
                    </motion.div>

                    {/* Support */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.75 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.labels.support')}</span>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.status.email')}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('plans.payAsYouGo.descriptions.support')}</p>
                    </motion.div>

                    {/* API Access */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.labels.apiAccess')}</span>
                        <span className="text-sm font-medium text-muted-foreground">{t('plans.payAsYouGo.status.notIncluded')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('plans.payAsYouGo.descriptions.apiAccess')}</p>
                    </motion.div>

                    {/* Integrations */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.85 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.labels.integrations')}</span>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium text-card-foreground">{t('plans.payAsYouGo.status.basic')}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('plans.payAsYouGo.descriptions.integrations')}</p>
                    </motion.div>
                  </div>
                </div>
              </Card>
            );
          })()}
        </motion.div>

        {/* Explanatory note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            {t('note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
