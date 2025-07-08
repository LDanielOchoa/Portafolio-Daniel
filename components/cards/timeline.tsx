"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"

interface TimelineProps {
  language: string
}

export function Timeline({ language }: TimelineProps) {
  const experiences = [
    {
      id: 1,
      title: language === "en" ? "Software Engineering" : "Ingeniería de Software",
      company: language === "en" ? "Self-employed" : "Independiente",
      period: language === "en" ? "2025 - Present" : "2025 - Presente",
      description:
        language === "en"
          ? "Working as a software engineer, focusing on developing innovative solutions and implementing modern technologies."
          : "Trabajando como ingeniero de software, enfocado en desarrollar soluciones innovadoras e implementar tecnologías modernas.",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: 2,
      title: language === "en" ? "Full-Stack Development Assistant" : "Auxiliar de Mejora Continua (Desarrollo Full-Stack)",
      company: language === "en" ? "Continuous Improvement" : "Mejora Continua",
      period: language === "en" ? "2025 - Present" : "2025 - Presente",
      description:
        language === "en"
          ? "Working as a Full-Stack development assistant, implementing web solutions and optimizing processes through software development."
          : "Trabajando como auxiliar de mejora continua con enfoque en desarrollo de software Full-Stack, implementando soluciones web y optimizando procesos.",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: 3,
      title: language === "en" ? "Data Analysis Intern" : "Practicante de Análisis de Datos",
      company: language === "en" ? "Eastern Feeder System 6" : "Sistema Alimentador Oriental 6",
      period: "2024 - 2025",
      description:
        language === "en"
          ? "Worked as a data analysis intern, processing and analyzing data to extract valuable insights and support decision-making processes."
          : "Trabajé como practicante en análisis de datos, procesando y analizando información para extraer insights valiosos y apoyar procesos de toma de decisiones.",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: 4,
      title: language === "en" ? "Software Development Technician" : "Técnica en Desarrollo de Software",
      company: language === "en" ? "Politecnico Mayor" : "Politécnico Mayor",
      period: "2023 - 2025",
      description:
        language === "en"
          ? "Technical education in software development, learning programming fundamentals, web technologies, and software engineering principles."
          : "Formación técnica en desarrollo de software, aprendiendo fundamentos de programación, tecnologías web y principios de ingeniería de software.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-600/80 via-purple-600/50 to-purple-600/20"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center z-10">
                {exp.icon}
              </div>

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pt-1.5 md:pt-0 pb-8`}
              >
                <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6 hover:border-purple-600/30 hover:bg-purple-600/5 transition-colors">
                  <span className="text-sm font-medium text-purple-600 mb-2 block">{exp.period}</span>
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-foreground/60 text-sm mb-3">{exp.company}</p>
                  <p className="text-foreground/80">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
