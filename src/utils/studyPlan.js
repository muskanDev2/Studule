function getPriorityMultiplier(priority) {
  if (priority === 'High') return 1.4
  if (priority === 'Low') return 0.85
  return 1
}

export function getPriorityBadgeClasses(priority) {
  if (priority === 'High') {
    return 'bg-rose-100 text-rose-700 border border-rose-200'
  }
  if (priority === 'Low') {
    return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
  }
  return 'bg-violet-100 text-violet-700 border border-violet-200'
}

export function calculateStudyPlan(examDate, priority = 'Medium') {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const exam = new Date(examDate)
  exam.setHours(0, 0, 0, 0)

  const diffInMs = exam - now
  const daysUntilExam = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

  if (Number.isNaN(daysUntilExam)) {
    return {
      daysUntilExam: 0,
      message: 'Pick a valid exam date to generate a plan.',
    }
  }

  if (daysUntilExam <= 0) {
    return {
      daysUntilExam: 0,
      dailyTasks: 1,
      dailyMinutes: 45,
      message: 'Exam date is today or passed. Focus on revision and mock tests.',
    }
  }

  const baseTasks = daysUntilExam <= 7 ? 4 : daysUntilExam <= 21 ? 3 : 2
  const priorityMultiplier = getPriorityMultiplier(priority)
  const dailyTasks = Math.max(1, Math.round(baseTasks * priorityMultiplier))
  const dailyMinutes = dailyTasks * 30

  return {
    daysUntilExam,
    dailyTasks,
    dailyMinutes,
    message: `Study ${dailyTasks} focused task${dailyTasks > 1 ? 's' : ''} (${dailyMinutes} min total) per day for the next ${daysUntilExam} day${daysUntilExam > 1 ? 's' : ''}.`,
  }
}

export function buildTodayTasks(subjects, carryOverTasks = 0) {
  const subjectTasks =
    subjects.length === 0
      ? [
          { id: 't1', label: 'Plan tomorrow study slots' },
          { id: 't2', label: 'Review today notes for 20 minutes' },
          { id: 't3', label: 'Prepare one short revision checklist' },
        ]
      : subjects.slice(0, 4).flatMap((subject) => {
          const taskCount = Math.max(1, subject.dailyTasks ?? 2)
          return Array.from({ length: taskCount }, (_, index) => ({
            id: `task-${subject.id}-${index + 1}`,
            label: `${subject.name}: Session ${index + 1} (${Math.ceil((subject.dailyMinutes ?? 60) / taskCount)} min)`,
          }))
        })

  const redistributed = Array.from({ length: carryOverTasks }, (_, index) => ({
    id: `carry-${index + 1}`,
    label: `Redistributed catch-up task ${index + 1}`,
  }))

  return [...subjectTasks, ...redistributed]
}
