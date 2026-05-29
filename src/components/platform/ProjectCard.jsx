// ProjectCard.jsx — premium project card

import { useApp } from '../../context/AppContext'

const STATUS_STYLES = {
  'In Progress': { bg: 'rgba(200,105,42,0.12)', color: '#c8692a', dot: '#c8692a' },
  'Review':      { bg: 'rgba(42,104,200,0.1)',  color: '#4a7ac8', dot: '#4a7ac8' },
  'Completed':   { bg: 'rgba(42,140,64,0.1)',   color: '#2a8c40', dot: '#2a8c40' },
  'Draft':       { bg: 'rgba(120,110,100,0.1)', color: '#7a6a5a', dot: '#9a8878' },
}

export default function ProjectCard({ project, onLaunchWalkthrough }) {
  const status  = STATUS_STYLES[project.status] || STATUS_STYLES['Draft']

  return (
    <div style={{
      background: 'rgba(255,252,246,0.95)',
      border: '1px solid rgba(200,160,100,0.18)',
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
      cursor: 'pointer',
      boxShadow: '0 2px 12px rgba(180,120,60,0.07)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px)'
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(180,120,60,0.14)'
      e.currentTarget.style.borderColor = 'rgba(200,105,42,0.3)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(180,120,60,0.07)'
      e.currentTarget.style.borderColor = 'rgba(200,160,100,0.18)'
    }}
    >
      {/* ── Thumbnail ──────────────────────────────── */}
      <div style={{
        height: 140,
        background: 'linear-gradient(135deg, #e8ddd0 0%, #d4c4b0 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Placeholder house icon */}
        <div style={{
          fontSize: '3.5rem', opacity: 0.3,
          fontFamily: 'var(--font-display)',
        }}>🏠</div>

        {/* Progress bar at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3,
          background: 'rgba(200,160,100,0.2)',
        }}>
          <div style={{
            height: '100%',
            width: `${project.progress}%`,
            background: 'linear-gradient(90deg, #c8692a, #e8b688)',
            transition: 'width 0.8s ease',
          }}/>
        </div>

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: status.bg,
          borderRadius: 20, padding: '0.22rem 0.7rem',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${status.color}30`,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: status.dot,
          }}/>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.58rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: status.color,
          }}>{project.status}</span>
        </div>

        {/* Progress % */}
        <div style={{
          position: 'absolute', bottom: '0.6rem', right: '0.75rem',
          fontFamily: 'var(--font-label)',
          fontSize: '0.6rem', fontWeight: 600,
          color: '#c8692a', letterSpacing: '0.1em',
        }}>{project.progress}%</div>
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div style={{ padding: '1.1rem 1.25rem' }}>

        {/* Project name */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem', fontWeight: 700,
          color: '#2c1a0e', marginBottom: '0.2rem',
          letterSpacing: '-0.01em',
        }}>{project.name}</div>

        {/* Location + type */}
        <div style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.6rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(60,30,10,0.4)',
          marginBottom: '0.8rem',
        }}>{project.type} · {project.location}</div>

        {/* Client row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '0.5rem', marginBottom: '1rem',
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'linear-gradient(135deg,#c8692a,#e8b688)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: '#fdf7ed',
          }}>
            {project.client[0]}
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem', color: 'rgba(60,30,10,0.6)',
          }}>{project.client}</span>
          <span style={{ marginLeft: 'auto',
            fontFamily: 'var(--font-label)',
            fontSize: '0.58rem', color: 'rgba(60,30,10,0.3)',
            letterSpacing: '0.1em',
          }}>{project.lastUpdated}</span>
        </div>

        {/* Rooms */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.35rem',
          marginBottom: '1rem',
        }}>
          {project.rooms.slice(0,3).map(room => (
            <span key={room} style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.55rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(60,30,10,0.5)',
              background: 'rgba(200,160,100,0.1)',
              border: '1px solid rgba(200,160,100,0.2)',
              borderRadius: 3, padding: '0.2rem 0.5rem',
            }}>{room}</span>
          ))}
          {project.rooms.length > 3 && (
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.55rem', color: 'rgba(60,30,10,0.35)',
              padding: '0.2rem 0.4rem',
            }}>+{project.rooms.length - 3} more</span>
          )}
        </div>

        {/* Feedback indicator */}
        {project.feedbackCount > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '0.75rem' }}>💬</span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem', color: '#c8692a',
            }}>{project.feedbackCount} client feedback</span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onLaunchWalkthrough(project)}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg,#c8692a,#e8a060)',
              border: 'none', borderRadius: 4,
              padding: '0.55rem 0',
              fontFamily: 'var(--font-label)',
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#fdf7ed', cursor: 'pointer',
              transition: 'all 0.22s ease',
              boxShadow: '0 4px 12px rgba(200,105,42,0.25)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ▶ Walkthrough
          </button>

          <button style={{
            width: 36,
            background: 'transparent',
            border: '1px solid rgba(200,160,100,0.25)',
            borderRadius: 4,
            color: 'rgba(60,30,10,0.4)',
            cursor: 'pointer', fontSize: '0.85rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(200,105,42,0.4)'
            e.currentTarget.style.color = '#c8692a'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(200,160,100,0.25)'
            e.currentTarget.style.color = 'rgba(60,30,10,0.4)'
          }}
          title="Share">⎋</button>

          <button style={{
            width: 36,
            background: 'transparent',
            border: '1px solid rgba(200,160,100,0.25)',
            borderRadius: 4,
            color: 'rgba(60,30,10,0.4)',
            cursor: 'pointer', fontSize: '0.85rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(200,105,42,0.4)'
            e.currentTarget.style.color = '#c8692a'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(200,160,100,0.25)'
            e.currentTarget.style.color = 'rgba(60,30,10,0.4)'
          }}
          title="Edit">✎</button>
        </div>
      </div>
    </div>
  )
}