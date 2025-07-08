"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Sparkles, Code, Server, Database, Music } from "lucide-react"
import { GlowingButton } from "../buttons/glowing-button"
import { MagneticButton } from "../buttons/magnetic-button"
import Image from "next/image"
import dynamic from "next/dynamic"

const HeroCanvas = dynamic(() => import("../animations/hero-canvas"), { ssr: false })

interface HeroSectionProps {
  t: any
  handleScroll: (section: string) => void
}

export function HeroSection({ t, handleScroll }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [showEasterEggHint, setShowEasterEggHint] = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const nameText = "Daniel Ochoa"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Show the easter egg hint after a time
    const timer = setTimeout(() => {
      setShowEasterEggHint(true)

      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowEasterEggHint(false)
      }, 5000)

      return () => clearTimeout(hideTimer)
    }, 10000)

    // Animate typing effect for the name
    let typingInterval: NodeJS.Timeout
    if (visibleChars < nameText.length) {
      typingInterval = setInterval(() => {
        setVisibleChars((prev) => Math.min(prev + 1, nameText.length))
      }, 150)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
      if (typingInterval) clearInterval(typingInterval)
    }
  }, [visibleChars])



  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background elements with improved effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-40">
          <HeroCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>

        {/* Enhanced background gradients */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent"></div>

        {/* Animated gradient circles */}
        {/* Eliminado: Círculos grandes de fondo */}
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-1 flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center -mt-20">
          <div className="space-y-6 w-full text-center">
            <motion.div variants={titleVariants} initial="hidden" animate="visible" className="w-full flex flex-col items-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-center">
                <motion.span
                  className="inline-block leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {t.hero.title}
                </motion.span>
                <br />
                <motion.div
                  className="inline-block relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <span className="relative inline-block text-center">
                    <span className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-500 tracking-normal">
                      {nameText}
                      <motion.span 
                        className="ml-1.5 inline-block w-0.5 h-12 bg-gradient-to-b from-purple-500 to-indigo-400 align-middle"
                        animate={{ 
                          opacity: [0, 1, 0],
                          height: ['0%', '80%', '0%']
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        }}
                      />
                    </span>
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 1.8 }}
                  />
                </motion.div>
              </h1>
            </motion.div>

            {/* Role with animated highlight */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl md:text-4xl font-light mb-4 relative text-center"
            >
              <span className="relative">
                <span className="relative z-10 text-foreground/90 font-serif">{t.hero.role}</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-purple-500/20 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </span>
            </motion.h2>

            {/* Description with staggered animations */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed font-body backdrop-blur-sm relative text-center"
            >
              {t.hero.description.split(" ").map((word: string, i: number) => (
                <motion.span
                  key={i}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.3 + i * 0.02 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex flex-wrap gap-6 pt-4 justify-center"
            >
              <GlowingButton onClick={() => handleScroll("projects")}>
                <span className="flex items-center justify-center space-x-2 font-mono tracking-wide">
                  <span>{t.hero.cta}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </GlowingButton>

              <MagneticButton>
                <button
                  onClick={() => handleScroll("contact")}
                  className="group relative px-6 py-3 border border-foreground/20 rounded-full hover:border-purple-600/40 transition-colors backdrop-blur-sm"
                >
                  <span className="relative flex items-center justify-center space-x-2 font-mono">
                    <span>{t.hero.contact}</span>
                  </span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with improved animation */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button onClick={() => handleScroll("about")} className="flex flex-col items-center space-y-2">
          <motion.span
            className="text-foreground/60 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            {t.hero.scrollDown}
          </motion.span>
          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="w-6 h-6 text-purple-500" />
          </motion.div>
        </button>
      </motion.div>

      {/* Easter Egg Hint with better styling */}
      <AnimatePresence>
        {showEasterEggHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-foreground/5 backdrop-blur-xl border border-purple-500/20 text-foreground/50 text-sm font-mono px-4 py-2 rounded-full z-50"
          >
            <Music className="w-4 h-4 text-purple-500" />
            <span className="text-xs">Presiona "s", "a", "o", "6", "2", "0", "2", "5" para una sorpresa</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
