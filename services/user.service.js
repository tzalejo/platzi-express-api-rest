const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class UsersService {

  async create(newUser) {
    const user = await models.User.create(newUser);
    return user;
  }

  async find(query) {
    const options = {
      include: ['wallets'],
    }
    const {limit, offset} = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    return  await models.User.findAll(options);
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['wallets']
    });
    if (!user) {
      throw boom.notFound('Error de user not found');
    }
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }
}
module.exports = UsersService;
