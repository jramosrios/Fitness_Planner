const RoutineController = require('../controllers/routine.controller')

module.exports = (app) => {
    app.post('/api/newRoutine', RoutineController.addRoutine)
    app.get('/api/allRoutine', RoutineController.getAllRoutine)
    app.get('/api/oneRoutine/:id', RoutineController.getOneRoutine)
    app.put('/api/updateRoutine/:id', RoutineController.updateRoutine)
    app.delete('/api/deleteRoutine/:id', RoutineController.deleteRoutine)
}