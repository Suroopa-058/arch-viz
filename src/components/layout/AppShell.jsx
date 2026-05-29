import { Canvas }      from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense, useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import HouseScene       from '../canvas/HouseScene'
import Lighting         from '../canvas/Lighting'
import Ground           from '../canvas/Ground'
import HeroOverlay      from '../ui/HeroOverlay'
import FloatingControls from '../ui/FloatingControls'
import CinematicHUD     from '../ui/CinematicHUD'
import WalkthroughHUD   from '../ui/WalkthroughHUD'
import CameraRig        from '../canvas/CameraRig'
import WalkthroughRig   from '../canvas/WalkthroughRig'
import InteriorShell from '../canvas/interior/InteriorShell'
import CharacterController from '../canvas/character/CharacterController'
import FollowCamera        from '../canvas/character/FollowCamera'

function Loader() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#c8692a" wireframe />
    </mesh>
  )
}

export default function AppShell() {
  const [tourActive, setTourActive] = useState(false)
  const [walkActive, setWalkActive] = useState(false)
  const orbitRef = useRef()
  const characterState = useRef({ position: null, rotation: 0 })
  const playerPos = useRef({ position: null })
  const { closeWalkthrough } = useApp()  // add at top of AppShell
  
  return (
    <div style={{
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  background: '#ddd4c2',
}}>

      {/* ── Canvas fills entire screen always ──────── */}
      <Canvas
  shadows
  camera={{ position: [9, 5, 14], fov: 42, near: 0.1, far: 300 }}
  gl={{ antialias: true, alpha: false }}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
  }}
>
        <Suspense fallback={<Loader />}>

          <color attach="background" args={['#ddd4c2']} />
          <fog attach="fog" args={['#d8ccba', 35, 100]} />

          <Lighting />
          <Ground />
          <HouseScene walkActive={walkActive} />
          {/* Interior — only show during walkthrough */}
          {walkActive && <InteriorShell playerPos={playerPos} />}
          <Environment preset="dawn" background={false} />

          <CameraRig
            tourActive={tourActive}
            walkActive={walkActive}
            onTourEnd={() => setTourActive(false)}
            controlsRef={orbitRef}
          />

          <WalkthroughRig
            walkActive={walkActive}
            onWalkEnd={() => setWalkActive(false)}
            orbitControlsRef={orbitRef}
          />
          <CharacterController
  walkActive={walkActive}
  characterRef={null}
  onPositionUpdate={(state) => {
    characterState.current = state
    playerPos.current = state
  }}
/>

<FollowCamera
  walkActive={walkActive}
  characterState={characterState}
/>

        </Suspense>
      </Canvas>

      {/* ── UI overlays ─────────────────────────────── */}

      {!tourActive && !walkActive && (
        <HeroOverlay
          onStartTour={() => setTourActive(true)}
          onStartWalk={() => setWalkActive(true)}
        />
      )}

      <FloatingControls
        tourActive={tourActive}
        walkActive={walkActive}
        onStopTour={() => setTourActive(false)}
        onStopWalk={() => setWalkActive(false)}
      />

      {tourActive && (
        <CinematicHUD onStop={() => setTourActive(false)} />
      )}

      {walkActive && (
        <WalkthroughHUD onStop={() => setWalkActive(false)} />
      )}
      {/* Back to dashboard button */}
{!tourActive && !walkActive && (
  <button
    onClick={closeWalkthrough}
    style={{
      position: 'fixed',
      top: '1.4rem', left: '1.4rem',
      zIndex: 25,
      background: 'rgba(255,248,235,0.75)',
      border: '1px solid rgba(200,105,42,0.2)',
      borderRadius: 6,
      padding: '0.5rem 1rem',
      fontFamily: 'var(--font-label)',
      fontSize: '0.62rem', fontWeight: 600,
      letterSpacing: '0.15em', textTransform: 'uppercase',
      color: '#2c1a0e', cursor: 'pointer',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      transition: 'all 0.22s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(200,105,42,0.12)'
      e.currentTarget.style.borderColor = 'rgba(200,105,42,0.4)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,248,235,0.75)'
      e.currentTarget.style.borderColor = 'rgba(200,105,42,0.2)'
    }}
  >
    ← Dashboard
  </button>
)}
    {/* ── Back to dashboard ──────────────────────── */}
{!tourActive && !walkActive && (
  <button
    onClick={closeWalkthrough}
    style={{
      position:'fixed', top:'1.4rem', left:'1.4rem',
      zIndex:25,
      background:'rgba(255,248,235,0.82)',
      border:'1px solid rgba(200,105,42,0.2)',
      borderRadius:6, padding:'0.5rem 1rem',
      fontFamily:'var(--font-label)',
      fontSize:'0.62rem', fontWeight:600,
      letterSpacing:'0.15em', textTransform:'uppercase',
      color:'#2c1a0e', cursor:'pointer',
      backdropFilter:'blur(12px)',
      display:'flex', alignItems:'center', gap:'0.4rem',
      transition:'all 0.22s ease',
      boxShadow:'0 2px 12px rgba(180,120,60,0.1)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background='rgba(200,105,42,0.14)'
      e.currentTarget.style.borderColor='rgba(200,105,42,0.4)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background='rgba(255,248,235,0.82)'
      e.currentTarget.style.borderColor='rgba(200,105,42,0.2)'
    }}
  >← Dashboard</button>
)}

    </div>
  )
}