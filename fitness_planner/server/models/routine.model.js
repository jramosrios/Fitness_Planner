const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    routineName: {
        type: String,
        required: [true, 'You must put a routine name'],
        minlength: [3, 'The routine name must be at least 3 characters long']
    },
    workouts: [
        {
            workoutName: {
                type: String,
                required: [true, 'You must put a workout name'],
                minLength: [3, 'The workout name must be at least 3 characters long']
            },
            sets: {
                type: String,
                required: [true, 'You must put  how many sets you are going to do'],
                minLength: [1, 'The sets must be at least 1 characters long']
            },
            repetitions: {
                type: String,
                required: [true, 'You must put how many repetitions are going to be made'],
                minLength: [1, 'The repetitions must be at least 1 characters long']
            }
        }
    ]
}, { timestamps: true })

const Routine = mongoose.model('Routine', RoutineSchema)
module.exports = Routine