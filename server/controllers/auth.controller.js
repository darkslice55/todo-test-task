const { Admin } = require('../db/models');
const authService = require('../services/auth.service');

class AuthController {
  async getAdmin(req, res, next) {
    try {
      if (!req.session.userId) {
        return res.status(404).end();
      }
      const checkedUser = await authService.findAdminByPk(req.session.userId);
      if (!checkedUser) {
        return res.status(404).end();
      }
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const checkedUser = await authService.findAdminByLogin(login);
      if (checkedUser && checkedUser.password === password) {
        req.session.userId = checkedUser.id;
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy();
      res.clearCookie('user_sid');
      delete res.locals.userId;
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
