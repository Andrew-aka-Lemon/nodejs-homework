const express = require('express');

const ctrl = require('../../controllers/contacts');
const validateBody = require('../../middlewares/validateBody');
const { schemas } = require('../../models/contactsSchema');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateFavoriteSchema, 'favorite'),
  ctrl.updateFavoriteById
);

module.exports = router;
