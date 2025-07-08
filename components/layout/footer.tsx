"use client"

import { motion } from "framer-motion"
import { ArrowUp, Github } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  t: any
}

export function Footer({ t }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10 h-32"></div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/5 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="mb-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-400 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/20"
          >
            <ArrowUp size={20} />
          </motion.button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-2 font-display">Daniel Ochoa</h2>
            <p className="text-foreground/60 font-serif">Frontend Developer & UX Specialist</p>
          </div>

          <div className="flex space-x-6 mb-8">
            <a
              href="https://github.com/LDanielOchoa"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/70 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span className="font-mono text-sm">LDanielOchoa</span>
            </a>
          </div>

          <div className="w-full border-t border-foreground/10 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-foreground/60 text-sm mb-4 md:mb-0 font-body">
                © {currentYear} Daniel Ochoa. {t.footer.copyright}
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="text-foreground/60 text-sm hover:text-purple-600 transition-colors font-mono">
                  {t.footer.privacy}
                </Link>
                <Link href="#" className="text-foreground/60 text-sm hover:text-purple-600 transition-colors font-mono">
                  {t.footer.terms}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
