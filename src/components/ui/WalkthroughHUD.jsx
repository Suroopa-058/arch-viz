export default function WalkthroughHUD({ onStop }) {
  return (
    <>
      {/* ── Top bar ───────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 56, zIndex: 30,
        background: 'rgba(20,12,7,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        animation: 'fadeIn 0.5s ease forwards',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#4caf50',
            boxShadow: '0 0 8px #4caf50',
          }}/>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(253,247,237,0.8)',
          }}>Walkthrough Mode</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          color: 'rgba(253,247,237,0.6)',
        }}>
          Contemporary Indian Villa · Kerala
        </div>

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
            e.currentTarget.style.color = '#fdf7ed'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'rgba(253,247,237,0.6)'
          }}
        >
          ✕ Exit Walk
        </button>
      </div>

      {/* ── WASD hint — bottom center ─────────────── */}
      <div style={{
        position: 'fixed',
        bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex', gap: '1rem',
        alignItems: 'center',
        animation: 'fadeIn 0.8s ease 0.5s both',
        opacity: 0,
      }}>
        {[
          { key: 'W', label: 'Forward' },
          { key: 'A', label: 'Left'    },
          { key: 'S', label: 'Back'    },
          { key: 'D', label: 'Right'   },
        ].map(k => (
          <div key={k.key} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.3rem',
          }}>
            <div style={{
              width: 32, height: 32,
              background: 'rgba(255,248,235,0.1)',
              border: '1px solid rgba(255,248,235,0.3)',
              borderRadius: 4,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-label)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#4A3428',
              backdropFilter: 'blur(8px)',
            }}>{k.key}</div>
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.52rem',
              letterSpacing: '0.12em',
              color: 'rgba(74,52,40,0.8)',
              textTransform: 'uppercase',
            }}>{k.label}</span>
          </div>
        ))}

        <div style={{
          width: 1, height: 30,
          background: 'rgba(253,247,237,0.15)',
          margin: '0 0.25rem',
        }}/>

        {/* Mouse */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.3rem',
        }}>
          <div style={{
            width: 24, height: 34,
            border: '1px solid rgba(255,248,235,0.3)',
            borderRadius: 12,
            display: 'flex', justifyContent: 'center',
            paddingTop: 5,
            background: 'rgba(255,248,235,0.1)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              width: 2, height: 7,
              background: 'var(--illam-primary)',
              borderRadius: 1,
              animation: 'fadeUp 1.5s ease-in-out infinite',
            }}/>
          </div>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.52rem',
            letterSpacing: '0.12em',
            color: '#4A3428',
            textTransform: 'uppercase',
          }}>Look</span>
        </div>

        <div style={{
          width: 1, height: 30,
          background: 'rgba(253,247,237,0.15)',
          margin: '0 0.25rem',
        }}/>

        {/* ESC */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.3rem',
        }}>
          <div style={{
            padding: '0.2rem 0.5rem',
            background: 'rgba(255,248,235,0.1)',
            border: '1px solid rgba(255,248,235,0.3)',
            borderRadius: 4,
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem',
            color: '#4A3428',
            backdropFilter: 'blur(8px)',
          }}>ESC</div>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.52rem',
            letterSpacing: '0.12em',
            color: '#4A3428',
            textTransform: 'uppercase',
          }}>Exit</span>
        </div>
      </div>

      {/* ── Crosshair ─────────────────────────────── */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 30, pointerEvents: 'none',
      }}>
        <div style={{ width: 16, height: 16, position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: 0, right: 0, height: 1,
            background: 'rgba(253,247,237,0.5)',
            transform: 'translateY(-50%)',
          }}/>
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0, width: 1,
            background: 'rgba(253,247,237,0.5)',
            transform: 'translateX(-50%)',
          }}/>
        </div>
      </div>

      {/* ── Click to lock hint ────────────────────── */}
      <div style={{
        position: 'fixed',
        top: 'calc(50% + 30px)', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30, pointerEvents: 'none',
        fontFamily: 'var(--font-label)',
        fontSize: '0.6rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#4A3428',
        animation: 'fadeIn 1s ease 1s both',
        opacity: 0,
      }}>
        Click to capture mouse
      </div>
    </>
  )
}