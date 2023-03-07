const bcrypt = require('bcrypt');

const { HttpError, ctrlWrapper } = require('../helpers');
const { User } = require('../models/users');

const register = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw HttpError(409, 'Email already is use');
  }
  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPass });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

// const login = async (req, res) => {};

module.exports = {
  register: ctrlWrapper(register),
};
