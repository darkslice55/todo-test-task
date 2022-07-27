require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./db/models');
const expressConfig = require('./config/express');

const router = require('./routes');

const app = express();
const PORT = process.env.PORT ?? 4000;

expressConfig(app);

app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((error, req, res) => {
  console.error('Произошла ошибка', error);
  res.status(500).json({
    success: false,
    message: 'Непредвиденная ошибка сервера, попробуйте зайти позже',
  });
});

app.listen(PORT, async () => {
  /* eslint-disable no-console */
  console.log('Веб-сервер слушает порт', PORT);

  try {
    await sequelize.authenticate();
    console.log('БД-сервер подключен успешно');
  } catch (error) {
    console.log('БД-сервер не подключен');
    console.log(error.message);
  }
});
