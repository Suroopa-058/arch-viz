// SwitchRoleButton.jsx — subtle demo role switcher

import { useState } from 'react'
import { useApp }   from '../../context/AppContext'

export default function SwitchRoleButton() {
  const { role, switchRole, user } = useApp()
  const [hover, setHover] = useState(false)
  const [open,  setOpen]  = useState(false)

  const targetRole = role === 'architect' ? 'client' : 'architect'
  const targetLabel = role === 'architect' ? 'Client View' : 'Architect View'
  const targetIcon  = role === 'architect' ? '🏠' : '🏛️'

  return (
    <div style={{
      position: 'fixed',
      top: '1rem', right: '1rem',
      zIndex: 200,
    }}>
      {/* Pill button */}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setOpen(false) }}
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.45rem',
          padding: '0.4rem 0.85rem',
          background: hover
            ? 'rgba(255,248,235,0.92)'
            : 'rgba(255,248,235,0.72)',
          border: '1px solid rgba(200,105,42,0.22)',
          borderRadius: 20,
          backdropFilter: 'blur(16px)',
          cursor: 'pointer',
          transition: 'all 0.22s ease',
          boxShadow: hover
            ? '0 4px 16px rgba(200,105,42,0.15)'
            : '0 2px 8px rgba(180,120,60,0.08)',
        }}
      >
        {/* Current role dot */}
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: role === 'architect' ? '#c8692a' : '#2a8c40',
          flexShrink: 0,
        }}/>
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.58rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#2c1a0e',
          whiteSpace: 'nowrap',
        }}>
          {role === 'architect' ? '🏛️ Architect' : '🏠 Client'}
        </span>
        {/* Chevron */}
        <span style={{
          fontSize: '0.55rem',
          color: 'rgba(60,30,10,0.4)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
        }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 0.4rem)', right: 0,
          background: 'rgba(255,252,246,0.97)',
          border: '1px solid rgba(200,160,100,0.2)',
          borderRadius: 8,
          boxShadow: '0 12px 32px rgba(180,120,60,0.15)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden', minWidth: 200,
          animation: 'fadeUp 0.2s ease both',
        }}>
          {/* Header */}
          <div style={{
            padding: '0.7rem 1rem',
            borderBottom: '1px solid rgba(200,160,100,0.1)',
          }}>
            <div style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.54rem', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(60,30,10,0.35)',
            }}>Demo Navigation</div>
          </div>

          {/* Current */}
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(200,160,100,0.08)',
            background: 'rgba(200,105,42,0.04)',
          }}>
            <div style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.54rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(60,30,10,0.35)', marginBottom: '0.2rem',
            }}>Currently viewing as</div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem', fontWeight: 500,
              color: '#2c1a0e',
            }}>
              {role === 'architect' ? '🏛️' : '🏠'} {user?.name}
            </div>
          </div>

          {/* Switch option */}
          <button
            onClick={() => { switchRole(); setOpen(false) }}
            style={{
              width: '100%', padding: '0.85rem 1rem',
              background: 'none', border: 'none',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              cursor: 'pointer',
              transition: 'background 0.18s ease',
              textAlign: 'left',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,105,42,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: targetRole === 'architect'
                ? 'rgba(200,105,42,0.1)' : 'rgba(42,140,64,0.1)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '0.85rem',
              flexShrink: 0,
            }}>{targetIcon}</div>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem', fontWeight: 500, color: '#2c1a0e',
              }}>Switch to {targetLabel}</div>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.54rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: targetRole === 'architect' ? '#c8692a' : '#2a8c40',
              }}>{targetRole === 'architect' ? 'Design & Manage' : 'Explore & Review'}</div>
            </div>
          </button>

          {/* Demo label */}
          <div style={{
            padding: '0.5rem 1rem',
            borderTop: '1px solid rgba(200,160,100,0.08)',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#c8692a',
              animation: 'shimmer 2s infinite',
            }}/>
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.52rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(60,30,10,0.3)',
            }}>Demo Mode · Sharma Residence</span>
          </div>
        </div>
      )}
    </div>
  )
}