"use client"

import { useEffect, useState } from "react"
import { EasterEggPlayer } from "./easter-egg-player"

export function KeySequenceDetector() {
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    const keySequence: string[] = []
    const targetSequence = ["s", "a", "o", "6", "2", "0", "2", "5"]

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar si el usuario está escribiendo en un input, textarea, etc.
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      keySequence.push(e.key.toLowerCase())

      // Mantener solo los últimos N caracteres
      if (keySequence.length > targetSequence.length) {
        keySequence.shift()
      }

      // Comprobar si la secuencia coincide
      const isMatch = keySequence.join("") === targetSequence.join("")

      if (isMatch) {
        setShowPlayer(true)
        console.log("Easter egg activated!")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return showPlayer ? <EasterEggPlayer /> : null
}
