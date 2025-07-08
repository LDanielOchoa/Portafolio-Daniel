"use client"

import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from "react"
import { useLanguage } from "@/components/features/language-context"
import { translations } from "@/lib/translations"
import { useTheme } from "next-themes"
import AppWrapper from "@/components/layout/app-wrapper"
import { Header } from "@/components/navigation/enhanced-header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectSection } from "@/components/sections/project-section"
import { TestimonialSection } from "@/components/sections/testimonial-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/layout/footer"
import { KeySequenceDetector } from "@/components/features/key-sequence-detector"

// Lazy load components that are not immediately visible
const FloatingAction = lazy(() => import("@/components/cards/floating-action").then(mod => ({ default: mod.FloatingAction })))

// Loading component for lazy loaded sections
const SectionLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  </div>
)

export default function PortfolioWrapper() {
  return (
    <AppWrapper>
      <Portfolio />
    </AppWrapper>
  )
}

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const { theme } = useTheme()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Memoize sections array
  const sections = useMemo(() => ["home", "about", "projects", "testimonials", "experience", "contact"], [])

  // Optimized scroll handler with useCallback
  const handleScroll = useCallback((section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Optimized intersection observer setup
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-10% 0px -10% 0px'
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      observerOptions
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Scroll detection for floating action button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Memoize social links to prevent unnecessary re-renders
  const socialLinks = useMemo(() => [
    {
      href: "https://github.com/LDanielOchoa",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      )
    },
    {
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
        </svg>
      )
    },
    {
      href: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      )
    },
    {
      href: "mailto:daniel.ochoaa.cass@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
        </svg>
      )
    }
  ], [])

  return (
    <div
      ref={containerRef}
      className="relative bg-background text-foreground min-h-screen overflow-hidden pt-16 md:pt-20"
    >
      {/* Easter Egg Key Sequence Detector */}
      <KeySequenceDetector />

      {/* Fixed Elements */}
      <div className="hidden md:flex fixed left-10 bottom-0 z-30 flex-col items-center">
        <div className="flex flex-col space-y-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              className="text-foreground/70 hover:text-purple-600 transition-colors"
              rel="noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-purple-600 to-transparent mt-6"></div>
      </div>

      <div className="hidden md:flex fixed right-10 bottom-0 z-30 flex-col items-center">
        <a
          href="mailto:daniel.ochoaa.cass@gmail.com"
          className="text-foreground/80 hover:text-purple-600 transition-colors transform -rotate-90 origin-center mb-24 tracking-widest text-sm animated-underline"
        >
          daniel.ochoaa.cass@gmail.com
        </a>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-purple-600 to-transparent"></div>
      </div>

      {/* Navigation */}
      <Header
        t={t}
        activeSection={activeSection}
        handleScroll={handleScroll}
        toggleLanguage={toggleLanguage}
        language={language}
        sections={sections}
      />

      {/* Main Content */}
      <main className="relative">
        <HeroSection t={t} handleScroll={handleScroll} />
        <AboutSection t={t} handleScroll={handleScroll} />
        <ProjectSection t={t} />
        <TestimonialSection t={t} language={language} />
        <ExperienceSection t={t} language={language} />
        <ContactSection t={t} />
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Lazy loaded floating action */}
      <Suspense fallback={null}>
        <FloatingAction showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
      </Suspense>
    </div>
  )
}
