"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import { GlowingButton } from "../buttons/glowing-button"

interface ContactSectionProps {
  t: any
}

export function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10 h-64"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-64 bottom-0"></div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-600/5 via-transparent to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/5 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
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
            <span className="gradient-text">{t.contact.title}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full"></div>
          <p className="text-foreground/70 max-w-2xl text-center font-serif italic">{t.contact.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif gradient-text">{t.contact.getInTouch}</h3>
              <p className="text-foreground/70 mb-8 font-body">{t.contact.contactText}</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 font-serif">{t.contact.email}</h4>
                    <a
                      href="mailto:daniel.ochoaa.cass@gmail.com"
                      className="text-foreground/70 hover:text-purple-600 transition-colors font-mono animated-underline"
                    >
                      daniel.ochoaa.cass@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 font-serif">{t.contact.location}</h4>
                    <p className="text-foreground/70 font-body">Colombia, Medellín</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-serif gradient-text">{t.contact.socials}</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/LDanielOchoa"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-foreground/5 backdrop-blur-sm border border-foreground/10 flex items-center justify-center hover:bg-purple-600/10 hover:border-purple-600/50 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/danielochoaa"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-foreground/5 backdrop-blur-sm border border-foreground/10 flex items-center justify-center hover:bg-purple-600/10 hover:border-purple-600/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-xl flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-purple-600/10 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-lg font-serif">{t.contact.formNotAvailable}</p>
            <a href="mailto:daniel.ochoaa.cass@gmail.com">
              <GlowingButton>
                <div className="flex items-center space-x-2 font-mono">
                  <Mail className="w-4 h-4" />
                  <span>daniel.ochoaa.cass@gmail.com</span>
                </div>
              </GlowingButton>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
