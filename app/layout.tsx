import type React from "react"
import AppWrapper from "@/components/layout/app-wrapper"
import "./globals.css"
import { Inter, Playfair_Display, Space_Grotesk, Manrope, Dancing_Script } from "next/font/google"
import type { Metadata } from "next"

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
  title: "Creative Portfolio | Developer & Designer",
  description: "A creative portfolio showcasing interactive web experiences and designs",
  metadataBase: new URL('https://danielochoa.verce.app'),
  openGraph: {
    title: "Creative Portfolio | Developer & Designer",
    description: "A creative portfolio showcasing interactive web experiences and designs",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Creative Portfolio | Developer & Designer",
    description: "A creative portfolio showcasing interactive web experiences and designs",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
