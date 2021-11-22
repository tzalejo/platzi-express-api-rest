const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const ServiceUser = require('./user.service');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const serviceUser = new ServiceUser();
const nodemailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await serviceUser.findEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };

  }

  async sendEamil(email) {
    const user = await serviceUser.findEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'tzalejo@gmail.com', // generated ethereal user
        pass: 'ebkzdepyfopgjpdu', // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <tzalejo@gmail.com>', // sender address
      to: user.email, // sender list of receivers
      subject: "Este es un nuevo correo ✔✔✔", // Subject line
      text: "Hello world!!", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return {message: 'mail send'};
  }

}

module.exports = AuthService;