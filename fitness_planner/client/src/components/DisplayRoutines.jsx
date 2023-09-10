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
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default DisplayRoutines