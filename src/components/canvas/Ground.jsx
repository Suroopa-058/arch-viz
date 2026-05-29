// Ground.jsx — warm sandy ground with subtle grid

export default function Ground() {
  return (
    <>
      {/* ── Main ground plane ──────────────────────── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#c4b090"
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>

      {/* ── Immediate surround — darker patch ──────── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.001, 0]}
        receiveShadow
      >
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial
          color="#b8a47e"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>

      {/* ── Front yard — lighter patch ─────────────── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.002, 7]}
        receiveShadow
      >
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial
          color="#cabb95"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
    </>
  )
}