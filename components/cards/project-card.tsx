"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { ImageModal } from "@/components/ui/image-modal"

interface ProjectCardProps {
  title: string
  description: string
  image: string | string[]
  tags: string[]
  links: {
    github: string
    live: string
  }
}

export function ProjectCard({ title, description, image, tags, links }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { x, y, ref } = useMousePosition()
  const images = Array.isArray(image) ? image : [image]

  const cardStyle = isHovered ? {
    '--x': `${x}px`,
    '--y': `${y}px`,
  } : {}

  useEffect(() => {
    if (images.length > 1 && !isModalOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [images.length, isModalOpen])

  return (
    <>
      <motion.div
        ref={ref as any}
        className="group relative w-full rounded-2xl border border-gray-200/20 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 p-4 overflow-hidden transition-all duration-300 hover:border-purple-500/30 dark:hover:border-white/20 backdrop-blur-sm"
        style={cardStyle as React.CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div 
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(600px circle at var(--x) var(--y), rgba(147, 51, 234, 0.15), transparent 80%)'
          }}
        />
        <div className="relative">
          <div 
            className="relative aspect-video w-full rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {images.map((img, index) => (
              <Image
                key={img}
                src={img}
                alt={`${title} - Image ${index + 1}`}
                fill
                className={`object-cover transition-all duration-500 ${
                  index === currentImageIndex 
                    ? "opacity-100 transform-none" 
                    : "opacity-0 scale-105"
                } ${isHovered ? "group-hover:scale-105" : ""}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            
            {/* Indicadores del carrusel */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? "bg-white w-3" 
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a 
                href={links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github size={16} />
                <span className="text-sm">Code</span>
              </a>
              <a 
                href={links.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
                <span className="text-sm">Live</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <ImageModal
        images={images}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </>
  )
}
