"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:border-purple-600/30 hover:bg-purple-600/5 transition-all duration-300 relative"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
      >
        <Sun size={16} className="text-amber-400" style={{ filter: "drop-shadow(0 0 2px rgba(251, 191, 36, 0.5))" }} />
      </motion.div>

      <motion.div
        animate={{
          rotate: theme === "light" ? 0 : -180,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
      >
        <Moon
          size={16}
          className="text-purple-400"
          style={{ filter: "drop-shadow(0 0 2px rgba(192, 132, 252, 0.5))" }}
        />
      </motion.div>
    </motion.button>
  )
}
