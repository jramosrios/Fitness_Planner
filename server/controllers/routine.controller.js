const Routine = require('../models/routine.model')

module.exports = {
    addRoutine: (req, res) => {
        console.log(req.body)
        Routine.create(req.body)
            .then((newRoutine) => {
                res.status(201).json(newRoutine)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    getAllRoutine: (req, res) => {
        Routine.find({})
            .then((allRoutine) => {
                res.status(200).json(allRoutine)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    getOneRoutine: (req, res) => {
        const id = req.params.id
        Routine.findById(id)
            .then((oneRoutine) => {
                res.status(200).json(oneRoutine)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    updateRoutine: (req, res) => {
        const id = req.params.id
        Routine.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true }
        )
            .then((updatedRoutine) => {
                res.status(200).json(updatedRoutine)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    deleteRoutine: (req, res) => {
        const id = req.params.id
        Routine.deleteOne({ _id: id })
            .then((oneRoutine) => {
                res.status(200).json(oneRoutine)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}