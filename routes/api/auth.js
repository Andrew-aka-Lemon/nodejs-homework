const express = require('express');

const ctrl = require('../../controllers/users');
const { validateBody, isTokenValid, upload } = require('../../middlewares');
const { userSchemas } = require('../../models/users');

const router = express.Router();

router.post(
  '/register',
  upload.single('avatarURL'),
  validateBody(userSchemas.registerUser),
  ctrl.register
);

router.post('/login', validateBody(userSchemas.loginUser), ctrl.login);

router.post('/logout', isTokenValid, ctrl.logout);

router.get('/current', isTokenValid, ctrl.current);

router.patch(
  '/subscription',
  validateBody(userSchemas.updateSubscription),
  isTokenValid,
  ctrl.updateSubscription
);

router.patch(
  '/avatar',
  isTokenValid,
  upload.single('avatarURL'),
  ctrl.updateAvatar
);

module.exports = router;
