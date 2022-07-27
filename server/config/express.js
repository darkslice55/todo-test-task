const express = require('express');
const session = require('express-session');
const path = require('path');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'JAShdiaf3&3',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

function expressConfig(app) {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session(sessionConfig));
}

module.exports = expressConfig;
