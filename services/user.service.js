const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');
const {where} = require("sequelize");
class UsersService {

  async create(newUser) {
    const hash = await bcrypt.hash(newUser.password, 10);
    const user = await models.User.create({
      ...newUser,
      password: hash
    });
    delete  user.dataValues.password;
    return user;
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

  async findEmail(email) {
    return await models.User.findOne({
      where: {email}
    });
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
