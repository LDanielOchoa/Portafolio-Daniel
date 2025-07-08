"use client"

import { motion } from "framer-motion"
import { TestimonialCarousel } from "../cards/testimonial-carousel"
import { MessageSquareQuote } from "lucide-react"

interface TestimonialSectionProps {
  t: any
  language: string
}

export function TestimonialSection({ t, language }: TestimonialSectionProps) {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10 h-64"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-64 bottom-0"></div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Elemento decorativo principal */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-6 mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center mb-2">
            <MessageSquareQuote className="w-8 h-8 text-purple-600/60 mr-2" />
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
                {t.testimonials.title}
              </span>
            </h2>
          </div>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-600/80 to-indigo-500/80 rounded-full"
            animate={{
              width: ["32px", "128px", "32px"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <p className="text-foreground/70 max-w-2xl text-center text-lg font-light">
            {t.testimonials.description}
          </p>
        </motion.div>

        <TestimonialCarousel language={language} />
      </div>
    </section>
  )
}
