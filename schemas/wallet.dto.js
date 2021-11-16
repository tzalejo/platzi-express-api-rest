const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(10);
const loginname = Joi.string().min(3).max(20);
const password = Joi.string().min(3).max(10);

const createWalletDto = Joi.object({
  name: name.required(),
  loginname: loginname.required(),
  password: password.required(),
});

const updateWalletDto = Joi.object({
  name: name,
  loginname: loginname,
  password: password
});

const getWalletDto = Joi.object({
  id: id.required(),
});

module.exports = { createWalletDto, updateWalletDto, getWalletDto };
