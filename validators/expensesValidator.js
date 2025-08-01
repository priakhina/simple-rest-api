const Joi = require('joi');

const numericField = Joi.number().min(0).required();

const savingsSchema = Joi.object({
  RRSP: numericField,
  investmentSavings: numericField,
  longtermSavings: numericField,
  bonds: numericField,
  other: numericField,
}).required();

const paymentObligationsSchema = Joi.object({
  creditCard: numericField,
  loan: numericField,
  vehicleLease: numericField,
  lineOfCredit: numericField,
}).required();

const insuranceSchema = Joi.object({
  lifeInsurance: numericField,
  healthInsurance: numericField,
  other: numericField,
}).required();

const housingSchema = Joi.object({
  rent: numericField,
  rentInsurance: numericField,
  storageAndParking: numericField,
  utilities: numericField,
  maintenance: numericField,
}).required();

const utilitiesSchema = Joi.object({
  phone: numericField,
  internet: numericField,
  water: numericField,
  heat: numericField,
  electricity: numericField,
  cable: numericField,
  other: numericField,
}).required();

const personalSchema = Joi.object({
  transportation: numericField,
  clothing: numericField,
  familyGifts: numericField,
  personalGrooming: numericField,
  diningOut: numericField,
  hobbies: numericField,
  other: numericField,
}).required();

const expensesSchema = Joi.object({
  savings: savingsSchema,
  paymentObligations: paymentObligationsSchema,
  insurance: insuranceSchema,
  housing: housingSchema,
  utilities: utilitiesSchema,
  personal: personalSchema,
});

module.exports = { expensesSchema };
