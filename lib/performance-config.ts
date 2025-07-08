// Configuración de optimizaciones de rendimiento

export const PERFORMANCE_CONFIG = {
  // Configuración de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
  },
  
  // Configuración de imágenes
  images: {
    quality: 75,
    formats: ['image/webp', 'image/avif'] as const,
    sizes: {
      mobile: '(max-width: 768px) 100vw',
      tablet: '(max-width: 1200px) 50vw',
      desktop: '33vw',
    },
  },
  
  // Configuración de animaciones
  animations: {
    reducedMotion: 'prefers-reduced-motion: reduce',
    defaultDuration: 300,
    fastDuration: 150,
  },
  
  // Configuración de scroll
  scroll: {
    threshold: 500,
    passive: true,
    throttleMs: 16, // ~60fps
  },
  
  // Configuración de preloader
  preloader: {
    duration: 800,
    minDuration: 400,
  },
  
  // Configuración de intersection observer
  intersectionObserver: {
    threshold: 0.3,
    rootMargin: '-10% 0px -10% 0px',
  },
  
  // Configuración de bundle splitting
  bundleSplitting: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
    },
    framer: {
      test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
      name: 'framer-motion',
      chunks: 'all',
    },
    three: {
      test: /[\\/]node_modules[\\/]three[\\/]/,
      name: 'three',
      chunks: 'all',
    },
  },
} as const

// Utilidades para optimización
export const performanceUtils = {
  // Throttle function para optimizar eventos de scroll
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }) as T
  },

  // Debounce function para optimizar búsquedas
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }) as T
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  // Get optimal image size based on viewport
  getOptimalImageSize: (): number => {
    if (typeof window === 'undefined') return 1200
    const width = window.innerWidth
    if (width <= 768) return 768
    if (width <= 1200) return 1200
    return 1920
  },
} 