"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  image: string
  category: string
}

export function BlogPostCard({ title, excerpt, date, image, category }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl overflow-hidden hover:border-purple-600/30 transition-colors duration-300">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={600}
            height={338}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-purple-600/90 text-white text-xs px-3 py-1 rounded-full font-mono">
            {category}
          </div>
        </div>

        <div className="p-6">
          <div className="text-sm text-foreground/60 mb-2 font-mono">{formatDate(date)}</div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors font-serif">{title}</h3>

          <p className="text-foreground/70 mb-4 line-clamp-2 font-body">{excerpt}</p>

          <div className="flex items-center text-purple-600 font-medium">
            <span className="mr-2 font-mono">Read More</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
