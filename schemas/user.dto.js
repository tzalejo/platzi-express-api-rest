const Joi = require("joi")

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(10);
const email = Joi.string().email();
const limit = Joi.number();
const offset = Joi.number();

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  limit: limit.required(),
  offset: offset.required(),
});

const updateUserDto = Joi.object({
  name: name,
  email: email,
});

const getUserDto = Joi.object({
  id: id.required(),
});

module.exports = { createUserDto, updateUserDto, getUserDto};
