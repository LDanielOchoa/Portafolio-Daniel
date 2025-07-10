"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "../cards/project-card"
import { ProjectFilter } from "../cards/project-filter"
import { projectsData } from "../../lib/data"
import type { Project } from "../../types"

interface ProjectSectionProps {
  t: any
}

export function ProjectSection({ t }: ProjectSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const localProjects: Project[] = projectsData(t)

  const categories = [
    { id: "all", name: t.language === "en" ? "All" : "Todos" },
    { id: "web", name: "Web" },
    { id: "data", name: t.language === "en" ? "Data" : "Datos" },
    { id: "automation", name: t.language === "en" ? "Automation" : "Automatización" },
  ]

  const filteredProjects =
    activeFilter === "all"
      ? localProjects
      : localProjects.filter((p: Project) =>
          p.category.toLowerCase().includes(activeFilter.toLowerCase())
        )

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">{t.projects.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full mx-auto my-4"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </motion.div>

        <ProjectFilter categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
