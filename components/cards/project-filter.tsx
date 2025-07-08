"use client"

import { motion } from "framer-motion"
import { Filter } from "lucide-react"

interface Category {
  id: string
  name: string
}

interface ProjectFilterProps {
  categories: Category[]
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export function ProjectFilter({ categories, activeFilter, setActiveFilter }: ProjectFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
    >
      <div className="flex items-center space-x-2 text-foreground/70 mb-4 sm:mb-0">
        <Filter size={16} />
        <span className="text-sm font-medium">Filter:</span>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === category.id
                ? "bg-gradient-to-r from-purple-600 to-indigo-400 text-white"
                : "bg-foreground/5 border border-foreground/10 text-foreground/70 hover:bg-foreground/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
