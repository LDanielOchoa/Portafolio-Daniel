import type React from "react"
import AppWrapper from "@/components/layout/app-wrapper"
import "./globals.css"
import { Inter, Playfair_Display, Space_Grotesk, Manrope, Dancing_Script } from "next/font/google"
import type { Metadata, Viewport } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: 'swap',
  preload: true,
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  preload: true,
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Daniel Ochoa - Full-Stack Developer & UI/UX Designer Portfolio",
  description: "Explore the portfolio of Daniel Ochoa, a creative Full-Stack developer and UI/UX designer specializing in modern web applications with React, Next.js, and Node.js.",
  keywords: ["Full-Stack Developer", "UI/UX Designer", "React Developer", "Next.js", "Portfolio", "Daniel Ochoa", "Web Developer"],
  authors: [{ name: "Daniel Ochoa", url: "https://danielochoa.vercel.app" }],
  creator: "Daniel Ochoa",
  metadataBase: new URL('https://danielochoa.vercel.app'),
  openGraph: {
    title: "Daniel Ochoa - Full-Stack Developer & UI/UX Designer Portfolio",
    description: "Creative portfolio showcasing interactive web experiences and modern designs by Daniel Ochoa.",
    url: "https://danielochoa.vercel.app",
    siteName: "Daniel Ochoa Portfolio",
    images: [
      {
        url: '/og-image.png', // Debe existir en /public
        width: 1200,
        height: 630,
        alt: 'Daniel Ochoa Portfolio Preview',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daniel Ochoa - Full-Stack Developer & UI/UX Designer Portfolio",
    description: "Explore the work of Daniel Ochoa, a creative Full-Stack developer and UI/UX designer.",
    creator: '@danielochoa', // Reemplazar con tu handle de Twitter si tienes
    images: ['/twitter-image.png'], // Debe existir en /public
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${manrope.variable} ${dancingScript.variable} font-sans`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
