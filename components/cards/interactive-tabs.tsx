"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface InteractiveTabsProps {
  tabs: Tab[]
}

export function InteractiveTabs({ tabs }: InteractiveTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="w-full">
      <div className="flex space-x-1 border-b border-foreground/10 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-purple-500"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-purple-500"
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
