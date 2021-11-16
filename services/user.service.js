const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class UsersService {

  async create(newUser) {
    const user = await models.User.create(newUser);
    return user;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('Error de user not found');
    }
    return user;
  }
}
module.exports = UsersService;
