"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LanguageProvider } from "../features/language-context"
import { ThemeProvider } from "./theme-provider"
import { Preloader } from "../features/preloader"
import { ScrollProgress } from "../features/scroll-progress"
import { AnimatedBackground } from "../animations/animated-background"
import CustomCursor from "../features/custom-cursor"
import { FloatingAction } from "../cards/floating-action"

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

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

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
            <FloatingAction showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
            {children}
          </>
        )}
      </LanguageProvider>
    </ThemeProvider>
  )
}
