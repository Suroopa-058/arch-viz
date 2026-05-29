// InteriorLighting.jsx — premium warm indoor lighting

export default function InteriorLighting() {
  return (
    <>
      {/* ── Soft global interior fill ─────────────── */}
      <ambientLight intensity={0.35} color="#fff5e8" />

      {/* ── Living room — warm pendant glow ──────── */}
      <pointLight
        position={[-2.8, 2.6, -0.5]}
        intensity={1.8}
        color="#ffcc80"
        distance={7}
        decay={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      {/* Living room fill */}
      <pointLight
        position={[-1.5, 2.2, 0.8]}
        intensity={0.6}
        color="#ffe4a0"
        distance={4}
        decay={2}
      />

      {/* ── Kitchen — bright cool-warm ────────────── */}
      <pointLight
        position={[2.8, 2.6, -0.8]}
        intensity={1.6}
        color="#fff8e8"
        distance={6}
        decay={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight
        position={[3.2, 2.2, 0.5]}
        intensity={0.7}
        color="#fff5e0"
        distance={4}
        decay={2}
      />

      {/* ── Entry hall — welcoming warm glow ─────── */}
      <pointLight
        position={[0, 2.6, 1.8]}
        intensity={1.2}
        color="#ffdd99"
        distance={5}
        decay={2}
      />

      {/* ── Staircase — accent uplight ────────────── */}
      <pointLight
        position={[-1.2, 1.5, -2.2]}
        intensity={0.8}
        color="#ffd080"
        distance={4}
        decay={2}
      />
      <pointLight
        position={[-1.2, 3.5, -2.2]}
        intensity={0.6}
        color="#ffd080"
        distance={3}
        decay={2}
      />

      {/* ── Master bedroom — soft warm ────────────── */}
      <pointLight
        position={[-2.8, 5.4, 0.5]}
        intensity={1.4}
        color="#ffcc88"
        distance={6}
        decay={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight
        position={[-3.5, 4.8, -1.5]}
        intensity={0.5}
        color="#ffbb70"
        distance={3}
        decay={2}
      />

      {/* ── Bedroom 2 — soft warm ─────────────────── */}
      <pointLight
        position={[2.5, 5.4, 0.5]}
        intensity={1.4}
        color="#ffcc88"
        distance={6}
        decay={2}
      />

      {/* ── FF landing light ──────────────────────── */}
      <pointLight
        position={[0, 5.2, -1.5]}
        intensity={0.8}
        color="#ffe4b0"
        distance={4}
        decay={2}
      />

      {/* ── Balcony — bright natural light ───────── */}
      <pointLight
        position={[0, 5.0, 3.2]}
        intensity={1.2}
        color="#fff8f0"
        distance={5}
        decay={2}
      />
    </>
  )
}