const { HttpError } = require('../helpers');

const validateBody = schema => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, 'missing required name field'));
    }

    next();
  };

  return fn;
};

module.exports = validateBody;
