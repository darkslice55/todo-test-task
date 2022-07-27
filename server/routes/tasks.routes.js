const taskRouter = require('express').Router();
const taskValidator = require('../controller/taskValidator');
const { Task } = require('../db/models');

taskRouter
  .route('/')
  .get(async (req, res, next) => {
    const { page, order, direction } = req.query;
    const LIMIT = 3;
    const offset = (page - 1) * LIMIT;
    try {
      const tasksAll = await Task.findAll();
      const tasks = await Task.findAll({
        order: [[order, direction]],
        offset,
        limit: LIMIT,
      });
      res.status(200).json({ tasksCount: tasksAll.length, tasks });
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    const isValidated = taskValidator(req.body);
    if (!isValidated.validated) {
      return res.status(422).json({ errors: isValidated.errors });
    }

    try {
      const task = await Task.create({
        ...req.body,
        done: false,
        edited: false,
      });

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  });

taskRouter.put('/:id', async (req, res, next) => {
  try {
    console.log('req.session.userId', req.session.userId);
    if (!req.session.userId) {
      return res.status(401).end();
    }

    const task = await Task.findByPk(Number(req.params.id));

    if (!task) {
      return res.status(404).json({ message: 'Нет такой задачи' });
    }
    if ('description' in req.body) task.description = req.body.description;
    if ('done' in req.body) task.done = req.body.done;
    if ('edited' in req.body) task.edited = req.body.edited;
    await task.save();

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = taskRouter;
