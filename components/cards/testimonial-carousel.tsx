"use client"

import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
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
      name: "Alex Johnson",
      title: "CTO, Innovate Inc.",
      quote: "Daniel is a proactive and highly skilled developer. His ability to tackle complex problems was instrumental in our project's success. A true asset to any team.",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Samantha Lee",
      title: "Product Manager, Tech Solutions",
      quote: "Working with Daniel was a fantastic experience. He consistently delivered high-quality code, showed great initiative, and his communication skills are excellent.",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Mike Chen",
      title: "Lead Engineer, Data Corp.",
      quote: "Daniel's expertise in backend systems and automation significantly improved our infrastructure. His dedication and problem-solving abilities are top-notch.",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Isabella Rossi",
      title: "UX Lead, Creative Minds",
      quote: "The collaboration was seamless. Daniel has a keen eye for design and user experience, which is a rare and valuable combination in a developer.",
      image: "/placeholder-user.jpg",
    },
  ],
  es: [
    {
      name: "Alex Johnson",
      title: "CTO, Innovate Inc.",
      quote: "Daniel es un desarrollador proactivo y altamente cualificado. Su habilidad para abordar problemas complejos fue fundamental para el éxito de nuestro proyecto. Un verdadero activo para cualquier equipo.",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Samantha Lee",
      title: "Gerente de Producto, Tech Solutions",
      quote: "Trabajar con Daniel fue una experiencia fantástica. Entregó código de alta calidad de manera consistente, mostró gran iniciativa y sus habilidades de comunicación son excelentes.",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Mike Chen",
      title: "Ingeniero Principal, Data Corp.",
      quote: "La experiencia de Daniel en sistemas de backend y automatización mejoró significativamente nuestra infraestructura. Su dedicación y capacidad para resolver problemas son de primer nivel.",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Isabella Rossi",
      title: "Líder UX, Mentes Creativas",
      quote: "La colaboración fue perfecta. Daniel tiene un gran ojo para el diseño y la experiencia de usuario, lo cual es una combinación rara y valiosa en un desarrollador.",
      image: "/placeholder-user.jpg",
    },
  ],
}

interface TestimonialCarouselProps {
  language: "en" | "es"
}

export function TestimonialCarousel({ language }: TestimonialCarouselProps) {
  const testimonials = testimonialsData[language]
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials] // Triple for smoother loop
  const controls = useAnimation()
  const prefersReducedMotion = usePrefersReducedMotion()

  // Optimized animation speeds - faster for mobile, slower for desktop
  const getAnimationDuration = useCallback(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      return isMobile ? 25 : 50 // Faster on mobile (25s), slower on desktop (50s)
    }
    return 50
  }, [])

  const startAnimation = useCallback(() => {
    if (!prefersReducedMotion) {
      controls.start({
        x: "-33.333%", // Move one third since we have 3 copies
        transition: {
          duration: getAnimationDuration(),
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      })
    }
  }, [controls, prefersReducedMotion, getAnimationDuration])
  
  useEffect(() => {
    startAnimation()
  }, [startAnimation])

  // Handle window resize for responsive animation speed
  useEffect(() => {
    const handleResize = () => {
      startAnimation()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [startAnimation])

  if (prefersReducedMotion) {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-[280px] md:w-[400px]">
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-gray-400">{testimonial.title}</p>
                  </div>
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
        style={{ width: "300%" }} // 3x width for triple duplication
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-[280px] md:w-[400px]">
            <div className="relative h-full p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                          <Image
                  src={testimonial.image}
                            alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                          />
                      <div>
                  <p className="font-bold text-white text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                    </div>
                  </div>
        ))}
      </motion.div>
    </div>
  )
}
