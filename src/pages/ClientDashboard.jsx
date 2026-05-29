import { useState } from 'react'
import { useApp }   from '../context/AppContext'

// ── Shared styles ─────────────────────────────────────
const S = {
  card: {
    background: 'rgba(255,252,246,0.95)',
    border: '1px solid rgba(200,160,100,0.18)',
    borderRadius: 10,
    boxShadow: '0 2px 16px rgba(180,120,60,0.07)',
  },
  label: {
    fontFamily: 'var(--font-label)',
    fontSize: '0.6rem', fontWeight: 600,
    letterSpacing: '0.18em', textTransform: 'uppercase',
  },
  display: {
    fontFamily: 'var(--font-display)',
  },
  body: {
    fontFamily: 'var(--font-body)',
  },
}

// ── Room data ─────────────────────────────────────────


const MATERIALS = [
  {
    category: 'Wall Finish',
    selected: 'Warm White Plaster',
    options: [
      { name: 'Warm White',  color: '#f2ede4', selected: true  },
      { name: 'Cream',       color: '#fdf7ed', selected: false },
      { name: 'Sand',        color: '#e8d5b8', selected: false },
      { name: 'Blush',       color: '#f0ddd5', selected: false },
    ]
  },
  {
    category: 'Flooring',
    selected: 'Teak Wood',
    options: [
      { name: 'Teak Wood',  color: '#8b5e3c', selected: true  },
      { name: 'Walnut',     color: '#5a3820', selected: false },
      { name: 'Marble',     color: '#e8e2d8', selected: false },
      { name: 'Granite',    color: '#9a9088', selected: false },
    ]
  },
  {
    category: 'Roof Finish',
    selected: 'Charcoal Flat',
    options: [
      { name: 'Charcoal',   color: '#4a4540', selected: true  },
      { name: 'Dark Slate', color: '#3a3530', selected: false },
      { name: 'Cream',      color: '#f0ece4', selected: false },
      { name: 'Concrete',   color: '#b8b0a4', selected: false },
    ]
  },
  {
    category: 'Accent',
    selected: 'Terracotta',
    options: [
      { name: 'Terracotta', color: '#c8692a', selected: true  },
      { name: 'Teak',       color: '#7a4e2d', selected: false },
      { name: 'Brass',      color: '#c8a040', selected: false },
      { name: 'Stone',      color: '#b8a898', selected: false },
    ]
  },
]

const FEEDBACKS = [
  { id: 1, room: 'Living Room',    message: 'Can we change the flooring to marble instead of teak?', time: '2 hours ago',  status: 'Reviewed',  type: 'change'   },
  { id: 2, room: 'Balcony',       message: 'The railing design looks beautiful! Approved.',          time: '1 day ago',   status: 'Resolved',  type: 'approval' },
  { id: 3, room: 'Kitchen',       message: 'Please make the cabinet color slightly darker.',         time: '2 days ago',  status: 'Pending',   type: 'change'   },
  { id: 4, room: 'Master Bedroom',message: 'Love the walnut flooring choice!',                       time: '3 days ago',  status: 'Resolved',  type: 'approval' },
]

const UPDATES = [
  { title: 'Kitchen countertop finalized',    time: '2h ago',  icon: '🍳', type: 'update'   },
  { title: 'Balcony railing design approved', time: '1d ago',  icon: '✓',  type: 'approved' },
  { title: 'Master bedroom layout updated',   time: '2d ago',  icon: '🛏️', type: 'update'   },
  { title: 'Walkthrough video ready',         time: '3d ago',  icon: '▶',  type: 'media'    },
]

// ── Status badge ──────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    'Approved':    { bg: 'rgba(42,140,64,0.1)',   color: '#2a8c40' },
    'In Review':   { bg: 'rgba(74,122,200,0.1)',  color: '#4a7ac8' },
    'In Progress': { bg: 'rgba(200,105,42,0.1)',  color: '#c8692a' },
    'Pending':     { bg: 'rgba(120,110,100,0.1)', color: '#7a6a5a' },
    'Reviewed':    { bg: 'rgba(74,122,200,0.1)',  color: '#4a7ac8' },
    'Resolved':    { bg: 'rgba(42,140,64,0.1)',   color: '#2a8c40' },
  }
  const s = map[status] || map['Pending']
  return (
    <span style={{
      ...S.label, fontSize: '0.55rem',
      background: s.bg, color: s.color,
      borderRadius: 20, padding: '0.2rem 0.6rem',
      border: `1px solid ${s.color}30`,
    }}>{status}</span>
  )
}

// ── Room card ─────────────────────────────────────────
function RoomCard({ room, onExplore }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...S.card,
        padding: '1.2rem',
        cursor: 'pointer',
        transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover
          ? '0 12px 32px rgba(180,120,60,0.14)'
          : '0 2px 16px rgba(180,120,60,0.07)',
        borderColor: hover ? 'rgba(200,105,42,0.3)' : 'rgba(200,160,100,0.18)',
      }}
    >
      {/* Room icon + status */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '0.75rem',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 8,
          background: 'linear-gradient(135deg, #f0e8d8, #e8d8c0)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.4rem',
        }}>{room.icon}</div>
        <StatusBadge status={room.status} />
      </div>

      {/* Name */}
      <div style={{
        ...S.display, fontSize: '1rem', fontWeight: 700,
        color: '#2c1a0e', marginBottom: '0.25rem',
      }}>{room.name}</div>

      {/* Note */}
      <p style={{
        ...S.body, fontSize: '0.76rem',
        color: 'rgba(60,30,10,0.5)', lineHeight: 1.55,
        marginBottom: '0.85rem',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{room.note}</p>

      {/* Progress */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: '0.3rem',
        }}>
          <span style={{
            ...S.label, fontSize: '0.54rem',
            color: 'rgba(60,30,10,0.35)',
          }}>Progress</span>
          <span style={{
            ...S.label, fontSize: '0.56rem', color: '#c8692a',
          }}>{room.progress}%</span>
        </div>
        <div style={{
          height: 4, background: 'rgba(200,160,100,0.15)',
          borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${room.progress}%`,
            background: 'linear-gradient(90deg,#c8692a,#e8b688)',
            borderRadius: 2,
          }}/>
        </div>
      </div>

      {/* Explore button */}
      <button
        onClick={() => onExplore(room)}
        style={{
          width: '100%', padding: '0.5rem',
          background: hover
            ? 'linear-gradient(135deg,#c8692a,#e8a060)'
            : 'rgba(200,105,42,0.08)',
          border: `1px solid ${hover ? 'transparent' : 'rgba(200,105,42,0.2)'}`,
          borderRadius: 5, cursor: 'pointer',
          ...S.label, fontSize: '0.6rem',
          color: hover ? '#fdf7ed' : '#c8692a',
          transition: 'all 0.25s ease',
          boxShadow: hover ? '0 4px 12px rgba(200,105,42,0.25)' : 'none',
        }}
      >Explore Room →</button>
    </div>
  )
}

// ── Material card ─────────────────────────────────────
function MaterialCard({ category, selected, options, onSelect }) {
  return (
    <div style={{ ...S.card, padding: '1.25rem' }}>
      <div style={{
        ...S.label, color: 'rgba(60,30,10,0.45)',
        marginBottom: '0.4rem',
      }}>{category}</div>
      <div style={{
        ...S.display, fontSize: '0.95rem', fontWeight: 700,
        color: '#2c1a0e', marginBottom: '1rem',
      }}>{selected}</div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {options.map(opt => (
          <div
            key={opt.name}
            onClick={() => onSelect(opt.name)}
            title={opt.name}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 6,
              background: opt.color,
              border: opt.selected
                ? '2.5px solid #c8692a'
                : '2px solid rgba(200,160,100,0.2)',
              boxShadow: opt.selected
                ? '0 0 0 3px rgba(200,105,42,0.15)' : 'none',
              marginBottom: '0.25rem',
            }}/>
            <div style={{
              ...S.label, fontSize: '0.48rem',
              color: opt.selected ? '#c8692a' : 'rgba(60,30,10,0.4)',
              textAlign: 'center', maxWidth: 36,
              overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{opt.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tab bar ───────────────────────────────────────────
function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 0,
      borderBottom: '1px solid rgba(200,160,100,0.15)',
      background: 'rgba(255,252,246,0.97)',
      padding: '0 2rem', flexShrink: 0,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: '0.75rem 1.1rem',
            ...S.label, fontSize: '0.62rem',
            background: 'none', border: 'none',
            borderBottom: active === tab.id
              ? '2px solid #c8692a' : '2px solid transparent',
            color: active === tab.id
              ? '#c8692a' : 'rgba(60,30,10,0.4)',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            marginBottom: -1,
          }}
        >
          {tab.icon} {tab.label}
          {tab.badge > 0 && (
            <span style={{
              background: '#c8692a', color: '#fdf7ed',
              borderRadius: 10, padding: '0.08rem 0.4rem',
              fontSize: '0.52rem', fontWeight: 700,
            }}>{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Main export ───────────────────────────────────────
export default function ClientDashboard() {
  const {
    user, project,
    openWalkthrough, goTo,
    addFeedback, selectMaterial,
  } = useApp()
  const [activeTab,    setActiveTab]    = useState('home')
  const [newFeedback,  setNewFeedback]  = useState('')
  const [newRoom,      setNewRoom]      = useState('Living Room')
  const [approvalNote, setApprovalNote] = useState('')
  const [approved,     setApproved]     = useState(false)

  const feedbacks = project.feedbacks
  const materials = project.materials
  // Use first project as "assigned project"

  const pendingCount = feedbacks.filter(f => f.status === 'Pending').length
  const TABS = [
    { id: 'home',      icon: '🏠', label: 'Home'      },
    { id: 'rooms',     icon: '🪟', label: 'Rooms'     },
    { id: 'walkthrough',icon:'▶',  label: 'Walkthrough'},
    { id: 'feedback',  icon: '💬', label: 'Feedback',  badge: pendingCount },
    { id: 'materials', icon: '🎨', label: 'Materials'  },
    { id: 'approvals', icon: '✓',  label: 'Approvals'  },
  ]

  const handleMaterialSelect = (categoryIdx, optionName) => {
  selectMaterial(categoryIdx, optionName)
}

const handleAddFeedback = () => {
  if (!newFeedback.trim()) return
  addFeedback(newRoom, newFeedback.trim())
  setNewFeedback('')
}

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#f5ede0',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }}>

      {/* ══ TOP BAR ════════════════════════════════ */}
      <div style={{
        background: 'rgba(255,252,246,0.97)',
        borderBottom: '1px solid rgba(200,160,100,0.15)',
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <div style={{
            width:32, height:32, borderRadius:4, flexShrink:0,
            background:'linear-gradient(135deg,#c8692a,#e8b688)',
            display:'flex', alignItems:'center', justifyContent:'center',
            ...S.display, fontWeight:700, fontSize:15, color:'#fdf7ed',
          }}>I</div>
          <div>
            <div style={{
              ...S.display, fontSize:'1rem', fontWeight:700,
              color:'#2c1a0e', letterSpacing:'0.04em',
            }}>IllamViz</div>
            <div style={{
              ...S.label, fontSize:'0.5rem',
              color:'rgba(60,30,10,0.38)',
            }}>Client Portal</div>
          </div>
        </div>

        {/* Project name */}
        <div style={{ textAlign:'center' }}>
          <div style={{
            ...S.display, fontSize:'1rem', fontWeight:700, color:'#2c1a0e',
          }}>{project?.name}</div>
          <div style={{
            ...S.label, fontSize:'0.56rem', color:'rgba(60,30,10,0.4)',
          }}>{project?.type} · {project?.location}</div>
        </div>

        {/* User + logout */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{ textAlign:'right' }}>
            <div style={{
              ...S.body, fontSize:'0.82rem', fontWeight:500, color:'#2c1a0e',
            }}>{user?.name}</div>
            <div style={{
              ...S.label, fontSize:'0.54rem', color:'rgba(60,30,10,0.38)',
            }}>Home Owner</div>
          </div>
          <div style={{
            width:34, height:34, borderRadius:'50%', flexShrink:0,
            background:'linear-gradient(135deg,#c8692a,#e8b688)',
            display:'flex', alignItems:'center', justifyContent:'center',
            ...S.display, fontWeight:700, fontSize:14, color:'#fdf7ed',
          }}>{user?.name?.[0]?.toUpperCase() || 'C'}</div>
          <button
            onClick={() => goTo('role-select')}
            style={{
              background:'none',
              border:'1px solid rgba(200,160,100,0.2)',
              borderRadius:4, padding:'0.35rem 0.7rem',
              ...S.label, fontSize:'0.56rem',
              color:'rgba(60,30,10,0.38)', cursor:'pointer',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#c8692a'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(60,30,10,0.38)'}
          >Sign Out</button>
        </div>
      </div>

      {/* ══ TAB BAR ════════════════════════════════ */}
      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {/* ══ BODY ═══════════════════════════════════ */}
      <div style={{ flex:1, overflowY:'auto', padding:'1.75rem 2rem' }}>

        {/* ════════════════════════════════════════ */}
        {/*  HOME TAB                               */}
        {/* ════════════════════════════════════════ */}
        {activeTab === 'home' && (
          <div>
            {/* Welcome hero */}
            <div style={{
              ...S.card,
              padding:'2rem 2.5rem',
              marginBottom:'1.5rem',
              background:'linear-gradient(135deg, rgba(255,252,246,0.98) 0%, rgba(248,240,228,0.95) 100%)',
              display:'flex', alignItems:'center',
              justifyContent:'space-between',
              flexWrap:'wrap', gap:'1.5rem',
            }}>
              <div>
                <div style={{
                  ...S.label, fontSize:'0.62rem',
                  color:'var(--text-accent)', marginBottom:'0.5rem',
                }}>Welcome back</div>
                <h1 style={{
                  ...S.display,
                  fontSize:'clamp(1.8rem,3vw,2.6rem)',
                  fontWeight:300, fontStyle:'italic',
                  color:'#2c1a0e', lineHeight:1.1,
                  marginBottom:'0.1rem',
                }}>Your dream home is</h1>
                <h1 style={{
                  ...S.display,
                  fontSize:'clamp(1.8rem,3vw,2.6rem)',
                  fontWeight:700, color:'#2c1a0e',
                  lineHeight:1.1, marginBottom:'1rem',
                }}>
                  <span style={{
                    background:'linear-gradient(135deg,#c8692a,#e8b688)',
                    WebkitBackgroundClip:'text',
                    WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                  }}>{project?.progress}% complete</span>
                </h1>
                <p style={{
                  ...S.body, fontSize:'0.88rem',
                  color:'rgba(60,30,10,0.55)', lineHeight:1.7,
                  maxWidth:400, marginBottom:'1.5rem',
                }}>
                  Your {project?.type} in {project?.location} is progressing beautifully.
                  Explore the latest updates and share your thoughts.
                </p>
                <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                  <button
                    onClick={() => openWalkthrough(project)}
                    style={{
                      background:'linear-gradient(135deg,#c8692a,#e8a060)',
                      border:'none', borderRadius:5,
                      padding:'0.7rem 1.6rem',
                      ...S.label, fontSize:'0.65rem',
                      color:'#fdf7ed', cursor:'pointer',
                      boxShadow:'0 6px 18px rgba(200,105,42,0.3)',
                      transition:'all 0.22s ease',
                      display:'flex', alignItems:'center', gap:'0.4rem',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                  >▶ Enter Walkthrough</button>
                  <button
                    onClick={() => setActiveTab('feedback')}
                    style={{
                      background:'transparent',
                      border:'1.5px solid rgba(200,105,42,0.3)',
                      borderRadius:5, padding:'0.7rem 1.4rem',
                      ...S.label, fontSize:'0.65rem',
                      color:'#c8692a', cursor:'pointer',
                      transition:'all 0.22s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background='rgba(200,105,42,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background='transparent'
                    }}
                  >💬 Give Feedback</button>
                </div>
              </div>

              {/* Progress ring */}
              <div style={{ textAlign:'center', flexShrink:0 }}>
                <svg width={130} height={130} viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52"
                    fill="none" stroke="rgba(200,160,100,0.15)" strokeWidth="10"/>
                  <circle cx="60" cy="60" r="52"
                    fill="none" stroke="#c8692a" strokeWidth="10"
                    strokeDasharray={`${2*Math.PI*52*project?.progress/100} ${2*Math.PI*52}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition:'stroke-dasharray 1s ease' }}
                  />
                  <text x="60" y="55" textAnchor="middle"
                    style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, fill:'#2c1a0e' }}>
                    {project?.progress}%
                  </text>
                  <text x="60" y="72" textAnchor="middle"
                    style={{ fontFamily:'var(--font-label)', fontSize:8, fill:'rgba(60,30,10,0.45)', letterSpacing:2 }}>
                    COMPLETE
                  </text>
                </svg>
                <div style={{
                  ...S.label, fontSize:'0.56rem',
                  color:'rgba(60,30,10,0.4)', marginTop:'0.3rem',
                }}>Last updated {project?.lastUpdated}</div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(4, 1fr)',
              gap:'1rem', marginBottom:'1.5rem',
            }}>
              {[
                { label:'Rooms Approved', value: project.rooms.filter(r=>r.status==='Approved').length,   icon:'✓',  color:'#2a8c40' },
                { label:'In Progress',    value: project.rooms.filter(r=>r.status==='In Progress').length,icon:'🏗', color:'#c8692a' },
                { label:'Your Feedback',   value: feedbacks.length,                                  icon:'💬', color:'#4a7ac8' },
                { label:'Days to Review',  value: 12,                                                icon:'📅', color:'#8a4ac8' },
              ].map(stat => (
                <div key={stat.label} style={{
                  ...S.card, padding:'1.1rem 1.25rem',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
                    <span style={{
                      ...S.label, fontSize:'0.56rem',
                      color:'rgba(60,30,10,0.4)',
                    }}>{stat.label}</span>
                    <span style={{ fontSize:'1rem' }}>{stat.icon}</span>
                  </div>
                  <div style={{
                    ...S.display, fontSize:'1.8rem',
                    fontWeight:700, color:stat.color, lineHeight:1,
                  }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Two column */}
            <div style={{
              display:'grid', gridTemplateColumns:'1fr 300px',
              gap:'1.25rem',
            }}>

              {/* Progress stages */}
              <div style={{ ...S.card, padding:'1.4rem' }}>
                <div style={{
                  ...S.display, fontSize:'1rem', fontWeight:700,
                  color:'#2c1a0e', marginBottom:'1.25rem',
                }}>Design Journey</div>
                {[
                  { stage:'Initial Design',   done:true,  date:'Mar 15' },
                  { stage:'3D Modeling',       done:true,  date:'Apr 2'  },
                  { stage:'Walkthrough Ready', done:true,  date:'Apr 18' },
                  { stage:'Client Review',     done:false, date:'May 20' },
                  { stage:'Final Approval',    done:false, date:'Jun 1'  },
                ].map((step, i, arr) => (
                  <div key={step.stage} style={{
                    display:'flex', alignItems:'flex-start', gap:'0.85rem',
                    marginBottom: i < arr.length-1 ? '0' : '0',
                  }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                      <div style={{
                        width:28, height:28, borderRadius:'50%', flexShrink:0,
                        background: step.done
                          ? 'linear-gradient(135deg,#c8692a,#e8b688)'
                          : 'rgba(200,160,100,0.15)',
                        border: `2px solid ${step.done ? '#c8692a' : 'rgba(200,160,100,0.3)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:11, color: step.done ? '#fdf7ed' : 'rgba(60,30,10,0.3)',
                        fontWeight:700,
                      }}>{step.done ? '✓' : i+1}</div>
                      {i < arr.length-1 && (
                        <div style={{
                          width:2, height:32,
                          background: step.done
                            ? 'rgba(200,105,42,0.3)' : 'rgba(200,160,100,0.15)',
                        }}/>
                      )}
                    </div>
                    <div style={{ paddingTop:4, paddingBottom: i < arr.length-1 ? 0 : 0 }}>
                      <div style={{
                        ...S.body, fontSize:'0.85rem',
                        fontWeight: step.done ? 500 : 400,
                        color: step.done ? '#2c1a0e' : 'rgba(60,30,10,0.38)',
                        marginBottom:'0.1rem',
                      }}>{step.stage}</div>
                      <div style={{
                        ...S.label, fontSize:'0.54rem',
                        color: step.done ? '#c8692a' : 'rgba(60,30,10,0.3)',
                      }}>{step.date}</div>
                      {i < arr.length-1 && <div style={{ height:16 }}/>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architect updates */}
              <div style={{ ...S.card, padding:'1.4rem' }}>
                <div style={{
                  ...S.display, fontSize:'1rem', fontWeight:700,
                  color:'#2c1a0e', marginBottom:'1rem',
                }}>Architect Updates</div>
                {UPDATES.map((u, i) => (
                  <div key={i} style={{
                    display:'flex', gap:'0.65rem',
                    padding:'0.7rem 0',
                    borderBottom: i < UPDATES.length-1
                      ? '1px solid rgba(200,160,100,0.1)' : 'none',
                  }}>
                    <div style={{
                      width:30, height:30, borderRadius:6, flexShrink:0,
                      background: u.type === 'approved'
                        ? 'rgba(42,140,64,0.1)'
                        : 'rgba(200,105,42,0.08)',
                      display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'0.9rem',
                    }}>{u.icon}</div>
                    <div>
                      <div style={{
                        ...S.body, fontSize:'0.79rem',
                        color:'#2c1a0e', lineHeight:1.4,
                        marginBottom:'0.18rem',
                      }}>{u.title}</div>
                      <div style={{
                        ...S.label, fontSize:'0.54rem',
                        color:'rgba(60,30,10,0.35)',
                      }}>{u.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ */}
        {/*  ROOMS TAB                              */}
        {/* ════════════════════════════════════════ */}
        {activeTab === 'rooms' && (
          <div>
            <div style={{ marginBottom:'1.25rem' }}>
              <div style={{
                ...S.display, fontSize:'1.2rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'0.2rem',
              }}>Your Rooms</div>
              <div style={{
                ...S.label, fontSize:'0.58rem', color:'rgba(60,30,10,0.4)',
              }}>Click any room to explore in 3D</div>
            </div>
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))',
              gap:'1rem',
            }}>
              {project.rooms.map(room => (
  <RoomCard
    key={room.id}
    room={room}
    onExplore={() => openWalkthrough()}
  />
))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ */}
        {/*  WALKTHROUGH TAB                        */}
        {/* ════════════════════════════════════════ */}
        {activeTab === 'walkthrough' && (
          <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
            <div style={{
              ...S.card, padding:'3rem 2.5rem',
              background:'linear-gradient(135deg, rgba(255,252,246,0.98), rgba(248,240,228,0.95))',
            }}>
              <div style={{ fontSize:'4rem', marginBottom:'1.25rem' }}>🏠</div>
              <div style={{
                ...S.display, fontSize:'1.8rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'0.5rem',
              }}>Explore Your Home</div>
              <p style={{
                ...S.body, fontSize:'0.9rem',
                color:'rgba(60,30,10,0.55)', lineHeight:1.75,
                marginBottom:'2rem', maxWidth:400, margin:'0 auto 2rem',
              }}>
                Walk through every room of your future home. Experience the
                space, lighting, and materials in full 3D.
              </p>

              {/* Mode cards */}
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr',
                gap:'1rem', marginBottom:'2rem', textAlign:'left',
              }}>
                {[
                  { icon:'🎬', title:'Cinematic Tour',     desc:'Sit back and watch a guided tour of your entire home.', action:'Tour'      },
                  { icon:'🚶', title:'Free Walkthrough',   desc:'Walk freely through each room at your own pace.',       action:'Walk'      },
                ].map(mode => (
                  <div key={mode.title} style={{
                    ...S.card, padding:'1.25rem',
                    cursor:'pointer', transition:'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,105,42,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,160,100,0.18)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  onClick={() => openWalkthrough()}
                  >
                    <div style={{ fontSize:'1.8rem', marginBottom:'0.6rem' }}>{mode.icon}</div>
                    <div style={{
                      ...S.display, fontSize:'0.95rem', fontWeight:700,
                      color:'#2c1a0e', marginBottom:'0.3rem',
                    }}>{mode.title}</div>
                    <p style={{
                      ...S.body, fontSize:'0.76rem',
                      color:'rgba(60,30,10,0.5)', lineHeight:1.55,
                      marginBottom:'0.75rem',
                    }}>{mode.desc}</p>
                    <div style={{
                      ...S.label, fontSize:'0.58rem', color:'#c8692a',
                    }}>Start {mode.action} →</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openWalkthrough(project)}
                style={{
                  background:'linear-gradient(135deg,#c8692a,#e8a060)',
                  border:'none', borderRadius:6,
                  padding:'0.85rem 2.5rem',
                  ...S.label, fontSize:'0.7rem',
                  color:'#fdf7ed', cursor:'pointer',
                  boxShadow:'0 8px 24px rgba(200,105,42,0.3)',
                  transition:'all 0.25s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >▶ Launch 3D Experience</button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ */}
        {/*  FEEDBACK TAB                           */}
        {/* ════════════════════════════════════════ */}
        {activeTab === 'feedback' && (
          <div style={{ maxWidth:680 }}>
            <div style={{ marginBottom:'1.25rem' }}>
              <div style={{
                ...S.display, fontSize:'1.2rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'0.2rem',
              }}>Your Feedback</div>
              <div style={{
                ...S.label, fontSize:'0.58rem', color:'rgba(60,30,10,0.4)',
              }}>Share your thoughts on the design</div>
            </div>

            {/* New feedback form */}
            <div style={{ ...S.card, padding:'1.4rem', marginBottom:'1.5rem' }}>
              <div style={{
                ...S.display, fontSize:'0.95rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'1rem',
              }}>Add New Feedback</div>

              {/* Room selector */}
              <div style={{ marginBottom:'0.85rem' }}>
                <label style={{
                  display:'block', ...S.label, fontSize:'0.58rem',
                  color:'rgba(60,30,10,0.45)', marginBottom:'0.4rem',
                }}>Room</label>
                <select
                  value={newRoom}
                  onChange={e => setNewRoom(e.target.value)}
                  style={{
                    width:'100%', padding:'0.65rem 0.85rem',
                    ...S.body, fontSize:'0.85rem', color:'#2c1a0e',
                    background:'rgba(255,252,246,0.9)',
                    border:'1.5px solid rgba(200,160,100,0.2)',
                    borderRadius:5, outline:'none',
                    appearance:'none', cursor:'pointer',
                  }}
                >
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom:'0.85rem' }}>
                <label style={{
                  display:'block', ...S.label, fontSize:'0.58rem',
                  color:'rgba(60,30,10,0.45)', marginBottom:'0.4rem',
                }}>Your Comment</label>
                <textarea
                  value={newFeedback}
                  onChange={e => setNewFeedback(e.target.value)}
                  placeholder="Describe what you'd like to change or approve..."
                  rows={3}
                  style={{
                    width:'100%', padding:'0.75rem',
                    ...S.body, fontSize:'0.85rem', color:'#2c1a0e',
                    background:'rgba(255,252,246,0.9)',
                    border:'1.5px solid rgba(200,160,100,0.2)',
                    borderRadius:5, outline:'none', resize:'vertical',
                    lineHeight:1.65, boxSizing:'border-box',
                    transition:'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor='rgba(200,105,42,0.4)'}
                  onBlur={e  => e.target.style.borderColor='rgba(200,160,100,0.2)'}
                />
              </div>

              <button
                onClick={handleAddFeedback}
                disabled={!newFeedback.trim()}
                style={{
                  padding:'0.6rem 1.5rem',
                  background: newFeedback.trim()
                    ? 'linear-gradient(135deg,#c8692a,#e8a060)'
                    : 'rgba(200,160,100,0.2)',
                  border:'none', borderRadius:4,
                  ...S.label, fontSize:'0.62rem',
                  color: newFeedback.trim() ? '#fdf7ed' : 'rgba(60,30,10,0.35)',
                  cursor: newFeedback.trim() ? 'pointer' : 'not-allowed',
                  boxShadow: newFeedback.trim() ? '0 4px 12px rgba(200,105,42,0.25)' : 'none',
                  transition:'all 0.2s ease',
                }}
              >Submit Feedback</button>
            </div>

            {/* Feedback timeline */}
            <div style={{
              ...S.display, fontSize:'0.95rem', fontWeight:700,
              color:'#2c1a0e', marginBottom:'0.85rem',
            }}>Feedback History</div>

            {feedbacks.map((fb, i) => {
              const statusColor = {
                'Pending':  '#c8692a',
                'Reviewed': '#4a7ac8',
                'Resolved': '#2a8c40',
              }[fb.status] || '#7a6a5a'

              return (
                <div key={fb.id} style={{
                  display:'flex', gap:'0.85rem',
                  marginBottom:'0.85rem',
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    display:'flex', flexDirection:'column',
                    alignItems:'center', flexShrink:0,
                  }}>
                    <div style={{
                      width:10, height:10, borderRadius:'50%',
                      background: statusColor, marginTop:6,
                      flexShrink:0,
                    }}/>
                    {i < feedbacks.length-1 && (
                      <div style={{
                        width:2, flex:1, minHeight:24,
                        background:'rgba(200,160,100,0.15)',
                        margin:'4px 0',
                      }}/>
                    )}
                  </div>

                  {/* Card */}
                  <div style={{
                    ...S.card, padding:'1rem',
                    flex:1, marginBottom: i < feedbacks.length-1 ? '0.1rem' : 0,
                  }}>
                    <div style={{
                      display:'flex', justifyContent:'space-between',
                      alignItems:'flex-start', marginBottom:'0.4rem',
                    }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                        <span style={{
                          ...S.label, fontSize:'0.6rem', color:'rgba(60,30,10,0.5)',
                        }}>{fb.room}</span>
                        <StatusBadge status={fb.status} />
                      </div>
                      <span style={{
                        ...S.label, fontSize:'0.54rem',
                        color:'rgba(60,30,10,0.3)',
                      }}>{fb.time}</span>
                    </div>
                    <p style={{
                      ...S.body, fontSize:'0.82rem',
                      color:'rgba(60,30,10,0.65)', lineHeight:1.6, margin:0,
                    }}>{fb.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ════════════════════════════════════════ */}
        {/*  MATERIALS TAB                          */}
        {/* ════════════════════════════════════════ */}
        {activeTab === 'materials' && (
          <div>
            <div style={{ marginBottom:'1.25rem' }}>
              <div style={{
                ...S.display, fontSize:'1.2rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'0.2rem',
              }}>Material Selection</div>
              <div style={{
                ...S.label, fontSize:'0.58rem',
                color:'rgba(60,30,10,0.4)',
              }}>Review and select your preferred finishes</div>
            </div>

            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))',
              gap:'1rem', marginBottom:'1.5rem',
            }}>
              {materials.map((mat, i) => (
                <MaterialCard
                  key={mat.category}
                  {...mat}
                  onSelect={(name) => handleMaterialSelect(i, name)}
                />
              ))}
            </div>

            {/* Request material change */}
            <div style={{ ...S.card, padding:'1.4rem' }}>
              <div style={{
                ...S.display, fontSize:'0.95rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'0.75rem',
              }}>Request Material Change</div>
              <p style={{
                ...S.body, fontSize:'0.82rem',
                color:'rgba(60,30,10,0.5)', lineHeight:1.65,
                marginBottom:'1rem',
              }}>
                Want a different material not shown above? Describe what you're
                looking for and your architect will suggest options.
              </p>
              <textarea
                placeholder="e.g. I'd like Italian marble flooring for the living room..."
                rows={2}
                style={{
                  width:'100%', padding:'0.75rem',
                  ...S.body, fontSize:'0.85rem', color:'#2c1a0e',
                  background:'rgba(255,252,246,0.9)',
                  border:'1.5px solid rgba(200,160,100,0.2)',
                  borderRadius:5, outline:'none', resize:'none',
                  lineHeight:1.65, boxSizing:'border-box',
                  marginBottom:'0.75rem',
                  transition:'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor='rgba(200,105,42,0.4)'}
                onBlur={e  => e.target.style.borderColor='rgba(200,160,100,0.2)'}
              />
              <button style={{
                padding:'0.6rem 1.4rem',
                background:'linear-gradient(135deg,#c8692a,#e8a060)',
                border:'none', borderRadius:4,
                ...S.label, fontSize:'0.62rem',
                color:'#fdf7ed', cursor:'pointer',
                boxShadow:'0 4px 12px rgba(200,105,42,0.22)',
              }}>Send Request</button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ */}
        {/*  APPROVALS TAB                          */}
        {/* ════════════════════════════════════════ */}
        {activeTab === 'approvals' && (
          <div style={{ maxWidth:620 }}>
            <div style={{ marginBottom:'1.25rem' }}>
              <div style={{
                ...S.display, fontSize:'1.2rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'0.2rem',
              }}>Design Approvals</div>
              <div style={{
                ...S.label, fontSize:'0.58rem', color:'rgba(60,30,10,0.4)',
              }}>Review and approve your home design</div>
            </div>

            {/* Approve card */}
            <div style={{
              ...S.card, padding:'1.8rem',
              marginBottom:'1.25rem',
              borderColor: approved ? 'rgba(42,140,64,0.3)' : 'rgba(200,160,100,0.18)',
              background: approved
                ? 'rgba(42,140,64,0.04)' : 'rgba(255,252,246,0.95)',
              transition:'all 0.3s ease',
            }}>
              {approved ? (
                <div style={{ textAlign:'center', padding:'1rem 0' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>✅</div>
                  <div style={{
                    ...S.display, fontSize:'1.4rem', fontWeight:700,
                    color:'#2a8c40', marginBottom:'0.4rem',
                  }}>Design Approved!</div>
                  <p style={{
                    ...S.body, fontSize:'0.85rem',
                    color:'rgba(60,30,10,0.55)', lineHeight:1.7,
                  }}>
                    Your approval has been sent to the architect.
                    They will proceed with the final construction drawings.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{
                    ...S.display, fontSize:'1.05rem', fontWeight:700,
                    color:'#2c1a0e', marginBottom:'0.5rem',
                  }}>Approve Current Design</div>
                  <p style={{
                    ...S.body, fontSize:'0.85rem',
                    color:'rgba(60,30,10,0.55)', lineHeight:1.7,
                    marginBottom:'1.25rem',
                  }}>
                    Once you approve the design, your architect will begin
                    preparing final drawings and construction documents.
                    Make sure you've explored all rooms and are satisfied.
                  </p>

                  {/* Checklist */}
                  <div style={{ marginBottom:'1.25rem' }}>
                    {[
                      { label:'Explored all rooms in walkthrough', done:true  },
                      { label:'Reviewed material selections',      done:true  },
                      { label:'Submitted all feedback',            done:false },
                      { label:'Discussed changes with architect',  done:false },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display:'flex', alignItems:'center',
                        gap:'0.6rem', padding:'0.45rem 0',
                        borderBottom:'1px solid rgba(200,160,100,0.08)',
                      }}>
                        <div style={{
                          width:18, height:18, borderRadius:'50%', flexShrink:0,
                          background: item.done ? '#2a8c40' : 'rgba(200,160,100,0.2)',
                          display:'flex', alignItems:'center',
                          justifyContent:'center',
                          fontSize:9, color: item.done ? 'white' : 'transparent',
                          fontWeight:700,
                        }}>{item.done ? '✓' : ''}</div>
                        <span style={{
                          ...S.body, fontSize:'0.82rem',
                          color: item.done ? '#2c1a0e' : 'rgba(60,30,10,0.45)',
                        }}>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <textarea
                    value={approvalNote}
                    onChange={e => setApprovalNote(e.target.value)}
                    placeholder="Add any final notes for your architect (optional)..."
                    rows={2}
                    style={{
                      width:'100%', padding:'0.75rem',
                      ...S.body, fontSize:'0.85rem', color:'#2c1a0e',
                      background:'rgba(255,252,246,0.9)',
                      border:'1.5px solid rgba(200,160,100,0.2)',
                      borderRadius:5, outline:'none', resize:'none',
                      lineHeight:1.65, boxSizing:'border-box',
                      marginBottom:'0.85rem',
                    }}
                  />

                  <div style={{ display:'flex', gap:'0.75rem' }}>
                    <button
                      onClick={() => setApproved(true)}
                      style={{
                        flex:1, padding:'0.75rem',
                        background:'linear-gradient(135deg,#2a8c40,#4ab860)',
                        border:'none', borderRadius:5,
                        ...S.label, fontSize:'0.65rem',
                        color:'#fdf7ed', cursor:'pointer',
                        boxShadow:'0 6px 18px rgba(42,140,64,0.25)',
                        transition:'all 0.22s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform='translateY(-1px)'}
                      onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                    >✓ Approve Design</button>
                    <button
                      onClick={() => setActiveTab('feedback')}
                      style={{
                        flex:1, padding:'0.75rem',
                        background:'transparent',
                        border:'1.5px solid rgba(200,105,42,0.3)',
                        borderRadius:5,
                        ...S.label, fontSize:'0.65rem',
                        color:'#c8692a', cursor:'pointer',
                        transition:'all 0.22s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(200,105,42,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >Request Changes</button>
                  </div>
                </>
              )}
            </div>

            {/* Approval history */}
            <div style={{ ...S.card, padding:'1.4rem' }}>
              <div style={{
                ...S.display, fontSize:'0.95rem', fontWeight:700,
                color:'#2c1a0e', marginBottom:'1rem',
              }}>Approval History</div>
              {[
                { action:'Balcony design approved', date:'May 2, 2024', by:'You' },
                { action:'Kitchen layout approved',  date:'Apr 28, 2024',by:'You' },
                { action:'Living room approved',     date:'Apr 15, 2024',by:'You' },
              ].map((item, i) => (
                <div key={i} style={{
                  display:'flex', justifyContent:'space-between',
                  alignItems:'center',
                  padding:'0.6rem 0',
                  borderBottom: i < 2 ? '1px solid rgba(200,160,100,0.08)' : 'none',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    <div style={{
                      width:8, height:8, borderRadius:'50%',
                      background:'#2a8c40', flexShrink:0,
                    }}/>
                    <span style={{
                      ...S.body, fontSize:'0.8rem', color:'#2c1a0e',
                    }}>{item.action}</span>
                  </div>
                  <span style={{
                    ...S.label, fontSize:'0.54rem',
                    color:'rgba(60,30,10,0.35)',
                  }}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}