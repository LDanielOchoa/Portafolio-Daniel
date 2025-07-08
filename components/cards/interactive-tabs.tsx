"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Palette, Lightbulb, Rocket } from "lucide-react"
import Image from "next/image"

interface InteractiveTabsProps {
  language: string
}

export function InteractiveTabs({ language }: InteractiveTabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: "development",
      label: language === "en" ? "Development" : "Desarrollo",
      icon: <Code className="w-5 h-5" />,
      content:
        language === "en"
          ? "I build applications with a focus on performance, accessibility, and clean code. Using modern frameworks and best practices, I create scalable solutions that meet business needs while providing an excellent user experience."
          : "Construyo aplicaciones con un enfoque en rendimiento, accesibilidad y código limpio. Utilizando frameworks modernos y mejores prácticas, creo soluciones escalables que satisfacen las necesidades del negocio mientras proporcionan una excelente experiencia de usuario.",
      image: "/tab-development.jpg?width=600&height=400&query=coding development workspace",
    },
    {
      id: "design",
      label: language === "en" ? "Design" : "Diseño",
      icon: <Palette className="w-5 h-5" />,
      content:
        language === "en"
          ? "My design approach combines aesthetics with functionality. I create visually appealing interfaces that guide users intuitively through the application, using color theory, typography, and layout principles to enhance the overall experience."
          : "Mi enfoque de diseño combina estética con funcionalidad. Creo interfaces visualmente atractivas que guían a los usuarios de manera intuitiva a través de la aplicación, utilizando teoría del color, tipografía y principios de diseño para mejorar la experiencia general.",
      image: "/tab-design.jpg?width=600&height=400&query=ui design workspace",
    },
    {
      id: "strategy",
      label: language === "en" ? "Strategy" : "Estrategia",
      icon: <Lightbulb className="w-5 h-5" />,
      content:
        language === "en"
          ? "I help businesses define their digital strategy by understanding their goals, audience, and market position. This strategic approach ensures that every design and development decision aligns with business objectives and user needs."
          : "Ayudo a las empresas a definir su estrategia digital comprendiendo sus objetivos, audiencia y posición en el mercado. Este enfoque estratégico asegura que cada decisión de diseño y desarrollo se alinee con los objetivos comerciales y las necesidades del usuario.",
      image: "/tab-strategy.jpg?width=600&height=400&query=business strategy meeting",
    },
    {
      id: "deployment",
      label: language === "en" ? "Deployment" : "Implementación",
      icon: <Rocket className="w-5 h-5" />,
      content:
        language === "en"
          ? "I ensure smooth deployment and ongoing maintenance of applications. Using CI/CD pipelines, automated testing, and monitoring tools, I provide reliable solutions that continue to perform well after launch."
          : "Aseguro una implementación fluida y mantenimiento continuo de las aplicaciones. Utilizando pipelines CI/CD, pruebas automatizadas y herramientas de monitoreo, proporciono soluciones confiables que continúan funcionando bien después del lanzamiento.",
      image: "/tab-deployment.jpg?width=600&height=400&query=server deployment cloud computing",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex overflow-x-auto scrollbar-hide space-x-2 mb-8 pb-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === index
                ? "bg-gradient-to-r from-purple-600 to-indigo-400 text-white"
                : "bg-foreground/5 border border-foreground/10 hover:bg-foreground/10"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="relative bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-400 rounded-full flex items-center justify-center">
                  {tabs[activeTab].icon}
                </div>
                <h3 className="text-xl font-bold">{tabs[activeTab].label}</h3>
              </div>
              <p className="text-foreground/80">{tabs[activeTab].content}</p>
            </motion.div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={tabs[activeTab].image || "/placeholder.svg"}
                alt={tabs[activeTab].label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-background/80 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
