// const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class WalletService {
  async create(newWallet) {
    const user = await models.Wallet.create(newWallet, {
      include: ['user'],
    });
    return user;
  }

  async find() {
    const product = await models.Wallet.findAll({
      include: ['user'],
    });
    return product;
  }

  async findOne(id) {
    const wallet = await models.Wallet.findByPk(id);
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
