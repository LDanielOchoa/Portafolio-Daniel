"use client"

import { motion } from "framer-motion"

interface AboutSectionProps {
  t: any
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-600/5 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.about.title}</h2>
          <p className="text-foreground/80 max-w-2xl text-lg font-serif italic mx-auto mt-4">{t.about.subtitle}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg prose-invert mx-auto text-foreground/80 leading-relaxed text-justify"
          >
            <p>{t.about.paragraph1}</p>
            <p>{t.about.paragraph2}</p>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            className="!mt-12"
          >
            <figure className="max-w-2xl mx-auto">
              <blockquote className="text-center text-xl sm:text-2xl italic text-foreground/80 leading-relaxed">
                <p>"{t.about.quote}"</p>
              </blockquote>
              <figcaption className="mt-4 text-center text-purple-400 font-medium">
                — Daniel Ochoa
              </figcaption>
            </figure>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
