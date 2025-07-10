export const projectsData = (t: any) => [
  {
    id: 1,
    title: t.language === "en" ? "Permission Request System" : "Sistema de Solicitud de Permisos",
    description:
      t.language === "en"
        ? "Enterprise application for Sistema Alimentador Oriental 6. Python backend with Django REST Framework and Next.js frontend. Features comprehensive permission request workflow."
        : "Aplicación empresarial para Sistema Alimentador Oriental 6. Backend en Python con Django REST Framework y frontend en Next.js. Incluye flujo completo de solicitudes de permisos.",
    image: "/project-1.png",
    category: "web",
    tags: ["Python", "Django", "Next.js", "PostgreSQL"],
    links: {
      github: "https://github.com/LDanielOchoa",
      live: "#",
    },
  },
  {
    id: 2,
    title: t.language === "en" ? "Performance Evaluation" : "Evaluación de Desempeño",
    description:
      t.language === "en"
        ? "Employee performance evaluation system utilizing Python data processing backend with Vue.js frontend. Includes automated reporting and statistical analysis."
        : "Sistema de evaluación de desempeño con procesamiento de datos en Python y frontend en Vue.js. Incluye generación automatizada de informes y análisis estadístico.",
    image: "/project-2.png",
    category: "data",
    tags: ["Python", "Vue.js", "MySQL", "Pandas"],
    links: {
      github: "https://github.com/LDanielOchoa",
      live: "#",
    },
  },
]; 