// DoorSystem.jsx — polished interactive doors

import { useRef, useState, useEffect } from 'react'
import { useFrame }                    from '@react-three/fiber'
import * as THREE                      from 'three'
import gsap                            from 'gsap'

function Door({ position, rotation = [0,0,0], playerPos, activeDist = 2.2 }) {
  const panelRef = useRef()
  const [open,   setOpen]   = useState(false)
  const [nearby, setNearby] = useState(false)
  const tweenRef = useRef(null)

  useFrame(() => {
    if (!playerPos?.current?.position) return
    const pp   = playerPos.current.position
    const dp   = new THREE.Vector3(...position)
    setNearby(pp.distanceTo(dp) < activeDist)
  })

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'e' || e.key === 'E') && nearby) toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nearby, open])

  const toggle = () => {
    if (!panelRef.current) return
    if (tweenRef.current) tweenRef.current.kill()

    const targetY = open ? 0 : -Math.PI / 1.9
    tweenRef.current = gsap.to(panelRef.current.rotation, {
      y:        targetY,
      duration: 0.75,
      ease:     'power2.inOut',
    })
    setOpen(!open)
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Frame — left jamb */}
      <mesh castShadow>
        <boxGeometry args={[0.1, 2.6, 0.14]} />
        <meshStandardMaterial color="#5a3820" roughness={0.7} />
      </mesh>
      {/* Frame — right jamb */}
      <mesh position={[1.05, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 2.6, 0.14]} />
        <meshStandardMaterial color="#5a3820" roughness={0.7} />
      </mesh>
      {/* Frame — top */}
      <mesh position={[0.5, 1.32, 0]} castShadow>
        <boxGeometry args={[1.22, 0.1, 0.14]} />
        <meshStandardMaterial color="#5a3820" roughness={0.7} />
      </mesh>

      {/* Door panel — hinges on LEFT side (x=0) */}
      <group position={[0.05, 0, 0]}>
        <group ref={panelRef}>
          {/* Main panel */}
          <mesh position={[0.48, 0, 0.04]} castShadow>
            <boxGeometry args={[0.96, 2.38, 0.06]} />
            <meshStandardMaterial color="#7a4e2d" roughness={0.58} />
          </mesh>
          {/* Upper inset */}
          <mesh position={[0.48, 0.52, 0.075]} castShadow>
            <boxGeometry args={[0.72, 0.85, 0.03]} />
            <meshStandardMaterial color="#6b4228" roughness={0.55} />
          </mesh>
          {/* Lower inset */}
          <mesh position={[0.48,-0.42, 0.075]} castShadow>
            <boxGeometry args={[0.72, 0.55, 0.03]} />
            <meshStandardMaterial color="#6b4228" roughness={0.55} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.82, 0.05, 0.1]}>
            <boxGeometry args={[0.12, 0.04, 0.04]} />
            <meshStandardMaterial color="#c8a040" roughness={0.18} metalness={0.92} />
          </mesh>
          <mesh position={[0.88, 0.05, 0.1]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#c8a040" roughness={0.18} metalness={0.92} />
          </mesh>
        </group>
      </group>

      {/* Proximity indicator */}
      {nearby && !open && (
        <mesh position={[0.5, 1.5, 0.2]}>
          <boxGeometry args={[0.55, 0.2, 0.02]} />
          <meshStandardMaterial
            color="#c8692a"
            emissive="#c8692a"
            emissiveIntensity={0.5}
            transparent opacity={0.88}
          />
        </mesh>
      )}
    </group>
  )
}

export default function DoorSystem({ playerPos }) {
  return (
    <group name="doors" position={[0,0,-1.5]}>
      {/* Living room */}
      <Door position={[0.72, 1.5,  0.5]}  rotation={[0,0,0]}          playerPos={playerPos} />
      {/* Kitchen */}
      <Door position={[0.72, 1.5, -1.5]}  rotation={[0,0,0]}          playerPos={playerPos} />
      {/* Master bedroom FF */}
      <Door position={[-1.2, 4.5, -0.55]} rotation={[0,Math.PI/2,0]}  playerPos={playerPos} />
      {/* Bedroom 2 FF */}
      <Door position={[ 0.8, 4.5, -0.55]} rotation={[0,Math.PI/2,0]}  playerPos={playerPos} />
    </group>
  )
}