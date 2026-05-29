// CharacterMesh.jsx
// Simple low-poly human figure — minimal and architectural

export default function CharacterMesh() {
  return (
    <group name="character-mesh">

      {/* ── Head ──────────────────────────────────── */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <boxGeometry args={[0.22, 0.25, 0.22]} />
        <meshStandardMaterial
          color="#d4a882"
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>

      {/* ── Neck ──────────────────────────────────── */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.1, 0.12, 0.1]} />
        <meshStandardMaterial color="#c8a078" roughness={0.8} />
      </mesh>

      {/* ── Torso ─────────────────────────────────── */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.35, 0.45, 0.18]} />
        <meshStandardMaterial
          color="#c8692a"   // terracotta shirt — IllamViz brand
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>

      {/* ── Left upper arm ────────────────────────── */}
      <mesh position={[-0.22, 1.22, 0]} castShadow>
        <boxGeometry args={[0.1, 0.28, 0.1]} />
        <meshStandardMaterial color="#c8692a" roughness={0.85} />
      </mesh>

      {/* ── Right upper arm ───────────────────────── */}
      <mesh position={[0.22, 1.22, 0]} castShadow>
        <boxGeometry args={[0.1, 0.28, 0.1]} />
        <meshStandardMaterial color="#c8692a" roughness={0.85} />
      </mesh>

      {/* ── Left forearm ──────────────────────────── */}
      <mesh position={[-0.22, 0.98, 0]} castShadow>
        <boxGeometry args={[0.09, 0.24, 0.09]} />
        <meshStandardMaterial color="#d4a882" roughness={0.8} />
      </mesh>

      {/* ── Right forearm ─────────────────────────── */}
      <mesh position={[0.22, 0.98, 0]} castShadow>
        <boxGeometry args={[0.09, 0.24, 0.09]} />
        <meshStandardMaterial color="#d4a882" roughness={0.8} />
      </mesh>

      {/* ── Waist / belt ──────────────────────────── */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <boxGeometry args={[0.36, 0.08, 0.19]} />
        <meshStandardMaterial
          color="#4a3020"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* ── Left thigh ────────────────────────────── */}
      <mesh position={[-0.1, 0.68, 0]} castShadow>
        <boxGeometry args={[0.13, 0.32, 0.14]} />
        <meshStandardMaterial
          color="#3d3028"   // dark trousers
          roughness={0.85}
        />
      </mesh>

      {/* ── Right thigh ───────────────────────────── */}
      <mesh position={[0.1, 0.68, 0]} castShadow>
        <boxGeometry args={[0.13, 0.32, 0.14]} />
        <meshStandardMaterial color="#3d3028" roughness={0.85} />
      </mesh>

      {/* ── Left shin ─────────────────────────────── */}
      <mesh position={[-0.1, 0.38, 0]} castShadow>
        <boxGeometry args={[0.11, 0.3, 0.12]} />
        <meshStandardMaterial color="#3d3028" roughness={0.85} />
      </mesh>

      {/* ── Right shin ────────────────────────────── */}
      <mesh position={[0.1, 0.38, 0]} castShadow>
        <boxGeometry args={[0.11, 0.3, 0.12]} />
        <meshStandardMaterial color="#3d3028" roughness={0.85} />
      </mesh>

      {/* ── Left foot ─────────────────────────────── */}
      <mesh position={[-0.1, 0.06, 0.04]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.22]} />
        <meshStandardMaterial
          color="#2a2018"   // dark shoes
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* ── Right foot ────────────────────────────── */}
      <mesh position={[0.1, 0.06, 0.04]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.22]} />
        <meshStandardMaterial color="#2a2018" roughness={0.7} metalness={0.05} />
      </mesh>

    </group>
  )
}