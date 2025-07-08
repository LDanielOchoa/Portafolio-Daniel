import type React from "react"
import AppWrapper from "@/components/layout/app-wrapper"
import "./globals.css"
import { Inter, Playfair_Display, Space_Grotesk, Manrope, Dancing_Script } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Creative Portfolio | Developer & Designer",
  description: "A creative portfolio showcasing interactive web experiences and designs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${manrope.variable} ${dancingScript.variable} font-sans`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
