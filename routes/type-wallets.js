const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const {
  getTypeWalletDto,
  createTypeWalletDto,
  updateTypeWalletDto,
} = require('../schemas/type-wallet.dto');

const router = express.Router();

const TypeWalletService = require('../services/type-wallet.service');
const passport = require("passport");
const typeWalletService = new TypeWalletService();

router.get('/',
  async (req, res) => {
    const typeWallet = await typeWalletService.find();
    res.json(typeWallet);
  });

router.get(
  '/:id',
  validatorHandler(getTypeWalletDto, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const typeWallet = await typeWalletService.findOne(id);
      res.json(typeWallet);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(createTypeWalletDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await typeWalletService.create(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(getTypeWalletDto, 'params'),
  validatorHandler(updateTypeWalletDto, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const user = await typeWalletService.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(getTypeWalletDto, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      await typeWalletService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
