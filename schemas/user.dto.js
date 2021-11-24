const Joi = require('joi');

const id = Joi.number();
const firstName = Joi.string().min(3).max(10);
const lastName = Joi.string().min(3).max(10);
const email = Joi.string().email();
const birthday = Joi.date();
const password = Joi.string().min(3).max(10);
const limit = Joi.number();
const offset = Joi.number();
const token = Joi.string();

const createUserDto = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  birthday: birthday.required(),
  password: password.required(),
});

const updateUserDto = Joi.object({
  firstName: firstName,
  lastName: lastName,
  password: password,
  birthday: birthday,
});

const getUserDto = Joi.object({
  id: id.required(),
});

const queryUserDto  = Joi.object({
  limit,
  offset,
  email
});

const queryUserToken = Joi.object({
  token: token.required(),
  password: password.required(),
})
module.exports = { createUserDto, updateUserDto, getUserDto, queryUserDto, queryUserToken };
