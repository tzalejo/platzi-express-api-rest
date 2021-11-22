const express = require('express');
const router = express.Router();
const passport = require('passport');
const {config} = require('../config/config');
const jwt = require('jsonwebtoken');
router.post(
  '/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      // el passport devuelve el usuario si valida correctamente el correo
      const user = req.user;
      const payload = {
        sub: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
