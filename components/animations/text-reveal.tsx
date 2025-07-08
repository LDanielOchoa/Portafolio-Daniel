"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className = "" }: TextRevealProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={`${className} inline-block`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-1 relative">
          {word}
          <motion.span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-400"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.span>
      ))}
    </motion.div>
  )
}
