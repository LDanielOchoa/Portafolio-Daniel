"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1
        if (newProgress >= 100) {
          clearInterval(timer)
        }
        return newProgress
      })
    }, 20)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="w-12 h-12 text-purple-600" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
          Portfolio
        </h2>

        <div className="w-64 h-1 bg-foreground/10 rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
          ></motion.div>
        </div>

        <p className="text-foreground/60 text-sm">{progress}%</p>
      </motion.div>
    </div>
  )
}
