const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class UsersService {

  async create(newUser) {
    return await models.User.create(newUser);
  }

  async find(query) {
    const options = {
      include: ['wallets'],
      where: {},
    }
    const {limit, offset, email} = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    if (email){
      options.where.email = email;
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
