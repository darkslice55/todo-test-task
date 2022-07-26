const authRouter = require('express').Router();
const { Admin } = require('../db/models');

authRouter.route('/login').post(async (req, res) => {
  try {
    const { login, password } = req.body;
    const checkedUser = await Admin.findOne({
      where: { login },
    });

    if (checkedUser && checkedUser.password === password) {
      req.session.userId = checkedUser.id;
      res.status(200);
      res.end();
    } else {
      res.status(401);
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
});

authRouter.route('/logout').get((req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  delete res.locals.userId;
  res.status(200);
  res.end();
});
