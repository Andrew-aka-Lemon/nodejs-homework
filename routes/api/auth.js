const express = require('express');
const path = require('path');
const multer = require('multer');

const ctrl = require('../../controllers/users');
const { validateBody, isTokenValid } = require('../../middlewares');
const { userSchemas } = require('../../models/users');

const tempDIR = path.join(__dirname, '../', '../', 'temp');

const upload = multer({ dest: tempDIR });

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

router.patch('/avatar', isTokenValid, ctrl.updateAvatar);

module.exports = router;
