import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const RoutineForm = ({ routines, setRoutines }) => {
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
        const newWorkout = {
            workoutName: '',
            sets: '',
            repetitions: ''
        }
        setRoutine({
            ...routine, workouts: [...routine.workouts, newWorkout]
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
                setRoutines([...routines, res.data])
                console.log(res)
            })
            .catch((err) => {
                console.log(err, "This is your error you are looking for")
                setErrors(err.response.data.errors)
                console.log(err.response.data.errors)
                console.log(err.response.data.errors["workouts.0.repetitions"])
            })
    }



    return (
        <div className="wrapper">
            <div className="top">
                <h2>Create your routine!</h2>
                <Link to={'/'} >Back to home</Link>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="routineName">Routine Name:</label>
                    <input
                        type="text"
                        name="routineName"
                        id="routineName"
                        value={routine.routineName}
                        onChange={changeHandler}
                        placeholder='Leg Day'
                        className="routine-input" />
                    {
                        errors.routineName ?
                            <p>{errors.routineName.message}</p> :
                            null
                    }
                </div>
                <div className="workouts">
                    {routine?.workouts.map((workout, idx) => (
                        <div key={idx} className="input">
                            <label htmlFor={`workoutName_${idx}`}>Workout: </label>
                            <input type="text"
                                name='workoutName'
                                id={`workoutName_${idx}`}
                                value={workout.workoutName}
                                onChange={(e) => handleWorkoutChange(e, idx)}
                                placeholder='Leg Press' />
                            {
                                errors[`workouts.${idx}.workoutName`] ?
                                    <p>{errors[`workouts.${idx}.workoutName`].message}</p> :
                                    null
                            }
                            < label htmlFor={`sets_${idx}`}>Sets: </label>
                            <input type="text"
                                name="sets"
                                id={`sets_${idx}`}
                                value={workout.sets}
                                onChange={(e) => handleWorkoutChange(e, idx)}
                                placeholder='3' />
                            {
                                errors[`workouts.${idx}.sets`] ?
                                    <p>{errors[`workouts.${idx}.sets`].message}</p> :
                                    null
                            }

                            <label htmlFor={`repetitions_${idx}`}>Repetitions: </label>
                            <input type="text"
                                name="repetitions"
                                id={`repetitions_${idx}`}
                                value={workout.repetitions}
                                onChange={(e) => handleWorkoutChange(e, idx)}
                                placeholder='10-12' />
                            {
                                errors[`workouts.${idx}.repetitions`] ?
                                    <p>{errors[`workouts.${idx}.repetitions`].message}</p> :
                                    null
                            }
                        </div>
                    )
                    )}
                </div >
                <button type="button" onClick={addWorkoutField} >Add workout</button>
                <button>Add Routine</button>
            </form >
        </div >
    )
}
export default RoutineForm