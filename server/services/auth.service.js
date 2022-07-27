const { Admin } = require('../db/models');

class AuthService {
  findAdminByPk(id) {
    return Admin.findOne({
      where: { id },
    });
  }

  findAdminByLogin(login) {
    return Admin.findOne({
      where: { login },
    });
  }
}

module.exports = new AuthService();
