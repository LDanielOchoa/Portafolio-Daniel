"use client"

import { motion } from "framer-motion"
import { Timeline } from "../cards/timeline"
import { InteractiveTimeline } from "../cards/interactive-timeline"

interface ExperienceSectionProps {
  t: any
  language: string
}

export function ExperienceSection({ t, language }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10 h-64"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-64 bottom-0"></div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/5 via-transparent to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
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
          className="flex flex-col items-center space-y-4 mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center">
            <span className="gradient-text">{t.experience.title}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full"></div>
          <p className="text-foreground/70 max-w-2xl text-center">{t.experience.description}</p>
        </motion.div>

        <div className="hidden md:block">
          <Timeline language={language} />
        </div>

        <div className="md:hidden">
          <InteractiveTimeline language={language} />
        </div>
      </div>
    </section>
  )
}
