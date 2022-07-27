const taskRouter = require('express').Router();
const tasksController = require('../controllers/tasks.controller');

taskRouter.route('/').get(tasksController.getTasks).post(tasksController.addTask);
taskRouter.route('/:id').put(tasksController.editTask);

module.exports = taskRouter;
