"use client"

import { useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { X, Github, Linkedin, Twitter, Download, Mail, Sun, Moon } from "lucide-react"
import { LanguageContext } from "../features/language-context"
import { translations } from "@/lib/translations"
import { MagneticButton } from "../buttons/magnetic-button"
import { AnimatedLogo } from "../animations/animated-logo"

interface SidebarNavigationProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  handleScroll: (section: string) => void
  sections: string[]
}

export function SidebarNavigation({ isOpen, onClose, activeSection, handleScroll, sections }: SidebarNavigationProps) {
  const { language, setLanguage } = useContext(LanguageContext)
  const { theme, setTheme } = useTheme()
  const t = translations[language]

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  const handleSectionClick = (section: string) => {
    handleScroll(section)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-black/95 border-r border-purple-600/20 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            {/* Header with logo and close button */}
            <div className="relative flex items-center justify-center py-6 border-b border-purple-600/20">
              <motion.div variants={itemVariants}>
                <AnimatedLogo />
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={onClose}
                className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-purple-900/20 hover:text-purple-400 transition-all"
                aria-label="Close menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Navigation with improved styling */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <motion.div className="space-y-2.5">
                {sections.map((section) => {
                  const isActive = activeSection === section
                  return (
                    <motion.button
                      key={section}
                      variants={itemVariants}
                      onClick={() => handleSectionClick(section)}
                      className={`group flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                        isActive ? "bg-purple-900/20 border border-purple-600/30" : "hover:bg-zinc-900/50"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${isActive ? "bg-purple-600" : "bg-purple-600/40"}`}
                        animate={
                          isActive
                            ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <span
                        className={`ml-3 font-medium ${
                          isActive ? "text-purple-400" : "text-zinc-400 group-hover:text-zinc-200"
                        } transition-colors`}
                      >
                        {t.navigation[section as keyof typeof t.navigation]}
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            </nav>

            {/* Footer with settings and social links */}
            <div className="border-t border-purple-600/20 p-5 space-y-6">
              {/* Language Toggle with improved styling */}
              <motion.div variants={itemVariants} className="mb-5">
                <div className="flex flex-col space-y-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                    {t.sidebar.language}
                  </span>
                  <div className="flex justify-end">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setLanguage("en")}
                        className={`py-1.5 px-3 rounded-md text-sm font-medium ${
                          language === "en"
                            ? "bg-purple-900/30 text-purple-400 border border-purple-600/30"
                            : "text-zinc-400 hover:text-zinc-200"
                        } transition-all`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLanguage("es")}
                        className={`py-1.5 px-3 rounded-md text-sm font-medium ${
                          language === "es"
                            ? "bg-purple-900/30 text-purple-400 border border-purple-600/30"
                            : "text-zinc-400 hover:text-zinc-200"
                        } transition-all`}
                      >
                        ES
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Theme Toggle with improved styling */}
              <motion.div variants={itemVariants} className="mb-5">
                <div className="flex flex-col space-y-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">{t.sidebar.theme}</span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-zinc-400">
                      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <span className="text-sm">{theme === "dark" ? t.commandMenu.dark : t.commandMenu.light}</span>
                    </div>
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-10 h-5 bg-zinc-800 rounded-full relative flex items-center px-1"
                    >
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full bg-purple-600"
                        initial={false}
                        animate={{
                          x: theme === "dark" ? 0 : "125%",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Download CV button with improved styling */}
              <motion.a
                href="#"
                variants={itemVariants}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Download className="h-4 w-4" />
                {t.sidebar.downloadCV}
              </motion.a>

              {/* Social Links with improved styling */}
              <motion.div variants={itemVariants} className="pt-2">
                <div className="flex flex-col space-y-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                    {t.sidebar.connect}
                  </span>
                  <div className="flex items-center justify-between">
                    <MagneticButton>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-purple-900/20 hover:text-purple-400 transition-all"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-purple-900/20 hover:text-purple-400 transition-all"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-purple-900/20 hover:text-purple-400 transition-all"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href="mailto:contact@example.com"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-purple-900/20 hover:text-purple-400 transition-all"
                        aria-label="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SidebarNavigation;
