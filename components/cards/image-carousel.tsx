"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  interval?: number
  className?: string
}

export function ImageCarousel({ 
  images, 
  interval = 4000, 
  className = "" 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className={`relative w-full h-full aspect-[16/9] overflow-hidden rounded-xl ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ 
            opacity: 1, 
            filter: 'blur(0)',
            transition: { duration: 0.8 }
          }}
          exit={{ 
            opacity: 0, 
            filter: 'blur(10px)',
            transition: { duration: 0.8 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Indicadores */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-6 bg-white' 
                : 'w-1.5 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
