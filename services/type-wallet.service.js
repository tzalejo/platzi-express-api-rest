const { models } = require('../libs/sequelize');

class TypeWalletService {
  async create(newTypeWallet) {
    return await models.TypeWallet.create(newTypeWallet);
  }

  async find() {
    return await models.TypeWallet.findAll();
  }

  async findOne(id) {
    const typeWallet = await models.TypeWallet.findByPk(id);
    if (!typeWallet) {
      // throw boom.notFound('Error de wallet not found');
      return { message: 'No exite type Wallet' };
    }
    return typeWallet;
  }

  async delete(id) {
    const typeWallet = await this.find(id);
    await typeWallet.destroy();
    return { message: 'Se elimino correctamente la wallet' };
  }

  async udpate(id, data) {
    const typeWallet = await this.find(id);
    return await typeWallet.udpate(data);
  }
}

module.exports = TypeWalletService;
