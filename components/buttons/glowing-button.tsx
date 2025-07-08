"use client"

import { motion } from "framer-motion"
import { useState, type ReactNode } from "react"

interface GlowingButtonProps {
  children: ReactNode
  onClick?: () => void
  fullWidth?: boolean
}

export function GlowingButton({ children, onClick, fullWidth = false }: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative px-6 py-3 rounded-full overflow-hidden ${fullWidth ? "w-full" : ""}`}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-400"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      />
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-indigo-400/20 blur-xl rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative text-white">{children}</span>
    </motion.button>
  )
}
