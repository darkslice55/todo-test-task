const taskValidator = require('./taskValidator');
const { Task } = require('../db/models');
const tasksService = require('../services/tasks.service');

class TasksController {
  async getTasks(req, res, next) {
    const { page, order, direction } = req.query;
    const limit = 3;
    const offset = (page - 1) * limit;
    try {
      const tasksAll = await tasksService.getAllTasks();
      const tasks = await tasksService.getFiltredTasks({ offset, limit, order, direction });
      res.status(200).json({ tasksCount: tasksAll.length, tasks });
    } catch (error) {
      next(error);
    }
  }

  async addTask(req, res, next) {
    const isValidated = taskValidator(req.body);
    if (!isValidated.validated) {
      return res.status(422).json({ errors: isValidated.errors });
    }

    try {
      const task = await tasksService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async editTask(req, res, next) {
    try {
      if (!req.session.userId) {
        return res.status(401).end();
      }
      await tasksService.updateTask({ ...req.body, id: req.params.id });
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TasksController();
