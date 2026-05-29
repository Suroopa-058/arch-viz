import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls }      from '@react-three/drei'
import gsap                   from 'gsap'

const WAYPOINTS = [
  { name: 'Opening Wide',   pos: [9,  5,   14], target: [0, 2,   0], duration: 2.5, hold: 1000 },
  { name: 'Front Approach', pos: [0,  3.5, 10], target: [0, 2,   0], duration: 3.5, hold: 1200 },
  { name: 'Entry Close-up', pos: [0,  2,   6 ], target: [0, 1.5, 0], duration: 3.0, hold: 1500 },
  { name: 'Left Flank',     pos: [-9, 4,   7 ], target: [0, 2.5, 0], duration: 3.5, hold: 1000 },
  { name: 'Balcony Focus',  pos: [-4, 5.5, 7 ], target: [0, 4,   0], duration: 3.0, hold: 1500 },
  { name: 'Right Aerial',   pos: [10, 8,   5 ], target: [0, 3,   0], duration: 3.5, hold: 1000 },
  { name: 'Roof Overview',  pos: [2,  12,  8 ], target: [0, 3,   0], duration: 3.0, hold: 1200 },
  { name: 'Cinematic Exit', pos: [9,  5,   14], target: [0, 2,   0], duration: 3.5, hold: 500  },
]

export default function CameraRig({
  tourActive,
  walkActive,
  onTourEnd,
  controlsRef: externalRef,
}) {
  const { camera }  = useThree()
  const internalRef = useRef()
  const controlsRef = externalRef || internalRef
  const orbitTarget = useRef({ x: 0, y: 2, z: 0 })
  const tweenRef    = useRef(null)
  const timerRef    = useRef(null)
  const running     = useRef(false)

  const killAll = () => {
    if (tweenRef.current) tweenRef.current.kill()
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const goTo = (wp, onDone) => {
    killAll()
    if (controlsRef.current) controlsRef.current.enabled = false

    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(camera.position, {
      x: wp.pos[0], y: wp.pos[1], z: wp.pos[2],
      duration: wp.duration,
      ease: 'power2.inOut',
    }, 0)
    tl.to(orbitTarget.current, {
      x: wp.target[0], y: wp.target[1], z: wp.target[2],
      duration: wp.duration,
      ease: 'power2.inOut',
    }, 0)
    tweenRef.current = tl
  }

  const playFrom = (idx) => {
    if (!running.current) return
    if (idx >= WAYPOINTS.length) {
      running.current = false
      if (controlsRef.current) {
        controlsRef.current.enabled    = true
        controlsRef.current.autoRotate = true
      }
      onTourEnd()
      return
    }
    const wp = WAYPOINTS[idx]
    goTo(wp, () => {
      timerRef.current = setTimeout(() => playFrom(idx + 1), wp.hold)
    })
  }

  useEffect(() => {
    if (tourActive) {
      running.current = true
      if (controlsRef.current) controlsRef.current.autoRotate = false
      playFrom(0)
    } else {
      running.current = false
      killAll()
      if (!walkActive) {
        goTo(
          { pos: [9, 5, 14], target: [0, 2, 0], duration: 2.0 },
          () => {
            if (controlsRef.current) {
              controlsRef.current.enabled    = true
              controlsRef.current.autoRotate = true
            }
          }
        )
      }
    }
    return killAll
  }, [tourActive])

  useFrame(() => {
    if (controlsRef.current && !walkActive) {
      controlsRef.current.target.set(
        orbitTarget.current.x,
        orbitTarget.current.y,
        orbitTarget.current.z,
      )
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={!tourActive && !walkActive}
      enableZoom={!tourActive && !walkActive}
      enableRotate={!tourActive && !walkActive}
      minDistance={4}
      maxDistance={35}
      maxPolarAngle={Math.PI / 2.08}
      target={[0, 2, 0]}
      autoRotate={!tourActive && !walkActive}
      autoRotateSpeed={0.35}
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}