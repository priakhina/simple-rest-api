const Joi = require('joi');

const incomeSchema = Joi.object({
  wages: Joi.number().min(0).required(),
  secondaryIncome: Joi.number().min(0).required(),
  interest: Joi.number().min(0).required(),
  supportPayment: Joi.number().min(0).required(),
  other: Joi.number().min(0).required(),
});

module.exports = { incomeSchema };
