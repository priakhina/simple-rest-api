const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    street: Joi.string().required(),
    suite: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required(),
  }).required(),
});

module.exports = { userSchema };
