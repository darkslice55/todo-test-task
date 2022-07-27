const taskRouter = require('express').Router();
const taskValidator = require('../controller/taskValidator');
const { Task } = require('../db/models');

taskRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await Task.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(tasks);
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
      });

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  });

taskRouter.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(Number(req.params.id));

    if (!task) {
      return res.status(404).json({ message: 'Нет такой задачи' });
    }

    if ('descpription' in req.body) task.descpription = req.body.descpription;
    if ('done' in req.body) task.done = req.body.done;
    await task.save();

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = taskRouter;
