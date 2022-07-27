const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');

authRouter.route('/').get(authController.getAdmin);
authRouter.route('/login').post(authController.login);
authRouter.route('/logout').get(authController.logout);

module.exports = authRouter;
