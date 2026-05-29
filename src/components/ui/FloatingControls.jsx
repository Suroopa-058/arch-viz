export default function FloatingControls({
  tourActive,
  walkActive,
  onStopTour,
  onStopWalk,
}) {
  // During tour or walk, show minimal exit button only
  if (tourActive || walkActive) return null

  return (
    <div style={{
      position: 'fixed',
      top: '5.5rem', right: '1.8rem',
      zIndex: 20,
      display: 'flex', flexDirection: 'column',
      gap: '0.45rem',
      animation: 'fadeIn 1s ease 0.8s both',
      opacity: 0,
    }}>
      {[
        { icon: '↻', label: 'Auto Rotate' },
        { icon: '+', label: 'Zoom In'     },
        { icon: '−', label: 'Zoom Out'    },
        { icon: '⛶', label: 'Fullscreen'  },
      ].map(btn => (
        <button
          key={btn.label}
          title={btn.label}
          style={{
            width: 40, height: 40,
            background: 'rgba(255,248,235,0.7)',
            border: '1px solid rgba(200,105,42,0.18)',
            borderRadius: 4,
            color: '#5a3018',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'all 0.22s ease',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 2px 8px rgba(180,100,40,0.1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(200,105,42,0.15)'
            e.currentTarget.style.borderColor = 'rgba(200,105,42,0.45)'
            e.currentTarget.style.color = '#c8692a'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,248,235,0.7)'
            e.currentTarget.style.borderColor = 'rgba(200,105,42,0.18)'
            e.currentTarget.style.color = '#5a3018'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  )
}