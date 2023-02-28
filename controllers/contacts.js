const contacts = require('../models/contactsMethods');
const { HttpError, ctrlWrapper } = require('../helpers');

async function getAll(req, res) {
  const contactsAll = await contacts.listContacts();
  res.status(200).json(contactsAll);
}

async function getById(req, res, next) {
  const contactById = await contacts.getContactById(req.params.contactId);

  if (contactById === null) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contactById);
}

async function addContact(req, res, next) {
  const newContact = await contacts.addContact(req.body);

  res.status(201).json(newContact);
}

async function removeById(req, res, next) {
  const contactById = await contacts.removeContact(req.params.contactId);

  if (contactById === null) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contactById);
}

async function updateById(req, res, next) {
  const updatedContact = await contacts.updateContact(
    req.params.contactId,
    req.body
  );

  console.log(updatedContact);

  res.status(200).json(updatedContact);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
