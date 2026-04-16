const navLinks = ['Dashboard', 'Planner', 'Tasks', 'Settings']

function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Studule
        </h1>
        <nav className="hidden gap-2 sm:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              {link}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
