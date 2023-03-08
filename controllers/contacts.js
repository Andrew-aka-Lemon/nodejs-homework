const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contacts');

async function getAll(req, res) {
  const { _id } = req.user;
  const contactsAll = await Contact.find(
    { owner: _id },
    '-createdAt -updatedAt'
  ).populate('owner');

  res.status(200).json(contactsAll);
}

async function getById(req, res) {
  const { _id } = req.user;
  const contactById = await Contact.find(
    {
      owner: _id,
      _id: req.params.contactId,
    },
    '-createdAt -updatedAt'
  );

  if (contactById === null) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contactById);
}

async function addContact(req, res) {
  req.body.owner = req.user._id;
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
}

async function removeById(req, res) {
  const contactById = await Contact.findOneAndRemove({
    _id: req.params.contactId,
  });

  if (contactById === null) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contactById);
}

async function updateById(req, res) {
  const updatedContact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
    },
    req.body
  );

  res.status(200).json(updatedContact);
}

async function updateFavoriteById(req, res) {
  const updatedContact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
    },
    { favorite: req.body.favorite }
  );

  res.status(200).json(updatedContact);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
