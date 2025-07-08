"use client"

import Link from "next/link"
import { useTheme } from "next-themes"

export function AnimatedLogo() {
  const { theme } = useTheme()

  return (
    <Link href="/"></Link>
  )
}
