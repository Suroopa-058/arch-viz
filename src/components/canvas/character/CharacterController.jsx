// CharacterController.jsx
// Handles WASD movement + character rotation
// Lives INSIDE Canvas

import { useRef, useEffect } from 'react'
import { useFrame }          from '@react-three/fiber'
import * as THREE            from 'three'
import CharacterMesh         from './CharacterMesh'

// ── Config ────────────────────────────────────────────
const WALK_SPEED    = 0.04   // slow architectural walk
const TURN_SPEED    = 0.08   // smooth turning
const FLOOR_Y       = 0      // ground level
const BOUND         = 12     // world boundary

export default function CharacterController({
  walkActive,
  onPositionUpdate,  // callback → sends pos+rotation to camera
  characterRef,      // external ref so camera can follow
}) {
  const groupRef  = useRef()
  const keysRef   = useRef({
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowDown: false,
    ArrowLeft: false, ArrowRight: false,
  })

  // Current facing angle (yaw)
  const facingRef  = useRef(Math.PI)  // start facing house
  // Target facing angle for smooth turning
  const targetYaw  = useRef(Math.PI)
  // Is moving?
  const isMoving   = useRef(false)

  // ── Keyboard listeners ────────────────────────────
  useEffect(() => {
    if (!walkActive) return

    const down = (e) => {
      const k = e.key.toLowerCase()
      if (k in keysRef.current)       keysRef.current[k]    = true
      if (e.key in keysRef.current)   keysRef.current[e.key] = true
    }
    const up = (e) => {
      const k = e.key.toLowerCase()
      if (k in keysRef.current)       keysRef.current[k]    = false
      if (e.key in keysRef.current)   keysRef.current[e.key] = false
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup',   up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup',   up)
      // Reset keys on cleanup
      Object.keys(keysRef.current).forEach(k => keysRef.current[k] = false)
    }
  }, [walkActive])

  // ── Per-frame update ──────────────────────────────
  useFrame(() => {
    if (!walkActive || !groupRef.current) return

    const k = keysRef.current
    const moving = k.w || k.s || k.a || k.d ||
                   k.ArrowUp || k.ArrowDown ||
                   k.ArrowLeft || k.ArrowRight

    isMoving.current = moving

    if (moving) {
      // Determine move direction
      let moveAngle = facingRef.current

      if (k.w || k.ArrowUp)    moveAngle = facingRef.current
      if (k.s || k.ArrowDown)  moveAngle = facingRef.current + Math.PI
      if (k.a || k.ArrowLeft)  moveAngle = facingRef.current + Math.PI / 2
      if (k.d || k.ArrowRight) moveAngle = facingRef.current - Math.PI / 2

      // Diagonal
      if ((k.w || k.ArrowUp) && (k.a || k.ArrowLeft))
        moveAngle = facingRef.current + Math.PI / 4
      if ((k.w || k.ArrowUp) && (k.d || k.ArrowRight))
        moveAngle = facingRef.current - Math.PI / 4
      if ((k.s || k.ArrowDown) && (k.a || k.ArrowLeft))
        moveAngle = facingRef.current + (3 * Math.PI) / 4
      if ((k.s || k.ArrowDown) && (k.d || k.ArrowRight))
        moveAngle = facingRef.current - (3 * Math.PI) / 4

      // Move character
      groupRef.current.position.x += Math.sin(moveAngle) * WALK_SPEED
      groupRef.current.position.z += Math.cos(moveAngle) * WALK_SPEED

      // Clamp to boundaries
      groupRef.current.position.x = Math.max(
        -BOUND, Math.min(BOUND, groupRef.current.position.x)
      )
      groupRef.current.position.z = Math.max(
        -BOUND, Math.min(BOUND, groupRef.current.position.z)
      )

      // Lock to floor
      groupRef.current.position.y = FLOOR_Y

      // Face movement direction (smooth turn)
      targetYaw.current = moveAngle
    }

    // Smooth rotation toward target facing
    const currentY = groupRef.current.rotation.y
    const diff     = targetYaw.current - currentY

    // Shortest path rotation
    let delta = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI
    groupRef.current.rotation.y += delta * TURN_SPEED
    facingRef.current = groupRef.current.rotation.y

    // Send position to follow camera
    if (onPositionUpdate) {
      onPositionUpdate({
        position: groupRef.current.position.clone(),
        rotation: groupRef.current.rotation.y,
      })
    }

    // Sync external ref
    if (characterRef) {
      characterRef.current = groupRef.current
    }
  })

  if (!walkActive) return null

  return (
    <group
      ref={groupRef}
      position={[0, 0, 6]}   // start outside house
      rotation={[0, Math.PI, 0]}
      name="character"
    >
      <CharacterMesh />
    </group>
  )
}