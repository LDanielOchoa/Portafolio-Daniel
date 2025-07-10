"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink, Star } from "lucide-react"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  links: {
    github: string
    live: string
  }
}

export function ProjectCard({ title, description, image, tags, links }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { x, y, ref } = useMousePosition()

  const cardStyle = isHovered ? {
    '--x': `${x}px`,
    '--y': `${y}px`,
  } : {}

  return (
    <motion.div
      ref={ref as any}
      className="group relative w-full rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden transition-all duration-300 hover:border-white/20"
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
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
            src={image}
              alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-400">{description}</p>
            </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs text-purple-300 bg-purple-900/50 rounded-full">
                {tag}
              </span>
            ))}
          </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
              <Github size={16} />
              <span className="text-sm">Code</span>
            </a>
            <a href={links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
              <ExternalLink size={16} />
              <span className="text-sm">Live</span>
            </a>
                </div>
              </div>
      </div>
    </motion.div>
  )
}
