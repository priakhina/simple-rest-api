const usersRouter = require('express').Router();
const { userSchema } = require('../validators/userValidator');
const {
  getAllUsers,
  createUser,
  updateUser,
} = require('../services/userService');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
});

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

usersRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;

  // Validate the user object to ensure that all required fields are present
  const { error } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error);
  }

  try {
    const user = await updateUser(id, req.body);
    return res.status(200).send({ message: 'The user has been updated', user });
  } catch (error) {
    return next(error);
  }
});

module.exports = usersRouter;
