"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  text: string
  className?: string
}

export function AnimatedGradientText({ text, className = "" }: AnimatedGradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      element.style.setProperty("--x", `${x * 100}%`)
      element.style.setProperty("--y", `${y * 100}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.h1
      ref={textRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${className} bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent relative`}
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: "var(--x, 0%) var(--y, 0%)",
      }}
    >
      {text}
    </motion.h1>
  )
}
