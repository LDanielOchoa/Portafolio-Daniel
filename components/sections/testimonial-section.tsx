"use client"

import { motion } from "framer-motion"
import { TestimonialCarousel } from "../cards/testimonial-carousel"

interface TestimonialSectionProps {
  t: any
  language: "en" | "es"
}

export function TestimonialSection({ t, language }: TestimonialSectionProps) {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">{t.testimonials.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full mx-auto my-4"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t.testimonials.description}</p>
        </motion.div>

        <TestimonialCarousel language={language} />
      </div>
    </section>
  )
}
