const Joi = require('Joi');
const { Schema, model } = require('mongoose');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const typesOfSubscriptions = ['starter', 'pro', 'business'];

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timeStamps: true }
);

const registerUser = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
  avatarURL: Joi.string(),
});

const loginUser = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid(...typesOfSubscriptions),
});

const resendVerify = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
});

const userSchemas = {
  registerUser,
  loginUser,
  updateSubscription,
  resendVerify,
};

const User = model('user', userSchema);

module.exports = {
  User,
  userSchemas,
};
