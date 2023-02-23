const express = require('express');

const ctrl = require('../../controllers/contacts');
const validateBody = require('../../middlewares/validateBody');
const addSchema = require('../../schemas/addContactSchema');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validateBody(addSchema), ctrl.updateById);

module.exports = router;
