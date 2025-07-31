const schemaValidator = (schema) => (req, res, next) => {
  // The "abortEarly" property is set to false to continue validating after the first error
  // and return all the errors found
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(error); // Send Joi validation errors to the errorHandler middleware
  }

  next(); // Continue to route handler
};

module.exports = { schemaValidator };
