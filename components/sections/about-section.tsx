"use client"

import { motion } from "framer-motion"

interface AboutSectionProps {
  t: any
  handleScroll: (section: string) => void
}

export function AboutSection({ t, handleScroll }: AboutSectionProps) {

  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 h-64 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-background to-transparent"></div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-600/5 via-transparent to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-6 mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-flex items-center mb-2">
            <span className="gradient-text">{t.about.title}</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full mb-2"></div>
          <p className="text-foreground/80 max-w-2xl text-lg text-center font-serif italic mt-2">{t.about.subtitle}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Avatar creativo con efecto */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-64 h-64 md:w-72 md:h-72 mb-8 md:mb-0"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 blur-md opacity-70 animate-pulse"></div>
            <div className="absolute inset-1 rounded-full bg-background"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-indigo-600/30">
              <div className="text-6xl font-bold text-white/80">DO</div>
              
              {/* Elementos decorativos */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-purple-500/20"></div>
              <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-indigo-500/20"></div>
              <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-purple-500/30"></div>
              <div className="absolute bottom-1/3 left-1/2 w-10 h-10 rounded-full bg-indigo-500/30"></div>
            </div>
          </motion.div>

          {/* Contenido de texto */}
          <div className="max-w-xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 bg-foreground/5 backdrop-blur-sm p-6 rounded-2xl border border-foreground/10 shadow-lg"
            >
              <p className="text-lg text-foreground/90 font-body leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-lg text-foreground/90 font-body leading-relaxed">
                {t.about.paragraph2}
              </p>
              
              {/* Etiquetas de personalidad */}
              <div className="flex flex-wrap gap-2 pt-4">
                {[
                  "Creativo", 
                  "Innovador", 
                  "Detallista", 
                  "Resolutivo", 
                  "Adaptable"
                ].map((trait, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full text-sm font-medium text-foreground/80 border border-purple-500/30"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* Cita personal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="pl-4 border-l-2 border-purple-500 italic text-foreground/70"
            >
              <p>"Mi objetivo es crear experiencias digitales que combinen funcionalidad excepcional con diseños elegantes y accesibles."</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
