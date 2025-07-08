"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    "/work-1.jpg?width=600&height=400&query=creative workspace",
    "/work-2.jpg?width=600&height=400&query=design process",
    "/work-3.jpg?width=600&height=400&query=coding session",
    "/work-4.jpg?width=600&height=400&query=team collaboration",
    "/work-5.jpg?width=600&height=400&query=creative brainstorming",
    "/work-6.jpg?width=600&height=400&query=design presentation",
  ]

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Work image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white">
                <p className="font-medium">Project Image {index + 1}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-4xl h-auto max-h-[80vh]">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Enlarged view"
              width={1200}
              height={800}
              className="object-contain w-full h-auto"
            />
          </div>
        </motion.div>
      )}
    </>
  )
}
