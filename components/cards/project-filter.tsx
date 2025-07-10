"use client"

import { motion } from "framer-motion"

interface ProjectFilterProps {
  categories: { id: string; name: string }[]
  activeFilter: string
  setActiveFilter: (id: string) => void
}

export function ProjectFilter({ categories, activeFilter, setActiveFilter }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
        <motion.button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
            activeFilter === category.id ? "text-white" : "text-foreground/60 hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeFilter === category.id && (
            <motion.div
              layoutId="project-filter-pill"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category.name}</span>
        </motion.button>
        ))}
      </div>
  )
}
