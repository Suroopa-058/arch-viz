// FollowCamera.jsx — premium over-shoulder cinematic camera

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MIN_DIST   = 1.8
const MAX_DIST   = 9.0
const ZOOM_SPEED = 0.4
const CAM_LERP   = 0.055   // lower = more cinematic lag

export default function FollowCamera({ walkActive, characterState }) {
  const { camera, gl } = useThree()

  const smoothPos    = useRef(new THREE.Vector3(0, 3, 10))
  const smoothLook   = useRef(new THREE.Vector3(0, 1.2, 0))
  const targetDist   = useRef(4.2)
  const camDist      = useRef(4.2)

  // ── Vertical angle (fixed slightly downward) ──────
  const CAM_HEIGHT   = 2.0    // height above character
  const LOOK_HEIGHT  = 1.0    // look at mid-chest

  // ── Slight right offset for over-shoulder feel ────
  const CAM_OFFSET_X = 0.35

  // ── Mouse wheel zoom ──────────────────────────────
  useEffect(() => {
    const onWheel = (e) => {
      if (!walkActive) return
      e.preventDefault()
      targetDist.current = Math.max(
        MIN_DIST,
        Math.min(MAX_DIST, targetDist.current + e.deltaY * 0.008 * ZOOM_SPEED)
      )
    }
    gl.domElement.addEventListener('wheel', onWheel, { passive: false })
    return () => gl.domElement.removeEventListener('wheel', onWheel)
  }, [walkActive, gl])

  useFrame(() => {
    if (!walkActive || !characterState.current?.position) return

    const { position, rotation } = characterState.current

    // Smooth zoom
    camDist.current += (targetDist.current - camDist.current) * 0.07

    // Camera sits behind + right + above character
    const sinR = Math.sin(rotation)
    const cosR = Math.cos(rotation)

    // Behind position
    const behindX = position.x - sinR * camDist.current
    const behindZ = position.z - cosR * camDist.current

    // Right offset (perpendicular to facing)
    const rightX = cosR * CAM_OFFSET_X
    const rightZ = -sinR * CAM_OFFSET_X

    const idealPos = new THREE.Vector3(
      behindX + rightX,
      position.y + CAM_HEIGHT,
      behindZ + rightZ,
    )

    // Smooth camera position
    smoothPos.current.lerp(idealPos, CAM_LERP)

    // Look slightly ahead of character
    const lookAheadX = position.x + sinR * 0.5
    const lookAheadZ = position.z + cosR * 0.5

    smoothLook.current.lerp(
      new THREE.Vector3(lookAheadX, position.y + LOOK_HEIGHT, lookAheadZ),
      CAM_LERP * 2.0
    )

    camera.position.copy(smoothPos.current)
    camera.lookAt(smoothLook.current)
  })

  return null
}