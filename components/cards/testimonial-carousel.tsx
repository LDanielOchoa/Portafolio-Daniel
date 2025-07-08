"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialProps {
  language: string
}

export function TestimonialCarousel({ language }: TestimonialProps) {
  const testimonials = [
    {
      id: 1,
      name: language === "en" ? "John Smith" : "Juan Pérez",
      role: language === "en" ? "CEO at TechCorp" : "CEO en TechCorp",
      image: "/testimonial-1.png",
      text:
        language === "en"
          ? "Working with this developer was an absolute pleasure. Their attention to detail and creative approach to problem-solving resulted in a website that exceeded our expectations."
          : "Trabajar con este desarrollador fue un placer absoluto. Su atención al detalle y enfoque creativo para resolver problemas resultó en un sitio web que superó nuestras expectativas.",
    },
    {
      id: 2,
      name: language === "en" ? "Sarah Johnson" : "Sara Jiménez",
      role: language === "en" ? "Marketing Director" : "Directora de Marketing",
      image: "/testimonial-2.png",
      text:
        language === "en"
          ? "The portfolio website created for our company perfectly captures our brand essence. The animations and interactive elements have significantly increased user engagement."
          : "El sitio web de portafolio creado para nuestra empresa captura perfectamente la esencia de nuestra marca. Las animaciones y elementos interactivos han aumentado significativamente la participación de los usuarios.",
    },
    {
      id: 3,
      name: language === "en" ? "Michael Brown" : "Miguel Moreno",
      role: language === "en" ? "Startup Founder" : "Fundador de Startup",
      image: "/testimonial-3.png",
      text:
        language === "en"
          ? "I was impressed by the level of creativity and technical expertise. The website not only looks stunning but also performs exceptionally well. The attention to performance optimization made a huge difference."
          : "Quedé impresionado por el nivel de creatividad y experiencia técnica. El sitio web no solo se ve impresionante sino que también funciona excepcionalmente bien. La atención a la optimización del rendimiento marcó una gran diferencia.",
    },
    {
      id: 4,
      name: language === "en" ? "Emily Davis" : "Emma Díaz",
      role: language === "en" ? "Product Manager" : "Gerente de Producto",
      image: "/testimonial-4.png",
      text:
        language === "en"
          ? "The collaboration was seamless and the results speak for themselves. The website is not only beautiful but also highly functional and user-friendly."
          : "La colaboración fue perfecta y los resultados hablan por sí mismos. El sitio web no solo es hermoso sino también altamente funcional y fácil de usar.",
    },
  ]

  // Duplicar los testimonios para el efecto de desplazamiento infinito
  const allTestimonials = [...testimonials, ...testimonials]
  
  const carouselRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const resetPosition = () => {
      if (carouselRef.current) {
        const carousel = carouselRef.current
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0
        } else if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft = carousel.scrollWidth / 2
        }
      }
    }
    
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', resetPosition)
      return () => carousel.removeEventListener('scroll', resetPosition)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div 
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Carrusel con desplazamiento infinito */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4 w-full max-w-7xl"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Contenedor con animación automática */}
          <motion.div 
            className="flex gap-8 flex-nowrap"
            animate={{ x: ["-5%", "-55%"] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 40,
                ease: "linear",
              }
            }}
          >
            {allTestimonials.map((testimonial, index) => {
              // Usar un solo color base para todos los testimonios con ligeras variaciones
              const opacity = (index % 2 === 0) ? "10" : "15";
              
              return (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className={`flex-shrink-0 w-[350px] md:w-[400px] snap-center p-6 backdrop-blur-sm shadow-lg bg-gradient-to-b from-purple-600/${opacity} to-transparent rounded-[30px] border-0`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4 flex items-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 p-0.5">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image || `/avatar-${index % 4 + 1}.png`}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-foreground/70">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative">
                      <Quote className="absolute top-0 left-0 w-8 h-8 text-purple-600/30 -translate-x-2 -translate-y-2" />
                      <p className="text-foreground/90 leading-relaxed text-sm md:text-base pl-4">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          
          </motion.div>
        </div>
      </motion.div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
