import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, useNavigate, Link } from "react-router-dom";
const EditRoutine = (props) => {

    const { id } = useParams()
    const navigate = useNavigate()

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

    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/oneRoutine/${id}`)
            .then((res) => {
                console.log(res)
                setRoutine(res.data)
            })
            .catch((errors) => {
                console.log(errors)
            })
    }, [])

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
        axios.put(`http://localhost:8000/api/updateRoutine/${id}`, routine)
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }
    const removeWorkout = (idxRemove) => {
        const updatedExercises = [...routine.workouts]
        updatedExercises.splice(idxRemove, 1)
        setRoutine({
            ...routine,
            workouts: updatedExercises,
        })
    }

    return (
        <div className="wrapper">
            <div className="top">
                <h2>Edit Routine</h2>
                <Link to={'/'} >Back to home</Link>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="routineName">Routine Name:</label>
                    <input id="routineName" type="text" name="routineName" value={routine.routineName}
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
                            <label htmlFor={`workoutName_${idx}`}>Workout: </label>
                            <input id={`workoutName_${idx}`}
                                type="text" name='workoutName'
                                value={workout.workoutName}
                                onChange={(e) => handleWorkoutChange(e, idx)} />
                            {
                                errors[`workouts.${idx}.workoutName`] ?
                                    <p>{errors[`workouts.${idx}.workoutName`].message}</p> :
                                    null
                            }

                            <label htmlFor={`sets_${idx}`}>Sets: </label>
                            <input id={`sets_${idx}`}
                                type="text"
                                name="sets"
                                value={workout.sets}
                                onChange={(e) => handleWorkoutChange(e, idx)} />
                            {
                                errors[`workouts.${idx}.sets`] ?
                                    <p>{errors[`workouts.${idx}.sets`].message}</p> :
                                    null
                            }

                            <label htmlFor={`repetitions_${idx}`}>Repetitions: </label>
                            <input id={`repetitions_${idx}`}
                                type="text"
                                name="repetitions"
                                value={workout.repetitions}
                                onChange={(e) => handleWorkoutChange(e, idx)} />
                            {
                                errors[`workouts.${idx}.repetitions`] ?
                                    <p>{errors[`workouts.${idx}.repetitions`].message}</p> :
                                    null
                            }
                            <button type="button" onClick={() => removeWorkout(idx)} >Remove</button>
                        </div>
                    )
                    )}
                </div>
                <button type="button" onClick={addWorkoutField}>Add workout</button>
                <button>Add Routine</button>
            </form>
        </div>
    )
}

export default EditRoutine