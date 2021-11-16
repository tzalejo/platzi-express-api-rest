const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const { getUserDto, createUserDto } = require('../schemas/user.dto');
//const faker = require('faker');
const router = express.Router();

const UsersService = require('./../services/user.service');
const usersService = new UsersService();

router.get('/', async (req, res) => {
  const users = await usersService.find();
  res.json(users);
});

router.get(
  '/:id',
  validatorHandler(getUserDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserDto, 'body'),
  async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      const user = await usersService.create({ name, email, password });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
