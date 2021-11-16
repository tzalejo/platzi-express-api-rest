const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(10);
const email = Joi.string().email();
const password = Joi.string().min(3).max(10);

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserDto = Joi.object({
  name: name,
  password: password,
});

const getUserDto = Joi.object({
  id: id.required(),
});

module.exports = { createUserDto, updateUserDto, getUserDto };
