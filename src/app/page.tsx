'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Code2, 
  Users, 
  Rocket, 
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Star,
  Zap,
  Shield,
  Globe,
  Menu,
  X
} from 'lucide-react'
import ThreeDAnimation from '../components/ThreeDAnimation'

// ============================================
// Animation Variants
// ============================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
}

const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.03, y: -8, transition: { duration: 0.3, ease: "easeOut" as const } }
}

const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
  }
}

const floatSlow = {
  initial: { y: 0 },
  animate: {
    y: [-15, 15, -15],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
  }
}

const heroTitle = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  })
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 }
  }
}

// ============================================
// Animation Components
// ============================================

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '', delay = 0.1 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ end, duration = 2, className = '' }: { end: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    
    requestAnimationFrame(step)
  }, [end, duration, isInView])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className={className}
    >
      {count}
    </motion.div>
  )
}

function AnimatedCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={className}
    >
      {children}
    </motion.div>
  )
}

function BounceIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={bounceIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Float({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={float}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FloatSlow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={floatSlow}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Home() {
  const { t, language, dir } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [language, dir])

  // Close mobile menu when language changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [language])

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="relative h-10 w-10">
                <img 
                  src="/logo.png" 
                  alt="IKEN Technology Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">IKEN Technology</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-1">
              <motion.a 
                href="#about" 
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {t.nav.about}
              </motion.a>
              <motion.a 
                href="#services" 
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {t.nav.services}
              </motion.a>
              <motion.a 
                href="#testimonials" 
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {t.nav.testimonials}
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {t.nav.contact}
              </motion.a>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="sm" className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  {t.nav.startProject}
                  <ChevronRight className={`h-4 w-4 ${dir === 'rtl' ? 'ml-0 mr-2' : 'ml-2'}`} />
                </Button>
              </motion.button>
              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6 text-slate-700 dark:text-slate-300" /> : <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                <motion.a 
                  href="#about" 
                  className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {t.nav.about}
                </motion.a>
                <motion.a 
                  href="#services" 
                  className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {t.nav.services}
                </motion.a>
                <motion.a 
                  href="#testimonials" 
                  className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {t.nav.testimonials}
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {t.nav.contact}
                </motion.a>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    {t.nav.startProject}
                    <ChevronRight className={`h-4 w-4 ${dir === 'rtl' ? 'ml-0 mr-2' : 'ml-2'}`} />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100 dark:from-blue-950 dark:via-slate-900 dark:to-slate-800" />
        <Float className="absolute top-20 left-10 w-72 h-72 bg-blue-200/50 dark:bg-blue-800/30 rounded-full blur-3xl">
          <></>
        </Float>
        <FloatSlow className="absolute bottom-20 right-10 w-96 h-96 bg-slate-200/50 dark:bg-slate-700/30 rounded-full blur-3xl">
          <></>
        </FloatSlow>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/40 to-slate-200/40 dark:from-blue-900/20 dark:to-slate-800/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                <Star className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2 mr-0' : 'mr-2'}`} />
                {t.hero.badge}
              </Badge>
            </motion.div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="block"
              >
                IKEN Technology
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-blue-600 dark:text-blue-400 mt-2"
              >
                {t.hero.title}
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl"
            >
              {t.hero.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                  {t.hero.exploreServices}
                  <ChevronRight className={`h-5 w-5 ${dir === 'rtl' ? 'ml-0 mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform`} />
                </Button>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/50">
                  {t.hero.contactUs}
                </Button>
              </motion.button>
            </motion.div>
            
            {/* Hero Image with Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-16"
            >
              <Float>
                <div className="relative mx-auto max-w-4xl">
                  {/* Glassmorphism Container */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-slate-400 to-blue-500 p-[2px] rounded-3xl">
                      <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl" />
                    </div>
                    
                    {/* Team Working Image */}
                    <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop" 
                        alt="IKEN Technology Team Working Together" 
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      
                      {/* Professional Overlay Text */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white/90 text-sm sm:text-base font-medium text-center">
                          {language === 'ar' ? 'فريق عمل محترف ملتزم بتقديم أفضل الحلول التقنية' : 'Professional team committed to delivering the best tech solutions'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-slate-400 rounded-2xl opacity-80"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl opacity-80"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Additional Professional Elements */}
                  <motion.div 
                    className="absolute top-1/2 -left-6 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <Users className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <motion.div 
                    className="absolute top-1/3 -right-6 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                  >
                    <Code2 className="h-5 w-5 text-slate-600" />
                  </motion.div>
                </div>
              </Float>
            </motion.div>
            
            {/* Animated Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              <motion.div 
                className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <AnimatedCounter end={10} className="text-3xl font-bold text-blue-600 dark:text-blue-400" />
                <div className="text-sm text-slate-600 dark:text-slate-400">{t.hero.stats.years}</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <AnimatedCounter end={500} className="text-3xl font-bold text-blue-600 dark:text-blue-400" />
                <div className="text-sm text-slate-600 dark:text-slate-400">{t.hero.stats.projects}</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <AnimatedCounter end={100} className="text-3xl font-bold text-blue-600 dark:text-blue-400" />
                <div className="text-sm text-slate-600 dark:text-slate-400">{t.hero.stats.clients}</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{t.hero.stats.support}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-slate-900 dark:to-teal-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1}>
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge variant="outline" className="mb-4 border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-400">
                <Users className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2 mr-0' : 'mr-2'}`} />
                {t.about.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t.about.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t.about.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" delay={0.2}>
            <AnimatedCard className="text-center">
              <CardHeader>
                <motion.div 
                  className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Shield className="h-7 w-7 text-white" />
                </motion.div>
                <CardTitle>{t.about.values.reliability.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription>
                  {t.about.values.reliability.description}
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard className="text-center">
              <CardHeader>
                <motion.div 
                  className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Zap className="h-7 w-7 text-white" />
                </motion.div>
                <CardTitle>{t.about.values.innovation.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription>
                  {t.about.values.innovation.description}
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard className="text-center">
              <CardHeader>
                <motion.div 
                  className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Users className="h-7 w-7 text-white" />
                </motion.div>
                <CardTitle>{t.about.values.professionalism.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription>
                  {t.about.values.professionalism.description}
                </CardDescription>
              </CardContent>
            </AnimatedCard>
          </StaggerContainer>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-amber-50 via-white to-orange-50 dark:from-amber-950 dark:via-slate-900 dark:to-orange-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1}>
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge variant="outline" className="mb-4 border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-400">
                <Code2 className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2 mr-0' : 'mr-2'}`} />
                {t.services.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t.services.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t.services.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" delay={0.2}>
            <AnimatedCard className="hover:shadow-xl transition-all bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <motion.div 
                  className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Globe className="h-7 w-7 text-white" />
                </motion.div>
                <CardTitle>{t.services.conferenceSystems.title}</CardTitle>
                <CardDescription>{t.services.conferenceSystems.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription className="space-y-2">
                  <p>{t.services.conferenceSystems.description}</p>
                  <ul className="space-y-1 mt-4">
                    {t.services.conferenceSystems.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard className="hover:shadow-xl transition-all bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <motion.div 
                  className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Code2 className="h-7 w-7 text-white" />
                </motion.div>
                <CardTitle>{t.services.customSoftware.title}</CardTitle>
                <CardDescription>{t.services.customSoftware.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription className="space-y-2">
                  <p>{t.services.customSoftware.description}</p>
                  <ul className="space-y-1 mt-4">
                    {t.services.customSoftware.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-violet-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard className="hover:shadow-xl transition-all bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <motion.div 
                  className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Rocket className="h-7 w-7 text-white" />
                </motion.div>
                <CardTitle>{t.services.businessSolutions.title}</CardTitle>
                <CardDescription>{t.services.businessSolutions.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription className="space-y-2">
                  <p>{t.services.businessSolutions.description}</p>
                  <ul className="space-y-1 mt-4">
                    {t.services.businessSolutions.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardDescription>
              </CardContent>
            </AnimatedCard>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-violet-50 via-white to-purple-50 dark:from-violet-950 dark:via-slate-900 dark:to-purple-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1}>
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge variant="outline" className="mb-4 border-violet-300 text-violet-700 dark:border-violet-600 dark:text-violet-400">
                <Star className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2 mr-0' : 'mr-2'}`} />
                {t.testimonials.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t.testimonials.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t.testimonials.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" delay={0.2}>
            {/* Testimonial 1 */}
            <AnimatedCard className="hover:shadow-xl transition-all bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {t.testimonials.youssef.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">YA</span>
                  </div>
                  <div>
                    <div className="font-semibold">{t.testimonials.youssef.name}</div>
                    <CardDescription className="text-xs">
                      {t.testimonials.youssef.role}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Testimonial 2 */}
            <AnimatedCard className="hover:shadow-xl transition-all bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed pt-2">
                  {t.testimonials.mohammed.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">MA</span>
                  </div>
                  <div>
                    <div className="font-semibold">{t.testimonials.mohammed.name}</div>
                    <CardDescription className="text-xs">
                      {t.testimonials.mohammed.role}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Testimonial 3 */}
            <AnimatedCard className="hover:shadow-xl transition-all bg-white dark:bg-slate-800 rounded-2xl md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed pt-2">
                  {t.testimonials.waleed.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">WK</span>
                  </div>
                  <div>
                    <div className="font-semibold">{t.testimonials.waleed.name}</div>
                    <CardDescription className="text-xs">
                      {t.testimonials.waleed.role}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <FadeIn delay={0.1}>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-blue-400 text-blue-300">
                  <Mail className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2 mr-0' : 'mr-2'}`} />
                  {t.contact.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
                  {t.contact.title}
                </h2>
                <p className="text-lg text-slate-300">
                  {t.contact.description}
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{t.contact.form.title}</CardTitle>
                    <CardDescription className="text-slate-400">{t.contact.form.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">{t.contact.form.name}</label>
                      <Input placeholder={t.contact.form.namePlaceholder} className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">{t.contact.form.email}</label>
                      <Input type="email" placeholder={t.contact.form.emailPlaceholder} className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">{t.contact.form.subject}</label>
                      <Input placeholder={t.contact.form.subjectPlaceholder} className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">{t.contact.form.message}</label>
                      <Textarea 
                        placeholder={t.contact.form.messagePlaceholder} 
                        className="min-h-[120px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {t.contact.form.send}
                      <ChevronRight className={`h-4 w-4 ${dir === 'rtl' ? 'ml-0 mr-2' : 'ml-2'}`} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">{t.contact.info.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{t.contact.info.address}</div>
                          <CardDescription className="text-slate-400">{t.contact.info.addressValue}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{t.contact.info.email}</div>
                          <CardDescription className="text-slate-400">{t.contact.info.emailValue}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{t.contact.info.phone}</div>
                          <CardDescription className="text-slate-400">{t.contact.info.phoneValue}</CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <CardHeader>
                      <CardTitle className="text-white">{t.contact.why.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-white/90">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{t.contact.why.reason1}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{t.contact.why.reason2}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{t.contact.why.reason3}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{t.contact.why.reason4}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-8 w-8">
                  <img 
                    src="/logo.png" 
                    alt="IKEN Technology Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-white">IKEN Technology</span>
              </div>
              <CardDescription className="max-w-md text-slate-400">
                {t.footer.slogan}
              </CardDescription>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">{t.footer.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.nav.testimonials}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">{t.footer.ourServices}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-slate-400">{t.footer.conferenceSystems}</span>
                </li>
                <li>
                  <span className="text-slate-400">{t.footer.customSoftware}</span>
                </li>
                <li>
                  <span className="text-slate-400">{t.footer.businessSolutions}</span>
                </li>
                <li>
                  <span className="text-slate-400">{t.footer.techConsulting}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} IKEN Technology. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;
