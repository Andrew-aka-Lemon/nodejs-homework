const { HttpError } = require('../helpers');

const validateBody = (schema, message = 'required') => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, `missing ${message} field`));
    }

    next();
  };

  return fn;
};

module.exports = validateBody;
