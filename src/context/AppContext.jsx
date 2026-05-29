import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

// ── Single source of truth — Sharma Residence ────────
const SHARMA_BASE = {
  id:           'sharma_001',
  name:         'Sharma Residence',
  location:     'Kochi, Kerala',
  type:         'G+1 Contemporary Villa',
  status:       'In Progress',
  progress:     65,
  client:       'Priya Sharma',
  clientEmail:  'priya.sharma@gmail.com',
  architect:    'Arjun Menon',
  lastUpdated:  '2026-05-08',
  rooms: [
    { id:'living',   name:'Living Room',    icon:'🛋️', status:'Approved',    progress:100, note:'L-shaped sofa confirmed. Warm teak flooring selected.'       },
    { id:'kitchen',  name:'Kitchen',        icon:'🍳', status:'In Review',   progress:75,  note:'Granite countertop selected. Cabinet color pending approval.' },
    { id:'master',   name:'Master Bedroom', icon:'🛏️', status:'In Progress', progress:60,  note:'Walnut flooring. King bed layout. Bedside lamps pending.'     },
    { id:'bedroom2', name:'Bedroom 2',      icon:'🪟', status:'Pending',     progress:30,  note:'Layout not yet finalized. Client input needed.'              },
    { id:'bath',     name:'Bathroom',       icon:'🚿', status:'In Progress', progress:55,  note:'White tile with terracotta accent. Walk-in shower confirmed.' },
    { id:'balcony',  name:'Balcony',        icon:'🌿', status:'Approved',    progress:100, note:'Sandstone flooring. Glass railing. Plant corner planned.'     },
  ],
  materials: [
    { category:'Wall Finish', selected:'Warm White Plaster',
      options:[
        { name:'Warm White', color:'#f2ede4', selected:true  },
        { name:'Cream',      color:'#fdf7ed', selected:false },
        { name:'Sand',       color:'#e8d5b8', selected:false },
        { name:'Blush',      color:'#f0ddd5', selected:false },
      ]},
    { category:'Flooring', selected:'Teak Wood',
      options:[
        { name:'Teak Wood', color:'#8b5e3c', selected:true  },
        { name:'Walnut',    color:'#5a3820', selected:false },
        { name:'Marble',    color:'#e8e2d8', selected:false },
        { name:'Granite',   color:'#9a9088', selected:false },
      ]},
    { category:'Roof Finish', selected:'Charcoal Flat',
      options:[
        { name:'Charcoal',   color:'#4a4540', selected:true  },
        { name:'Dark Slate', color:'#3a3530', selected:false },
        { name:'Cream',      color:'#f0ece4', selected:false },
        { name:'Concrete',   color:'#b8b0a4', selected:false },
      ]},
    { category:'Accent', selected:'Terracotta',
      options:[
        { name:'Terracotta', color:'#c8692a', selected:true  },
        { name:'Teak',       color:'#7a4e2d', selected:false },
        { name:'Brass',      color:'#c8a040', selected:false },
        { name:'Stone',      color:'#b8a898', selected:false },
      ]},
  ],
  feedbacks: [
    { id:'fb_001', author:'Priya Sharma', role:'client', room:'Balcony',
      message:'The balcony railing design looks beautiful! Fully approved.',
      time:'2 days ago', timestamp: Date.now() - 172800000,
      status:'Resolved', type:'approval', seenByArchitect: true },
    { id:'fb_002', author:'Priya Sharma', role:'client', room:'Living Room',
      message:'Can we add a small reading corner near the window?',
      time:'1 day ago', timestamp: Date.now() - 86400000,
      status:'Reviewed', type:'change', seenByArchitect: true },
  ],
  updates: [
    { title:'Kitchen countertop material finalized',   time:'2h ago',  icon:'🍳', type:'update'   },
    { title:'Balcony railing design approved by client',time:'1d ago', icon:'✓',  type:'approved' },
    { title:'Master bedroom layout updated',           time:'2d ago',  icon:'🛏️', type:'update'   },
    { title:'3D walkthrough model uploaded',           time:'3d ago',  icon:'▶',  type:'media'    },
  ],
}

export function AppProvider({ children }) {
  const [role,         setRole]         = useState(null)
  const [user,         setUser]         = useState(null)
  const [currentPage,  setCurrentPage]  = useState('role-select')
  const [prevPage,     setPrevPage]     = useState(null)
  const [project,      setProject]      = useState(SHARMA_BASE)
  const [isLoading,    setIsLoading]    = useState(false)
  const [pageTransition, setPageTransition] = useState(false)

  // Unread feedback count for architect badge
  const unreadCount = project.feedbacks.filter(
    f => f.role === 'client' && !f.seenByArchitect
  ).length

  const selectRole = (selectedRole, userName) => {
    setRole(selectedRole)
    setUser({ name: userName, role: selectedRole })
    navigateTo(selectedRole === 'architect' ? 'dashboard' : 'client-home')
  }

  // ── Smooth page transition ────────────────────────
  const navigateTo = (page) => {
    setPageTransition(true)
    setTimeout(() => {
      setPrevPage(currentPage)
      setCurrentPage(page)
      setPageTransition(false)
    }, 280)
  }

  const goTo    = (page) => navigateTo(page)
  const goBack  = ()     => navigateTo(prevPage || 'dashboard')

  // ── Switch role for demo ──────────────────────────
  const switchRole = () => {
    const newRole = role === 'architect' ? 'client' : 'architect'
    setRole(newRole)
    setUser(prev => ({ ...prev, role: newRole }))
    navigateTo(newRole === 'architect' ? 'dashboard' : 'client-home')
  }

  // ── Open walkthrough with loading screen ──────────
  const openWalkthrough = () => {
    setIsLoading(true)
    navigateTo('walkthrough')
  }

  const closeWalkthrough = () => {
    navigateTo(role === 'architect' ? 'dashboard' : 'client-home')
  }

  // ── Add feedback (shared state) ───────────────────
  const addFeedback = (room, message) => {
    const newFb = {
      id:               `fb_${Date.now()}`,
      author:           user.name,
      role:             role,
      room,
      message,
      time:             'Just now',
      timestamp:        Date.now(),
      status:           'Pending',
      type:             'change',
      seenByArchitect:  false,   // ← triggers badge
    }
    setProject(prev => ({
      ...prev,
      feedbacks: [newFb, ...prev.feedbacks],
    }))
  }

  // ── Mark feedbacks as seen by architect ───────────
  const markFeedbackSeen = () => {
    setProject(prev => ({
      ...prev,
      feedbacks: prev.feedbacks.map(f => ({ ...f, seenByArchitect: true })),
    }))
  }

  // ── Resolve feedback ──────────────────────────────
  const resolveFeedback = (id) => {
    setProject(prev => ({
      ...prev,
      feedbacks: prev.feedbacks.map(f =>
        f.id === id ? { ...f, status: 'Resolved', seenByArchitect: true } : f
      ),
    }))
  }

  // ── Update material selection ─────────────────────
  const selectMaterial = (categoryIdx, optionName) => {
    setProject(prev => ({
      ...prev,
      materials: prev.materials.map((cat, i) =>
        i !== categoryIdx ? cat : {
          ...cat,
          selected: optionName,
          options: cat.options.map(o => ({ ...o, selected: o.name === optionName }))
        }
      )
    }))
  }

  const logout = () => {
    setRole(null)
    setUser(null)
    navigateTo('role-select')
  }

  return (
    <AppContext.Provider value={{
      role, user,
      project, setProject,
      currentPage, prevPage,
      isLoading, setIsLoading,
      pageTransition,
      unreadCount,
      selectRole, switchRole,
      openWalkthrough, closeWalkthrough,
      addFeedback, markFeedbackSeen, resolveFeedback,
      selectMaterial,
      goTo, goBack, logout,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)