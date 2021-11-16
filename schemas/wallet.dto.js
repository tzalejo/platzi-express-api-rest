const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(10);
const loginName = Joi.string().min(3).max(20);
const password = Joi.string().min(3).max(10);
const userId = Joi.number().integer();

const createWalletDto = Joi.object({
  name: name.required(),
  loginName: loginName.required(),
  password: password.required(),
  userId: userId.required(),
});

const updateWalletDto = Joi.object({
  name: name,
  loginName: loginName,
  password: password,
  userId: userId,
});

const getWalletDto = Joi.object({
  id: id.required(),
});

module.exports = { createWalletDto, updateWalletDto, getWalletDto };
