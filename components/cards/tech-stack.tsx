"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function TechStack() {
  const technologies = [
    {
      name: "Python",
      icon: "/tech/python.svg?width=80&height=80&query=python logo",
      color: "#3776AB",
    },
    {
      name: "Go",
      icon: "/tech/go.svg?width=80&height=80&query=golang logo",
      color: "#00ADD8",
    },
    {
      name: "Next.js",
      icon: "/tech/nextjs.svg?width=80&height=80&query=nextjs logo",
      color: "#000000",
    },
    {
      name: "React",
      icon: "/tech/react.svg?width=80&height=80&query=react logo",
      color: "#61DAFB",
    },
    {
      name: "Vue.js",
      icon: "/tech/vue.svg?width=80&height=80&query=vuejs logo",
      color: "#4FC08D",
    },
    {
      name: "TypeScript",
      icon: "/tech/typescript.svg?width=80&height=80&query=typescript logo",
      color: "#3178C6",
    },
    {
      name: "Astro",
      icon: "/tech/astro.svg?width=80&height=80&query=astro framework logo",
      color: "#FF5D01",
    },
    {
      name: "Tailwind CSS",
      icon: "/tech/tailwind.svg?width=80&height=80&query=tailwind css logo",
      color: "#06B6D4",
    },
    {
      name: "PostgreSQL",
      icon: "/tech/postgresql.svg?width=80&height=80&query=postgresql logo",
      color: "#336791",
    },
    {
      name: "MongoDB",
      icon: "/tech/mongodb.svg?width=80&height=80&query=mongodb logo",
      color: "#47A248",
    },
    {
      name: "Red Hat",
      icon: "/tech/redhat.svg?width=80&height=80&query=red hat linux logo",
      color: "#EE0000",
    },
    {
      name: "Nginx",
      icon: "/tech/nginx.svg?width=80&height=80&query=nginx logo",
      color: "#009639",
    },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="flex flex-col items-center"
        >
          <div
            className="w-20 h-20 md:w-24 md:h-24 relative bg-foreground/5 rounded-2xl p-4 border border-foreground/10 flex items-center justify-center hover:border-purple-600/30 hover:bg-purple-600/5 transition-all duration-300"
            style={{ boxShadow: `0 4px 20px ${tech.color}15` }}
          >
            <Image
              src={tech.icon || "/placeholder.svg"}
              alt={`${tech.name} logo`}
              width={80}
              height={80}
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
          </div>
          <p className="mt-3 text-sm font-medium">{tech.name}</p>
        </motion.div>
      ))}
    </div>
  )
}
