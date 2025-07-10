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
      className="relative px-4 py-2 text-sm font-medium transition-colors"
      animate={{ color: active ? "#ffffff" : "#a1a1aa" }}
      whileHover={{ color: "#ffffff" }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          className="absolute inset-0 bg-purple-600/50 rounded-full"
          layoutId="activeSectionPill"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{ originY: "0px" }}
        />
      )}
    </motion.button>
  )
}
