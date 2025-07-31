const usersRouter = require('express').Router();
const { userSchema } = require('../validators/userValidator');
const { createUser } = require('../controllers/userController');

usersRouter.post('/', async (req, res, next) => {
  // "abortEarly" is set to false to continue validating after the first error
  // and return all the errors found
  const { error } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error); // sends the error to the errorHandler middleware
  }

  return createUser(req, res);
});

module.exports = usersRouter;
