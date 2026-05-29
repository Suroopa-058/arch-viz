import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useWalkthroughControls() {
  const keys   = useRef({
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowDown: false,
    ArrowLeft: false, ArrowRight: false,
  })
  const mouse  = useRef({ dx: 0, dy: 0 })
  const locked = useRef(false)
  const enabled = useRef(false)
  const yaw = useRef(Math.PI)  // face toward house on start
  const pitch  = useRef(0)

  const SPEED      = 0.055  // slightly faster so scene is visible
  const MOUSE_SENS = 0.0018
  const PITCH_LIM  = 0.75
  const FLOOR_Y    = 1.7
  const BOUND_X    = 13
  const BOUND_Z    = 15

  useEffect(() => {
    const down = (e) => {
      if (e.key in keys.current) keys.current[e.key] = true
      if (e.key === 'Escape') {
        enabled.current = false
        locked.current  = false
        document.exitPointerLock?.()
      }
    }
    const up = (e) => {
      if (e.key in keys.current) keys.current[e.key] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    const move = (e) => {
      if (!locked.current) return
      mouse.current.dx += e.movementX
      mouse.current.dy += e.movementY
    }
    const lockChange = () => {
      locked.current = document.pointerLockElement !== null
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('pointerlockchange', lockChange)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('pointerlockchange', lockChange)
    }
  }, [])

  const requestLock = (canvas) => {
    try { canvas?.requestPointerLock() } catch(e) {}
  }

  const update = (camera) => {
    if (!enabled.current) return

    yaw.current   -= mouse.current.dx * MOUSE_SENS
    pitch.current -= mouse.current.dy * MOUSE_SENS
    pitch.current  = Math.max(-PITCH_LIM, Math.min(PITCH_LIM, pitch.current))

    mouse.current.dx = 0
    mouse.current.dy = 0

    camera.rotation.order = 'YXZ'
    camera.rotation.y = yaw.current
    camera.rotation.x = pitch.current

    const fwd   = new THREE.Vector3()
    const right = new THREE.Vector3()
    camera.getWorldDirection(fwd)
    fwd.y = 0
    fwd.normalize()
    right.crossVectors(new THREE.Vector3(0, 1, 0), fwd).normalize()

    const k = keys.current
    if (k.w || k.ArrowUp)    camera.position.addScaledVector(fwd,   SPEED)
    if (k.s || k.ArrowDown)  camera.position.addScaledVector(fwd,  -SPEED)
    if (k.a || k.ArrowLeft)  camera.position.addScaledVector(right,  SPEED)
    if (k.d || k.ArrowRight) camera.position.addScaledVector(right, -SPEED)

    camera.position.y = FLOOR_Y
    camera.position.x = Math.max(-BOUND_X, Math.min(BOUND_X, camera.position.x))
    camera.position.z = Math.max(-BOUND_Z, Math.min(BOUND_Z, camera.position.z))
  }

  return { enabled, locked, yaw, pitch, update, requestLock }
}