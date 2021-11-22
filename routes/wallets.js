const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const {
  getWalletDto,
  createWalletDto,
  updateWalletDto,
  createWalletUserDto,
} = require('../schemas/wallet.dto');
const router = express.Router();

const WalletService = require('./../services/wallet.service');
const passport = require("passport");
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
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(createWalletDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await walletService.create(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/user',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(createWalletUserDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await walletService.create(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(getWalletDto, 'params'),
  validatorHandler(updateWalletDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await walletService.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(getWalletDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await walletService.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
