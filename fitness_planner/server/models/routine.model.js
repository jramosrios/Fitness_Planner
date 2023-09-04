const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    routineName: {
        type: String,
        required: [true, 'You must put a routine name'],
        minLength: [3, 'The routine name must be at least 3 characters long']
    },
    workouts: [
        {
            workoutName: String,
            sets: String,
            repetitions: String
        }
    ]
}, { timestamps: true })

const Routine = mongoose.model('Routine', RoutineSchema)
module.exports = Routine