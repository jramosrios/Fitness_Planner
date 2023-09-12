import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const DisplayRoutines = ({ routines, setRoutines }) => {
    useEffect(() => {
        axios.get('http://localhost:8000/api/allRoutine')
            .then((res) => {
                console.log(res);
                setRoutines(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/deleteRoutine/${id}`)
            .then((res) => {
                console.log(res)
                setRoutines(routines.filter((routine) => routine._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //! Tracking the current open routine
    const [openRoutineId, setOpenRoutineId] = useState(null)

    //! Togles open and closing
    const toggleAccordion = (routineId) => {
        setOpenRoutineId((prevId) => (prevId === routineId ? null : routineId))
    }

    return (
        <div>
            <div className="top">
                <h2>Welcome to your Fitness Planner</h2>
                <Link to={'/routineForm'}>Create your Gym Routine</Link>
            </div>
            <div className="allRoutines">
                {
                    routines.map((routine) => (
                        <div key={routine._id} className={`routine ${openRoutineId === routine._id ? 'active' : ''}`} >
                            <div className={`header ${openRoutineId === routine._id ? 'active' : ''}`}
                                onClick={() => toggleAccordion(routine._id)}>
                                <div className="routineName">
                                    <h3>{routine.routineName}</h3>
                                </div>
                                <div className="actions">
                                    < button onClick={(e) => e.stopPropagation()} > <Link to={`/editRoutine/${routine._id}`} >Edit Routine</Link></button>
                                    <button onClick={() => deleteHandler(routine._id)} >Delete</button>
                                </div>
                            </div>
                            <div className={`content ${openRoutineId === routine._id ? 'active' : ''}`}>
                                {
                                    routine.workouts.map((workout) => (
                                        <div key={workout._id} className='workout'>
                                            <p>Workout: {workout.workoutName}</p>
                                            <p>Sets: {workout.sets}</p>
                                            <p>Repetitions: {workout.repetitions}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}
export default DisplayRoutines