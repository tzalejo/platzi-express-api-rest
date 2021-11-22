const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthService = require('./../services/auth.service');
const authService = new AuthService();
router.post(
  '/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      // el passport devuelve el usuario si valida correctamente el correo
      const user = req.user;
      res.json(authService.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  async (req, res, next) => {
    try {
      const {email} = req.body;
      const rta = await authService.sendEamil(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
