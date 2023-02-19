const express = require('express');

const router = express.Router();

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

router.get('/', async (req, res) => {
  const contactsAll = await contacts.listContacts();

  res.status(200).json(contactsAll);
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactById = await contacts.getContactById(req.params.contactId);

    if (contactById === null) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
