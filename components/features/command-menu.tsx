"use client"

import { useEffect } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { useLanguage } from "./language-context"
import { translations } from "@/lib/translations"
import {
  Award,
  Briefcase,
  Home,
  Languages,
  Laptop,
  MessageSquare,
  Moon,
  Star,
  Sun,
  User,
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
    { id: "testimonials", label: t.navigation.testimonials, icon: Star },
    { id: "experience", label: t.navigation.experience, icon: Award },
    { id: "contact", label: t.navigation.contact, icon: MessageSquare },
  ]

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>{t.commandMenu.title}</DialogTitle>
        <DialogDescription>{t.commandMenu.placeholder}</DialogDescription>
      </VisuallyHidden>
      <CommandInput placeholder={t.commandMenu.placeholder} />
      <CommandList className="scrollbar-hide">
        <CommandEmpty>{t.search.noResults}</CommandEmpty>
        
        <CommandGroup heading={t.commandMenu.sections}>
          {sections.map((section) => (
            <CommandItem
              key={section.id}
              onSelect={() => runCommand(() => handleScroll(section.id))}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-150 hover:bg-purple-600/10"
            >
              <section.icon className="w-4 h-4 text-foreground/70" />
              <span className="text-sm">{section.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading={t.commandMenu.theme}>
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-150 hover:bg-purple-600/10">
            <Sun className="w-4 h-4 text-foreground/70" />
            <span className="text-sm">{t.commandMenu.light}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-150 hover:bg-purple-600/10">
            <Moon className="w-4 h-4 text-foreground/70" />
            <span className="text-sm">{t.commandMenu.dark}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-150 hover:bg-purple-600/10">
            <Laptop className="w-4 h-4 text-foreground/70" />
            <span className="text-sm">{t.commandMenu.system}</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />

        <CommandGroup heading={t.commandMenu.language}>
          <CommandItem onSelect={() => runCommand(toggleLanguage)} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-150 hover:bg-purple-600/10">
            <Languages className="w-4 h-4 text-foreground/70" />
            <span className="text-sm">
              {language === "en" ? t.commandMenu.spanish : t.commandMenu.english}
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
