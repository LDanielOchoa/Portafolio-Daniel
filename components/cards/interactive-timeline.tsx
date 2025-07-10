"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, GraduationCap, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"

interface TimelineProps {
  language: string
}

export function InteractiveTimeline({ language }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const experiences = [
    {
      id: 1,
      title: language === "en" ? "Software Engineering" : "Ingeniería de Software",
      company: language === "en" ? "Student" : "Politecnico Grancolombiano",
      period: language === "en" ? "2025 - Present" : "2025 - Presente",
      description:
        language === "en"
          ? "Currently studying Software Engineering, focusing on learning modern technologies and developing practical projects to build a strong foundation in software development."
          : "Actualmente estudiando Ingeniería de Software, enfocándome en aprender tecnologías modernas y desarrollar proyectos prácticos para construir una base sólida en desarrollo de software.",
      icon: <GraduationCap className="w-5 h-5" />,
      achievements: [
        language === "en" ? "Learning modern web technologies" : "Aprendiendo tecnologías web modernas",
        language === "en" ? "Building practical projects" : "Construyendo proyectos prácticos",
        language === "en" ? "Developing programming skills" : "Desarrollando habilidades de programación",
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      image: "/work-experience-1.jpg?width=600&height=400&query=modern office tech team",
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
      achievements: [
        language === "en" ? "Process optimization through software" : "Optimización de procesos mediante software",
        language === "en" ? "Full-stack web application development" : "Desarrollo de aplicaciones web Full-Stack",
        language === "en" ? "Implementation of efficient workflows" : "Implementación de flujos de trabajo eficientes",
      ],
      technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
      image: "/work-experience-2.jpg?width=600&height=400&query=creative agency workspace",
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
      achievements: [
        language === "en" ? "Data processing and visualization" : "Procesamiento y visualización de datos",
        language === "en" ? "Report generation and analysis" : "Generación y análisis de informes",
        language === "en" ? "Decision support through data insights" : "Apoyo a decisiones mediante insights de datos",
      ],
      technologies: ["Excel", "Power BI", "SQL", "Python"],
      image: "/work-experience-3.jpg?width=600&height=400&query=data analysis workspace",
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
      achievements: [
        language === "en" ? "Graduated with honors" : "Graduado con honores",
        language === "en" ? "Best final year project" : "Mejor proyecto de último año",
        language === "en" ? "Research assistant" : "Asistente de investigación",
      ],
      technologies: ["Java", "Python", "C++", "Web Development"],
      image: "/work-experience-4.jpg?width=600&height=400&query=university campus technology",
    },
  ]

  const nextExperience = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevExperience}
            className="w-12 h-12 rounded-full flex items-center justify-center glass-effect hover:bg-purple-600/10 hover:border-purple-600/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="text-center">
            <span className="text-sm text-foreground/60 bg-foreground/5 px-4 py-1 rounded-full">
              {activeIndex + 1} / {experiences.length}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextExperience}
            className="w-12 h-12 rounded-full flex items-center justify-center glass-effect hover:bg-purple-600/10 hover:border-purple-600/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="glass-card overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={experiences[activeIndex].image || "/placeholder.svg"}
                  alt={experiences[activeIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="inline-flex items-center space-x-2 frosted-glass px-4 py-2 rounded-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center glow-sm">
                      {experiences[activeIndex].icon}
                    </div>
                    <span className="font-medium">{experiences[activeIndex].period}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1 gradient-text">{experiences[activeIndex].title}</h3>
                <p className="text-foreground/60 text-sm mb-4">{experiences[activeIndex].company}</p>
                <p className="text-foreground/80 mb-6">{experiences[activeIndex].description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm uppercase text-foreground/60 mb-2">
                      {language === "en" ? "Key Achievements" : "Logros Principales"}
                    </h4>
                    <ul className="space-y-2">
                      {experiences[activeIndex].achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 mr-2"></div>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase text-foreground/60 mb-2">
                      {language === "en" ? "Technologies" : "Tecnologías"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeIndex].technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-gradient-to-r from-purple-600 to-indigo-400" : "bg-foreground/20"
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
