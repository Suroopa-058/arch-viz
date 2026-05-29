import { AppProvider, useApp }   from './context/AppContext'
import RoleSelect                from './pages/RoleSelect'
import ArchitectDashboard        from './pages/ArchitectDashboard'
import ClientDashboard           from './pages/ClientDashboard'
import ProjectWorkspace          from './pages/ProjectWorkspace'
import AppShell                  from './components/layout/AppShell'
import WalkthroughLoader         from './components/platform/WalkthroughLoader'
import SwitchRoleButton          from './components/platform/SwitchRoleButton'

function AppRouter() {
  const {
    role, currentPage,
    isLoading, setIsLoading,
    pageTransition,
  } = useApp()

  // Page map
  const renderPage = () => {
    if (!role || currentPage === 'role-select') return <RoleSelect />
    if (currentPage === 'dashboard')            return <ArchitectDashboard />
    if (currentPage === 'project-workspace')    return <ProjectWorkspace />
    if (currentPage === 'client-home')          return <ClientDashboard />
    if (currentPage === 'walkthrough')          return (
      <>
        {isLoading && (
          <WalkthroughLoader onComplete={() => setIsLoading(false)} />
        )}
        <AppShell />
      </>
    )
    return <RoleSelect />
  }

  return (
    <div style={{
      opacity: pageTransition ? 0 : 1,
      transition: 'opacity 0.28s ease',
    }}>
      {renderPage()}

      {/* Switch role button — visible everywhere except role select */}
      {role && currentPage !== 'role-select' && (
        <SwitchRoleButton />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}