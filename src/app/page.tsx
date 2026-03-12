'use client'

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ProjectsShowcase } from "@/components/ProjectsShowcase"
import { useLanguage } from "@/contexts/LanguageContext"
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
} from "lucide-react"

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ end, className = "" }: { end: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    let startTime: number
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    
    requestAnimationFrame(step)
  }, [end, isInView])
  
  return (
    <motion.div ref={ref} className={className}>
      {count}
    </motion.div>
  )
}

function AnimatedCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -8 }} className={className}>
      {children}
    </motion.div>
  )
}

function Float({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [language, dir])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [language])

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b border-slate-200/50 backdrop-blur-lg bg-background/95"
      >
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src="/logo.png" 
              alt="IKEN Technology Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground">IKEN Technology</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <motion.a href="#about" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors" whileHover={{ y: -1 }}>
              {t.nav.about}
            </motion.a>
            <motion.a href="#projects" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors" whileHover={{ y: -1 }}>
              Projects
            </motion.a>
            <motion.a href="#services" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors" whileHover={{ y: -1 }}>
              {t.nav.services}
            </motion.a>
            <motion.a href="#testimonials" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors" whileHover={{ y: -1 }}>
              {t.nav.testimonials}
            </motion.a>
            <motion.a href="#contact" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors" whileHover={{ y: -1 }}>
              {t.nav.contact}
            </motion.a>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button size="sm" className="hidden md:inline-flex">
              {t.nav.startProject}
              <ChevronRight className={`ml-2 h-4 w-4 ${dir === 'rtl' ? '-mr-1' : 'ml-1'}`} />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-slate-950" />
        <Float className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-xl" />
        <Float className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-2xl" />

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Badge className="mb-6">
              <Star className={`mr-2 h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t.hero.badge}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span>IKEN Technology</span>
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2">
                  {t.hero.exploreServices}
                  <ChevronRight className={`h-5 w-5 ${dir === 'rtl' ? '-mr-1 transition-left' : 'ml-1 transition-right'}`} />
                </Button>
              </motion.button>
              <Button variant="outline" size="lg">
                {t.hero.contactUs}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity:  1, y: 0 }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-20"
          >
            <div className="text-center p-8 bg-card backdrop-blur-sm rounded-2xl shadow-lg" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter end={10} className="text-3xl font-bold text-primary" />
              <div className="text-sm text-muted-foreground">{t.hero.stats.years}</div>
            </div>
            <div className="text-center p-8  bg-card backdrop-blur-sm rounded-2xl shadow-lg" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter end={500} className="text-3xl font-bold text-primary" />
              <div className="text-sm text-muted-foreground">{t.hero.stats.projects}</div>
            </div>
            <div className="text-center p-8 bg-card backdrop-blur-sm rounded-2xl shadow-lg" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter end={100} className="text-3xl font-bold text-primary" />
              <div className="text-sm text-muted-foreground">{t.hero.stats.clients}</div>
            </div>
            <div className="text-center p-8 bg-card backdrop-blur-sm rounded-2xl shadow-lg" whileHover={{ scale: 1.05 }}>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">{t.hero.stats.support}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <ProjectsShowcase />

      {/* About */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Users className={`mr-2 h-4 w-4 ${dir === 'rtl' ? '  ml-2' : 'mr-2'}`} />
                {t.about.badge}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {t.about.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.about.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <AnimatedCard>
              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{t.about.values.reliability.title}</CardTitle>
                <CardDescription>{t.about.values.reliability.description}</CardDescription>
              </Card>
            </AnimatedCard>

            <AnimatedCard>
              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{t.about.values.innovation.title}</CardTitle>
                <CardDescription>{t.about.values.innovation.description}</CardDescription>
              </Card>
            </AnimatedCard>

            <AnimatedCard>
              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{t.about.values.professionalism.title}</CardTitle>
                <CardDescription>{t.about.values.professionalism.description}</CardDescription>
              </Card>
            </AnimatedCard>
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Code2 className={`mr-2 h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t.services.badge}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {t.services.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.services.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard>
              <Card className="p-8 hover:shadow-xl">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{t.services.conferenceSystems.title}</CardTitle>
                <CardDescription>{t.services.conferenceSystems.subtitle}</CardDescription>
                <CardDescription className="mt-4 space-y-2">
                  <p>{t.services.conferenceSystems.description}</p>
                  <ul className="mt-4 space-y-1">
                    {t.services.conferenceSystems.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardDescription>
              </Card>
            </AnimatedCard>

            <AnimatedCard>
              <Card className="p-8 hover:shadow-xl">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{t.services.customSoftware.title}</CardTitle>
                <CardDescription>{t.services.customSoftware.subtitle}</CardDescription>
                <CardDescription className="mt-4 space-y-2">
                  <p>{t.services.customSoftware.description}</p>
                  <ul className="mt-4 space-y-1">
                    {t.services.customSoftware.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-violet-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardDescription>
              </Card>
            </AnimatedCard>

            <AnimatedCard>
              <Card className="  p-8 hover:shadow-xl">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{t.services.businessSolutions.title}</CardTitle>
                <CardDescription>{t.services.businessSolutions.subtitle}</CardDescription>
                <CardDescription className="mt-4 space-y-2">
                  <p>{t.services.businessSolutions.description}</p>
                  <ul className="mt-4 space-y-1">
                    {t.services.businessSolutions.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="  h-4 w-4 text-orange-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardDescription>
              </Card>
            </AnimatedCard>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Mail className={`mr-2 h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t.contact.badge}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-card-foreground">
                {t.contact.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.contact.description}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>{t.contact.form.title}</CardTitle>
                <CardDescription>{t.contact.form.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label>{t.contact.form.name}</label>
                  <Input placeholder={t.contact.form.namePlaceholder} />
                </div>
                <div className="space-y-2">
                  <label>{t.contact.form.email}</label>
                  <Input type="email" placeholder={t.contact.form.emailPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label>{t.contact.form.message}</label>
                  <Textarea placeholder={t.contact.form.messagePlaceholder} className="min-h-[120px]" />
                </div>
                <Button className="w-full">
                  {t.contact.form.send}
                  <ChevronRight className={`ml-2 h-4 w-4 ${dir === 'rtl' ? '-mr-1' : 'ml-1'}`} />
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-xl p-8">
                <CardTitle className="mb-6">{t.contact.info.title}</CardTitle>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{t.contact.info.address}</div>
                      <CardDescription>{  t.contact.info.addressValue}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{t.contact.info.email}</div>
                      <CardDescription>{t.contact.info.emailValue}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{t.contact.info.phone}</div>
                      <CardDescription>{t.contact.info.phoneValue}</CardDescription>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-primary to-secondary text-card-foreground shadow-2xl">
                <CardHeader>
                  <CardTitle>{t.contact.why.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {t.contact.why.reason1 && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>{t.contact.why.reason1}</span>
                    </div>
                  )}
                  {t.contact.why.reason2 && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>{t.contact.why.reason2}</span>
                    </div>
                  )}
                  {t.contact.why.reason3 && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>{t.contact.why.reason3}</span>
                    </div>
                  )}
                  {t.contact.why.reason4 && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2  className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>{t.contact.why.reason4}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-  8 w-8" />
              <span className="text-xl font-bold">IKEN Technology</span>
            </div>
            <div className="flex gap-4">
              <a href="#about" className="text-sm hover:text-primary transition-colors">{t.nav.about}</a>
              <a href="#services" className="text-sm hover:text-primary transition-colors">{t.nav.services}</a>
              <a href="#testimonials" className="text-sm hover:text-primary transition-colors">{t.nav.testimonials}</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">{t.nav.contact}</a>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            (c) {new Date().getFullYear()} IKEN Technology. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home



