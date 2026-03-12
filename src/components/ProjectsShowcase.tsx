"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface Project {
  name: string
  file: string
}

export function ProjectsShowcase() {
  const { dir } = useLanguage()

  const projectLogos: Project[] = [
    { name: "Alaqaar", file: "br-alaqaar.jpg" },
    { name: "Balad", file: "br-balad.jpg" },
    { name: "ContactCars", file: "br-contactcars.jpg" },
    { name: "EFG Hermes", file: "br-efg.jpg" },
    { name: "El Abd", file: "br-elabd.png" },
    { name: "Elites Solutions", file: "br-elitessolutions.jpg" },
    { name: "Furn", file: "br-furn.jpg" },
    { name: "Jamjoom", file: "br-jamjoom.jpg" },
    { name: "Moqawalat", file: "br-moqawalat.jpg" },
    { name: "Valu", file: "br-valu.jpg" }
  ]

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-cyan-50 to-emerald-50 dark:from-slate-900/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-4xl mx-auto"
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6 inline-flex px-4 gap-2">
            <Star className={`h-4 w Ascending-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            <span>Portfolio</span>
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading companies
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          transition={{ staggerChildren: 0.1 }}
        >
          {projectLogos.map((project) => (
            <motion.div
              key={project.name}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl bg-card/80 backdrop-blur-sm transition-all duration-500 group-hover:bg-card">
                <CardContent className="p-8">
                  <div className="relative w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-muted/50 to-transparent rounded-xl blur-sm group-hover:opacity-0 transition-all duration-500" />
                    <img 
                      src={`/projects-logos/${project.file}`}
                      alt={`${project.name} logo`}
                      className="relative z-10 w-24 h-24 object-contain mx-auto opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 filter drop-shadow-lg"
                    />
                  </div>
                  <CardTitle className="text-lg font-bold text-center leading-tight group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

