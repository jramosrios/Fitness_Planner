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

    return (
        <div>
            <h2>Welcome to your Fitness Planner</h2>
            <Link to={'/routineForm'}>Create your Gym Routine</Link>
            <div className="allRoutines">
                {
                    routines.map((routine) => (
                        <div key={routine._id} >
                            <h3>{routine.routineName}</h3>

                            {
                                routine.workouts.map((workout) => (
                                    <div key={workout._id} >
                                        <p>{workout.workoutName}</p>
                                        <p>{workout.sets}</p>
                                        <p>{workout.repetitions}</p>
                                    </div>
                                ))
                            }
                            < button> <Link to={`/editRoutine/${routine._id}`} >Edit Routine</Link></button>
                            <button onClick={() => deleteHandler(routine._id)} >Delete</button>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}
export default DisplayRoutines