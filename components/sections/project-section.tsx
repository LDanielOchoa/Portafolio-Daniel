"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "../cards/project-card"
import { ProjectFilter } from "../cards/project-filter"
import { MagneticButton } from "../buttons/magnetic-button"
import { TechCategories } from "../cards/tech-categories"

interface ProjectSectionProps {
  t: any
}

export function ProjectSection({ t }: ProjectSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = [
    { id: "all", name: t.language === "en" ? "All" : "Todos" },
    { id: "web", name: t.language === "en" ? "Web" : "Web" },
    { id: "data", name: t.language === "en" ? "Data" : "Datos" },
    { id: "automation", name: t.language === "en" ? "Automation" : "Automatización" },
  ]

  const projects = [
    {
      id: 1,
      title: t.language === "en" ? "Permission Request System" : "Sistema de Solicitud de Permisos",
      description:
        t.language === "en"
          ? "Enterprise application for Sistema Alimentador Oriental 6. Python backend with Django REST Framework and Next.js frontend. Features comprehensive permission request workflow."
          : "Aplicación empresarial para Sistema Alimentador Oriental 6. Backend en Python con Django REST Framework y frontend en Next.js. Incluye flujo completo de solicitudes de permisos.",
      image: "/project-1.jpg?width=600&height=340&query=enterprise permission management system dashboard",
      category: "web",
      tags: ["Python", "Django", "Next.js", "PostgreSQL", "Red Hat Linux"],
      stats: {
        stars: 45,
        views: 1200,
        forks: 12,
      },
      links: {
        github: "https://github.com/LDanielOchoa",
        live: "#",
      },
    },
    {
      id: 2,
      title: t.language === "en" ? "Performance Evaluation" : "Evaluación de Desempeño",
      description:
        t.language === "en"
          ? "Employee performance evaluation system utilizing Python data processing backend with Vue.js frontend. Includes automated reporting and statistical analysis."
          : "Sistema de evaluación de desempeño con procesamiento de datos en Python y frontend en Vue.js. Incluye generación automatizada de informes y análisis estadístico.",
      image: "/project-2.jpg?width=600&height=340&query=performance evaluation dashboard ui",
      category: "data",
      tags: ["Python", "Vue.js", "MySQL", "Pandas", "Data Visualization"],
      stats: {
        stars: 38,
        views: 950,
        forks: 8,
      },
      links: {
        github: "https://github.com/LDanielOchoa",
        live: "#",
      },
    },
    {
      id: 3,
      title: t.language === "en" ? "Data Processing Pipeline" : "Pipeline de Procesamiento de Datos",
      description:
        t.language === "en"
          ? "Automated data processing pipeline built with Python. Extracts, transforms, and loads data from various sources to PostgreSQL database for analysis and reporting."
          : "Pipeline automatizado de procesamiento de datos construido con Python. Extrae, transforma y carga datos de diversas fuentes a base de datos PostgreSQL para análisis e informes.",
      image: "/project-3.jpg?width=600&height=340&query=data processing pipeline visualization",
      category: "automation",
      tags: ["Python", "ETL", "PostgreSQL", "Docker", "Apache Airflow"],
      stats: {
        stars: 27,
        views: 820,
        forks: 5,
      },
      links: {
        github: "https://github.com/LDanielOchoa",
        live: "#",
      },
    },
    {
      id: 4,
      title: t.language === "en" ? "Enterprise API Platform" : "Plataforma API Empresarial",
      description:
        t.language === "en"
          ? "API gateway and management platform built with Go and Python. Features authentication, rate limiting, and comprehensive monitoring. Deployed on Red Hat Linux with Nginx."
          : "Plataforma de gestión de APIs desarrollada con Go y Python. Incluye autenticación, limitación de tasa y monitoreo completo. Implementada en Red Hat Linux con Nginx.",
      image: "/project-4.jpg?width=600&height=340&query=enterprise api management dashboard",
      category: "web",
      tags: ["Go", "Python", "MongoDB", "Red Hat Linux", "Nginx"],
      stats: {
        stars: 52,
        views: 1500,
        forks: 15,
      },
      links: {
        github: "https://github.com/LDanielOchoa",
        live: "#",
      },
    },
    {
      id: 5,
      title: t.language === "en" ? "Automated Report Generator" : "Generador Automático de Informes",
      description:
        t.language === "en"
          ? "Python-based tool for automatic generation of business reports from multiple data sources. Features customizable templates and scheduling capabilities."
          : "Herramienta basada en Python para la generación automática de informes de negocio a partir de múltiples fuentes de datos. Incluye plantillas personalizables y capacidades de programación.",
      image: "/project-5.jpg?width=600&height=340&query=data report automation dashboard",
      category: "automation",
      tags: ["Python", "Pandas", "Matplotlib", "MySQL", "PDF Generation"],
      stats: {
        stars: 33,
        views: 980,
        forks: 7,
      },
      links: {
        github: "https://github.com/LDanielOchoa",
        live: "#",
      },
    },
    {
      id: 6,
      title: t.language === "en" ? "Interactive Dashboard" : "Dashboard Interactivo",
      description:
        t.language === "en"
          ? "Real-time analytics dashboard built with Astro and TypeScript, featuring interactive visualizations of business metrics from multiple data sources."
          : "Dashboard de análisis en tiempo real construido con Astro y TypeScript, con visualizaciones interactivas de métricas de negocio de múltiples fuentes de datos.",
      image: "/project-6.jpg?width=600&height=340&query=interactive business analytics dashboard",
      category: "data",
      tags: ["Astro", "TypeScript", "D3.js", "PostgreSQL", "WebSockets"],
      stats: {
        stars: 41,
        views: 1100,
        forks: 9,
      },
      links: {
        github: "https://github.com/LDanielOchoa",
        live: "#",
      },
    },
  ]

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10 h-64"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-64 bottom-0"></div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-600/5 via-transparent to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-600/5 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-4 mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center">
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full"></div>
          <p className="text-foreground/70 max-w-2xl text-center">{t.projects.description}</p>
        </motion.div>

        <ProjectFilter categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              stats={project.stats}
              links={project.links}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <MagneticButton>
            <a
              href="https://github.com/LDanielOchoa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 border border-foreground/20 rounded-full hover:border-purple-600/40 transition-colors"
            >
              <span className="relative flex items-center justify-center space-x-2">
                <span>{t.projects.viewMore}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </MagneticButton>
        </motion.div>
        
        {/* Tecnologías y Herramientas Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-foreground/10"
        >
          <h3 className="text-2xl font-bold mb-6 text-center font-serif">Tecnologías y Herramientas</h3>
          <TechCategories 
            technologies={[
              // Programming Languages
              { icon: "/tech/python.svg", name: "Python", category: "languages" },
              { icon: "/tech/go.svg", name: "Go", category: "languages" },
              { icon: "/tech/typescript.svg", name: "TypeScript", category: "languages" },
              
              // Frontend
              { icon: "/tech/nextjs.svg", name: "Next.js", category: "frontend" },
              { icon: "/tech/react.svg", name: "React", category: "frontend" },
              { icon: "/tech/tailwind.svg", name: "Tailwind CSS", category: "frontend" },
              { icon: "/tech/astro.svg", name: "Astro", category: "frontend" },
              
              // Backend & Databases
              { icon: "/tech/postgresql.svg", name: "PostgreSQL", category: "backend" },
              { icon: "/tech/redis.svg", name: "Redis", category: "backend" },
              { icon: "/tech/nodejs.svg", name: "Node.js", category: "backend" },
              
              // DevOps & Cloud
              { icon: "/tech/docker.svg", name: "Docker", category: "devops" },
              { icon: "/tech/kubernetes.svg", name: "Kubernetes", category: "devops" },
              { icon: "/tech/aws.svg", name: "AWS", category: "devops" },
              { icon: "/tech/terraform.svg", name: "Terraform", category: "devops" },
              { icon: "/tech/ansible.svg", name: "Ansible", category: "devops" },
              
              // Monitoring & Observability
              { icon: "/tech/grafana.svg", name: "Grafana", category: "monitoring" },
              { icon: "/tech/prometheus.svg", name: "Prometheus", category: "monitoring" },
              
              // Version Control
              { icon: "/tech/git.svg", name: "Git", category: "tools" },
              { icon: "/tech/github.svg", name: "GitHub", category: "tools" },
              { icon: "/tech/gitlab.svg", name: "GitLab", category: "tools" },
              
              // Operating Systems
              { icon: "/tech/redhat.svg", name: "Red Hat", category: "os" },
              { icon: "/tech/ubuntu.svg", name: "Ubuntu", category: "os" }
            ]} 
            t={t} 
          />
        </motion.div>
      </div>
    </section>
  )
}
