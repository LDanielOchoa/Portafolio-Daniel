"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

interface TechItem {
  icon: string
  name: string
  category: string
}

interface TechCategoriesProps {
  technologies: TechItem[]
  t: any
}

export function TechCategories({ technologies, t }: TechCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  // Obtener categorías únicas
  const categories = ['all', ...new Set(technologies.map(tech => tech.category))]
  
  // Filtrar tecnologías por categoría activa
  const filteredTechs = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory)

  return (
    <div className="w-full">
      {/* Pestañas de categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["all", "frontend", "backend", "devops", "tools"].map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
              activeCategory === category
                ? "text-white"
                : "text-foreground/60 hover:text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {t.projects.techCategories[category as keyof typeof t.projects.techCategories] || category}
            </span>
          </motion.button>
        ))}
      </div>
      
      {/* Grid de tecnologías */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredTechs.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.03,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex flex-col items-center justify-center p-4 bg-foreground/5 rounded-xl border border-foreground/10 hover:border-purple-500/30 transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 relative mb-2">
              <Image 
                src={tech.icon} 
                alt={tech.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 48px, 48px"
              />
            </div>
            <span className="text-sm font-medium text-center">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
