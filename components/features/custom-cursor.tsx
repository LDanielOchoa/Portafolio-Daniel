"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function CustomCursor() {
  const { x, y } = useMousePosition()
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only show cursor after it moves for the first time
    if (x > 0 && y > 0 && !isVisible) {
      setIsVisible(true)
    }

    const handleMouseEnter = () => {
      document.body.style.cursor = "none"
    }

    const handleMouseLeave = () => {
      document.body.style.cursor = "auto"
      setIsVisible(false)
    }

    const handleLinkHover = () => setCursorVariant("link")
    const handleLinkLeave = () => setCursorVariant("default")

    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [x, y, isVisible])

  const variants = {
    default: {
      x: x - 8,
      y: y - 8,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    link: {
      x: x - 16,
      y: y - 16,
      backgroundColor: "rgba(244, 63, 94, 0.4)",
      height: 32,
      width: 32,
      border: "1px solid rgba(244, 63, 94, 0.6)",
    },
  }

  return (
    <>
      {isVisible && (
        <>
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 hidden md:block"
            variants={variants}
            animate={cursorVariant}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          />
          <motion.div
            className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-40 hidden md:block mix-blend-difference"
            animate={{
              x: x - 20,
              y: y - 20,
              backgroundColor: cursorVariant === "link" ? "rgba(244, 63, 94, 0.1)" : "rgba(255, 255, 255, 0.1)",
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
              mass: 0.8,
            }}
          />
        </>
      )}
    </>
  )
}
