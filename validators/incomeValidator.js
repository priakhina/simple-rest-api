const Joi = require('joi');

const incomeSchema = Joi.object({
  wages: Joi.number().min(0).required(),
  secondaryIncome: Joi.number().min(0).default(0),
  interest: Joi.number().min(0).default(0),
  supportPayment: Joi.number().min(0).default(0),
  other: Joi.number().min(0).default(0),
});

module.exports = { incomeSchema };
