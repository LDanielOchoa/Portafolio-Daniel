"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, SkipForward, Volume2, VolumeX, Music } from "lucide-react"
import Image from "next/image"

interface Song {
  id: number
  title: string
  artist: string
  album: string
  cover: string
  file: string
  startTime: number
  endTime: number
}

export function EasterEggPlayer() {
  const [isVisible, setIsVisible] = useState(true) // Start visible for development
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Lista de canciones con URLs externas confiables
  const songs: Song[] = [
    {
      id: 1,
      title: "Time is Running Out",
      artist: "Muse",
      album: "Absolution",
      cover: "/music/muse-absolution.png",
      file: "https://storage.googleapis.com/media-session/ringtone.mp3", // Google hosted test audio
      startTime: 0,
      endTime: 40,
    },
    {
      id: 2,
      title: "A Beautiful Lie",
      artist: "Thirty Seconds to Mars",
      album: "A Beautiful Lie",
      cover: "/music/30stm-a-beautiful-lie.png",
      file: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg", // Google hosted test audio
      startTime: 0,
      endTime: 40,
    },
    {
      id: 3,
      title: "Knights of Cydonia",
      artist: "Muse",
      album: "Black Holes and Revelations",
      cover: "/music/muse-black-holes.png",
      file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg", // Google hosted test audio
      startTime: 0,
      endTime: 40,
    },
    {
      id: 4,
      title: "The Kill",
      artist: "Thirty Seconds to Mars",
      album: "A Beautiful Lie",
      cover: "/music/30stm-a-beautiful-lie.png",
      file: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg", // Google hosted test audio
      startTime: 0,
      endTime: 40,
    },
    {
      id: 5,
      title: "Supermassive Black Hole",
      artist: "Muse",
      album: "Black Holes and Revelations",
      cover: "/music/muse-black-holes.png",
      file: "https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg", // Google hosted test audio
      startTime: 0,
      endTime: 40,
    },
    {
      id: 6,
      title: "From Yesterday",
      artist: "Thirty Seconds to Mars",
      album: "A Beautiful Lie",
      cover: "/music/30stm-a-beautiful-lie.png",
      file: "https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg", // Google hosted test audio
      startTime: 0,
      endTime: 40,
    },
  ]

  // Efecto para mostrar el reproductor cuando se escribe la secuencia "sao62025"
  useEffect(() => {
    // Implementado en KeySequenceDetector
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  // Gestionar la reproducción de audio
  useEffect(() => {
    if (!isVisible) return

    const currentSong = songs[currentSongIndex]
    setErrorMessage(null)

    if (audioRef.current) {
      // Configurar el elemento de audio
      try {
        audioRef.current.src = currentSong.file
        audioRef.current.currentTime = currentSong.startTime

        // Manejar la reproducción
        if (isPlaying) {
          const playPromise = audioRef.current.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Reproducción iniciada con éxito
                console.log("Audio playing successfully")
              })
              .catch((error) => {
                console.error("Error playing audio:", error)
                setIsPlaying(false)
                setErrorMessage("Failed to play audio. Click play to try again.")
              })
          }

          // Configurar intervalo para actualizar la barra de progreso
          progressIntervalRef.current = setInterval(() => {
            if (audioRef.current) {
              const songDuration = currentSong.endTime - currentSong.startTime
              const currentTime = audioRef.current.currentTime - currentSong.startTime
              const progressPercentage = (currentTime / songDuration) * 100
              setProgress(Math.min(progressPercentage, 100))

              // Cambiar a la siguiente canción cuando termine
              if (audioRef.current.currentTime >= currentSong.endTime) {
                nextSong()
              }
            }
          }, 100)
        } else {
          audioRef.current.pause()
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
          }
        }
      } catch (err) {
        console.error("Error with audio setup:", err)
        setErrorMessage("Error setting up audio. Please try again.")
        setIsPlaying(false)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isVisible, isPlaying, currentSongIndex])

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = "" // Limpiar la fuente para liberar recursos
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)
    setProgress(0)
    setIsPlaying(true)
    setErrorMessage(null)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const closePlayer = () => {
    setIsVisible(false)
    setIsPlaying(false)
    setErrorMessage(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
  }

  const currentSong = songs[currentSongIndex]

  return (
    <>
      <audio
        ref={audioRef}
        onError={(e) => {
          console.error("Audio error:", e)
          setIsPlaying(false)
          setErrorMessage("Could not load audio. Please try another song.")
        }}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 w-80 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  SAO6 Music Player
                </h3>
                <button onClick={closePlayer} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-white/10">
                  <Image
                    src={currentSong.cover || "/placeholder.svg?height=64&width=64&query=album cover"}
                    alt={`${currentSong.album} cover`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
                  <p className="text-xs text-white/70 truncate">{currentSong.artist}</p>
                  <p className="text-xs text-white/50 truncate">{currentSong.album}</p>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-500/20 text-white text-xs p-2 rounded mb-4 border border-red-500/30">
                  {errorMessage}
                </div>
              )}

              <div className="mb-4">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePlay}
                    className="p-3 bg-white text-purple-900 rounded-full hover:bg-white/90 transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <button onClick={nextSong} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <SkipForward size={18} />
                  </button>
                </div>
                <div className="w-8"></div> {/* Spacer para equilibrar el diseño */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
