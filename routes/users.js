const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const {
  getUserDto,
  createUserDto,
  updateUserDto,
  queryUserDto
} = require('../schemas/user.dto');
const router = express.Router();
const passport = require('passport');
const UsersService = require('./../services/user.service');
// const {checkRole} = require("../middleware/auth.handler");
const usersService = new UsersService();

router.get('/',
  validatorHandler(queryUserDto, 'query'),
  async (req, res) => {
    const users = await usersService.find(req.query);
    res.json(users);
  });

router.get(
  '/:id',
  validatorHandler(getUserDto, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await usersService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  // checkRole('admin', 'customer'),
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(createUserDto, 'body'),
  async (req, res, next) => {
    try {
      const {email, firstName, lastName, password, birthday} = req.body;
      const user = await usersService.create({
        firstName,
        lastName,
        email,
        password,
        birthday,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(updateUserDto, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const {password, firstName, lastName, birthday} = req.body;
      const user = await usersService.update(id, {
        firstName,
        lastName,
        birthday,
        password,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate(`jwt`, {session: false}),
  validatorHandler(getUserDto, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      await usersService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
