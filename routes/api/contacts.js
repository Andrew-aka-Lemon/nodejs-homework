const express = require('express');

const ctrl = require('../../controllers/contacts');
const validateBody = require('../../middlewares/validateBody');
const { schemas } = require('../../models/contactsSchema');
const { isIdValid } = require('../../helpers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isIdValid, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isIdValid, ctrl.removeById);

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
