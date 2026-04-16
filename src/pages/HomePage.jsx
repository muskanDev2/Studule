import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Smart Study Plans',
    description: 'Create clear study routines personalized to your learning goals.',
  },
  {
    title: 'Progress Tracking',
    description: 'Track completed sessions and keep your momentum visible every day.',
  },
  {
    title: 'Adaptive Scheduling',
    description: 'Adjust your timetable quickly as priorities and deadlines change.',
  },
]

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-14 sm:px-6 sm:py-18 md:px-8 md:py-24">
        <div className="w-full rounded-2xl border border-indigo-100 bg-white/90 p-6 text-center shadow-sm shadow-indigo-100/70 sm:p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
            Studule
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Plan Smarter, Study Better
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Your personal AI-powered study planner
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-indigo-500 hover:to-violet-500 active:scale-100"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-6 md:px-8 sm:pb-20">
        <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm shadow-indigo-100/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 md:px-8">
        © {new Date().getFullYear()} Studule. Built for better student focus.
      </footer>
    </div>
  )
}

export default HomePage
