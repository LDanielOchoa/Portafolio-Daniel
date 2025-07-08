"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { ReactNode } from "react"

interface SkillCardProps {
  name: string
  index: number
  icon?: ReactNode
}

export function SkillCard({ name, index, icon }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-600/50 hover:bg-purple-600/5 transition-all"
    >
      <motion.div
        className="w-12 h-12 mb-4 bg-gradient-to-br from-purple-600/20 to-indigo-400/20 rounded-lg flex items-center justify-center"
        animate={{
          y: isHovered ? -5 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {icon ? (
          icon
        ) : (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-400 font-bold text-xl">
            {name.charAt(0)}
          </span>
        )}
      </motion.div>
      <h4 className="font-medium">{name}</h4>
    </motion.div>
  )
}
