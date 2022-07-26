const taskRouter = require('express').Router();
const emailValidator = require('email-validator');
const { Task } = require('../db/models');

taskRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const tasks = await Task.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.status(200);
      res.json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  })
  .post(async (req, res) => {
    const { description, user_email, user_name } = req.body;
    if (description.trim() === '') {
      return res.status(422).json({ error: 'Описание задачи не может быть пустым' });
    }
    if (user_name.trim() === '') {
      return res.status(422).json({ error: 'Имя пользователя не может быть пустым' });
    }
    if (emailValidator.validate(user_email)) {
      return res.status(422).json({ error: 'Неправильный формат email' });
    }

    const task = await Task.create({
      description,
      user_name,
      user_email,
      done: false,
    });

    res.status(201).json(task);
  });
