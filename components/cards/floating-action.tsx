"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

interface FloatingActionProps {
  showScrollTop: boolean
  scrollToTop: () => void
}

export function FloatingAction({ showScrollTop, scrollToTop }: FloatingActionProps) {
  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-400 text-white flex items-center justify-center shadow-lg hover:shadow-purple-500/20"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
