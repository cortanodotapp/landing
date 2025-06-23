'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NumberFlow from '@number-flow/react';
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
import { FeatureComingSoonDialog } from '@/components/ui/feature-coming-soon-dialog';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, Check, Star, Zap, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Star,
    price: {
      monthly: 40,
      yearly: 32,
    },
    description:
      'Perfect for trying out AI call agents and small businesses.',
    features: [
      '750 call minutes / month',
      '1 Free Phone Number',
      'Basic AI voice models',
      'Single workspace',
      '2 AI agents',
      'Basic Support',
    ],
    cta: 'Start Now',
  },
  {
    id: 'pro',
    name: 'Professional',
    icon: Zap,
    price: {
      monthly: 80,
      yearly: 62,
    },
    description: 'Everything you need to build and scale your AI call business.',
    features: [
      '2,000 call minutes / month',
      '1 Free Phone Number',
      'Premium AI voice models',
      'Advanced workflow builder',
      'Unlimited AI agents',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Start Pro',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Shield,
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Critical scale, security, and dedicated support for your business.',
    features: [
      'Unlimited call minutes',
      '5 Free Phone Number',
      'Custom AI voice models',
      'Multi-tenant architecture',
      'SLA guarantees',
      'Dedicated success manager',
      'White-label options',
    ],
    cta: 'Contact Sales',
  },
];

export default function SimplePricing() {
  const [frequency, setFrequency] = useState<string>('monthly');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
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
            Pricing Plans
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-card-foreground mb-4 sm:text-5xl"
          >
            Choose the perfect plan for your AI call agents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Scale from your first AI call to millions. Transparent pricing with no hidden fees.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Tabs
            defaultValue={frequency}
            onValueChange={setFrequency}
            className="inline-block rounded-full bg-card border border-border p-1"
          >
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="monthly"
                className="rounded-full transition-all duration-300 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="rounded-full transition-all duration-300 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Yearly
                <Badge
                  variant="secondary"
                  className="ml-2 bg-primary/10 text-primary hover:bg-primary/15"
                >
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
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
                      Popular
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
                      {typeof plan.price[
                        frequency as keyof typeof plan.price
                      ] === 'number' ? (
                        <div className="flex items-baseline gap-1">
                          <NumberFlow
                            className={cn(
                              'text-3xl font-bold',
                              plan.popular ? 'text-primary' : 'text-card-foreground',
                            )}
                            format={{
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 0,
                            }}
                            value={
                              plan.price[
                                frequency as keyof typeof plan.price
                              ] as number
                            }
                          />
                          <span className="text-sm text-muted-foreground">
                            /month
                          </span>
                        </div>
                      ) : (
                        <span
                          className={cn(
                            'text-2xl font-bold',
                            plan.popular ? 'text-primary' : 'text-card-foreground',
                          )}
                        >
                          {plan.price[frequency as keyof typeof plan.price]}
                        </span>
                      )}
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
                    featureName={plan.name + " Plan"}
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
      </div>
    </section>
  );
}
