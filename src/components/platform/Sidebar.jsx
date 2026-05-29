// Sidebar.jsx — premium architect navigation

import { useState } from 'react'
import { useApp }   from '../../context/AppContext'

const NAV = [
  { id: 'overview',  icon: '⊞', label: 'Overview'      },
  { id: 'projects',  icon: '🏠', label: 'Projects'      },
  { id: 'clients',   icon: '👤', label: 'Clients'       },
  { id: 'materials', icon: '🎨', label: 'Materials'     },
  { id: 'feedback',  icon: '💬', label: 'Feedback'      },
  { id: 'analytics', icon: '📊', label: 'Analytics'     },
]

const BOTTOM_NAV = [
  { id: 'settings',  icon: '⚙',  label: 'Settings'     },
  { id: 'help',      icon: '?',   label: 'Help'         },
]

export default function Sidebar({ active, setActive }) {
  const { user } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  const W = collapsed ? 64 : 220

  return (
    <div style={{
      width: W, minHeight: '100vh',
      background: '#1e1208',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1)',
      position: 'relative', flexShrink: 0,
      borderRight: '1px solid rgba(200,105,42,0.15)',
    }}>

      {/* ── Logo ──────────────────────────────────── */}
      <div style={{
        padding: collapsed ? '1.5rem 0' : '1.5rem 1.4rem',
        display: 'flex', alignItems: 'center',
        gap: '0.7rem', borderBottom: '1px solid rgba(200,105,42,0.1)',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: 34, height: 34, flexShrink: 0,
          background: 'linear-gradient(135deg,#c8692a,#e8b688)',
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 16, color: '#fdf7ed',
          boxShadow: '0 4px 12px rgba(200,105,42,0.4)',
        }}>I</div>
        {!collapsed && (
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem', fontWeight: 700,
              color: '#fdf7ed', letterSpacing: '0.04em',
            }}>IllamViz</div>
            <div style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.5rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(253,247,237,0.35)', marginTop: 1,
            }}>Studio</div>
          </div>
        )}
      </div>

      {/* ── Nav items ─────────────────────────────── */}
      <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        {NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={active === item.id}
            collapsed={collapsed}
            onClick={() => setActive(item.id)}
          />
        ))}
      </nav>

      {/* ── Bottom nav ────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(200,105,42,0.1)', padding: '0.75rem 0' }}>
        {BOTTOM_NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={active === item.id}
            collapsed={collapsed}
            onClick={() => setActive(item.id)}
            muted
          />
        ))}

        {/* User pill */}
        <div style={{
          margin: collapsed ? '0.5rem auto' : '0.5rem 0.8rem 0',
          padding: collapsed ? '0.6rem' : '0.65rem 0.8rem',
          background: 'rgba(200,105,42,0.1)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center',
          gap: '0.6rem',
          justifyContent: collapsed ? 'center' : 'flex-start',
          width: collapsed ? 40 : 'auto',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg,#c8692a,#e8b688)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12, fontWeight: 700,
            color: '#fdf7ed', flexShrink: 0,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          {!collapsed && (
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem', fontWeight: 500,
                color: '#fdf7ed',
                whiteSpace: 'nowrap', overflow: 'hidden',
                maxWidth: 110, textOverflow: 'ellipsis',
              }}>{user?.name || 'Architect'}</div>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.52rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(253,247,237,0.4)',
              }}>Architect</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Collapse toggle ───────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute', top: '50%',
          right: -12, transform: 'translateY(-50%)',
          width: 24, height: 24, borderRadius: '50%',
          background: '#2a1810',
          border: '1px solid rgba(200,105,42,0.3)',
          color: 'rgba(253,247,237,0.6)',
          cursor: 'pointer', fontSize: 10,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#c8692a'
          e.currentTarget.style.color = '#fdf7ed'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#2a1810'
          e.currentTarget.style.color = 'rgba(253,247,237,0.6)'
        }}
      >
        {collapsed ? '›' : '‹'}
      </button>

    </div>
  )
}

function NavItem({ item, active, collapsed, onClick, muted }) {
  const [hover, setHover] = useState(false)
  const isActive = active

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={collapsed ? item.label : ''}
      style={{
        width: '100%', border: 'none',
        background: isActive
          ? 'rgba(200,105,42,0.18)'
          : hover ? 'rgba(253,247,237,0.05)' : 'transparent',
        display: 'flex', alignItems: 'center',
        gap: '0.75rem',
        padding: collapsed ? '0.7rem 0' : '0.65rem 1.2rem',
        justifyContent: collapsed ? 'center' : 'flex-start',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        position: 'relative',
        borderLeft: isActive
          ? '2px solid #c8692a'
          : '2px solid transparent',
      }}
    >
      <span style={{
        fontSize: '1rem',
        color: isActive
          ? '#e8b688'
          : muted
          ? 'rgba(253,247,237,0.3)'
          : 'rgba(253,247,237,0.55)',
        transition: 'color 0.18s ease',
        minWidth: 20, textAlign: 'center',
      }}>{item.icon}</span>

      {!collapsed && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem', fontWeight: isActive ? 500 : 400,
          color: isActive
            ? '#fdf7ed'
            : muted
            ? 'rgba(253,247,237,0.3)'
            : 'rgba(253,247,237,0.6)',
          letterSpacing: '0.01em',
          transition: 'color 0.18s ease',
        }}>{item.label}</span>
      )}
    </button>
  )
}