const usersRouter = require('express').Router();
const { userSchema } = require('../validators/userValidator');
const { createUser } = require('../services/userService');

usersRouter.post('/', async (req, res, next) => {
  // "abortEarly" is set to false to continue validating after the first error
  // and return all the errors found
  const { error } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error); // sends Joi validation errors to the errorHandler middleware
  }

  try {
    const user = await createUser(req.body);
    return res.status(201).send({ message: 'New user has been created', user });
  } catch (error) {
    return next(error);
  }
});

module.exports = usersRouter;
