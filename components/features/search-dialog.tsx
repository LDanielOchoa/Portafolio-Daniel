"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useLanguage } from "./language-context"
import { translations } from "@/lib/translations"
import { Search } from "lucide-react"
import { Home, User, Briefcase, Code, Star, Award, MessageSquare, FileText } from "lucide-react"

interface SearchDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleScroll: (section: string) => void
}

export function SearchDialog({ open, setOpen, handleScroll }: SearchDialogProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo para la búsqueda
  const searchableContent = [
    { id: "home", type: "section", title: t.navigation.home },
    { id: "about", type: "section", title: t.navigation.about },
    { id: "projects", type: "section", title: t.navigation.projects },
    { id: "skills", type: "section", title: t.navigation.skills },
    { id: "testimonials", type: "section", title: t.navigation.testimonials },
    { id: "experience", type: "section", title: t.navigation.experience },
    { id: "blog", type: "section", title: t.navigation.blog },
    { id: "contact", type: "section", title: t.navigation.contact },
    { id: "project1", type: "project", title: "Creative Dashboard" },
    { id: "project2", type: "project", title: "E-commerce Platform" },
    { id: "project3", type: "project", title: "Mobile App Design" },
    { id: "skill1", type: "skill", title: "React" },
    { id: "skill2", type: "skill", title: "Next.js" },
    { id: "skill3", type: "skill", title: "TypeScript" },
    { id: "skill4", type: "skill", title: "Framer Motion" },
  ]

  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = searchableContent.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const handleSelect = (id: string, type: string) => {
    if (type === "section") {
      handleScroll(id)
    } else if (type === "project") {
      handleScroll("projects")
    } else if (type === "skill") {
      handleScroll("skills")
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            {t.search.title}
          </DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder={t.search.placeholder} value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>{t.search.noResults}</CommandEmpty>
            {searchResults.length > 0 && (
              <CommandGroup>
                {searchResults.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.id, item.type)}
                    className="flex items-center justify-between"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <span>↑↓</span>
            <span>{t.search.navigate}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>esc</span>
            <span>{t.search.close}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
