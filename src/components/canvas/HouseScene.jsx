import { useRef } from 'react'

const MAT = {
  wallMain:    { color: '#f2ede4', roughness: 0.75, metalness: 0.0  },
  wallAccent:  { color: '#e8ddd0', roughness: 0.8,  metalness: 0.0  },
  wallDark:    { color: '#c8bfb0', roughness: 0.7,  metalness: 0.0  },
  roofSlab:    { color: '#4a4540', roughness: 0.85, metalness: 0.05 },
  roofParapet: { color: '#58524c', roughness: 0.8,  metalness: 0.05 },
  roofTop:     { color: '#3d3835', roughness: 0.9,  metalness: 0.0  },
  stone:       { color: '#b8a898', roughness: 0.9,  metalness: 0.0  },
  stoneDark:   { color: '#9a8878', roughness: 0.85, metalness: 0.0  },
  teakLight:   { color: '#8b5e3c', roughness: 0.6,  metalness: 0.05 },
  teakDark:    { color: '#6b4428', roughness: 0.55, metalness: 0.05 },
  metalBrass:  { color: '#c8a040', roughness: 0.2,  metalness: 0.9  },
  metalDark:   { color: '#4a4540', roughness: 0.3,  metalness: 0.7  },
  glass:       { color: '#a8c8d8', roughness: 0.05, metalness: 0.15, transparent: true, opacity: 0.45 },
  glassDark:   { color: '#7090a8', roughness: 0.05, metalness: 0.2,  transparent: true, opacity: 0.5  },
  glassWarm:   { color: '#f0d898', roughness: 0.05, metalness: 0.1,  transparent: true, opacity: 0.5  },
  concrete:    { color: '#d4c8b8', roughness: 0.95, metalness: 0.0  },
  driveway:    { color: '#b8aa98', roughness: 1.0,  metalness: 0.0  },
  treeTrunk:   { color: '#5a3820', roughness: 0.95, metalness: 0.0  },
  treeLeaf1:   { color: '#2d5a28', roughness: 0.85, metalness: 0.0  },
  treeLeaf2:   { color: '#3a6e34', roughness: 0.8,  metalness: 0.0  },
  treeLeaf3:   { color: '#487840', roughness: 0.8,  metalness: 0.0  },
}

// ── Reusable Box ─────────────────────────────────────
function Box({ position, size, mat, castShadow = true, receiveShadow = true, rotation = [0,0,0] }) {
  return (
    <mesh position={position} castShadow={castShadow} receiveShadow={receiveShadow} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial {...mat} />
    </mesh>
  )
}

// ── Window ───────────────────────────────────────────
function Window({ position, rotation = [0,0,0], size = 'normal' }) {
  const w = size === 'wide' ? 1.6 : 1.1
  const h = size === 'tall' ? 1.8 : 1.1
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0,0,0]}    size={[w+0.14, h+0.14, 0.08]} mat={MAT.roofSlab} />
      <Box position={[0,0,0.02]} size={[w+0.04, h+0.04, 0.06]} mat={MAT.wallMain} />
      <mesh position={[0,0,0.06]}>
        <boxGeometry args={[w-0.08, h-0.08, 0.03]} />
        <meshStandardMaterial {...MAT.glass} />
      </mesh>
      <Box position={[0,0,0.08]} size={[w-0.1, 0.05, 0.025]} mat={MAT.roofSlab} />
      <Box position={[0,0,0.08]} size={[0.05, h-0.1, 0.025]} mat={MAT.roofSlab} />
    </group>
  )
}

// ── Door ─────────────────────────────────────────────
function Door({ position, open = false }) {
  return (
    <group position={position}>
      {/* Stone surround */}
      <Box pos={[0,0,-0.02]} position={[0,0,-0.02]} size={[1.7,2.7,0.12]} mat={MAT.stone} />
      {/* Teak frame */}
      <Box position={[0,0,0.06]} size={[1.45,2.5,0.08]} mat={MAT.teakDark} />

      {open ? (
        <>
          {/* Left door — swung open */}
          <group position={[-0.36, 0, 0.1]} rotation={[0, -Math.PI/2, 0]}>
            <Box position={[0,0,0]}      size={[0.55,2.1,0.06]} mat={MAT.teakLight} />
            <Box position={[0,0.5,0.06]} size={[0.42,0.8,0.04]} mat={MAT.teakDark} />
          </group>
          {/* Right door — swung open */}
          <group position={[0.36, 0, 0.1]} rotation={[0, Math.PI/2, 0]}>
            <Box position={[0,0,0]}      size={[0.55,2.1,0.06]} mat={MAT.teakLight} />
            <Box position={[0,0.5,0.06]} size={[0.42,0.8,0.04]} mat={MAT.teakDark} />
          </group>
        </>
      ) : (
        <>
          {/* Left door closed */}
          <Box position={[-0.36,0,0.12]}    size={[0.55,2.1,0.06]} mat={MAT.teakLight} />
          <Box position={[-0.36,0.5,0.17]}  size={[0.42,0.8,0.04]} mat={MAT.teakDark} />
          {/* Right door closed */}
          <Box position={[0.36,0,0.12]}     size={[0.55,2.1,0.06]} mat={MAT.teakLight} />
          <Box position={[0.36,0.5,0.17]}   size={[0.42,0.8,0.04]} mat={MAT.teakDark} />
          {/* Brass handles */}
          <mesh position={[-0.08,0,0.2]}>
            <cylinderGeometry args={[0.022,0.022,0.28,8]} />
            <meshStandardMaterial {...MAT.metalBrass} />
          </mesh>
          <mesh position={[0.08,0,0.2]}>
            <cylinderGeometry args={[0.022,0.022,0.28,8]} />
            <meshStandardMaterial {...MAT.metalBrass} />
          </mesh>
        </>
      )}

      {/* Transom glass */}
      <mesh position={[0,1.42,0.1]}>
        <boxGeometry args={[1.3,0.45,0.03]} />
        <meshStandardMaterial {...MAT.glassWarm} />
      </mesh>
    </group>
  )
}

// ── Pillar ───────────────────────────────────────────
function Pillar({ position, height = 3.2 }) {
  return (
    <group position={position}>
      <Box position={[0,0.12,0]}          size={[0.4,0.24,0.4]}     mat={MAT.stoneDark} />
      <Box position={[0,height/2+0.24,0]} size={[0.28,height,0.28]} mat={MAT.wallMain}  />
      <Box position={[0,height+0.36,0]}   size={[0.4,0.24,0.4]}     mat={MAT.stoneDark} />
    </group>
  )
}

// ── Railing ───────────────────────────────────────────
function Railing({ startX, endX, y, z, depth = 0.06 }) {
  const posts = []
  for (let x = startX; x <= endX + 0.01; x += 0.55) {
    posts.push(
      <Box key={x.toFixed(2)} position={[x, y+0.45, z]} size={[0.06,0.9,depth]} mat={MAT.roofSlab} />
    )
  }
  return (
    <group>
      {posts}
      <Box position={[(startX+endX)/2, y+0.06, z]} size={[endX-startX+0.06, 0.1, depth]} mat={MAT.roofSlab} />
      <Box position={[(startX+endX)/2, y+0.92, z]} size={[endX-startX+0.06, 0.1, depth]} mat={MAT.roofSlab} />
    </group>
  )
}

// ── Ground Floor ──────────────────────────────────────
function GroundFloor({ doorOpen = false }) {
  return (
    <group>
      <Box position={[0,1.5,0]}       size={[8,3,6]}       mat={MAT.wallMain} />
      <Box position={[0,0.4,3.02]}    size={[8,0.8,0.08]}  mat={MAT.wallDark} />
      <Box position={[0,3.02,3.02]}   size={[8,0.06,0.06]} mat={MAT.roofSlab} />

      {/* Door — open during walkthrough */}
      <Door position={[0,1.35,2.82]} open={doorOpen} />

      <Window position={[-2.6,1.9,3.07]} />
      <Window position={[ 2.6,1.9,3.07]} />
      <Window position={[-4.04,1.9, 0.5]} rotation={[0,Math.PI/2,0]} />
      <Window position={[ 4.04,1.9, 0.5]} rotation={[0,Math.PI/2,0]} />
      <Window position={[-4.04,1.9,-1.5]} rotation={[0,Math.PI/2,0]} />
      <Window position={[ 4.04,1.9,-1.5]} rotation={[0,Math.PI/2,0]} />

      <Pillar position={[-3.4,0,3.18]} height={3.0} />
      <Pillar position={[ 3.4,0,3.18]} height={3.0} />

      <Box position={[0,0.12,0]}    size={[8.5,0.24,6.5]}  mat={MAT.stoneDark} />
      <Box position={[0,0.14,3.9]}  size={[2.8,0.2,0.65]}  mat={MAT.stone} />
      <Box position={[0,0.28,4.45]} size={[2.4,0.18,0.55]} mat={MAT.stoneDark} />
      <Box position={[0,3.08,3.65]} size={[4.8,0.18,2.0]}  mat={MAT.roofSlab} />
      <Box position={[0,3.0,4.64]}  size={[4.8,0.12,0.08]} mat={MAT.teakDark} />
    </group>
  )
}

// ── First Floor ───────────────────────────────────────
function FirstFloor() {
  return (
    <group position={[0,3,0]}>
      <Box position={[0,1.5,0]}     size={[8,3,6]}      mat={{ ...MAT.wallMain, color: '#f5f0e8' }} />
      <Box position={[0,0.04,3.02]} size={[8,0.1,0.06]} mat={MAT.roofSlab} />

      <Window position={[-2.6,1.8,3.07]} size="normal" />
      <Window position={[ 0,  1.8,3.07]} size="normal" />
      <Window position={[ 2.6,1.8,3.07]} size="normal" />
      <Window position={[-4.04,1.8, 0.5]}  rotation={[0,Math.PI/2,0]} />
      <Window position={[ 4.04,1.8, 0.5]}  rotation={[0,Math.PI/2,0]} />
      <Window position={[-4.04,1.8,-1.5]}  rotation={[0,Math.PI/2,0]} />
      <Window position={[ 4.04,1.8,-1.5]}  rotation={[0,Math.PI/2,0]} />

      <Box position={[0,0.1,3.65]}      size={[5.2,0.18,1.6]}  mat={MAT.roofSlab} />
      <Box position={[0,0.0,3.65]}      size={[5.2,0.06,1.6]}  mat={MAT.roofTop} />
      <Railing startX={-2.5} endX={2.5} y={0.1} z={4.42} />
      <Box position={[-2.56,0.55,3.72]} size={[0.08,0.9,1.42]} mat={MAT.roofSlab} />
      <Box position={[ 2.56,0.55,3.72]} size={[0.08,0.9,1.42]} mat={MAT.roofSlab} />
      <Box position={[0,0.2,3.65]}      size={[5.0,0.04,1.5]}  mat={MAT.teakLight} />
    </group>
  )
}

// ── Roof ──────────────────────────────────────────────
function Roof() {
  return (
    <group position={[0,6,0]}>
      <Box position={[0,0.18,0]}       size={[8.6,0.36,6.6]}  mat={MAT.roofSlab} />
      <Box position={[0,0.72,3.3]}     size={[8.6,0.72,0.22]} mat={MAT.roofParapet} />
      <Box position={[0,0.72,-3.3]}    size={[8.6,0.72,0.22]} mat={MAT.roofParapet} />
      <Box position={[-4.3,0.72,0]}    size={[0.22,0.72,6.6]} mat={MAT.roofParapet} />
      <Box position={[ 4.3,0.72,0]}    size={[0.22,0.72,6.6]} mat={MAT.roofParapet} />
      <Box position={[0,1.1,3.3]}      size={[8.7,0.1,0.28]}  mat={MAT.stoneDark} />
      <Box position={[0,1.1,-3.3]}     size={[8.7,0.1,0.28]}  mat={MAT.stoneDark} />
      <Box position={[-4.3,1.1,0]}     size={[0.28,0.1,6.7]}  mat={MAT.stoneDark} />
      <Box position={[ 4.3,1.1,0]}     size={[0.28,0.1,6.7]}  mat={MAT.stoneDark} />
      <Box position={[2.5,1.5,-1.5]}   size={[1.6,1.4,1.6]}   mat={MAT.wallDark} />
      <Box position={[2.5,2.25,-1.5]}  size={[1.7,0.18,1.7]}  mat={MAT.roofSlab} />
      <Box position={[-2.5,1.1,-1.5]}  size={[2.1,2.0,2.1]}   mat={MAT.wallMain} />
      <Box position={[-2.5,2.14,-1.5]} size={[2.2,0.16,2.2]}  mat={MAT.roofSlab} />
      <Box position={[-1.0,1.4,0.5]}   size={[0.1,0.1,4.0]}   mat={MAT.teakDark} />
      <Box position={[ 0.0,1.4,0.5]}   size={[0.1,0.1,4.0]}   mat={MAT.teakDark} />
      <Box position={[ 1.0,1.4,0.5]}   size={[0.1,0.1,4.0]}   mat={MAT.teakDark} />
    </group>
  )
}

// ── Compound Wall ─────────────────────────────────────
function CompoundWall() {
  return (
    <group>
      <Box position={[-5.6,0.55,5.6]}  size={[3.2,1.1,0.22]}  mat={MAT.stone} />
      <Box position={[ 5.6,0.55,5.6]}  size={[3.2,1.1,0.22]}  mat={MAT.stone} />
      <Box position={[-5.6,1.15,5.6]}  size={[3.2,0.1,0.28]}  mat={MAT.roofSlab} />
      <Box position={[ 5.6,1.15,5.6]}  size={[3.2,0.1,0.28]}  mat={MAT.roofSlab} />
      <Box position={[-1.3,1.0,5.6]}   size={[0.28,2.0,0.28]} mat={MAT.roofParapet} />
      <Box position={[ 1.3,1.0,5.6]}   size={[0.28,2.0,0.28]} mat={MAT.roofParapet} />
      <Box position={[-1.3,2.1,5.6]}   size={[0.36,0.14,0.36]} mat={MAT.stoneDark} />
      <Box position={[ 1.3,2.1,5.6]}   size={[0.36,0.14,0.36]} mat={MAT.stoneDark} />
      <Box position={[-2.1,0.85,5.35]} size={[1.5,1.5,0.07]}  mat={MAT.teakDark} />
      <Box position={[ 2.1,0.85,5.35]} size={[1.5,1.5,0.07]}  mat={MAT.teakDark} />
      <Box position={[-2.1,1.3,5.38]}  size={[1.45,0.06,0.04]} mat={MAT.teakLight} />
      <Box position={[ 2.1,1.3,5.38]}  size={[1.45,0.06,0.04]} mat={MAT.teakLight} />
      <Box position={[-2.1,0.5,5.38]}  size={[1.45,0.06,0.04]} mat={MAT.teakLight} />
      <Box position={[ 2.1,0.5,5.38]}  size={[1.45,0.06,0.04]} mat={MAT.teakLight} />
      <Box position={[0,0.01,7.5]}     size={[2.4,0.04,4.5]}  mat={MAT.driveway}  castShadow={false} />
      <Box position={[-1.22,0.02,7.5]} size={[0.06,0.04,4.5]} mat={MAT.stoneDark} castShadow={false} />
      <Box position={[ 1.22,0.02,7.5]} size={[0.06,0.04,4.5]} mat={MAT.stoneDark} castShadow={false} />
    </group>
  )
}

// ── Tree ──────────────────────────────────────────────
function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={[scale,scale,scale]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1,0.16,2.0,8]} />
        <meshStandardMaterial {...MAT.treeTrunk} />
      </mesh>
      <mesh position={[0,2.2,0]} castShadow>
        <coneGeometry args={[0.95,2.0,8]} />
        <meshStandardMaterial {...MAT.treeLeaf1} />
      </mesh>
      <mesh position={[0,3.0,0]} castShadow>
        <coneGeometry args={[0.68,1.7,8]} />
        <meshStandardMaterial {...MAT.treeLeaf2} />
      </mesh>
      <mesh position={[0,3.7,0]} castShadow>
        <coneGeometry args={[0.4,1.3,8]} />
        <meshStandardMaterial {...MAT.treeLeaf3} />
      </mesh>
    </group>
  )
}

// ── Shrub ─────────────────────────────────────────────
function Shrub({ position }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.4,8,6]} />
      <meshStandardMaterial color="#3a6e34" roughness={0.9} />
    </mesh>
  )
}

// ── Main Export ───────────────────────────────────────
export default function HouseScene({ walkActive = false }) {
  const groupRef = useRef()
  return (
    <group ref={groupRef} position={[0,0,-1.5]}>
      <GroundFloor doorOpen={walkActive} />
      <FirstFloor />
      <Roof />
      <CompoundWall />
      <Tree position={[-6.8,1.0, 1.5]} scale={1.0} />
      <Tree position={[ 6.8,1.0, 1.5]} scale={0.9} />
      <Tree position={[-6.2,1.0,-2.5]} scale={0.8} />
      <Shrub position={[-1.8,0.4,4.8]} />
      <Shrub position={[ 1.8,0.4,4.8]} />
      <Shrub position={[-2.4,0.4,4.5]} />
      <Shrub position={[ 2.4,0.4,4.5]} />
    </group>
  )
}