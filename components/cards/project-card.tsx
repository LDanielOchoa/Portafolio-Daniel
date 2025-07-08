"use client"

import { motion } from "framer-motion"
import { Github, Star, Eye, Code, ExternalLink, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { MagneticButton } from "../buttons/magnetic-button"
import { cn } from "@/lib/utils"
import { ImageCarousel } from "./image-carousel"

interface ProjectCardProps {
  index: number
  title: string
  description: string
  image: string
  tags: string[]
  stats?: {
    stars?: number
    views?: number
    forks?: number
  }
  links?: {
    github?: string
    live?: string
  }
}

export function ProjectCard({ index, title, description, image, tags, stats, links }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl glass-card group-hover:glow-sm">
        <div className="relative aspect-[16/9] overflow-hidden">
          {title.includes("Sistema de Solicitud de Permisos") ? (
            <div className="w-full h-full absolute inset-0">
              <ImageCarousel 
                images={[
                  {
                    src: "/image/solicitud-permisos1.webp",
                    alt: "Captura del sistema de solicitud de permisos - Vista 1"
                  },
                  {
                    src: "/image/solicitud-permisos2.webp",
                    alt: "Captura del sistema de solicitud de permisos - Vista 2"
                  }
                ]}
                interval={4000}
                className=""
              />
            </div>
          ) : (
            <Image
              src={image || "/placeholder.svg?height=340&width=600&query=web application dashboard"}
              alt={title}
              width={600}
              height={340}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex space-x-4">
              <MagneticButton>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-12 h-12 flex items-center justify-center rounded-full frosted-glass hover:bg-foreground/20 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </MagneticButton>
              {links?.github && (
                <MagneticButton>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full frosted-glass hover:bg-foreground/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </MagneticButton>
              )}
              {links?.live && (
                <MagneticButton>
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full frosted-glass hover:bg-foreground/20 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold font-serif group-hover:gradient-text transition-colors">{title}</h3>
            <div className="flex space-x-1">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={cn("w-4 h-4", i < 5 ? "text-purple-600" : "text-foreground/20")}
                    fill={i < 5 ? "currentColor" : "none"}
                  />
                ))}
            </div>
          </div>
          <p className="text-foreground/70 mb-4 font-body">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-mono bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {stats && (
            <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
              {stats.stars !== undefined && (
                <div className="flex items-center space-x-1 text-foreground/60 text-sm">
                  <Star className="w-4 h-4" />
                  <span className="font-mono">{stats.stars}</span>
                </div>
              )}
              {stats.views !== undefined && (
                <div className="flex items-center space-x-1 text-foreground/60 text-sm">
                  <Eye className="w-4 h-4" />
                  <span className="font-mono">{stats.views}</span>
                </div>
              )}
              {stats.forks !== undefined && (
                <div className="flex items-center space-x-1 text-foreground/60 text-sm">
                  <Code className="w-4 h-4" />
                  <span className="font-mono">{stats.forks}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project Details Modal */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-background border border-foreground/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={image || "/placeholder.svg?height=600&width=1200&query=web application dashboard"}
                  alt={title}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm p-2 rounded-full"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 font-serif gradient-text">{title}</h2>
                <p className="text-foreground/70 mb-6 font-body">{description}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 font-serif">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm font-mono bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 font-serif">Project Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="glass-card p-3 text-center">
                        <Star className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                        <p className="text-sm text-foreground/70 font-mono">Stars</p>
                        <p className="font-medium font-mono">{stats?.stars || 0}</p>
                      </div>
                      <div className="glass-card p-3 text-center">
                        <Eye className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                        <p className="text-sm text-foreground/70 font-mono">Views</p>
                        <p className="font-medium font-mono">{stats?.views || 0}</p>
                      </div>
                      <div className="glass-card p-3 text-center">
                        <Code className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                        <p className="text-sm text-foreground/70 font-mono">Forks</p>
                        <p className="font-medium font-mono">{stats?.forks || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium font-serif">Project Overview</h3>
                  <p className="text-foreground/70 font-body">
                    This project was developed to solve specific challenges in the enterprise environment. It features a
                    modern architecture, responsive design, and optimized performance. The development process included
                    extensive research, prototyping, and testing to ensure the best possible user experience.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video relative rounded-lg overflow-hidden glass-card">
                        <Image
                          src={`/project-detail-${i}.jpg?width=300&height=169&query=enterprise application screenshot ${i}`}
                          alt={`Project screenshot ${i}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-8 space-x-4">
                  {links?.github && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-foreground/10 rounded-lg flex items-center space-x-2 hover:bg-foreground/5 transition-colors font-mono"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  )}
                  {links?.live && (
                    <a
                      href={links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-400 text-white rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity font-mono"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
