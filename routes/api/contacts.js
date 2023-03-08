const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody, isTokenValid } = require('../../middlewares');
const { schemas } = require('../../models/contacts');
const { isIdValid } = require('../../helpers');

const router = express.Router();

router.get('/', isTokenValid, ctrl.getAll);

router.get('/:contactId', isIdValid, isTokenValid, ctrl.getById);

router.post(
  '/',
  validateBody(schemas.addSchema),
  isTokenValid,
  ctrl.addContact
);

router.delete('/:contactId', isIdValid, isTokenValid, ctrl.removeById);

router.put(
  '/:contactId',
  isIdValid,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateFavoriteSchema, 'favorite'),
  ctrl.updateFavoriteById
);

module.exports = router;
