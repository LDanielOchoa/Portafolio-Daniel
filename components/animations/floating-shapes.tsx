"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  type: "circle" | "square" | "triangle"
  color: string
  speed: number
}

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const shapes: Shape[] = [
    {
      id: 1,
      x: 10,
      y: 20,
      size: 30,
      rotation: 0,
      type: "circle",
      color: theme === "dark" ? "#9333ea" : "#8b5cf6",
      speed: 20,
    },
    {
      id: 2,
      x: 70,
      y: 30,
      size: 40,
      rotation: 45,
      type: "square",
      color: theme === "dark" ? "#6366f1" : "#818cf8",
      speed: 25,
    },
    {
      id: 3,
      x: 30,
      y: 70,
      size: 35,
      rotation: 30,
      type: "triangle",
      color: theme === "dark" ? "#a855f7" : "#c084fc",
      speed: 15,
    },
    {
      id: 4,
      x: 80,
      y: 80,
      size: 25,
      rotation: 60,
      type: "circle",
      color: theme === "dark" ? "#8b5cf6" : "#a78bfa",
      speed: 30,
    },
    {
      id: 5,
      x: 40,
      y: 40,
      size: 45,
      rotation: 15,
      type: "square",
      color: theme === "dark" ? "#7c3aed" : "#a78bfa",
      speed: 18,
    },
  ]

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            className="rounded-full absolute"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: `${shape.color}20`,
              border: `1px solid ${shape.color}40`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "square":
        return (
          <div
            className="absolute"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: `${shape.color}20`,
              border: `1px solid ${shape.color}40`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}30`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ x: `${shape.x}%`, y: `${shape.y}%`, rotate: shape.rotation }}
          animate={{
            x: [`${shape.x}%`, `${shape.x + 5}%`, `${shape.x - 3}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y - 4}%`, `${shape.y + 6}%`, `${shape.y}%`],
            rotate: [shape.rotation, shape.rotation + 20, shape.rotation - 20, shape.rotation],
          }}
          transition={{
            duration: shape.speed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  )
}
