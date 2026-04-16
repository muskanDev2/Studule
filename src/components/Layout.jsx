import { NavLink } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-violet-50/40 to-slate-50">
      <header className="sticky top-0 z-10 border-b border-indigo-100/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink to="/" className="text-lg font-bold tracking-tight text-slate-900">
            Studule
          </NavLink>
          <nav className="flex w-full items-center justify-start gap-2 sm:w-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 md:px-4 ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:scale-[1.02] hover:bg-indigo-50 hover:text-slate-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 md:px-4 ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:scale-[1.02] hover:bg-indigo-50 hover:text-slate-900'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
