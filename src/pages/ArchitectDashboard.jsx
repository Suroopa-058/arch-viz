import { useState }  from 'react'
import { useApp }    from '../context/AppContext'
import Sidebar       from '../components/platform/Sidebar'

// ── Stat card ─────────────────────────────────────────
function StatCard({ label, value, sub, accent = '#c8692a', icon }) {
  return (
    <div style={{
      background: 'rgba(255,252,246,0.95)',
      border: '1px solid rgba(200,160,100,0.18)',
      borderRadius: 8, padding: '1.2rem 1.4rem',
      flex: 1,
      boxShadow: '0 2px 12px rgba(180,120,60,0.06)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', marginBottom: '0.75rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.6rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(60,30,10,0.45)',
        }}>{label}</span>
        <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{icon}</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem', fontWeight: 700,
        color: accent, lineHeight: 1,
        marginBottom: '0.3rem',
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem', color: 'rgba(60,30,10,0.45)',
      }}>{sub}</div>
    </div>
  )
}

// ── Feedback item ─────────────────────────────────────
function FeedbackItem({ fb, onResolve }) {
  const typeColor = fb.type === 'change'
    ? '#c8692a' : fb.type === 'approval' ? '#2a8c40' : '#4a7ac8'

  return (
    <div style={{
      display: 'flex', gap: '0.75rem',
      padding: '0.85rem 0',
      borderBottom: '1px solid rgba(200,160,100,0.1)',
      opacity: fb.status === 'Resolved' ? 0.6 : 1,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: `linear-gradient(135deg, ${typeColor}40, ${typeColor}20)`,
        border: `1.5px solid ${typeColor}40`,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13, fontWeight: 700,
        color: typeColor,
      }}>{fb.author[0]}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: '0.2rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem', fontWeight: 500, color: '#2c1a0e',
          }}>{fb.author}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.56rem', color: 'rgba(60,30,10,0.35)',
              letterSpacing: '0.1em',
            }}>{fb.time}</span>
            {fb.status !== 'Resolved' && (
              <button
                onClick={() => onResolve(fb.id)}
                style={{
                  padding: '0.18rem 0.5rem',
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.52rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: 'rgba(42,140,64,0.08)',
                  border: '1px solid rgba(42,140,64,0.25)',
                  borderRadius: 3, color: '#2a8c40',
                  cursor: 'pointer',
                }}
              >Resolve</button>
            )}
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.58rem', fontWeight: 600,
          color: typeColor, letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.2rem',
        }}>{fb.room} · {fb.type}</div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem', color: 'rgba(60,30,10,0.55)',
          lineHeight: 1.5,
        }}>{fb.message}</div>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────
export default function ArchitectDashboard() {
  const {
    project,
    unreadCount,
    openWalkthrough,
    markFeedbackSeen,
    resolveFeedback,
    goTo,
    user,
  } = useApp()

  const [activeNav, setActiveNav] = useState('overview')

  const unresolvedFeedbacks = project.feedbacks.filter(
    f => f.status !== 'Resolved'
  )

  const stats = [
    { label: 'Project Status', value: '65%',           sub: 'Sharma Residence progress',    icon: '🏗️', accent: '#c8692a' },
    { label: 'Pending Review', value: unresolvedFeedbacks.length, sub: 'Unresolved feedback items',  icon: '💬', accent: '#4a7ac8' },
    { label: 'Rooms Done',     value: project.rooms.filter(r=>r.status==='Approved').length, sub: 'Approved rooms',  icon: '✓',  accent: '#2a8c40' },
    { label: 'New Feedback',   value: unreadCount,      sub: 'Unseen client messages',        icon: '🔔', accent: unreadCount > 0 ? '#e05a2a' : '#9a8878' },
  ]

  return (
    <div style={{
      display: 'flex', width: '100vw', height: '100vh',
      background: '#f5ede0', overflow: 'hidden',
      fontFamily: 'var(--font-body)',
    }}>

      <Sidebar active={activeNav} setActive={setActiveNav} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── Top bar ──────────────────────────── */}
        <div style={{
          background: 'rgba(255,252,246,0.95)',
          borderBottom: '1px solid rgba(200,160,100,0.15)',
          padding: '1rem 2rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem', fontWeight: 700,
              color: '#2c1a0e', lineHeight: 1,
            }}>
              Good morning, {user?.name?.split(' ')[0] || 'Architect'} 👋
            </div>
            <div style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.6rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(60,30,10,0.4)', marginTop: 3,
            }}>
              {new Date().toLocaleDateString('en-IN', {
                weekday:'long', year:'numeric',
                month:'long', day:'numeric',
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Notification bell with badge */}
            <div style={{ position: 'relative' }}>
              <button style={{
                width: 38, height: 38,
                background: unreadCount > 0
                  ? 'rgba(200,105,42,0.1)' : 'rgba(240,230,215,0.6)',
                border: `1px solid ${unreadCount > 0
                  ? 'rgba(200,105,42,0.3)' : 'rgba(200,160,100,0.2)'}`,
                borderRadius: 6, cursor: 'pointer',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}>🔔</button>
              {unreadCount > 0 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#c8692a',
                  border: '2px solid #f5ede0',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.52rem', fontWeight: 700,
                  color: '#fdf7ed',
                  animation: 'pulse 1.5s ease infinite',
                }}>{unreadCount}</div>
              )}
            </div>

            {/* Open project */}
            <button
              onClick={() => goTo('project-workspace')}
              style={{
                background: 'linear-gradient(135deg,#c8692a,#e8a060)',
                border: 'none', borderRadius: 6,
                padding: '0.55rem 1.2rem',
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fdf7ed', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(200,105,42,0.3)',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >
              Open Sharma Residence →
            </button>
          </div>
        </div>

        {/* ── Body ─────────────────────────────── */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '1.75rem 2rem',
        }}>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '1rem',
            marginBottom: '1.75rem',
          }}>
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Unread feedback banner */}
          {unreadCount > 0 && (
            <div
              onClick={() => {
                markFeedbackSeen()
                goTo('project-workspace')
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(200,105,42,0.1), rgba(200,105,42,0.05))',
                border: '1px solid rgba(200,105,42,0.3)',
                borderRadius: 8, padding: '1rem 1.4rem',
                marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(200,105,42,0.55)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(200,105,42,0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#c8692a', flexShrink: 0,
                  boxShadow: '0 0 0 4px rgba(200,105,42,0.2)',
                  animation: 'pulse 1.5s ease infinite',
                }}/>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem', fontWeight: 600,
                    color: '#2c1a0e', marginBottom: '0.15rem',
                  }}>
                    {unreadCount} new feedback from {project.client}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.58rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#c8692a',
                  }}>Sharma Residence · Click to review</div>
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.62rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#c8692a',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}>View Feedback →</div>
            </div>
          )}

          {/* Two column layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '1.5rem',
            alignItems: 'start',
          }}>

            {/* Left — Project card */}
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem', fontWeight: 700,
                color: '#2c1a0e', marginBottom: '1rem',
              }}>Active Project</div>

              {/* Sharma Residence card */}
              <div style={{
                background: 'rgba(255,252,246,0.95)',
                border: '1px solid rgba(200,160,100,0.2)',
                borderRadius: 10, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(180,120,60,0.08)',
              }}>
                {/* Banner */}
                <div style={{
                  height: 120,
                  background: 'linear-gradient(135deg, #e8d8c0 0%, #d4c4a8 50%, #c8b490 100%)',
                  position: 'relative',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontSize: '3rem', opacity: 0.35,
                    fontFamily: 'var(--font-display)',
                  }}>🏠</div>
                  {/* Progress bar */}
                  <div style={{
                    position: 'absolute', bottom: 0,
                    left: 0, right: 0, height: 4,
                    background: 'rgba(200,160,100,0.2)',
                  }}>
                    <div style={{
                      height: '100%', width: `${project.progress}%`,
                      background: 'linear-gradient(90deg,#c8692a,#e8b688)',
                    }}/>
                  </div>
                  {/* Status */}
                  <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: 'rgba(200,105,42,0.15)',
                    border: '1px solid rgba(200,105,42,0.3)',
                    borderRadius: 20, padding: '0.22rem 0.7rem',
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#c8692a',
                    }}/>
                    <span style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: '0.56rem', fontWeight: 600,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: '#c8692a',
                    }}>{project.status}</span>
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '0.6rem', right: '0.75rem',
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.6rem', fontWeight: 600, color: '#c8692a',
                  }}>{project.progress}%</div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem', fontWeight: 700,
                    color: '#2c1a0e', marginBottom: '0.2rem',
                  }}>{project.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.6rem', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(60,30,10,0.4)', marginBottom: '1rem',
                  }}>{project.type} · {project.location}</div>

                  {/* Client row */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: '0.5rem', marginBottom: '1rem',
                    padding: '0.6rem 0.8rem',
                    background: 'rgba(200,105,42,0.05)',
                    border: '1px solid rgba(200,105,42,0.12)',
                    borderRadius: 6,
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: 'linear-gradient(135deg,#c8692a,#e8b688)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: '#fdf7ed',
                    }}>{project.client[0]}</div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem', fontWeight: 500,
                        color: '#2c1a0e',
                      }}>{project.client}</div>
                      <div style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.54rem', color: 'rgba(60,30,10,0.38)',
                        letterSpacing: '0.1em',
                      }}>{project.clientEmail}</div>
                    </div>
                    {unreadCount > 0 && (
                      <div style={{
                        marginLeft: 'auto',
                        background: '#c8692a', color: '#fdf7ed',
                        borderRadius: 10, padding: '0.1rem 0.5rem',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.55rem', fontWeight: 700,
                      }}>{unreadCount} new</div>
                    )}
                  </div>

                  {/* Rooms */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.35rem',
                    marginBottom: '1.1rem',
                  }}>
                    {project.rooms.map(room => (
                      <span key={room.id} style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.54rem', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: room.status === 'Approved'
                          ? '#2a8c40' : 'rgba(60,30,10,0.45)',
                        background: room.status === 'Approved'
                          ? 'rgba(42,140,64,0.08)' : 'rgba(200,160,100,0.1)',
                        border: `1px solid ${room.status === 'Approved'
                          ? 'rgba(42,140,64,0.2)' : 'rgba(200,160,100,0.2)'}`,
                        borderRadius: 3, padding: '0.2rem 0.5rem',
                      }}>{room.name}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => openWalkthrough()}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg,#c8692a,#e8a060)',
                        border: 'none', borderRadius: 5,
                        padding: '0.6rem',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.62rem', fontWeight: 600,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: '#fdf7ed', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(200,105,42,0.25)',
                        transition: 'all 0.22s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform='translateY(-1px)'}
                      onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                    >▶ Walkthrough</button>

                    <button
                      onClick={() => goTo('project-workspace')}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid rgba(200,160,100,0.25)',
                        borderRadius: 5, padding: '0.6rem',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.62rem', fontWeight: 600,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: 'rgba(60,30,10,0.5)', cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(200,105,42,0.4)'
                        e.currentTarget.style.color = '#c8692a'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(200,160,100,0.25)'
                        e.currentTarget.style.color = 'rgba(60,30,10,0.5)'
                      }}
                    >✎ Manage</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Live feedback panel */}
            <div style={{
              background: 'rgba(255,252,246,0.95)',
              border: '1px solid rgba(200,160,100,0.18)',
              borderRadius: 8, padding: '1.25rem',
              boxShadow: '0 2px 12px rgba(180,120,60,0.06)',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '1rem',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem', fontWeight: 700, color: '#2c1a0e',
                  }}>Client Feedback</div>
                  <div style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.56rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: unreadCount > 0 ? '#c8692a' : 'rgba(60,30,10,0.35)',
                  }}>
                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                  </div>
                </div>
                {unreadCount > 0 && (
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#c8692a',
                    animation: 'pulse 1.5s ease infinite',
                    boxShadow: '0 0 0 4px rgba(200,105,42,0.15)',
                  }}/>
                )}
              </div>

              {/* Live feedback list */}
              <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                {project.feedbacks.length === 0 ? (
                  <div style={{
                    textAlign: 'center', padding: '2rem 1rem',
                    color: 'rgba(60,30,10,0.35)',
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>💬</div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                    }}>No feedback yet</div>
                  </div>
                ) : (
                  project.feedbacks.map(fb => (
                    <FeedbackItem
                      key={fb.id}
                      fb={fb}
                      onResolve={resolveFeedback}
                    />
                  ))
                )}
              </div>

              <button
                onClick={() => goTo('project-workspace')}
                style={{
                  width: '100%', marginTop: '1rem',
                  padding: '0.55rem',
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.62rem', fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: 'transparent',
                  border: '1px solid rgba(200,160,100,0.25)',
                  borderRadius: 4, color: 'rgba(60,30,10,0.45)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,105,42,0.4)'
                  e.currentTarget.style.color = '#c8692a'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,160,100,0.25)'
                  e.currentTarget.style.color = 'rgba(60,30,10,0.45)'
                }}
              >Manage in Project Workspace →</button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}