"use client"

import type React from "react"

import { motion } from "framer-motion"

interface AnimatedNavItemProps {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}

export function AnimatedNavItem({ children, active, onClick }: AnimatedNavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        active ? "text-purple-600" : "text-foreground/70 hover:text-foreground"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600"
          layoutId="activeSection"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
