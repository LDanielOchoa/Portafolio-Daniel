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
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/80'
            }`}
          >
            {t.about.techCategories[category] || category}
          </button>
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
