"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog"
import { ArrowRight, Sparkles, Zap, Phone, MessageCircle } from "lucide-react"
import { useTranslations } from 'next-intl'
import { motion } from "framer-motion"

export function CTA() {
  const t = useTranslations('ctaSection')
  const tFeatures = useTranslations('featureNames')
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Nearly invisible background effects */}
      
      {/* Extremely subtle moving gradient orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/2 rounded-full blur-[200px]"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-10 right-10 w-96 h-96 bg-primary/1 rounded-full blur-[250px]"
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      {/* Ultra-subtle floating sparkles */}
      <motion.div 
        className="absolute top-32 right-1/4 text-primary/8"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 45, 90],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 left-1/4 text-primary/6"
        animate={{
          y: [0, 8, 0],
          rotate: [0, -45, -90],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <Zap className="w-5 h-5" />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 left-20 text-primary/5"
        animate={{
          y: [0, -8, 0],
          x: [0, 6, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
      >
        <Phone className="w-3 h-3" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 right-32 text-primary/7"
        animate={{
          y: [0, 6, 0],
          x: [0, -4, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      >
        <MessageCircle className="w-4 h-4" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Radiant Glow Effects Behind Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central glow behind headline */}
          <motion.div
            className="absolute w-96 h-96 bg-primary/15 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Secondary glow for depth */}
          <motion.div
            className="absolute w-72 h-72 bg-primary/10 rounded-full blur-[80px]"
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Subtle outer glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <Badge 
            variant="secondary" 
            className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm"
          >
            <motion.div 
              className="mr-2 h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {t('badge')}
          </Badge>
        </motion.div>
        
        {/* Animated Headline */}
        <motion.div className="relative">
          {/* Glow effect specifically behind headline */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-80 h-32 bg-primary/12 rounded-full blur-[60px]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
          >
            {t('headline')}{" "}
            <motion.span 
              className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t('headlineHighlight')}
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* Animated CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Glow effect behind buttons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-64 h-20 bg-primary/8 rounded-full blur-[40px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          
          {/* Primary CTA */}
          <FeatureComingSoonDialog
            featureName={tFeatures('aiCallAgentPlatform')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative z-10"
            >
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold shadow-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">{t('primaryCta')}</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                </motion.div>
              </Button>
            </motion.div>
          </FeatureComingSoonDialog>

          {/* Secondary CTA */}
          <FeatureComingSoonDialog
            featureName={tFeatures('documentation')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative z-10"
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                {t('secondaryCta')}
              </Button>
            </motion.div>
          </FeatureComingSoonDialog>
        </motion.div>

        {/* Animated Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-muted-foreground"
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            >
              ✅
            </motion.div>
            {t('trustIndicator1')}
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              🚀
            </motion.div>
            {t('trustIndicator2')}
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            >
              🔒
            </motion.div>
            {t('trustIndicator3')}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
