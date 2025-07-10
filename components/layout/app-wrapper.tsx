"use client"

import type React from "react"

import { useState, useEffect, lazy, Suspense } from "react"
import { LanguageProvider } from "../features/language-context"
import { ThemeProvider } from "./theme-provider"
import { ScrollProgress } from "../features/scroll-progress"
import { AnimatedBackground } from "../animations/animated-background"
// import CustomCursor from "../features/custom-cursor"

// Lazy load heavy components
const FloatingAction = lazy(() => import("../cards/floating-action").then(mod => ({ default: mod.FloatingAction })))

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)

    // Reset cursor to auto in case it was hidden by custom cursor
    document.body.style.cursor = "auto"

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <ScrollProgress />
        <AnimatedBackground />
        {/* <CustomCursor /> */}
        <Suspense fallback={null}>
          <FloatingAction showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
        </Suspense>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
