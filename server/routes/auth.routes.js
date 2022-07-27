const authRouter = require('express').Router();
const { Admin } = require('../db/models');

authRouter.route('/').get(async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(404).end();
    }
    const checkedUser = await Admin.findOne({
      where: { id: req.session.userId },
    });
    if (!checkedUser) {
      return res.status(404).end();
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

authRouter.route('/login').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const checkedUser = await Admin.findOne({
      where: { login },
    });

    if (checkedUser && checkedUser.password === password) {
      req.session.userId = checkedUser.id;
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    next(error);
  }
});

authRouter.route('/logout').get((req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    delete res.locals.userId;
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
