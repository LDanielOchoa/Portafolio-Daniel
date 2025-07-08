"use client"

import { useEffect } from "react"
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
} from "@/components/ui/command"
import { useTheme } from "next-themes"
import { useLanguage } from "./language-context"
import { translations } from "@/lib/translations"
import {
  Moon,
  Sun,
  Laptop,
  Languages,
  Home,
  User,
  Briefcase,
  Code,
  Star,
  Award,
  MessageSquare,
  FileText,
} from "lucide-react"

interface CommandMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleScroll: (section: string) => void
}

export function CommandMenu({ open, setOpen, handleScroll }: CommandMenuProps) {
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const sections = [
    { id: "home", label: t.navigation.home, icon: Home },
    { id: "about", label: t.navigation.about, icon: User },
    { id: "projects", label: t.navigation.projects, icon: Briefcase },
    { id: "skills", label: t.navigation.skills, icon: Code },
    { id: "testimonials", label: t.navigation.testimonials, icon: Star },
    { id: "experience", label: t.navigation.experience, icon: Award },
    { id: "blog", label: t.navigation.blog, icon: FileText },
    { id: "contact", label: t.navigation.contact, icon: MessageSquare },
  ]

  const handleSectionSelect = (sectionId: string) => {
    handleScroll(sectionId)
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t.commandMenu.placeholder} />
      <CommandList>
        <CommandEmpty>{t.search.noResults}</CommandEmpty>
        <CommandGroup heading={t.commandMenu.sections}>
          {sections.map((section) => (
            <CommandItem
              key={section.id}
              onSelect={() => handleSectionSelect(section.id)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <section.icon className="w-4 h-4" />
              <span>{section.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.commandMenu.theme}>
          <CommandItem onSelect={() => setTheme("light")} className="flex items-center gap-2 cursor-pointer">
            <Sun className="w-4 h-4" />
            <span>{t.commandMenu.light}</span>
          </CommandItem>
          <CommandItem onSelect={() => setTheme("dark")} className="flex items-center gap-2 cursor-pointer">
            <Moon className="w-4 h-4" />
            <span>{t.commandMenu.dark}</span>
          </CommandItem>
          <CommandItem onSelect={() => setTheme("system")} className="flex items-center gap-2 cursor-pointer">
            <Laptop className="w-4 h-4" />
            <span>{t.commandMenu.system}</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.commandMenu.language}>
          <CommandItem onSelect={() => toggleLanguage()} className="flex items-center gap-2 cursor-pointer">
            <Languages className="w-4 h-4" />
            <span>{language === "en" ? t.commandMenu.spanish : t.commandMenu.english}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
