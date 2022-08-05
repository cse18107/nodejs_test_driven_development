const express = require('express');
const router = express.Router();
const User = require('./User');
const UserService = require('./UserService');
const { check, validationResult } = require('express-validator');
const InvalidTokenException = require('./InvalidTokenException');

router.post(
  '/users',
  check('username')
    .notEmpty()
    .withMessage('username_null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('username_size'),
  check('email')
    .notEmpty()
    .withMessage('email_null')
    .bail()
    .isEmail()
    .withMessage('email_invalid')
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error('email_inuse');
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('password_null')
    .bail()
    .isLength({ min: 6 })
    .withMessage('password_size')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage('password_pattern'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors.array().forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
      return res.status(400).send({ validationErrors });
    }
    try {
      await UserService.save(req.body);
      return res.send({ message: 'User created' });
    } catch (error) {
      return res.status(502).send({ message: error.message });
    }
  }
);

router.post('/users/token/:token', async (req, res, next) => {
  const token = req.params.token;
  try {
    await UserService.activate(token);
    return res.send();
  } catch (err) {
    // return res.status(400).send();
    next(err);
  }


});

module.exports = router;
