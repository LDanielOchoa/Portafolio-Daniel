"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface SkillChartProps {
  language: string
}

export function SkillChart({ language }: SkillChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const frontendSkills = [
    { name: language === "en" ? "React/Next.js" : "React/Next.js", value: 35 },
    { name: language === "en" ? "CSS/Tailwind" : "CSS/Tailwind", value: 25 },
    { name: language === "en" ? "JavaScript/TypeScript" : "JavaScript/TypeScript", value: 30 },
    { name: language === "en" ? "UI Libraries" : "Librerías UI", value: 10 },
  ]

  const backendSkills = [
    { name: language === "en" ? "Node.js" : "Node.js", value: 40 },
    { name: language === "en" ? "Databases" : "Bases de datos", value: 25 },
    { name: language === "en" ? "API Design" : "Diseño de APIs", value: 20 },
    { name: language === "en" ? "Authentication" : "Autenticación", value: 15 },
  ]

  const designSkills = [
    { name: language === "en" ? "UI Design" : "Diseño UI", value: 30 },
    { name: language === "en" ? "UX Research" : "Investigación UX", value: 25 },
    { name: language === "en" ? "Prototyping" : "Prototipado", value: 25 },
    { name: language === "en" ? "Design Systems" : "Sistemas de Diseño", value: 20 },
  ]

  // Enhanced color palette
  const COLORS = ["#9333ea", "#a855f7", "#c084fc", "#d8b4fe"]

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <motion.path
          d={`M${cx},${cy} L${cx + outerRadius},${cy} A${outerRadius},${outerRadius} 0 0,1 ${cx},${cy + outerRadius} A${outerRadius},${outerRadius} 0 0,1 ${cx - outerRadius},${cy} A${outerRadius},${outerRadius} 0 0,1 ${cx},${cy - outerRadius} A${outerRadius},${outerRadius} 0 0,1 ${cx + outerRadius},${cy} Z`}
          fill="none"
          stroke={fill}
          strokeWidth={3}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="glow-sm"
        />
      </g>
    )
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect p-3 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-purple-600 font-bold">{`${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  const SkillCard = ({ title, data }: { title: string; data: any[] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card p-6 hover-lift"
    >
      <h3 className="text-xl font-bold mb-4 text-center gradient-text">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              activeShape={renderActiveShape}
              animationBegin={0}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((skill, index) => (
          <div key={index} className="flex items-center justify-between hover-lift">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2 glow-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm">{skill.name}</span>
            </div>
            <span className="text-sm font-medium">{skill.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <SkillCard title={language === "en" ? "Frontend Development" : "Desarrollo Frontend"} data={frontendSkills} />
      <SkillCard title={language === "en" ? "Backend Development" : "Desarrollo Backend"} data={backendSkills} />
      <SkillCard title={language === "en" ? "Design" : "Diseño"} data={designSkills} />
    </div>
  )
}
