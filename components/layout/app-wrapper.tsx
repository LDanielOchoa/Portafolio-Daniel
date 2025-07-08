"use client"

import type React from "react"

import { useState, useEffect, lazy, Suspense } from "react"
import { LanguageProvider } from "../features/language-context"
import { ThemeProvider } from "./theme-provider"
import { Preloader } from "../features/preloader"
import { ScrollProgress } from "../features/scroll-progress"
import { AnimatedBackground } from "../animations/animated-background"
import CustomCursor from "../features/custom-cursor"

// Lazy load heavy components
const FloatingAction = lazy(() => import("../cards/floating-action").then(mod => ({ default: mod.FloatingAction })))

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)

    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Reduced from 1500ms to 800ms

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <ScrollProgress />
            <AnimatedBackground />
            <CustomCursor />
            <Suspense fallback={null}>
              <FloatingAction showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
            </Suspense>
            {children}
          </>
        )}
      </LanguageProvider>
    </ThemeProvider>
  )
}
