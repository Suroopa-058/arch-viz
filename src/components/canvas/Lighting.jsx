// Lighting.jsx — IllamViz cinematic daylight setup

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lighting() {
  const sunRef = useRef()

  return (
    <>
      {/* ── Ambient — warm soft fill ───────────────── */}
      <ambientLight
        intensity={1.4}
        color="#fff5e8"
      />

      {/* ── Main sun — high noon slightly angled ───── */}
      <directionalLight
        ref={sunRef}
        position={[12, 20, 10]}
        intensity={4.0}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />

      {/* ── Warm fill — left side bounce ───────────── */}
      <directionalLight
        position={[-10, 8, 6]}
        intensity={1.2}
        color="#ffd4a0"
      />

      {/* ── Cool sky fill — back top ────────────────── */}
      <directionalLight
        position={[0, 10, -12]}
        intensity={0.6}
        color="#d0e8f8"
      />

      {/* ── Hemisphere — sky + ground bounce ────────── */}
      <hemisphereLight
        skyColor="#fff8f0"
        groundColor="#d4a870"
        intensity={0.8}
      />

      {/* ── Warm accent — front porch glow ─────────── */}
      <pointLight
        position={[0, 4, 7]}
        intensity={1.5}
        color="#ffe0a0"
        distance={18}
        decay={2}
      />

      {/* ── Entry warm glow — door area ────────────── */}
      <pointLight
        position={[0, 2.5, 4]}
        intensity={0.8}
        color="#ffcc80"
        distance={8}
        decay={2}
      />

      {/* ── Subtle rim light — back right ──────────── */}
      <directionalLight
        position={[8, 6, -8]}
        intensity={0.4}
        color="#ffe8c0"
      />
    </>
  )
}