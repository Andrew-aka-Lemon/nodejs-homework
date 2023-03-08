const express = require('express');

const ctrl = require('../../controllers/users');
const { validateBody, isTokenValid } = require('../../middlewares');
const { userSchemas } = require('../../models/users');

const router = express.Router();

router.post('/register', validateBody(userSchemas.registerUser), ctrl.register);

router.post('/login', validateBody(userSchemas.loginUser), ctrl.login);

router.post('/logout', isTokenValid, ctrl.logout);

router.get('/current', isTokenValid, ctrl.current);

router.patch(
  '/subscription',
  validateBody(userSchemas.updateSubscription),
  isTokenValid,
  ctrl.updateSubscription
);

module.exports = router;
