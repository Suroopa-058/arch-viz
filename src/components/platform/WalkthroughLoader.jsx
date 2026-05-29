// WalkthroughLoader.jsx — cinematic loading screen

import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'

const STEPS = [
  { label: 'Initializing 3D environment',    duration: 700  },
  { label: 'Loading Sharma Residence model', duration: 900  },
  { label: 'Setting up lighting & shadows',  duration: 700  },
  { label: 'Preparing immersive walkthrough',duration: 600  },
  { label: 'Ready',                          duration: 400  },
]

export default function WalkthroughLoader({ onComplete }) {
  const { project } = useApp()
  const [stepIndex, setStepIndex] = useState(0)
  const [progress,  setProgress]  = useState(0)
  const [fadeOut,   setFadeOut]   = useState(false)

  useEffect(() => {
    let elapsed = 0
    const total = STEPS.reduce((s, step) => s + step.duration, 0)

    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setStepIndex(i)
        setProgress(Math.round(((i + 1) / STEPS.length) * 100))
      }, elapsed)
      elapsed += step.duration
    })

    // Fade out and complete
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 600)
    }, elapsed)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'linear-gradient(160deg, #1a0f07 0%, #2a1608 50%, #1a1005 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(200,105,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,105,42,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}/>

      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '3rem',
        animation: 'fadeUp 0.8s ease both',
      }}>
        <div style={{
          width: 44, height: 44,
          background: 'linear-gradient(135deg,#c8692a,#e8b688)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 20, color: '#fdf7ed',
          boxShadow: '0 8px 24px rgba(200,105,42,0.4)',
        }}>I</div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem', fontWeight: 700,
            color: '#fdf7ed', letterSpacing: '0.06em',
          }}>IllamViz</div>
          <div style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.52rem', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(253,247,237,0.35)', marginTop: 1,
          }}>Architectural Studio</div>
        </div>
      </div>

      {/* Project name */}
      <div style={{
        textAlign: 'center', marginBottom: '2.5rem',
        animation: 'fadeUp 0.8s ease 0.15s both', opacity: 0,
      }}>
        <div style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.62rem', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(200,105,42,0.7)', marginBottom: '0.6rem',
        }}>Now Loading</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 700,
          color: '#fdf7ed',
          lineHeight: 1.1, marginBottom: '0.3rem',
        }}>{project.name}</h1>
        <div style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.62rem', fontWeight: 500,
          letterSpacing: '0.15em',
          color: 'rgba(253,247,237,0.4)',
        }}>{project.type} · {project.location}</div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 320,
        animation: 'fadeUp 0.8s ease 0.25s both', opacity: 0,
      }}>
        {/* Bar track */}
        <div style={{
          height: 2,
          background: 'rgba(253,247,237,0.08)',
          borderRadius: 1,
          overflow: 'hidden',
          marginBottom: '1rem',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #c8692a, #e8b688)',
            borderRadius: 1,
            transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}/>
        </div>

        {/* Step label */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.14em',
            color: 'rgba(253,247,237,0.45)',
            transition: 'opacity 0.3s ease',
          }}>
            {STEPS[stepIndex]?.label}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.88rem', fontWeight: 600,
            color: 'rgba(200,105,42,0.7)',
          }}>{progress}%</div>
        </div>
      </div>

      {/* Animated house icon */}
      <div style={{
        position: 'absolute', bottom: '2.5rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        animation: 'fadeIn 1s ease 0.5s both', opacity: 0,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'rgba(200,105,42,0.5)',
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}/>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}