const { models } = require('../libs/sequelize');

class TypeWalletService {
  async create(newTypeWallet) {
    const typeWallet = await models.TypeWallet.create(newTypeWallet);
    return typeWallet;
  }

  async find() {
    const typeWallet = await models.TypeWallet.findAll();
    return typeWallet;
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
    const rta = await typeWallet.udpate(data);
    return rta;
  }
}

module.exports = TypeWalletService;
