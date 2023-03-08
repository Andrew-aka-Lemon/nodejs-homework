const express = require('express');

const ctrl = require('../../controllers/users');
const { validateBody, isTokenValid } = require('../../middlewares');
const { userSchemas } = require('../../models/users');

const router = express.Router();

router.post('/register', validateBody(userSchemas.registerUser), ctrl.register);

router.post('/login', validateBody(userSchemas.loginUser), ctrl.login);

router.get('/current', isTokenValid, (req, res) => {
  res.json(req.user);
});
router.get('/logout', isTokenValid, (req, res) => {
  res.json(req.user);
});

module.exports = router;
