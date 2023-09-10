import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RoutineForm = (routines, setRoutines) => {
    const [routine, setRoutine] = useState({
        routineName: "",
        workouts: [
            {
                workoutName: '',
                sets: '',
                repetitions: '',
            }
        ]
    });

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    //! handels changes in the form
    const changeHandler = (e) => {
        setRoutine({ ...routine, [e.target.name]: e.target.value })
    }


    const addWorkoutField = () => {
        setRoutine({
            ...routine, workouts: [...routine.workouts, { workoutName: '', sets: '', repetitions: '' }]
        })
    }

    const handleWorkoutChange = (e, idx) => {
        //! destructure even objext to get name and value of the input field
        const { name, value } = e.target
        //! Create a copy the the existing workouts array
        const updatedExercises = [...routine.workouts]
        //! Updates workouts properties like name sets and reps
        updatedExercises[idx][name] = value;
        //! Updates the routine form state by replacing the exercise array with an updated one
        setRoutine({ ...routine, workouts: updatedExercises })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/newRoutine', routine)
            .then((res) => {
                console.log(res)
                navigate('/')
                setRoutine([...routines, res.data])
            })
            .catch((err) => {
                setErrors(err.response.data.errors)
            })
    }



    return (
        <div>
            <h2>Create your routine!</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="routineName">Routine Name:</label>
                    <input type="text" name="routineName" value={routine.routineName}
                        onChange={changeHandler}
                        placeholder='Leg Day' />
                    {
                        errors.routineName ?
                            <p>{errors.routineName.message}</p> :
                            null
                    }
                </div>
                <div className="workouts">
                    {routine.workouts.map((workout, idx) => (
                        <div key={idx}>
                            <label htmlFor="workoutName">Workout: </label>
                            <input type="text" name='workoutName' value={workout.workoutName}
                                onChange={(e) => handleWorkoutChange(e, idx)}
                                placeholder='Leg Press' />
                            {
                                errors.workoutName ?
                                    <p>{errors.workouts.workoutName.message}</p> :
                                    null
                            }

                            <label htmlFor="sets">Sets: </label>
                            <input type="text" name="sets" value={workout.sets}
                                onChange={(e) => handleWorkoutChange(e, idx)}
                                placeholder='3' />
                            {
                                errors.sets ?
                                    <p>{errors.workouts.sets.message}</p> :
                                    null
                            }

                            <label htmlFor='repetitions'>Repetitions: </label>
                            <input type="text" name="repetitions" value={workout.repetitions}
                                onChange={(e) => handleWorkoutChange(e, idx)}
                                placeholder='10-12' />
                            {
                                errors.repetitions ?
                                    <p>{errors.repetitions.message}</p> :
                                    null
                            }
                        </div>
                    )
                    )}
                    <button type="button" onClick={addWorkoutField}>Add workout</button>
                </div>
                <button>Add Routine</button>
            </form>
        </div>
    )
}
export default RoutineForm