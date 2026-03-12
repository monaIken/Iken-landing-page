'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Testimonial {
  key: string
  image: string
}

export function ClientTestimonials() {
  const { t, dir } = useLanguage()

  const testimonials: Testimonial[] = [
    { key: 'youssef', image: 'ourClients/youssef-abdelrahman.webp' },
    { key: 'mohammed', image: 'ourClients/mohammed-assem.webp' },
    { key: 'waleed', image: 'ourClients/waleed-kamel.webp' }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-4xl mx-auto"
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6 inline-flex px-4 gap-2">
            <Star className={'h-4 w-4 ' + (dir === 'rtl' ? 'ml-1' : 'mr-1')} />
            <span>{t.testimonials.badge}</span>
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.testimonials.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          transition={{ staggerChildren: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.key}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl bg-card/80 backdrop-blur-sm transition-all duration-500 group-hover:bg-card">
                <CardContent className="p-8 pt-12 pb-12 relative">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-muted/50 to-transparent rounded-full blur-sm group-hover:opacity-0 transition-all duration-500" />
                    <img 
                      src={'/' + testimonial.image}
                      alt={t.testimonials[testimonial.key]?.name || ''}
                      className="relative z-10 w-24 h-24 object-cover rounded-full mx-auto border-4 border-background/50 shadow-2xl group-hover:border-primary/50 transition-all duration-500"
                    />
                  </div>
                  
                  <div className="text-center mb-6 italic text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                    "
                  </div>
                  <p className="text-center mb-6 text-lg leading-relaxed text-muted-foreground/90 group-hover:text-foreground/95 transition-all line-clamp-4">
                    {t.testimonials[testimonial.key]?.text || ''}
                  </p>
                  
                  <div className="text-center space-y-1">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {t.testimonials[testimonial.key]?.name || ''}
                    </CardTitle>
                    <CardDescription className="text-sm opacity-75">
                      {t.testimonials[testimonial.key]?.role || ''}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
