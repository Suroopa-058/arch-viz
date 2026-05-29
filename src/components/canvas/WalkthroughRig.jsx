import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useWalkthroughControls } from '../../hooks/useWalkthroughControls'

export default function WalkthroughRig({
  walkActive,
  onWalkEnd,
  orbitControlsRef,
}) {
  const { camera, gl } = useThree()
  const transitioning  = useRef(false)
  const {
    enabled, locked, yaw, pitch, update, requestLock,
  } = useWalkthroughControls()

  useEffect(() => {
    if (walkActive) {
      enterWalkthrough()
    } else {
      exitWalkthrough()
    }
  }, [walkActive])

  const enterWalkthrough = () => {
    if (transitioning.current) return
    transitioning.current = true

    if (orbitControlsRef?.current) {
      orbitControlsRef.current.enabled    = false
      orbitControlsRef.current.autoRotate = false
    }

    // Phase 1 — glide to door
    gsap.to(camera.position, {
      x: 0, y: 1.7, z: 4.5,
      duration: 1.8,
      ease: 'power2.in',
      onComplete: () => {
        // Phase 2 — push through door into entry hall
        gsap.to(camera.position, {
          x: 0, y: 1.7, z: 1.5,
          duration: 1.2,
          ease: 'power1.out',
          onComplete: () => {
            camera.rotation.order = 'YXZ'
            camera.rotation.set(0, Math.PI, 0)
            yaw.current   = Math.PI
            pitch.current = 0
            transitioning.current = false
            enabled.current = true
            requestLock(gl.domElement)
          }
        })
      }
    })

    // Keep camera level throughout
    gsap.to(camera.rotation, {
      x: 0, y: Math.PI, z: 0,
      duration: 3.0,
      ease: 'power2.inOut',
    })
  }

  const exitWalkthrough = () => {
    enabled.current       = false
    locked.current        = false
    transitioning.current = false
    document.exitPointerLock?.()

    gsap.to(camera.position, {
      x: 9, y: 5, z: 14,
      duration: 2.2,
      ease: 'power2.inOut',
      onComplete: () => {
        if (orbitControlsRef?.current) {
          orbitControlsRef.current.enabled    = true
          orbitControlsRef.current.autoRotate = true
        }
        onWalkEnd?.()
      }
    })

    gsap.to(camera.rotation, {
      x: -0.2, y: 0.55, z: 0,
      duration: 2.2,
      ease: 'power2.inOut',
    })
  }

  // ESC detection
  useEffect(() => {
    const check = setInterval(() => {
      if (walkActive && !enabled.current && !transitioning.current) {
        onWalkEnd?.()
      }
    }, 200)
    return () => clearInterval(check)
  }, [walkActive])

  // Click to re-lock
  useEffect(() => {
    const onClick = () => {
      if (walkActive && enabled.current && !locked.current) {
        requestLock(gl.domElement)
      }
    }
    gl.domElement.addEventListener('click', onClick)
    return () => gl.domElement.removeEventListener('click', onClick)
  }, [walkActive])

  useFrame(() => {
    if (!walkActive || transitioning.current) return
    update(camera)
  })

  return null
}