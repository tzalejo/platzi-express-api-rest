const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class WalletService {

  async create(newWallet) {
    const user = await models.Wallet.create(newWallet);
    return user;
  }

  async find() {
    const product = await models.Wallet.findAll();
    return product;
  }

  async findOne(id) {
    const product = await models.Wallet.findByPk(id);
    if (!product) {
      throw boom.notFound('Error de wallet not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  // async delete(id) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     // throw new Error('Product not found');
  //     throw boom.notFound('Error de productos not found');
  //   }

  //   this.products.splice(index, 1);
  //   return { id };
  // }

  // async udpate(id, data) {
  //   const index = this.products.findIndex((item) => item.id === id);

  //   if (index === -1) {
  //     // throw new Error('Product not found');
  //     throw boom.notFound('Error de productos not found');
  //   }

  //   const product = this.products[index];
  //   this.products[index] = {
  //     ...product,
  //     ...data,
  //   };
  //   return this.products[index];
  // }
}

module.exports = WalletService;
