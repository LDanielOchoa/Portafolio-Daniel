"use client"
import type { ReactNode } from "react"

interface GradientBorderProps {
  children: ReactNode
}

export function GradientBorder({ children }: GradientBorderProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="relative w-full h-full bg-gradient-to-r from-purple-600/10 to-indigo-400/10 rounded-full p-2 backdrop-blur-sm border border-foreground/10">
        {children}
      </div>
    </div>
  )
}
