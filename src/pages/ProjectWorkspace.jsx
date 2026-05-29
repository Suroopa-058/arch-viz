// ProjectWorkspace.jsx — single project detail view

import { useState }  from 'react'
import { useApp }    from '../context/AppContext'

const STATUS_COLORS = {
  'In Progress': { bg: 'rgba(200,105,42,0.1)',  color: '#c8692a' },
  'Review':      { bg: 'rgba(74,122,200,0.1)',  color: '#4a7ac8' },
  'Completed':   { bg: 'rgba(42,140,64,0.1)',   color: '#2a8c40' },
  'Draft':       { bg: 'rgba(120,110,100,0.1)', color: '#7a6a5a' },
}

function Tab({ label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.65rem 1.2rem',
        fontFamily: 'var(--font-label)',
        fontSize: '0.65rem', fontWeight: 600,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        background: 'none', border: 'none',
        borderBottom: active
          ? '2px solid #c8692a' : '2px solid transparent',
        color: active ? '#c8692a' : 'rgba(60,30,10,0.4)',
        cursor: 'pointer', transition: 'all 0.2s ease',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}
    >
      {label}
      {badge > 0 && (
        <span style={{
          background: '#c8692a', color: '#fdf7ed',
          borderRadius: 10, padding: '0.1rem 0.45rem',
          fontSize: '0.55rem', fontWeight: 700,
        }}>{badge}</span>
      )}
    </button>
  )
}

function FeedbackCard({ fb, onResolve }) {
  const typeColor = fb.type === 'change'
    ? '#c8692a' : fb.type === 'approval' ? '#2a8c40' : '#4a7ac8'

  return (
    <div style={{
      background: fb.resolved
        ? 'rgba(42,140,64,0.04)' : 'rgba(255,252,246,0.95)',
      border: `1px solid ${fb.resolved
        ? 'rgba(42,140,64,0.15)' : 'rgba(200,160,100,0.18)'}`,
      borderRadius: 6, padding: '1rem',
      marginBottom: '0.75rem',
      opacity: fb.resolved ? 0.7 : 1,
      transition: 'all 0.2s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', marginBottom: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `${typeColor}20`,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem', fontWeight: 700, color: typeColor,
          }}>{fb.author[0]}</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem', fontWeight: 500, color: '#2c1a0e',
            }}>{fb.author}</div>
            <div style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.56rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: typeColor,
            }}>{fb.room} · {fb.type}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.56rem', color: 'rgba(60,30,10,0.35)',
            letterSpacing: '0.1em',
          }}>{fb.time}</span>
          {!fb.resolved && (
            <button
              onClick={() => onResolve(fb.id)}
              style={{
                padding: '0.25rem 0.6rem',
                fontFamily: 'var(--font-label)',
                fontSize: '0.56rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                background: 'rgba(42,140,64,0.1)',
                border: '1px solid rgba(42,140,64,0.3)',
                borderRadius: 3, color: '#2a8c40',
                cursor: 'pointer',
              }}
            >Resolve</button>
          )}
          {fb.resolved && (
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.56rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#2a8c40',
            }}>✓ Resolved</span>
          )}
        </div>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.82rem', color: 'rgba(60,30,10,0.65)',
        lineHeight: 1.6, margin: 0,
      }}>{fb.message}</p>
    </div>
  )
}

export default function ProjectWorkspace() {
  const {
    activeProject, setActiveProject,
    goBack, openWalkthrough,
    projects, setProjects,
  } = useApp()

  const [activeTab, setActiveTab] = useState('overview')
  const [note, setNote]           = useState(activeProject?.notes || '')

  if (!activeProject) {
    goBack()
    return null
  }

  const status = STATUS_COLORS[activeProject.status] || STATUS_COLORS['Draft']

  const resolveFeedback = (fbId) => {
    const updated = {
      ...activeProject,
      feedbacks: activeProject.feedbacks.map(f =>
        f.id === fbId ? { ...f, resolved: true } : f
      ),
    }
    setActiveProject(updated)
    setProjects(prev => prev.map(p =>
      p.id === updated.id ? updated : p
    ))
  }

  const saveNote = () => {
    const updated = { ...activeProject, notes: note }
    setActiveProject(updated)
    setProjects(prev => prev.map(p =>
      p.id === updated.id ? updated : p
    ))
  }

  const unresolvedCount = activeProject.feedbacks?.filter(f => !f.resolved).length || 0

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#f5ede0',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }}>

      {/* ── Top bar ──────────────────────────────── */}
      <div style={{
        background: 'rgba(255,252,246,0.97)',
        borderBottom: '1px solid rgba(200,160,100,0.15)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center',
        gap: '1rem', flexShrink: 0,
      }}>

        {/* Back */}
        <button
          onClick={goBack}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '1.2rem 0',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(60,30,10,0.45)',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#c8692a'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(60,30,10,0.45)'}
        >
          ← Dashboard
        </button>

        <div style={{
          width: 1, height: 20,
          background: 'rgba(200,160,100,0.2)',
        }}/>

        {/* Breadcrumb */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem', fontWeight: 700,
            color: '#2c1a0e',
          }}>{activeProject.name}</div>
          <div style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.58rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(60,30,10,0.4)',
          }}>
            {activeProject.type} · {activeProject.location}
          </div>
        </div>

        {/* Status badge */}
        <div style={{
          background: status.bg,
          borderRadius: 20, padding: '0.3rem 0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          border: `1px solid ${status.color}30`,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: status.color,
          }}/>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.6rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: status.color,
          }}>{activeProject.status}</span>
        </div>

        {/* Launch walkthrough */}
        <button
          onClick={() => openWalkthrough(activeProject)}
          style={{
            background: 'linear-gradient(135deg,#c8692a,#e8a060)',
            border: 'none', borderRadius: 6,
            padding: '0.6rem 1.4rem',
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#fdf7ed', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(200,105,42,0.3)',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'all 0.22s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          ▶ Launch Walkthrough
        </button>

        {/* Share */}
        <button style={{
          background: 'transparent',
          border: '1px solid rgba(200,160,100,0.25)',
          borderRadius: 6, padding: '0.6rem 1rem',
          fontFamily: 'var(--font-label)',
          fontSize: '0.65rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(60,30,10,0.5)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
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
        >
          ⎋ Share
        </button>
      </div>

      {/* ── Tabs ─────────────────────────────────── */}
      <div style={{
        background: 'rgba(255,252,246,0.97)',
        borderBottom: '1px solid rgba(200,160,100,0.12)',
        padding: '0 2rem',
        display: 'flex', gap: '0.25rem',
        flexShrink: 0,
      }}>
        <Tab label="Overview"  active={activeTab==='overview'}  onClick={()=>setActiveTab('overview')} />
        <Tab label="Rooms"     active={activeTab==='rooms'}     onClick={()=>setActiveTab('rooms')} />
        <Tab label="Feedback"  active={activeTab==='feedback'}  onClick={()=>setActiveTab('feedback')}  badge={unresolvedCount} />
        <Tab label="Notes"     active={activeTab==='notes'}     onClick={()=>setActiveTab('notes')} />
        <Tab label="Materials" active={activeTab==='materials'} onClick={()=>setActiveTab('materials')} />
        <Tab label="Share"     active={activeTab==='share'}     onClick={()=>setActiveTab('share')} />
      </div>

      {/* ── Body ─────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '1.75rem 2rem',
      }}>

        {/* ── OVERVIEW TAB ─────────────────────── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

            {/* Progress card */}
            <div style={{
              background: 'rgba(255,252,246,0.95)',
              border: '1px solid rgba(200,160,100,0.18)',
              borderRadius: 8, padding: '1.4rem',
              gridColumn: '1/-1',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '1rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem', fontWeight: 700, color: '#2c1a0e',
                }}>Project Progress</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem', fontWeight: 700, color: '#c8692a',
                }}>{activeProject.progress}%</div>
              </div>
              <div style={{
                height: 8, background: 'rgba(200,160,100,0.15)',
                borderRadius: 4, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${activeProject.progress}%`,
                  background: 'linear-gradient(90deg,#c8692a,#e8b688)',
                  borderRadius: 4, transition: 'width 1s ease',
                }}/>
              </div>

              {/* Progress stages */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginTop: '0.75rem',
              }}>
                {['Design','3D Model','Walkthrough','Review','Approved'].map((stage, i) => {
                  const stageProgress = (i + 1) * 20
                  const done = activeProject.progress >= stageProgress
                  return (
                    <div key={stage} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: done ? '#c8692a' : 'rgba(200,160,100,0.2)',
                        border: `2px solid ${done ? '#c8692a' : 'rgba(200,160,100,0.3)'}`,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 0.3rem',
                        fontSize: 10, color: done ? '#fdf7ed' : 'rgba(60,30,10,0.3)',
                        fontWeight: 700,
                      }}>{done ? '✓' : i+1}</div>
                      <div style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.54rem', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: done ? '#c8692a' : 'rgba(60,30,10,0.3)',
                      }}>{stage}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Client info */}
            <div style={{
              background: 'rgba(255,252,246,0.95)',
              border: '1px solid rgba(200,160,100,0.18)',
              borderRadius: 8, padding: '1.4rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem', fontWeight: 700,
                color: '#2c1a0e', marginBottom: '1rem',
              }}>Client Details</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#c8692a,#e8b688)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem', fontWeight: 700, color: '#fdf7ed',
                }}>{activeProject.client[0]}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem', fontWeight: 600, color: '#2c1a0e',
                  }}>{activeProject.client}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem', color: 'rgba(60,30,10,0.45)',
                  }}>{activeProject.clientEmail}</div>
                </div>
              </div>

              {[
                { label: 'Project Type',   value: activeProject.type     },
                { label: 'Location',       value: activeProject.location },
                { label: 'Last Updated',   value: activeProject.lastUpdated },
                { label: 'Open Feedback',  value: `${unresolvedCount} items` },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(200,160,100,0.08)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.6rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(60,30,10,0.4)',
                  }}>{row.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem', color: '#2c1a0e',
                  }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{
              background: 'rgba(255,252,246,0.95)',
              border: '1px solid rgba(200,160,100,0.18)',
              borderRadius: 8, padding: '1.4rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem', fontWeight: 700,
                color: '#2c1a0e', marginBottom: '1rem',
              }}>Quick Actions</div>

              {[
                { icon: '▶', label: 'Launch 3D Walkthrough', accent: true,  onClick: () => openWalkthrough(activeProject) },
                { icon: '⎋', label: 'Share with Client',     accent: false, onClick: () => setActiveTab('share')    },
                { icon: '💬', label: 'View Feedback',         accent: false, onClick: () => setActiveTab('feedback') },
                { icon: '✎', label: 'Edit Project Notes',    accent: false, onClick: () => setActiveTab('notes')    },
                { icon: '🎨', label: 'Manage Materials',      accent: false, onClick: () => setActiveTab('materials')},
              ].map(action => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  style={{
                    width: '100%', marginBottom: '0.5rem',
                    padding: '0.65rem 1rem',
                    background: action.accent
                      ? 'linear-gradient(135deg,#c8692a,#e8a060)'
                      : 'rgba(240,230,215,0.5)',
                    border: action.accent
                      ? 'none'
                      : '1px solid rgba(200,160,100,0.2)',
                    borderRadius: 5,
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem', fontWeight: 500,
                    color: action.accent ? '#fdf7ed' : '#2c1a0e',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: action.accent ? '0 4px 12px rgba(200,105,42,0.25)' : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!action.accent) e.currentTarget.style.background = 'rgba(200,105,42,0.08)'
                    e.currentTarget.style.transform = 'translateX(2px)'
                  }}
                  onMouseLeave={e => {
                    if (!action.accent) e.currentTarget.style.background = 'rgba(240,230,215,0.5)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── ROOMS TAB ────────────────────────── */}
        {activeTab === 'rooms' && (
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem', fontWeight: 700,
              color: '#2c1a0e', marginBottom: '1rem',
            }}>Room Overview</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}>
              {activeProject.rooms.map((room, i) => (
                <div
                  key={room}
                  style={{
                    background: 'rgba(255,252,246,0.95)',
                    border: '1px solid rgba(200,160,100,0.18)',
                    borderRadius: 8, padding: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                  }}
                  onClick={() => openWalkthrough(activeProject)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,105,42,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,160,100,0.18)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>
                    {['🛋️','🍳','🛏️','🛁','🏡','📚','🌿'][i % 7]}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem', fontWeight: 700,
                    color: '#2c1a0e', marginBottom: '0.25rem',
                  }}>{room}</div>
                  <div style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.58rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#c8692a',
                  }}>Click to explore →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FEEDBACK TAB ─────────────────────── */}
        {activeTab === 'feedback' && (
          <div style={{ maxWidth: 680 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '1.25rem',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem', fontWeight: 700, color: '#2c1a0e',
                }}>Client Feedback</div>
                <div style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.58rem', fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: unresolvedCount > 0 ? '#c8692a' : 'rgba(60,30,10,0.35)',
                }}>
                  {unresolvedCount} unresolved · {activeProject.feedbacks?.length || 0} total
                </div>
              </div>
            </div>

            {activeProject.feedbacks?.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '3rem',
                color: 'rgba(60,30,10,0.35)',
                background: 'rgba(255,252,246,0.6)',
                borderRadius: 8,
                border: '1px solid rgba(200,160,100,0.15)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem',
                }}>No feedback yet</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
                  Share the walkthrough link with your client to collect feedback
                </div>
              </div>
            ) : (
              activeProject.feedbacks.map(fb => (
                <FeedbackCard key={fb.id} fb={fb} onResolve={resolveFeedback} />
              ))
            )}
          </div>
        )}

        {/* ── NOTES TAB ────────────────────────── */}
        {activeTab === 'notes' && (
          <div style={{ maxWidth: 620 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem', fontWeight: 700,
              color: '#2c1a0e', marginBottom: '1rem',
            }}>Project Notes</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add your project notes, client preferences, design decisions..."
              style={{
                width: '100%', height: 260,
                padding: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem', lineHeight: 1.7,
                color: '#2c1a0e',
                background: 'rgba(255,252,246,0.95)',
                border: '1.5px solid rgba(200,160,100,0.2)',
                borderRadius: 6, outline: 'none', resize: 'vertical',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(200,105,42,0.4)'}
              onBlur={e  => e.target.style.borderColor = 'rgba(200,160,100,0.2)'}
            />
            <button
              onClick={saveNote}
              style={{
                marginTop: '0.75rem',
                padding: '0.65rem 1.6rem',
                background: 'linear-gradient(135deg,#c8692a,#e8a060)',
                border: 'none', borderRadius: 4,
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fdf7ed', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(200,105,42,0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >Save Notes</button>
          </div>
        )}

        {/* ── MATERIALS TAB ────────────────────── */}
        {activeTab === 'materials' && (
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem', fontWeight: 700,
              color: '#2c1a0e', marginBottom: '1rem',
            }}>Material Presets</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem',
            }}>
              {[
                { name: 'Walls',    options: ['Warm White','Cream','Sand','Ivory'],        colors: ['#f2ede4','#fdf7ed','#e8d5b8','#f5f0e0'] },
                { name: 'Flooring', options: ['Teak Wood','Walnut','Marble','Granite'],    colors: ['#8b5e3c','#5a3820','#e8e2d8','#9a9088'] },
                { name: 'Roof',     options: ['Charcoal','Dark Gray','Slate','Concrete'],  colors: ['#4a4540','#3a3530','#5a5550','#c4c0b8'] },
                { name: 'Accents',  options: ['Terracotta','Brass','Teak','Stone'],        colors: ['#c8692a','#c8a040','#7a4e2d','#b8a898'] },
              ].map(category => (
                <div key={category.name} style={{
                  background: 'rgba(255,252,246,0.95)',
                  border: '1px solid rgba(200,160,100,0.18)',
                  borderRadius: 8, padding: '1.1rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.6rem', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(60,30,10,0.5)', marginBottom: '0.75rem',
                  }}>{category.name}</div>
                  {category.options.map((opt, i) => (
                    <div key={opt} style={{
                      display: 'flex', alignItems: 'center',
                      gap: '0.5rem', marginBottom: '0.4rem',
                      cursor: 'pointer',
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 3,
                        background: category.colors[i],
                        border: '1px solid rgba(200,160,100,0.2)',
                        flexShrink: 0,
                      }}/>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem', color: 'rgba(60,30,10,0.6)',
                      }}>{opt}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SHARE TAB ────────────────────────── */}
        {activeTab === 'share' && (
          <div style={{ maxWidth: 560 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem', fontWeight: 700,
              color: '#2c1a0e', marginBottom: '1rem',
            }}>Share Walkthrough</div>

            <div style={{
              background: 'rgba(255,252,246,0.95)',
              border: '1px solid rgba(200,160,100,0.18)',
              borderRadius: 8, padding: '1.5rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.6rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(60,30,10,0.45)', marginBottom: '0.6rem',
              }}>Walkthrough Link</div>
              <div style={{
                display: 'flex', gap: '0.5rem',
              }}>
                <div style={{
                  flex: 1, padding: '0.65rem 0.9rem',
                  background: 'rgba(240,230,215,0.5)',
                  border: '1px solid rgba(200,160,100,0.2)',
                  borderRadius: 5,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem', color: 'rgba(60,30,10,0.5)',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  illamviz.app/walk/{activeProject.id}
                </div>
                <button style={{
                  padding: '0.65rem 1rem',
                  background: 'rgba(200,105,42,0.1)',
                  border: '1px solid rgba(200,105,42,0.25)',
                  borderRadius: 5,
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.62rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#c8692a', cursor: 'pointer',
                }}>Copy</button>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,252,246,0.95)',
              border: '1px solid rgba(200,160,100,0.18)',
              borderRadius: 8, padding: '1.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.6rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(60,30,10,0.45)', marginBottom: '0.6rem',
              }}>Send to Client</div>
              <div style={{
                padding: '0.75rem',
                background: 'rgba(200,105,42,0.06)',
                border: '1px solid rgba(200,105,42,0.15)',
                borderRadius: 5, marginBottom: '0.75rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#c8692a,#e8b688)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 12,
                  fontWeight: 700, color: '#fdf7ed',
                }}>{activeProject.client[0]}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem', fontWeight: 500, color: '#2c1a0e',
                  }}>{activeProject.client}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem', color: 'rgba(60,30,10,0.4)',
                  }}>{activeProject.clientEmail}</div>
                </div>
              </div>
              <button style={{
                width: '100%', padding: '0.65rem',
                background: 'linear-gradient(135deg,#c8692a,#e8a060)',
                border: 'none', borderRadius: 5,
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fdf7ed', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(200,105,42,0.25)',
              }}>Send Walkthrough Invite</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}