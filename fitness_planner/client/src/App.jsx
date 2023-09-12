import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import RoutineForm from './components/RoutineForm'
import Homepage from './views/Homepage'
import EditRoutine from './components/EditRoutine'

function App() {
  const [routines, setRoutines] = useState([])

  return (
    <>
      <h1>Fitness Planner</h1>
      <Routes>
        <Route path="/" element={<Homepage routines={routines} setRoutines={setRoutines} />} />
        <Route path="/routineForm" element={<RoutineForm routines={routines} setRoutines={setRoutines} />} />
        <Route path='/editRoutine/:id' element={<EditRoutine />} />
      </Routes>
    </>
  )
}

export default App
