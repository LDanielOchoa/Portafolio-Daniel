"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CreativeHeadingProps {
  text: string
  className?: string
}

export function CreativeHeading({ text, className = "" }: CreativeHeadingProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  )
}
