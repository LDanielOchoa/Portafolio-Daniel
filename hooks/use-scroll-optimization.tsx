import { useState, useEffect, useCallback, useRef } from 'react'

interface UseScrollOptimizationOptions {
  threshold?: number
  passive?: boolean
}

export function useScrollOptimization(options: UseScrollOptimizationOptions = {}) {
  const { threshold = 500, passive = true } = options
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setScrollY(currentScrollY)
        setShowScrollTop(currentScrollY > threshold)
        ticking.current = false
      })
      ticking.current = true
    }
  }, [threshold])

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('scroll', handleScroll, { passive })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, passive])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    showScrollTop,
    scrollY,
    scrollToTop
  }
} 