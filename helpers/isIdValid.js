const HttpError = require('./HttpError');

const { isValidObjectId } = require('mongoose');

const isIdValid = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    throw HttpError(404, 'ID is invalid');
  }
  next();
};

module.exports = isIdValid;
