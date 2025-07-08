"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { AnimatedNavItem } from "../animations/animated-nav-item"
import { CommandMenu } from "../features/command-menu"
import { SearchDialog } from "../features/search-dialog"
import { SidebarNavigation } from "./sidebar-navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Search, Menu, Languages, Command, Github } from "lucide-react"

interface HeaderProps {
  activeSection: string
  handleScroll: (section: string) => void
  toggleLanguage: () => void
  language: string
  sections: string[]
  t: any
}

export function Header({ activeSection, handleScroll, toggleLanguage, language, sections, t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} handleScroll={handleScroll} />
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} handleScroll={handleScroll} />

      {/* Mobile Sidebar */}
      <SidebarNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        handleScroll={handleScroll}
        sections={sections}
      />

      <AnimatePresence>
        {!mobileMenuOpen && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              scrolled
                ? "py-2 bg-background/60 backdrop-blur-xl border-b border-purple-600/20 shadow-[0_4px_30px_rgba(147,51,234,0.1)]"
                : "py-4 bg-transparent backdrop-blur-sm"
            }`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="flex items-center justify-between relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute w-32 h-32 rounded-full bg-purple-600/5 -top-10 -left-10 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                  <motion.div
                    className="absolute w-24 h-24 rounded-full bg-indigo-600/5 -bottom-10 -right-10 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                  />
                  {scrolled && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{ duration: 0.8 }}
                      className="absolute bottom-[-1px] left-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                    />
                  )}
                </div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {/* Mobile Menu Trigger */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden relative overflow-hidden group"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      <Menu className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:text-purple-600" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.5, type: "spring" }}
                    >
                      <AnimatedNavItem active={activeSection === section} onClick={() => handleScroll(section)}>
                        {t.navigation[section as keyof typeof t.navigation]}
                      </AnimatedNavItem>
                    </motion.div>
                  ))}
                </nav>

                {/* Right Side Actions */}
                <motion.div
                  className="flex items-center space-x-1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {/* GitHub Button */}
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative overflow-hidden group"
                      onClick={() => window.open("https://github.com/LDanielOchoa", "_blank")}
                    >
                      <span className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      <Github className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                    </Button>
                  </motion.div>

                  {/* Search Button */}
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchOpen(true)}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      <Search className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                    </Button>
                  </motion.div>

                  {/* Command Menu Button */}
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCommandOpen(true)}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      <Command className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                    </Button>
                  </motion.div>

                  {/* Theme Toggle */}
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={theme}
                          initial={{ rotate: -180, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 180, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          {theme === "dark" ? (
                            <Moon className="h-5 w-5 transition-transform duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                          ) : (
                            <Sun className="h-5 w-5 transition-transform duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </Button>
                  </motion.div>

                  {/* Language Toggle */}
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleLanguage}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      <Languages className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header;
