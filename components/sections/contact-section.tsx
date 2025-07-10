"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, Github, Linkedin, Twitter, CheckCircle } from "lucide-react"
import { GlowingButton } from "../buttons/glowing-button"

interface ContactSectionProps {
  t: any
}

export function ContactSection({ t }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

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
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 font-serif">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-colors font-body"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 font-serif">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-colors font-body"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2 font-serif">
                  {t.contact.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-colors font-body"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2 font-serif">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-colors resize-none font-body"
                ></textarea>
              </div>

              <div>
                <GlowingButton
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  <div
                    className="w-full flex items-center justify-center space-x-2 font-mono"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>{t.contact.submit}</span>
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </GlowingButton>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/30 text-green-500 rounded-lg text-center font-body"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
