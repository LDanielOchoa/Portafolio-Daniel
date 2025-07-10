"use client"

import { useLanguage } from "../features/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { X, Github, Linkedin, Twitter, Download, Mail, Sun, Moon, Sparkles } from "lucide-react"
import { translations } from "@/lib/translations"
import { MagneticButton } from "../buttons/magnetic-button"

interface SidebarNavigationProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  handleScroll: (section: string) => void
  sections: string[]
}

export function SidebarNavigation({ isOpen, onClose, activeSection, handleScroll, sections }: SidebarNavigationProps) {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const t = translations[language]

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerDirection: -1,
        staggerChildren: 0.05,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { y: 10, opacity: 0 },
    open: { y: 0, opacity: 1 },
  }

  const overlayVariants = {
    closed: { opacity: 0, transition: { delay: 0.3 } },
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
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-xs bg-background/95 border-r border-purple-600/20 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            {/* Header */}
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-purple-600/20">
              <motion.h2 variants={itemVariants} className="text-lg font-bold gradient-text flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>{t.sidebar.title}</span>
              </motion.h2>
              <motion.div variants={itemVariants}>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            </header>

            {/* Navigation */}
            <nav className="flex-grow overflow-y-auto p-4">
              <motion.div className="space-y-2">
                {sections.map((section) => {
                  const isActive = activeSection === section
                  return (
                    <motion.button
                      key={section}
                      variants={itemVariants}
                      onClick={() => handleSectionClick(section)}
                      className={`group flex items-center w-full px-4 py-3 rounded-lg transition-all text-left ${
                        isActive
                          ? "bg-purple-600/20 text-foreground"
                          : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      <span className={`font-medium transition-colors`}>
                        {t.navigation[section as keyof typeof t.navigation]}
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            </nav>

            {/* Footer */}
            <footer className="flex-shrink-0 border-t border-purple-600/20 p-4 space-y-6">
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/70">{t.sidebar.theme}</span>
                  <div className="flex items-center gap-2">
                    <Sun className={`w-5 h-5 transition-colors ${theme === 'light' ? 'text-purple-500' : 'text-foreground/50'}`} />
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-10 h-5 bg-foreground/10 rounded-full relative flex items-center px-1"
                    >
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full bg-purple-600"
                        animate={{ x: theme === "dark" ? "125%" : "0%" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                    <Moon className={`w-5 h-5 transition-colors ${theme === 'dark' ? 'text-purple-500' : 'text-foreground/50'}`} />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/70">{t.sidebar.language}</span>
                  <div className="relative flex w-32 rounded-full bg-foreground/10 p-1">
                    <motion.div
                      className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-purple-600/30 rounded-full"
                      animate={{ x: language === 'en' ? '0%' : '100%' }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    <button onClick={() => setLanguage("en")} className="relative z-10 w-1/2 py-1 text-sm font-medium text-center">EN</button>
                    <button onClick={() => setLanguage("es")} className="relative z-10 w-1/2 py-1 text-sm font-medium text-center">ES</button>
                  </div>
                </div>
              </motion.div>

              <motion.a
                href="/cv-daniel-ochoa.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group relative flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold transition-all overflow-hidden"
                whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundSize: '200% 200%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t.sidebar.downloadCV}
                </span>
              </motion.a>

              <motion.div variants={itemVariants} className="flex justify-center gap-5 pt-2">
                <a href="https://github.com/LDanielOchoa" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple-500 transition-colors duration-300 transform hover:scale-110"><Github className="w-5 h-5" /></a>
                <a href="https://www.linkedin.com/in/ldanielochoa/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple-500 transition-colors duration-300 transform hover:scale-110"><Linkedin className="w-5 h-5" /></a>
              </motion.div>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
