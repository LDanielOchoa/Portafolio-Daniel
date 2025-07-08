"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[2, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color={theme === "dark" ? "#9333ea" : "#8b5cf6"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.4}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <AnimatedSphere />
      <Environment preset="studio" />
    </Canvas>
  )
}
