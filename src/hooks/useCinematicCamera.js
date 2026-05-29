// useCinematicCamera.js
// Manages all cinematic camera tour logic using GSAP

import { useRef, useState, useCallback } from 'react'
import { useThree, useFrame }            from '@react-three/fiber'
import gsap                              from 'gsap'

// ── Tour waypoints ────────────────────────────────────
// Each waypoint = a cinematic "shot" of the villa
const WAYPOINTS = [
  {
    name:     'Opening Wide',
    position: { x: 9,   y: 5,   z: 14  },
    target:   { x: 0,   y: 2,   z: 0   },
    duration: 2.5,
    ease:     'power2.inOut',
  },
  {
    name:     'Front Approach',
    position: { x: 0,   y: 3.5, z: 10  },
    target:   { x: 0,   y: 2.5, z: 0   },
    duration: 3.5,
    ease:     'power1.inOut',
  },
  {
    name:     'Door Close-up',
    position: { x: 0,   y: 2,   z: 6   },
    target:   { x: 0,   y: 1.5, z: 0   },
    duration: 3.0,
    ease:     'power2.inOut',
  },
  {
    name:     'Left Angle',
    position: { x: -8,  y: 4,   z: 8   },
    target:   { x: 0,   y: 2.5, z: 0   },
    duration: 3.5,
    ease:     'power1.inOut',
  },
  {
    name:     'Balcony Focus',
    position: { x: -4,  y: 5.5, z: 7   },
    target:   { x: 0,   y: 4,   z: 0   },
    duration: 3.0,
    ease:     'power2.inOut',
  },
  {
    name:     'Right Aerial',
    position: { x: 10,  y: 8,   z: 6   },
    target:   { x: 0,   y: 3,   z: 0   },
    duration: 3.5,
    ease:     'power1.inOut',
  },
  {
    name:     'Roof Overview',
    position: { x: 2,   y: 12,  z: 8   },
    target:   { x: 0,   y: 3,   z: 0   },
    duration: 3.0,
    ease:     'power2.inOut',
  },
  {
    name:     'Final Wide',
    position: { x: 9,   y: 5,   z: 14  },
    target:   { x: 0,   y: 2,   z: 0   },
    duration: 3.5,
    ease:     'power2.inOut',
  },
]

// ── Hook ─────────────────────────────────────────────
export function useCinematicCamera() {
  const { camera }        = useThree()
  const controlsRef       = useRef(null)
  const targetRef         = useRef({ x: 0, y: 2, z: 0 })  // orbit target
  const currentTween      = useRef(null)
  const waypointIndex     = useRef(0)
  const timeoutRef        = useRef(null)

  const [isPlaying,  setIsPlaying]  = useState(false)
  const [isPaused,   setIsPaused]   = useState(false)
  const [shotName,   setShotName]   = useState('')
  const [progress,   setProgress]   = useState(0) // 0–1

  // ── Animate camera to a position + target ──────────
  const animateTo = useCallback((waypoint, onComplete) => {
    // Kill any running tween
    if (currentTween.current) {
      currentTween.current.kill()
    }

    // Disable orbit controls during animation
    if (controlsRef.current) {
      controlsRef.current.enabled = false
    }

    setShotName(waypoint.name)

    const tl = gsap.timeline({ onComplete })

    // Animate camera position
    tl.to(camera.position, {
      x:        waypoint.position.x,
      y:        waypoint.position.y,
      z:        waypoint.position.z,
      duration: waypoint.duration,
      ease:     waypoint.ease,
    }, 0)

    // Animate orbit target simultaneously
    tl.to(targetRef.current, {
      x:        waypoint.target.x,
      y:        waypoint.target.y,
      z:        waypoint.target.z,
      duration: waypoint.duration,
      ease:     waypoint.ease,
    }, 0)

    currentTween.current = tl
  }, [camera])

  // ── Play next waypoint ──────────────────────────────
  const playNext = useCallback(() => {
    const idx      = waypointIndex.current
    const waypoint = WAYPOINTS[idx]

    // Update progress
    setProgress((idx + 1) / WAYPOINTS.length)

    animateTo(waypoint, () => {
      // Hold at this shot for 1.2s then move on
      timeoutRef.current = setTimeout(() => {
        const next = idx + 1

        if (next < WAYPOINTS.length) {
          waypointIndex.current = next
          playNext()
        } else {
          // Tour finished — reset
          waypointIndex.current = 0
          setIsPlaying(false)
          setIsPaused(false)
          setShotName('')
          setProgress(0)

          // Re-enable orbit controls
          if (controlsRef.current) {
            controlsRef.current.enabled    = true
            controlsRef.current.autoRotate = true
          }
        }
      }, 1200)
    })
  }, [animateTo])

  // ── Start tour ──────────────────────────────────────
  const startTour = useCallback(() => {
    // Disable auto-rotate
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false
    }

    waypointIndex.current = 0
    setIsPlaying(true)
    setIsPaused(false)
    setProgress(0)
    playNext()
  }, [playNext])

  // ── Stop tour ───────────────────────────────────────
  const stopTour = useCallback(() => {
    if (currentTween.current) currentTween.current.kill()
    if (timeoutRef.current)   clearTimeout(timeoutRef.current)

    waypointIndex.current = 0
    setIsPlaying(false)
    setIsPaused(false)
    setShotName('')
    setProgress(0)

    // Re-enable controls + auto-rotate
    if (controlsRef.current) {
      controlsRef.current.enabled    = true
      controlsRef.current.autoRotate = true
    }

    // Return to default view
    animateTo({
      name:     'Default',
      position: { x: 9, y: 5, z: 14 },
      target:   { x: 0, y: 2, z: 0  },
      duration: 2.0,
      ease:     'power2.inOut',
    }, () => {
      if (controlsRef.current) {
        controlsRef.current.enabled = true
      }
    })
  }, [animateTo])

  // ── useFrame — keep controls target synced ──────────
  // This runs every frame to apply the animated target
  useFrame(() => {
    if (controlsRef.current && isPlaying) {
      controlsRef.current.target.set(
        targetRef.current.x,
        targetRef.current.y,
        targetRef.current.z,
      )
      controlsRef.current.update()
    }
  })

  return {
    controlsRef,
    isPlaying,
    isPaused,
    shotName,
    progress,
    startTour,
    stopTour,
  }
}