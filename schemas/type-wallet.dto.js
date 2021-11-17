const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(10);

const createTypeWalletDto = Joi.object({
  name: name.required(),
});

const updateTypeWalletDto = Joi.object({
  name: name,
});

const getTypeWalletDto = Joi.object({
  id: id.required(),
});

module.exports = { createTypeWalletDto, updateTypeWalletDto, getTypeWalletDto };
