const express = require('express');

const ctrl = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const { userSchemas } = require('../../models/users');
const { isIdValid } = require('../../helpers');

const router = express.Router();

router.post('/register', validateBody(userSchemas.registerUser), ctrl.register);

module.exports = router;
