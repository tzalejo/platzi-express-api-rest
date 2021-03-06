// const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
class WalletService {
  async create(newWallet) {
    const wallet = await models.Wallet.create(newWallet);
    return wallet;
  }

  async createUser(data) {
    // cramos la wallet pero  a su vez el user..
    const hash = await bcrypt.hash(data.user.password, 10);
    const newUser = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    }
    return models.Wallet.create(newUser, {
      include: ['user']
    });
  }

  async find() {
    const wallet = await models.Wallet.findAll({
      include: ['user', 'type_wallet'],
    });
    return wallet;
  }

  async findOne(id) {
    const wallet = await models.Wallet.findByPk(id,{
      include: ['user', 'type_wallet'],
    });
    if (!wallet) {
      // throw boom.notFound('Error de wallet not found');
      return { message: 'No exite wallet' };
    }
    return wallet;
  }

  async delete(id) {
    const wallet = await this.find(id);
    await wallet.destroy();
    return { message: 'Se elimino correctamente la wallet' };
  }

  async udpate(id, data) {
    const wallet = await this.find(id);
    const rta = await wallet.udpate(data);
    return rta;
  }
}

module.exports = WalletService;
