const {Strategy} = require('passport-local');
const ServiceUser = require('./../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const serviceUser = new ServiceUser();
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await serviceUser.findEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.dataValues.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      return done(null, user);
    } catch (e) {
      done(e, false);
    }
  });

module.exports = LocalStrategy;
