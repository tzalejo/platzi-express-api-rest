const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(10);
const loginName = Joi.string().min(3).max(20);
const password = Joi.string().min(3).max(10);
const userId = Joi.number().integer();
const typeWalletId = Joi.number().integer();

const firstName = Joi.string().min(3).max(10);
const lastName = Joi.string().min(3).max(10);
const email = Joi.string().email();
const birthday = Joi.date();

const createWalletDto = Joi.object({
  loginName: loginName.required(),
  password: password.required(),
  userId: userId.required(),
  typeWalletId: typeWalletId.required(),
});

const createWalletUserDto = Joi.object({
  name: name.required(),
  loginName: loginName.required(),
  password: password.required(),
  user: Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    birthday: birthday.required(),
    password: password.required(),
  }),
  typeWalletId: typeWalletId.required(),
});

const updateWalletDto = Joi.object({
  name: name,
  loginName: loginName,
  password: password,
  userId: userId,
  typeWalletId: typeWalletId
});

const getWalletDto = Joi.object({
  id: id.required(),
});

module.exports = {
  createWalletDto,
  updateWalletDto,
  getWalletDto,
  createWalletUserDto,
};
