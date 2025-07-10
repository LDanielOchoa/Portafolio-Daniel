"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageModal({ images, currentIndex, isOpen, onClose, onNavigate }: ImageModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onNavigate((currentIndex - 1 + images.length) % images.length)
          break
        case "ArrowRight":
          onNavigate((currentIndex + 1) % images.length)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) { // Umbral mínimo para considerar como swipe
      if (diff > 0) {
        // Swipe izquierda
        onNavigate((currentIndex + 1) % images.length)
      } else {
        // Swipe derecha
        onNavigate((currentIndex - 1 + images.length) % images.length)
      }
    }

    setTouchStart(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-20 right-4 z-[101] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Contenedor de la imagen */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Botón anterior */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate((currentIndex - 1 + images.length) % images.length)
                }}
                className="absolute left-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Imagen */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                quality={100}
                priority
              />
            </motion.div>

            {/* Botón siguiente */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate((currentIndex + 1) % images.length)
                }}
                className="absolute right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Indicadores */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-4"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 