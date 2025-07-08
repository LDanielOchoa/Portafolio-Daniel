"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

interface StatsCounterProps {
  value: number
  label: string
  duration?: number
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
}

export function StatsCounter({ value, label, duration = 2, prefix = "", suffix = "", icon }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let start = 0
      const end = value
      const totalDuration = duration * 1000
      const incrementTime = totalDuration / end
      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) {
          clearInterval(timer)
          setHasAnimated(true)
        }
      }, incrementTime)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isInView, value, duration, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 hover:border-purple-600/30 transition-colors text-center"
    >
      {icon && <div className="text-purple-600 mb-3 flex justify-center">{icon}</div>}
      <div className="text-3xl md:text-4xl font-bold mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-foreground/70">{label}</div>
    </motion.div>
  )
}
