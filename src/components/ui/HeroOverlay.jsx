import { useEffect, useState } from 'react'

export default function HeroOverlay({ tourActive, onStartTour, onStartWalk }) {
  const [visible, setVisible]   = useState(false)
  const [scrollHint, setScroll] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600)
    const s = setTimeout(() => setScroll(false), 5000)
    return () => { clearTimeout(t); clearTimeout(s) }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* ── Warm left fade ──────────────────────────── */}
      <div style={{
        position:'fixed', inset:0, zIndex:3, pointerEvents:'none',
        background:'linear-gradient(90deg, rgba(240,228,210,0.96) 0%, rgba(235,220,198,0.6) 38%, transparent 62%)',
      }}/>

      {/* ── Top fade ────────────────────────────────── */}
      <div style={{
        position:'fixed', inset:0, zIndex:3, pointerEvents:'none',
        background:'linear-gradient(180deg, rgba(228,210,185,0.7) 0%, transparent 22%)',
      }}/>

      {/* ── Bottom warm glow ────────────────────────── */}
      <div style={{
        position:'fixed', inset:0, zIndex:3, pointerEvents:'none',
        background:'radial-gradient(ellipse at 50% 100%, rgba(200,105,42,0.1) 0%, transparent 55%)',
      }}/>

      {/* ════════════════════════════════════════════ */}
      {/*  TOP NAV BAR                                */}
      {/* ════════════════════════════════════════════ */}
      <header className="anim-fade" style={{
        position:'fixed', top:0, left:0, right:0, zIndex:20,
        padding:'1.4rem 2.5rem',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        borderBottom:'1px solid rgba(180,130,80,0.12)',
        backdropFilter:'blur(2px)',
        background:'rgba(240,228,210,0.25)',
      }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{
            width:38, height:38,
            background:'linear-gradient(135deg,#c8692a,#e8b688)',
            borderRadius:3,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'var(--font-display)',
            fontWeight:700, fontSize:18,
            color:'#fdf7ed',
            boxShadow:'0 4px 14px rgba(200,105,42,0.35)',
            flexShrink:0,
          }}>I</div>

          <div>
            <div style={{
              fontFamily:'var(--font-display)',
              fontSize:'1.2rem', fontWeight:700,
              color:'var(--text-primary)',
              letterSpacing:'0.05em', lineHeight:1,
            }}>IllamViz</div>
            <div style={{
              fontFamily:'var(--font-label)',
              fontSize:'0.55rem', fontWeight:600,
              letterSpacing:'0.25em',
              textTransform:'uppercase',
              color:'var(--text-ghost)',
              marginTop:2,
            }}>Architectural Studio</div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ display:'flex', gap:'2.2rem', alignItems:'center' }}>
          {['Projects','Services','Process','Contact'].map(item => (
            <button key={item} className="nav-link">{item}</button>
          ))}
        </nav>

        {/* CTA */}
        <button className="btn-illam btn-illam-primary" style={{
          fontSize:'0.65rem', padding:'0.55rem 1.4rem',
        }}>
          Start Project
        </button>

      </header>

      {/* ════════════════════════════════════════════ */}
      {/*  HERO LEFT PANEL                            */}
      {/* ════════════════════════════════════════════ */}
      <div style={{
        position:'fixed',
        bottom:'3rem', left:'2.5rem',
        zIndex:20, maxWidth:490,
      }}>

        {/* Tag pill */}
        <div className="anim-1 tag-pill" style={{ marginBottom:'1.25rem' }}>
          <div style={{
            width:6, height:6, borderRadius:'50%',
            background:'var(--text-accent)',
            animation:'shimmer 2.5s ease-in-out infinite',
          }}/>
          Interactive 3D Visualization · Phase 1
        </div>

        {/* Heading italic */}
        <h1 className="anim-2" style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(2.6rem,4.8vw,4.2rem)',
          fontWeight:300, fontStyle:'italic',
          color:'var(--text-secondary)',
          lineHeight:1.08, marginBottom:'0.1rem',
        }}>
          Modern Indian
        </h1>

        {/* Heading bold */}
        <h1 className="anim-2" style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(2.6rem,4.8vw,4.2rem)',
          fontWeight:700, fontStyle:'normal',
          lineHeight:1.05, marginBottom:'1.25rem',
        }}>
          <span style={{
            background:'linear-gradient(135deg,#c8692a,#a8511c)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
          }}>Living</span>{' '}
          <span style={{ color:'var(--text-primary)' }}>Reimagined</span>
        </h1>

        {/* Divider */}
        <div className="anim-3" style={{
          width:44, height:1.5,
          background:'linear-gradient(90deg,var(--text-accent),transparent)',
          marginBottom:'1.25rem',
          borderRadius:1,
        }}/>

        {/* Subtitle */}
        <p className="anim-3" style={{
          fontFamily:'var(--font-body)',
          fontSize:'0.9rem', fontWeight:400,
          lineHeight:1.75, letterSpacing:'0.01em',
          color:'var(--text-body)',
          maxWidth:340, marginBottom:'2rem',
        }}>
          Immersive architectural storytelling for contemporary
          Indian homes. Drag to explore. Scroll to zoom.
        </p>

        {/* ── Action buttons ─────────────────────── */}
        <div className="anim-4" style={{
          display:'flex', gap:'0.75rem', alignItems:'center',
          flexWrap:'wrap',
        }}>

          {/* Explore Model → cinematic tour */}
          <button
            className="btn-illam btn-illam-primary"
            onClick={onStartTour}
          >
            Explore Model
          </button>

          {/* Walk Through → first person */}
          <button
            className="btn-illam"
            onClick={onStartWalk}
            style={{
              background:'transparent',
              border:'1.5px solid rgba(180,110,50,0.35)',
              color:'var(--text-secondary)',
              fontFamily:'var(--font-label)',
              fontWeight:600,
              letterSpacing:'0.14em',
              textTransform:'uppercase',
              fontSize:'0.68rem',
              padding:'0.68rem 1.4rem',
              borderRadius:2, cursor:'pointer',
              transition:'all 0.28s ease',
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.background='rgba(200,105,42,0.1)'
              e.currentTarget.style.borderColor='rgba(200,105,42,0.55)'
              e.currentTarget.style.color='var(--text-accent)'
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.background='transparent'
              e.currentTarget.style.borderColor='rgba(180,110,50,0.35)'
              e.currentTarget.style.color='var(--text-secondary)'
            }}
          >
            Walk Through
          </button>

          {/* View Drawings */}
          <button
            className="btn-illam"
            style={{
              background:'transparent',
              border:'1.5px solid rgba(180,110,50,0.35)',
              color:'var(--text-secondary)',
              fontFamily:'var(--font-label)',
              fontWeight:600,
              letterSpacing:'0.14em',
              textTransform:'uppercase',
              fontSize:'0.68rem',
              padding:'0.68rem 1.4rem',
              borderRadius:2, cursor:'pointer',
              transition:'all 0.28s ease',
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.background='rgba(200,105,42,0.1)'
              e.currentTarget.style.borderColor='rgba(200,105,42,0.55)'
              e.currentTarget.style.color='var(--text-accent)'
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.background='transparent'
              e.currentTarget.style.borderColor='rgba(180,110,50,0.35)'
              e.currentTarget.style.color='var(--text-secondary)'
            }}
          >
            View Drawings
          </button>

        </div>
      </div>

      {/* ════════════════════════════════════════════ */}
      {/*  STATS CARD — bottom right                 */}
      {/* ════════════════════════════════════════════ */}
      <div className="anim-3" style={{
        position:'fixed', bottom:'3rem', right:'2.5rem', zIndex:20,
      }}>
        <div style={{
          background:'rgba(255,248,236,0.82)',
          backdropFilter:'blur(20px)',
          WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(200,130,60,0.2)',
          borderRadius:4,
          padding:'1.3rem 1.8rem',
          display:'flex', gap:'2rem',
          boxShadow:'0 8px 32px rgba(160,90,30,0.1)',
        }}>
          {[
            { value:'1,850', unit:'sq.ft', label:'Built-up Area' },
            { value:'G + 1', unit:'',      label:'Floors'        },
            { value:'2024',  unit:'',      label:'Design Year'   },
          ].map((stat,i) => (
            <div key={i} style={{ textAlign:'center', position:'relative' }}>
              {i > 0 && (
                <div style={{
                  position:'absolute', left:'-1rem',
                  top:'50%', transform:'translateY(-50%)',
                  width:1, height:32,
                  background:'rgba(180,110,50,0.18)',
                }}/>
              )}
              <div className="stat-value">
                {stat.value}
                {stat.unit && (
                  <span style={{
                    fontSize:'0.62rem',
                    fontFamily:'var(--font-label)',
                    fontWeight:600,
                    color:'var(--text-accent)',
                    marginLeft:4,
                    letterSpacing:'0.1em',
                  }}>{stat.unit}</span>
                )}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop:'0.55rem', textAlign:'right',
          fontFamily:'var(--font-label)',
          fontSize:'0.58rem', fontWeight:500,
          letterSpacing:'0.16em', textTransform:'uppercase',
          color:'var(--text-ghost)',
        }}>
          Contemporary Indian Villa · Kerala
        </div>
      </div>

      {/* ════════════════════════════════════════════ */}
      {/*  SCROLL HINT                               */}
      {/* ════════════════════════════════════════════ */}
      {scrollHint && (
        <div style={{
          position:'fixed', bottom:'1.4rem',
          left:'50%', transform:'translateX(-50%)',
          zIndex:20,
          display:'flex', flexDirection:'column',
          alignItems:'center', gap:'0.4rem',
          animation:'fadeIn 1s ease 2.5s both', opacity:0,
        }}>
          <span className="hint-text">Drag to rotate</span>
          <div style={{
            width:20, height:30,
            border:'1.5px solid rgba(120,70,30,0.3)',
            borderRadius:10,
            display:'flex', justifyContent:'center',
            paddingTop:5,
          }}>
            <div style={{
              width:2, height:6,
              background:'var(--text-accent)',
              borderRadius:1,
              animation:'fadeUp 1.5s ease-in-out infinite',
            }}/>
          </div>
        </div>
      )}
    </>
  )
}