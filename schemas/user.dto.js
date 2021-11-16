const Joi = require('joi');

const id = Joi.number();
const firstName = Joi.string().min(3).max(10);
const lastName = Joi.string().min(3).max(10);
const email = Joi.string().email();
const birthday = Joi.date();
const password = Joi.string().min(3).max(10);

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

module.exports = { createUserDto, updateUserDto, getUserDto };
