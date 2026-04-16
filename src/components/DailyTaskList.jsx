function DailyTaskList({
  tasks,
  completionPercent,
  progressText,
  onToggleTask,
  onMissedDay,
}) {
  return (
    <section className="rounded-2xl border border-indigo-100 bg-white/90 p-5 shadow-sm shadow-indigo-100/60 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">Today's Study Plan</h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {progressText}
        </span>
      </div>

      <div className="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-indigo-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 ease-out"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      <button
        type="button"
        onClick={onMissedDay}
        className="mb-4 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition-all duration-300 hover:scale-[1.02] hover:bg-amber-100 active:scale-100 sm:w-auto"
      >
        Missed a day? Redistribute tasks
      </button>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/70 px-5 py-6 text-center text-sm text-indigo-700">
          You're all caught up 🎉
        </div>
      ) : (
        <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-start gap-3 rounded-xl border border-indigo-100 p-3 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-200 hover:bg-indigo-50/40"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="mt-1 h-4 w-4 rounded border-indigo-300 text-indigo-600 transition-all duration-200 focus:ring-indigo-300"
            />
            <p
              className={`min-w-0 break-words text-sm leading-relaxed ${
                task.completed ? 'text-slate-400 line-through' : 'text-slate-700'
              }`}
            >
              {task.label}
            </p>
          </li>
        ))}
        </ul>
      )}
    </section>
  )
}

export default DailyTaskList
