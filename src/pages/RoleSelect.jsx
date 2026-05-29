// RoleSelect.jsx — premium role selection landing page

import { useState } from 'react'
import { useApp }   from '../context/AppContext'

const ROLES = [
  {
    id:       'architect',
    icon:     '🏛️',
    title:    'Architect / Engineer',
    subtitle: 'Design & present projects',
    desc:     'Upload projects, manage clients, share walkthroughs, and present architectural designs professionally.',
    features: [
      'Upload & manage house projects',
      'Share walkthrough links with clients',
      'Add project notes & materials',
      'Track client feedback',
      'Manage multiple projects',
    ],
    accent: '#c8692a',
    bg:     'rgba(200,105,42,0.06)',
    border: 'rgba(200,105,42,0.2)',
  },
  {
    id:       'client',
    icon:     '🏠',
    title:    'Home Owner / Client',
    subtitle: 'Explore your future home',
    desc:     'Walk through your house design, explore rooms, leave feedback, and personalize your future home.',
    features: [
      'Explore your house in 3D',
      'Interactive room walkthrough',
      'Leave comments & feedback',
      'Request design changes',
      'Compare material options',
    ],
    accent: '#2a6840',
    bg:     'rgba(42,104,64,0.06)',
    border: 'rgba(42,104,64,0.2)',
  },
]

export default function RoleSelect() {
  const { selectRole } = useApp()
  const [selected,  setSelected]  = useState(null)
  const [name,      setName]      = useState('')
  const [hovering,  setHovering]  = useState(null)
  const [step,      setStep]      = useState(1) // 1=pick role, 2=enter name

  const handleContinue = () => {
    if (!selected) return
    if (step === 1) { setStep(2); return }
    if (name.trim()) selectRole(selected, name.trim())
  }

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'linear-gradient(160deg, #f5ede0 0%, #ede0cc 50%, #e5d4bc 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── Background texture dots ──────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(200,105,42,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}/>

      {/* ── Logo ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '2rem', left: '2.5rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        animation: 'fadeUp 0.8s ease both',
      }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg,#c8692a,#e8b688)',
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 17, color: '#fdf7ed',
          boxShadow: '0 4px 14px rgba(200,105,42,0.3)',
        }}>I</div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem', fontWeight: 700,
            color: '#2c1a0e', letterSpacing: '0.05em',
          }}>IllamViz</div>
          <div style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.54rem', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(60,30,10,0.4)', marginTop: 1,
          }}>Architectural Studio</div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem',
        animation: 'fadeUp 0.8s ease 0.1s both', opacity: 0 }}>
        <div style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.65rem', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--text-accent)', marginBottom: '0.75rem',
        }}>
          {step === 1 ? 'Select your role to continue' : 'Welcome to IllamViz'}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: '#2c1a0e', lineHeight: 1.1,
          marginBottom: '0.2rem',
        }}>
          {step === 1 ? 'How are you using' : 'Tell us your name,'}
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, color: '#2c1a0e',
          lineHeight: 1.1,
        }}>
          {step === 1 ? 'IllamViz today?' : 'so we can personalize.'}
        </h1>
      </div>

      {/* ── Step 1: Role cards ────────────────────── */}
      {step === 1 && (
        <div style={{
          display: 'flex', gap: '1.5rem',
          animation: 'fadeUp 0.8s ease 0.2s both', opacity: 0,
        }}>
          {ROLES.map(role => (
            <div
              key={role.id}
              onClick={() => setSelected(role.id)}
              onMouseEnter={() => setHovering(role.id)}
              onMouseLeave={() => setHovering(null)}
              style={{
                width: 300,
                background: selected === role.id ? role.bg : 'rgba(255,252,245,0.7)',
                border: `1.5px solid ${selected === role.id ? role.border : 'rgba(200,160,100,0.2)'}`,
                borderRadius: 8,
                padding: '2rem 1.8rem',
                cursor: 'pointer',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                transform: selected === role.id
                  ? 'translateY(-4px)'
                  : hovering === role.id
                  ? 'translateY(-2px)'
                  : 'none',
                boxShadow: selected === role.id
                  ? `0 12px 40px ${role.border}`
                  : '0 4px 20px rgba(180,120,60,0.08)',
                position: 'relative',
              }}
            >
              {/* Selected indicator */}
              {selected === role.id && (
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: 22, height: 22, borderRadius: '50%',
                  background: role.accent,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12, color: 'white', fontWeight: 700,
                }}>✓</div>
              )}

              {/* Icon */}
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {role.icon}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem', fontWeight: 700,
                color: '#2c1a0e', marginBottom: '0.2rem',
              }}>{role.title}</div>

              {/* Subtitle */}
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.62rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: role.accent, marginBottom: '0.85rem',
              }}>{role.subtitle}</div>

              {/* Desc */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem', color: 'rgba(60,30,10,0.6)',
                lineHeight: 1.65, marginBottom: '1.25rem',
              }}>{role.desc}</p>

              {/* Features */}
              <div style={{
                borderTop: `1px solid ${role.border}`,
                paddingTop: '1rem',
              }}>
                {role.features.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center',
                    gap: '0.5rem', marginBottom: '0.45rem',
                  }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: role.accent, flexShrink: 0,
                    }}/>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'rgba(60,30,10,0.65)',
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Step 2: Name input ────────────────────── */}
      {step === 2 && (
        <div style={{
          animation: 'fadeUp 0.6s ease both', opacity: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1rem',
          width: 380,
        }}>
          {/* Role badge */}
          <div style={{
            background: 'rgba(255,252,245,0.7)',
            border: '1px solid rgba(200,160,100,0.2)',
            borderRadius: 20, padding: '0.4rem 1.2rem',
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: ROLES.find(r=>r.id===selected)?.accent,
          }}>
            {ROLES.find(r=>r.id===selected)?.icon}{' '}
            {ROLES.find(r=>r.id===selected)?.title}
          </div>

          {/* Name input */}
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleContinue()}
            placeholder="Enter your full name..."
            style={{
              width: '100%',
              padding: '0.9rem 1.2rem',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#2c1a0e',
              background: 'rgba(255,252,245,0.85)',
              border: '1.5px solid rgba(200,160,100,0.3)',
              borderRadius: 6,
              outline: 'none',
              backdropFilter: 'blur(12px)',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(200,105,42,0.6)'}
            onBlur={e  => e.target.style.borderColor = 'rgba(200,160,100,0.3)'}
          />

          {/* Back link */}
          <button
            onClick={() => setStep(1)}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'var(--font-label)',
              fontSize: '0.65rem', letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(60,30,10,0.4)', cursor: 'pointer',
            }}
          >← Change role</button>
        </div>
      )}

      {/* ── Continue button ───────────────────────── */}
      <div style={{
        marginTop: '2rem',
        animation: 'fadeUp 0.8s ease 0.3s both', opacity: 0,
      }}>
        <button
          onClick={handleContinue}
          disabled={step === 1 ? !selected : !name.trim()}
          style={{
            background: selected
              ? `linear-gradient(135deg, #c8692a, #e8a060)`
              : 'rgba(200,160,100,0.2)',
            border: 'none',
            borderRadius: 3,
            padding: '0.78rem 2.5rem',
            fontFamily: 'var(--font-label)',
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: selected ? '#fdf7ed' : 'rgba(60,30,10,0.3)',
            cursor: selected ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: selected ? '0 8px 24px rgba(200,105,42,0.3)' : 'none',
          }}
          onMouseEnter={e => {
            if (selected) e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {step === 1 ? 'Continue →' : 'Enter IllamViz →'}
        </button>
      </div>

      {/* ── Footer ───────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '1.5rem',
        fontFamily: 'var(--font-label)',
        fontSize: '0.58rem', letterSpacing: '0.15em',
        color: 'rgba(60,30,10,0.25)',
        textTransform: 'uppercase',
      }}>
        IllamViz · Architectural Visualization Platform · 2024
      </div>

    </div>
  )
}