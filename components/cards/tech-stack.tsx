"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Skill {
  name: string
  icon: string
}

interface Category {
  id: string
  label: string
  skills: Skill[]
}

interface TechStackProps {
  categories: Category[]
}

export function TechStack({ categories }: TechStackProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const getActiveSkills = () => {
    if (activeCategory === 'all') {
      return categories.flatMap(cat => cat.skills)
    }
    return categories.find(cat => cat.id === activeCategory)?.skills || []
  }

  return (
    <div className="w-full p-6 bg-foreground/5 border border-foreground/10 rounded-xl backdrop-blur-sm">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
              activeCategory === category.id ? "text-white" : "text-foreground/60 hover:text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeCategory === category.id && (
              <motion.div
                layoutId="tech-stack-pill"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category.label}</span>
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
        >
          {getActiveSkills().map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-3 bg-foreground/5 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              title={skill.name}
          >
              <Image src={skill.icon} alt={skill.name} width={32} height={32} className="h-8 w-8" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
