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

  async sendEamil(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail, // generated ethereal user
        pass: config.smtpPass, // generated ethereal password
      },
    });

    await transporter.sendMail(infoMail);
    return {message: 'mail send'};
  }

  async sendRecovery(email) {
    const user = await serviceUser.findEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `https://mi_url/recovety?token=${token}`;
    await serviceUser.update(user.id, {recoveryToken: token}); // guardo el token
    const mail = {
      from: '"Fred Foo 👻" <tzalejo@gmail.com>', // sender address
      to: user.email, // sender list of receivers
      subject: "Email para recuperar contraseña ✔✔✔", // Subject line
      html: `<b>ingrese a este link => ${link}</b>`, // html body
    };
    return await this.sendEamil(mail);
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await serviceUser.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(password, 10);
      await serviceUser.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'password change'};
    } catch (e) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
