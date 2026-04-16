import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [subjects, setSubjects] = useState([])
  const [taskCompletionMap, setTaskCompletionMap] = useState({})
  const [carryOverTasks, setCarryOverTasks] = useState(0)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              subjects={subjects}
              setSubjects={setSubjects}
              taskCompletionMap={taskCompletionMap}
              setTaskCompletionMap={setTaskCompletionMap}
              carryOverTasks={carryOverTasks}
              setCarryOverTasks={setCarryOverTasks}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
