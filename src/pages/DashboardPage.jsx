import { useMemo, useState } from 'react'
import DailyTaskList from '../components/DailyTaskList'
import {
  buildTodayTasks,
  calculateStudyPlan,
  getPriorityBadgeClasses,
} from '../utils/studyPlan'

const initialForm = {
  name: '',
  examDate: '',
  priority: 'Medium',
}

function DashboardPage({
  subjects,
  setSubjects,
  taskCompletionMap,
  setTaskCompletionMap,
  carryOverTasks,
  setCarryOverTasks,
}) {
  const [formData, setFormData] = useState(initialForm)
  const hasSubjects = subjects.length > 0

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.examDate) return

    const plan = calculateStudyPlan(formData.examDate, formData.priority)

    const newSubject = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      examDate: formData.examDate,
      priority: formData.priority,
      daysUntilExam: plan.daysUntilExam,
      dailyTasks: plan.dailyTasks,
      dailyMinutes: plan.dailyMinutes,
      planMessage: plan.message,
    }

    setSubjects((prev) =>
      [...prev, newSubject].sort((a, b) => a.daysUntilExam - b.daysUntilExam),
    )
    setFormData(initialForm)
  }

  const summary = useMemo(() => {
    if (!hasSubjects) return 'No subjects added yet.'
    return `${subjects.length} subject${subjects.length > 1 ? 's' : ''} planned`
  }, [hasSubjects, subjects.length])

  const dailyTasks = useMemo(
    () =>
      buildTodayTasks(subjects, carryOverTasks).map((task) => ({
        ...task,
        completed: taskCompletionMap[task.id] ?? false,
      })),
    [carryOverTasks, subjects, taskCompletionMap],
  )

  const completedCount = dailyTasks.filter((task) => task.completed).length
  const completionPercent = dailyTasks.length
    ? Math.round((completedCount / dailyTasks.length) * 100)
    : 0
  const progressText = `${completedCount} of ${dailyTasks.length} complete`

  const toggleTask = (taskId) => {
    setTaskCompletionMap((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const handleMissedDay = () => {
    const pendingCount = dailyTasks.filter((task) => !task.completed).length
    const additionalTasks = Math.max(1, Math.ceil(pendingCount / 2))
    setCarryOverTasks((prev) => prev + additionalTasks)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-9 md:px-8 md:py-10">
      <header className="mb-6 rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm shadow-indigo-100/60 sm:mb-8 sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Study Planner Dashboard
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Add your subjects and get a simple day-by-day study direction until
          each exam.
        </p>
      </header>

      <section className="mb-6 rounded-2xl border border-indigo-100 bg-white/90 p-5 shadow-sm shadow-indigo-100/60 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Add Subject Form</h2>
        <form
          className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          onSubmit={handleSubmit}
        >
          <div className="xl:col-span-1">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Subject Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
              className="w-full rounded-xl border border-indigo-200 px-3 py-2.5 text-sm outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          <div className="xl:col-span-1">
            <label
              htmlFor="examDate"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Exam Date
            </label>
            <input
              id="examDate"
              name="examDate"
              type="date"
              value={formData.examDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-indigo-200 px-3 py-2.5 text-sm outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          <div className="xl:col-span-1">
            <label
              htmlFor="priority"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex items-end xl:col-span-1">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-indigo-500 hover:to-violet-500 active:scale-100"
            >
              Add Subject
            </button>
          </div>
        </form>
      </section>

      <div className="grid gap-5 md:gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-indigo-100 bg-white/90 p-5 shadow-sm shadow-indigo-100/60 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Your Subjects</h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {summary}
            </span>
          </div>

          {!hasSubjects ? (
            <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 p-6 text-center text-sm text-indigo-700">
              No subjects yet. Add your first subject to start building your plan.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {subjects.map((subject) => (
                <article
                  key={subject.id}
                  className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm shadow-indigo-100/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">
                      {subject.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityBadgeClasses(subject.priority)}`}
                    >
                      {subject.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Exam: {subject.examDate}
                  </p>
                  <p className="mt-1 text-sm font-medium text-indigo-700">
                    {Math.max(subject.daysUntilExam, 0)} day
                    {Math.max(subject.daysUntilExam, 0) === 1 ? '' : 's'} left
                  </p>
                  <p className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-900">
                    {subject.planMessage}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <DailyTaskList
          tasks={dailyTasks}
          completionPercent={completionPercent}
          progressText={progressText}
          onToggleTask={toggleTask}
          onMissedDay={handleMissedDay}
        />
      </div>
    </div>
  )
}

export default DashboardPage
