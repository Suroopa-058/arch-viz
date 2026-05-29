// InteriorFloors.jsx — premium flooring + walls + ceilings

const MAT = {
  // Entry — cream marble
  marble:      { color: '#ede8de', roughness: 0.35, metalness: 0.08 },
  marbleVein:  { color: '#d8d0c0', roughness: 0.4,  metalness: 0.05 },
  // Living — warm teak
  teakWarm:    { color: '#9a6040', roughness: 0.5,  metalness: 0.02 },
  // Bedroom — dark walnut
  walnut:      { color: '#5a3820', roughness: 0.48, metalness: 0.02 },
  // Kitchen — warm gray
  granite:     { color: '#9a9088', roughness: 0.42, metalness: 0.1  },
  // Bath — light tile
  bathTile:    { color: '#d8d4cc', roughness: 0.38, metalness: 0.08 },
  // Balcony — sandstone
  sandstone:   { color: '#c8b898', roughness: 0.78, metalness: 0.0  },
  // Stair — travertine
  travertine:  { color: '#c4b8a8', roughness: 0.65, metalness: 0.0  },

  // Walls — warm white plaster
  wallWarm:    { color: '#f2ece0', roughness: 0.88, metalness: 0.0  },
  wallAccent:  { color: '#e8dfd0', roughness: 0.85, metalness: 0.0  },
  wallDark:    { color: '#d8cfc0', roughness: 0.82, metalness: 0.0  },

  // Ceiling
  ceiling:     { color: '#f5f2ec', roughness: 0.92, metalness: 0.0  },

  // Skirting board
  skirting:    { color: '#e0d8c8', roughness: 0.7,  metalness: 0.0  },
}

function Floor({ pos, size, mat }) {
  return (
    <mesh position={pos} receiveShadow rotation={[-Math.PI/2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial {...mat} />
    </mesh>
  )
}

function Wall({ pos, size, rot = [0,0,0], mat }) {
  return (
    <mesh position={pos} rotation={rot} receiveShadow castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...(mat || MAT.wallWarm)} />
    </mesh>
  )
}

function Ceiling({ pos, size }) {
  return (
    <mesh position={pos} rotation={[Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial {...MAT.ceiling} />
    </mesh>
  )
}

function Skirting({ pos, size, rot = [0,0,0] }) {
  return (
    <mesh position={pos} rotation={rot} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...MAT.skirting} />
    </mesh>
  )
}

export default function InteriorFloors() {
  return (
    <group name="interior-structure" position={[0,0,-1.5]}>

      {/* ════════════════════════════════════════════ */}
      {/*  GROUND FLOOR                               */}
      {/* ════════════════════════════════════════════ */}

      {/* Entry hall — marble */}
      <Floor pos={[0, 0.02, 1.5]}       size={[3.2, 3.2]}  mat={MAT.marble} />

      {/* Living room — teak wood */}
      <Floor pos={[-2.8, 0.02, -0.5]}   size={[4.6, 4.2]}  mat={MAT.teakWarm} />

      {/* Kitchen + dining — granite */}
      <Floor pos={[2.5, 0.02, -0.5]}    size={[3.6, 4.2]}  mat={MAT.granite} />

      {/* Staircase — travertine */}
      <Floor pos={[-1.2, 0.02, -2.8]}   size={[2.0, 3.0]}  mat={MAT.travertine} />

      {/* Toilet GF — bath tile */}
      <Floor pos={[2.8, 0.02, -2.8]}    size={[2.0, 2.0]}  mat={MAT.bathTile} />

      {/* ── GF Walls ───────────────────────────────── */}

      {/* Back wall */}
      <Wall pos={[0,    1.5, -3.05]}    size={[8.2, 3.1, 0.14]} />
      {/* Left wall */}
      <Wall pos={[-4.05, 1.5, 0]}       size={[0.14, 3.1, 6.2]} />
      {/* Right wall */}
      <Wall pos={[4.05, 1.5, 0]}        size={[0.14, 3.1, 6.2]} />

      {/* Interior divider — living / kitchen */}
      <Wall pos={[0.75, 1.5, -1.2]}     size={[0.14, 3.1, 3.8]} mat={MAT.wallAccent} />

      {/* Skirting boards GF */}
      <Skirting pos={[0, 0.07, -2.98]}  size={[8.0, 0.14, 0.06]} />
      <Skirting pos={[-3.98, 0.07, 0]}  size={[0.06, 0.14, 6.0]} />
      <Skirting pos={[3.98, 0.07, 0]}   size={[0.06, 0.14, 6.0]} />

      {/* GF Ceiling */}
      <Ceiling pos={[0, 3.0, 0]}        size={[8.2, 6.2]} />

      {/* ════════════════════════════════════════════ */}
      {/*  FIRST FLOOR                                */}
      {/* ════════════════════════════════════════════ */}

      {/* Master bedroom — dark walnut */}
      <Floor pos={[-2.8, 3.02, 0]}      size={[4.6, 4.2]}  mat={MAT.walnut} />

      {/* Bedroom 2 — dark walnut */}
      <Floor pos={[2.5, 3.02, 0]}       size={[3.6, 4.2]}  mat={MAT.walnut} />

      {/* FF landing */}
      <Floor pos={[0, 3.02, -1.5]}      size={[3.2, 2.2]}  mat={MAT.marble} />

      {/* FF bathroom */}
      <Floor pos={[2.8, 3.02, -3.0]}    size={[2.0, 2.0]}  mat={MAT.bathTile} />

      {/* Balcony */}
      <Floor pos={[0, 3.02, 3.2]}       size={[5.2, 1.6]}  mat={MAT.sandstone} />

      {/* ── FF Walls ───────────────────────────────── */}
      <Wall pos={[0,    4.5, -3.05]}    size={[8.2, 3.1, 0.14]} />
      <Wall pos={[-4.05, 4.5, 0]}       size={[0.14, 3.1, 6.2]} />
      <Wall pos={[4.05, 4.5, 0]}        size={[0.14, 3.1, 6.2]} />
      <Wall pos={[0.75, 4.5, -1.2]}     size={[0.14, 3.1, 3.8]} mat={MAT.wallAccent} />

      {/* Skirting FF */}
      <Skirting pos={[0, 3.08, -2.98]}  size={[8.0, 0.14, 0.06]} />
      <Skirting pos={[-3.98, 3.08, 0]}  size={[0.06, 0.14, 6.0]} />
      <Skirting pos={[3.98, 3.08, 0]}   size={[0.06, 0.14, 6.0]} />

      {/* FF Ceiling */}
      <Ceiling pos={[0, 6.0, 0]}        size={[8.2, 6.2]} />

    </group>
  )
}