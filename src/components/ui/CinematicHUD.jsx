// CinematicHUD.jsx — overlay shown during cinematic tour

import { useState, useEffect } from 'react'

const SHOT_NAMES = [
  'Opening Wide',
  'Front Approach',
  'Entry Close-up',
  'Left Flank',
  'Balcony Focus',
  'Right Aerial',
  'Roof Overview',
  'Cinematic Exit',
]

export default function CinematicHUD({ onStop }) {
  const [shotIndex, setShotIndex] = useState(0)
  const [elapsed,   setElapsed]   = useState(0)

  // Advance shot name roughly every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setShotIndex(i => Math.min(i + 1, SHOT_NAMES.length - 1))
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Progress timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(e => e + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const progress = Math.min(shotIndex / (SHOT_NAMES.length - 1), 1)

  return (
    <>
      {/* ── Cinematic letterbox bars ─────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 60, zIndex: 30,
        background: 'rgba(20,12,7,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center',
        padding: '0 2.5rem',
        justifyContent: 'space-between',
        animation: 'fadeIn 0.6s ease forwards',
      }}>
        {/* Left — tour label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Pulsing red dot */}
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#e05a2a',
            animation: 'shimmer 1.2s ease-in-out infinite',
          }}/>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(253,247,237,0.7)',
          }}>Cinematic Tour</span>
        </div>

        {/* Center — shot name */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(253,247,237,0.9)',
          letterSpacing: '0.05em',
          transition: 'opacity 0.5s ease',
        }}>
          {SHOT_NAMES[shotIndex]}
        </div>

        {/* Right — stop button */}
        <button
          onClick={onStop}
          style={{
            background: 'transparent',
            border: '1px solid rgba(253,247,237,0.25)',
            borderRadius: 2,
            padding: '0.3rem 1rem',
            fontFamily: 'var(--font-label)',
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(253,247,237,0.6)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(200,105,42,0.2)'
            e.currentTarget.style.borderColor = 'rgba(200,105,42,0.5)'
            e.currentTarget.style.color = '#fdf7ed'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(253,247,237,0.25)'
            e.currentTarget.style.color = 'rgba(253,247,237,0.6)'
          }}
        >
          ✕ Exit Tour
        </button>
      </div>

      {/* ── Bottom bar — progress ────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 52, zIndex: 30,
        background: 'rgba(20,12,7,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center',
        padding: '0 2.5rem',
        gap: '1.5rem',
        animation: 'fadeIn 0.6s ease forwards',
      }}>

        {/* Shot dots */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {SHOT_NAMES.map((_, i) => (
            <div key={i} style={{
              width:  i === shotIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i <= shotIndex
                ? 'var(--illam-primary)'
                : 'rgba(253,247,237,0.2)',
              transition: 'all 0.4s ease',
            }}/>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          flex: 1,
          height: 2,
          background: 'rgba(253,247,237,0.12)',
          borderRadius: 1,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #c8692a, #e8b688)',
            borderRadius: 1,
            transition: 'width 0.8s ease',
          }}/>
        </div>

        {/* Shot counter */}
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          color: 'rgba(253,247,237,0.4)',
          whiteSpace: 'nowrap',
        }}>
          {shotIndex + 1} / {SHOT_NAMES.length}
        </span>

      </div>

      {/* ── Corner watermark ────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 68, right: '2rem',
        zIndex: 30,
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        fontStyle: 'italic',
        color: 'rgba(253,247,237,0.2)',
        letterSpacing: '0.08em',
        animation: 'fadeIn 1s ease 0.5s both',
        opacity: 0,
      }}>
        IllamViz · Architectural Visualization
      </div>
    </>
  )
}