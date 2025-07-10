"use client"

import { motion, useAnimation } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])
  
  return prefersReducedMotion
}

const testimonialsData = {
  en: [
    {
      name: "Oliver Barbosa",
      title: "Programming Professional",
      quote: "The Permission Request System has significantly improved our workflow efficiency. Daniel's implementation of the system shows great attention to detail and understanding of our needs.",
    },
    {
      name: "Wanda Sanchez",
      title: "Human Resources Professional",
      quote: "The Performance Evaluation system has revolutionized how we handle employee assessments. The automated reporting features save us countless hours of work.",
    },
    {
      name: "Mario Valle",
      title: "Operations Coordinator",
      quote: "The Performance Indicators dashboard provides us with crucial real-time insights. It's become an essential tool for our daily operations and decision-making process.",
    },
    {
      name: "Martin Hernandez",
      title: "General Manager",
      quote: "The SSO implementation has greatly enhanced our system security while simplifying access for our users. It's a perfect balance of security and usability.",
    },
  ],
  es: [
    {
      name: "Oliver Barbosa",
      title: "Profesional de Programación",
      quote: "El Sistema de Solicitud de Permisos ha mejorado significativamente la eficiencia de nuestro flujo de trabajo. La implementación de Daniel muestra gran atención al detalle y comprensión de nuestras necesidades.",
    },
    {
      name: "Wanda Sanchez",
      title: "Profesional de Gestión Humana",
      quote: "El sistema de Evaluación de Desempeño ha revolucionado la forma en que manejamos las evaluaciones de los empleados. Las funciones de informes automatizados nos ahorran incontables horas de trabajo.",
    },
    {
      name: "Mario Valle",
      title: "Coordinador de Operaciones",
      quote: "El panel de Indicadores de Desempeño nos proporciona información crucial en tiempo real. Se ha convertido en una herramienta esencial para nuestras operaciones diarias y el proceso de toma de decisiones.",
    },
    {
      name: "Martin Hernandez",
      title: "Gerente General",
      quote: "La implementación del SSO ha mejorado enormemente la seguridad de nuestro sistema mientras simplifica el acceso para nuestros usuarios. Es un equilibrio perfecto entre seguridad y usabilidad.",
    },
  ],
}

interface TestimonialCarouselProps {
  language: "en" | "es"
}

export function TestimonialCarousel({ language }: TestimonialCarouselProps) {
  const testimonials = testimonialsData[language]
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]
  const controls = useAnimation()
  const prefersReducedMotion = usePrefersReducedMotion()

  const startAnimation = useCallback(() => {
    if (!prefersReducedMotion) {
      controls.start({
        x: [0, "-100%"],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      })
    }
  }, [controls, prefersReducedMotion])

  useEffect(() => {
    startAnimation()
  }, [startAnimation, language])

  if (prefersReducedMotion) {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-[280px] md:w-[400px]">
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/20 dark:border-white/10 backdrop-blur-sm">
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6">
                  <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fading Edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 md:w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 md:w-16 bg-gradient-to-l from-background to-transparent" />

      <motion.div 
        className="flex gap-6 md:gap-8"
        animate={controls}
        initial={{ x: 0 }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-[280px] md:w-[400px]">
            <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/20 dark:border-white/10 backdrop-blur-sm">
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-6">
                <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{testimonial.name}</p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
