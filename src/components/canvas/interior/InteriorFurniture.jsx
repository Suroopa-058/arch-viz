// InteriorFurniture.jsx — premium low-poly modern Indian interior

const M = {
  sofa:        { color: '#7a6858', roughness: 0.88, metalness: 0.0  },
  sofaDark:    { color: '#5a4838', roughness: 0.85, metalness: 0.0  },
  cushionTerra:{ color: '#c8692a', roughness: 0.92, metalness: 0.0  },
  cushionCream:{ color: '#f0e8d8', roughness: 0.9,  metalness: 0.0  },
  teakDark:    { color: '#4e2e12', roughness: 0.55, metalness: 0.05 },
  teakMid:     { color: '#7a4e2d', roughness: 0.58, metalness: 0.04 },
  teakLight:   { color: '#9a6840', roughness: 0.6,  metalness: 0.03 },
  marble:      { color: '#e8e2d8', roughness: 0.32, metalness: 0.1  },
  granite:     { color: '#2a2420', roughness: 0.28, metalness: 0.15 },
  metalGold:   { color: '#c8a040', roughness: 0.18, metalness: 0.92 },
  metalDark:   { color: '#5a5450', roughness: 0.28, metalness: 0.75 },
  tvScreen:    { color: '#0a0a0e', roughness: 0.08, metalness: 0.4  },
  white:       { color: '#f5f2ec', roughness: 0.88, metalness: 0.0  },
  cream:       { color: '#f0e8d8', roughness: 0.9,  metalness: 0.0  },
  bedDark:     { color: '#3a2818', roughness: 0.7,  metalness: 0.05 },
  linen:       { color: '#e8ddd0', roughness: 0.92, metalness: 0.0  },
  plantGreen:  { color: '#2d6020', roughness: 0.88, metalness: 0.0  },
  terracotta:  { color: '#c8692a', roughness: 0.75, metalness: 0.0  },
  counterBase: { color: '#e0d8cc', roughness: 0.82, metalness: 0.0  },
  cabinetWood: { color: '#8a6848', roughness: 0.62, metalness: 0.02 },
  rugOrange:   { color: '#c86828', roughness: 0.95, metalness: 0.0  },
}

function B({ pos, size, m, rot = [0,0,0] }) {
  return (
    <mesh position={pos} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...m} />
    </mesh>
  )
}

// ── Leg helper ────────────────────────────────────────
function Leg({ pos, h = 0.12, w = 0.06 }) {
  return <B pos={pos} size={[w, h, w]} m={M.metalDark} />
}

// ── L-shaped sofa ─────────────────────────────────────
function LSofa({ position, rotation = [0,0,0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main section */}
      <B pos={[0, 0.22, 0]}       size={[2.4, 0.44, 0.9]}  m={M.sofa} />
      <B pos={[0, 0.68, -0.36]}   size={[2.4, 0.72, 0.18]} m={M.sofaDark} />
      <B pos={[-1.1, 0.55, 0]}    size={[0.18, 0.6, 0.9]}  m={M.sofaDark} />
      <B pos={[ 1.1, 0.55, 0]}    size={[0.18, 0.6, 0.9]}  m={M.sofaDark} />

      {/* Chaise section */}
      <B pos={[1.55, 0.22, 0.5]}  size={[0.9, 0.44, 1.9]}  m={M.sofa} />
      <B pos={[1.55, 0.55, 1.4]}  size={[0.9, 0.6, 0.18]}  m={M.sofaDark} />

      {/* Cushions — main */}
      <B pos={[-0.6, 0.5, 0.06]}  size={[1.0, 0.16, 0.78]} m={M.cushionTerra} />
      <B pos={[ 0.5, 0.5, 0.06]}  size={[1.0, 0.16, 0.78]} m={M.cushionCream} />

      {/* Back cushions */}
      <B pos={[-0.6, 0.78, -0.24]} size={[0.9, 0.4, 0.12]} m={M.cushionTerra} />
      <B pos={[ 0.5, 0.78, -0.24]} size={[0.9, 0.4, 0.12]} m={M.cushionCream} />

      {/* Chaise cushion */}
      <B pos={[1.55, 0.5, 0.5]}   size={[0.78, 0.16, 1.7]} m={M.cushionCream} />

      {/* Legs */}
      <Leg pos={[-0.95, 0.06, -0.35]} />
      <Leg pos={[ 0.95, 0.06, -0.35]} />
      <Leg pos={[-0.95, 0.06,  0.35]} />
      <Leg pos={[ 0.95, 0.06,  0.35]} />
      <Leg pos={[1.55, 0.06,  1.3]} />
    </group>
  )
}

// ── Coffee table ──────────────────────────────────────
function CoffeeTable({ position }) {
  return (
    <group position={position}>
      {/* Marble top */}
      <B pos={[0, 0.4, 0]}    size={[1.2, 0.06, 0.65]} m={M.marble} />
      {/* Teak shelf below */}
      <B pos={[0, 0.2, 0]}    size={[1.0, 0.04, 0.5]}  m={M.teakMid} />
      {/* Legs */}
      <Leg pos={[-0.52, 0.2, -0.26]} h={0.4} />
      <Leg pos={[ 0.52, 0.2, -0.26]} h={0.4} />
      <Leg pos={[-0.52, 0.2,  0.26]} h={0.4} />
      <Leg pos={[ 0.52, 0.2,  0.26]} h={0.4} />
    </group>
  )
}

// ── TV wall unit ──────────────────────────────────────
function TVUnit({ position, rotation = [0,0,0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Low cabinet */}
      <B pos={[0, 0.22, 0]}    size={[2.4, 0.44, 0.42]} m={M.teakDark} />
      <B pos={[0, 0.22, 0]}    size={[2.38, 0.42, 0.4]} m={M.teakMid} />
      {/* Cabinet doors */}
      <B pos={[-0.6, 0.22, 0.22]}  size={[1.0, 0.36, 0.02]}  m={M.teakLight} />
      <B pos={[ 0.6, 0.22, 0.22]}  size={[1.0, 0.36, 0.02]}  m={M.teakLight} />
      {/* Handles */}
      <B pos={[-0.16, 0.22, 0.23]} size={[0.06, 0.04, 0.02]} m={M.metalGold} />
      <B pos={[ 0.16, 0.22, 0.23]} size={[0.06, 0.04, 0.02]} m={M.metalGold} />
      {/* TV screen */}
      <B pos={[0, 1.1, 0.06]}  size={[1.9, 1.05, 0.06]} m={M.tvScreen} />
      {/* Bezel */}
      <B pos={[0, 1.1, 0.05]}  size={[1.96, 1.12, 0.04]} m={{ color:'#1a1a1a', roughness:0.3, metalness:0.3 }} />
    </group>
  )
}

// ── Rug ───────────────────────────────────────────────
function Rug({ position, size = [2.4, 1.6], rotation = [0,0,0] }) {
  return (
    <mesh position={position} rotation={[-Math.PI/2, 0, rotation[1]]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial {...M.rugOrange} />
    </mesh>
  )
}

// ── Dining set ────────────────────────────────────────
function DiningSet({ position }) {
  return (
    <group position={position}>
      {/* Table */}
      <B pos={[0, 0.76, 0]}    size={[1.8, 0.06, 0.95]} m={M.teakLight} />
      <B pos={[0, 0.4, -0.38]} size={[1.65, 0.8, 0.06]} m={M.teakMid} />
      <B pos={[0, 0.4,  0.38]} size={[1.65, 0.8, 0.06]} m={M.teakMid} />
      <B pos={[0, 0.04, 0]}    size={[1.6, 0.08, 0.88]} m={M.teakDark} />

      {/* Chairs */}
      {[[-0.65, 0, 0.72], [0.65, 0, 0.72]].map((p,i) => (
        <group key={i} position={p} rotation={[0, 0, 0]}>
          <B pos={[0, 0.44, 0]}    size={[0.42, 0.05, 0.42]} m={M.teakMid} />
          <B pos={[0, 0.75,-0.18]} size={[0.38, 0.55, 0.05]} m={M.teakDark} />
          <B pos={[0, 0.6, -0.12]} size={[0.35, 0.12, 0.04]} m={M.cushionCream} />
          <Leg pos={[-0.17, 0.22, -0.17]} h={0.44} w={0.05} />
          <Leg pos={[ 0.17, 0.22, -0.17]} h={0.44} w={0.05} />
          <Leg pos={[-0.17, 0.22,  0.17]} h={0.44} w={0.05} />
          <Leg pos={[ 0.17, 0.22,  0.17]} h={0.44} w={0.05} />
        </group>
      ))}
      {[[-0.65, 0,-0.72],[0.65, 0,-0.72]].map((p,i) => (
        <group key={i+2} position={p} rotation={[0, Math.PI, 0]}>
          <B pos={[0, 0.44, 0]}    size={[0.42, 0.05, 0.42]} m={M.teakMid} />
          <B pos={[0, 0.75,-0.18]} size={[0.38, 0.55, 0.05]} m={M.teakDark} />
          <B pos={[0, 0.6, -0.12]} size={[0.35, 0.12, 0.04]} m={M.cushionCream} />
          <Leg pos={[-0.17, 0.22, -0.17]} h={0.44} w={0.05} />
          <Leg pos={[ 0.17, 0.22, -0.17]} h={0.44} w={0.05} />
          <Leg pos={[-0.17, 0.22,  0.17]} h={0.44} w={0.05} />
          <Leg pos={[ 0.17, 0.22,  0.17]} h={0.44} w={0.05} />
        </group>
      ))}
    </group>
  )
}

// ── Kitchen counter ───────────────────────────────────
function Kitchen({ position }) {
  return (
    <group position={position}>
      {/* Base cabinets along back wall */}
      <B pos={[0, 0.46, 0]}     size={[3.0, 0.92, 0.62]} m={M.counterBase} />
      <B pos={[0, 0.46, 0]}     size={[2.96, 0.9, 0.6]}  m={M.cabinetWood} />
      {/* Granite countertop */}
      <B pos={[0, 0.95, 0.02]}  size={[3.0, 0.06, 0.66]} m={M.granite} />
      {/* Upper cabinets */}
      <B pos={[0, 1.75, -0.15]} size={[3.0, 0.7, 0.36]}  m={M.counterBase} />
      <B pos={[0, 1.75, -0.15]} size={[2.96, 0.68, 0.34]} m={M.cabinetWood} />
      {/* Cabinet lines */}
      <B pos={[-0.75, 0.46, 0.31]} size={[1.4, 0.85, 0.02]} m={M.counterBase} />
      <B pos={[ 0.75, 0.46, 0.31]} size={[1.4, 0.85, 0.02]} m={M.counterBase} />
      {/* Handles */}
      <B pos={[-0.75, 0.48, 0.32]} size={[0.06, 0.04, 0.02]} m={M.metalGold} />
      <B pos={[ 0.75, 0.48, 0.32]} size={[0.06, 0.04, 0.02]} m={M.metalGold} />
      {/* Sink */}
      <B pos={[1.0, 0.97, 0]}   size={[0.65, 0.05, 0.48]} m={{ color:'#b0b0a8', roughness:0.25, metalness:0.55 }} />
      {/* Tap */}
      <B pos={[1.0, 1.12, -0.18]} size={[0.04, 0.18, 0.04]} m={M.metalDark} />
      <B pos={[1.0, 1.2, -0.08]}  size={[0.22, 0.03, 0.03]} m={M.metalDark} />
    </group>
  )
}

// ── Staircase ─────────────────────────────────────────
function Staircase({ position }) {
  const steps = []
  const count = 12
  const stepH = 3.0 / count
  const stepD = 0.26

  for (let i = 0; i < count; i++) {
    steps.push(
      <B
        key={i}
        pos={[0, i * stepH + stepH/2, -(i * stepD)]}
        size={[1.9, stepH + 0.01, stepD + 0.02]}
        m={{ color: i % 2 === 0 ? '#c8b898' : '#b8a888', roughness:0.68, metalness:0 }}
      />
    )
  }

  return (
    <group position={position}>
      {steps}
      {/* Side stringer */}
      <B pos={[-0.94, 1.5, -1.5]} size={[0.08, 0.08, 3.4]} rot={[0.38,0,0]} m={M.teakDark} />
      <B pos={[ 0.94, 1.5, -1.5]} size={[0.08, 0.08, 3.4]} rot={[0.38,0,0]} m={M.teakDark} />
      {/* Handrail posts */}
      {[0,1,2,3,4,5].map(i => (
        <B key={i} pos={[-0.94, i*0.5+0.25, -(i*0.52)]} size={[0.05, 0.5, 0.05]} m={M.metalDark} />
      ))}
      {[0,1,2,3,4,5].map(i => (
        <B key={i+6} pos={[0.94, i*0.5+0.25, -(i*0.52)]} size={[0.05, 0.5, 0.05]} m={M.metalDark} />
      ))}
    </group>
  )
}

// ── Premium bed ───────────────────────────────────────
function Bed({ position, rotation = [0,0,0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <B pos={[0, 0.2, 0]}       size={[1.85, 0.4, 2.1]}  m={M.bedDark} />
      {/* Mattress */}
      <B pos={[0, 0.46, 0.05]}   size={[1.72, 0.24, 1.95]} m={M.linen} />
      {/* Duvet */}
      <B pos={[0, 0.62, 0.25]}   size={[1.68, 0.12, 1.55]} m={M.cream} />
      {/* Pillows */}
      <B pos={[-0.42, 0.65,-0.8]} size={[0.65, 0.14, 0.42]} m={{ color:'#fdf8f0', roughness:0.9, metalness:0 }} />
      <B pos={[ 0.42, 0.65,-0.8]} size={[0.65, 0.14, 0.42]} m={{ color:'#f5e8d8', roughness:0.9, metalness:0 }} />
      {/* Headboard */}
      <B pos={[0, 0.85, -1.02]}  size={[1.82, 0.9, 0.12]}  m={M.bedDark} />
      <B pos={[0, 0.85, -0.96]}  size={[1.65, 0.75, 0.06]} m={M.teakMid} />
      {/* Legs */}
      <Leg pos={[-0.82, 0.06,-0.95]} h={0.12} />
      <Leg pos={[ 0.82, 0.06,-0.95]} h={0.12} />
      <Leg pos={[-0.82, 0.06, 0.95]} h={0.12} />
      <Leg pos={[ 0.82, 0.06, 0.95]} h={0.12} />
      {/* Bedside table */}
      <B pos={[-1.15, 0.35, -0.6]} size={[0.45, 0.5, 0.45]} m={M.teakDark} />
      <B pos={[-1.15, 0.62, -0.6]} size={[0.46, 0.04, 0.46]} m={M.marble} />
    </group>
  )
}

// ── Indoor plant ──────────────────────────────────────
function Plant({ pos, scale = 1 }) {
  return (
    <group position={pos} scale={[scale,scale,scale]}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.42, 8]} />
        <meshStandardMaterial {...M.terracotta} />
      </mesh>
      <mesh position={[0, 0.62, 0]} castShadow>
        <sphereGeometry args={[0.28, 8, 6]} />
        <meshStandardMaterial {...M.plantGreen} />
      </mesh>
      <mesh position={[0.2, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshStandardMaterial color="#3a7530" roughness={0.85} />
      </mesh>
    </group>
  )
}

// ── Main export ───────────────────────────────────────
export default function InteriorFurniture() {
  return (
    <group name="furniture" position={[0,0,-1.5]}>

      {/* ══ LIVING ROOM ════════════════════════════ */}
      {/* Rug under sofa */}
      <Rug position={[-2.8, 0.015, 0.2]} size={[3.2, 2.0]} />
      {/* L-sofa against left-back corner */}
      <LSofa    position={[-3.5, 0, -1.0]} rotation={[0, Math.PI/2, 0]} />
      {/* Coffee table in front */}
      <CoffeeTable position={[-2.5, 0, 0.5]} />
      {/* TV on right wall of living */}
      <TVUnit   position={[-0.1, 0, -0.8]} rotation={[0, Math.PI/2, 0]} />
      {/* Plants */}
      <Plant pos={[-4.0, 0, -2.5]} scale={1.0} />
      <Plant pos={[-0.6, 0,  1.4]} scale={0.8} />

      {/* ══ KITCHEN + DINING ═══════════════════════ */}
      {/* Kitchen counter on back wall */}
      <Kitchen  position={[3.0, 0, -2.4]} />
      {/* Dining set */}
      <DiningSet position={[2.2, 0, 0.8]} />
      <Plant pos={[3.8, 0, 1.4]} scale={0.75} />

      {/* ══ STAIRCASE ══════════════════════════════ */}
      <Staircase position={[-1.2, 0, -1.8]} />

      {/* ══ MASTER BEDROOM ═════════════════════════ */}
      <Bed pos={[-2.8, 3.0, 0.4]} rotation={[0, 0, 0]} />
      <Plant pos={[-4.0, 3.0, -1.5]} scale={0.85} />

      {/* ══ BEDROOM 2 ══════════════════════════════ */}
      <Bed pos={[2.5, 3.0, 0.4]} rotation={[0, 0, 0]} />
      <Plant pos={[3.8, 3.0, -1.5]} scale={0.75} />

    </group>
  )
}