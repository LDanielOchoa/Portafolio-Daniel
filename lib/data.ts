export const projectsData = (t: any) => [
  {
    id: 1,
    title: t.language === "en" ? "Permission Request System" : "Sistema de Solicitud de Permisos",
    description:
      t.language === "en"
        ? "Enterprise application for Sistema Alimentador Oriental 6. Python backend with Django REST Framework and Next.js frontend. Features comprehensive permission request workflow."
        : "Aplicación empresarial para Sistema Alimentador Oriental 6. Backend en Python con Django REST Framework y frontend en Next.js. Incluye flujo completo de solicitudes de permisos.",
    image: ["/image/solicitud-permisos1.webp", "/image/solicitud-permisos2.webp"],
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
    image: "/image/evaluacion-desempeño.png",
    category: "data",
    tags: ["Python", "Vue.js", "MySQL", "Pandas"],
    links: {
      github: "https://github.com/LDanielOchoa",
      live: "#",
    },
  },
  {
    id: 3,
    title: t.language === "en" ? "Performance Indicators" : "Indicador de Desempeño",
    description:
      t.language === "en"
        ? "Comprehensive dashboard for monitoring and analyzing key performance indicators (KPIs). Features real-time data visualization, trend analysis, and automated reporting capabilities."
        : "Panel de control completo para monitorear y analizar indicadores clave de desempeño (KPIs). Incluye visualización de datos en tiempo real, análisis de tendencias y capacidades de informes automatizados.",
    image: [
      "/image/indicadordesempeño.png",
      "/image/indicadordesempeño2.png",
      "/image/indicadordesempeño3.png"
    ],
    category: "data",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    links: {
      github: "https://github.com/LDanielOchoa",
      live: "#",
    },
  },
  {
    id: 4,
    title: "Single Sign-On (SSO)",
    description:
      t.language === "en"
        ? "Centralized authentication system implementing OAuth 2.0 and OpenID Connect protocols. Features secure token management, role-based access control, and seamless integration with multiple applications."
        : "Sistema de autenticación centralizado que implementa los protocolos OAuth 2.0 y OpenID Connect. Incluye gestión segura de tokens, control de acceso basado en roles e integración perfecta con múltiples aplicaciones.",
    image: "/image/sso.png",
    category: "web",
    tags: ["OAuth 2.0", "JWT", "Node.js", "Redis"],
    links: {
      github: "https://github.com/LDanielOchoa",
      live: "#",
    },
  },
]; 