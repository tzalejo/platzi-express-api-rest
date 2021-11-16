const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const { getWalletDto, createWalletDto } = require('../schemas/wallet.dto');
const router = express.Router();

const WalletService = require('./../services/wallet.service');
const walletService = new WalletService();

router.get('/', async (req, res) => {
  const users = await walletService.find();
  res.json(users);
});

router.get(
  '/:id',
  validatorHandler(getWalletDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await walletService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createWalletDto, 'body'),
  async (req, res, next) => {
    try {
      const { name, loginname, password } = req.body;
      const user = await walletService.create({ name, loginname, password });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
