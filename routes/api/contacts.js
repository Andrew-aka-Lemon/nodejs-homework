const express = require('express');
const Joi = require('Joi');

const router = express.Router();

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

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
  try {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, 'missing required name field');
    }

    const newContact = await contacts.addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactById = await contacts.removeContact(req.params.contactId);

    if (contactById === null) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactById = await contacts.getContactById(req.params.contactId);

    if (contactById === null) {
      throw HttpError(404, 'Not found');
    }

    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, 'missing required name field');
    }

    const updatedContact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );

    console.log(updatedContact);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
