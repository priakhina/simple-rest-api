const usersRouter = require('express').Router();
const db = require('../utils/config');
const { userSchema } = require('../validators/userValidator');

usersRouter.post('/', async (req, res, next) => {
  try {
    // "abortEarly" is set to false to continue validating after the first error
    // and return all the errors found
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return next(error); // sends the error to the errorHandler middleware
    }

    const usersRef = db.ref('users');
    const newUserRef = usersRef.push();
    const id = newUserRef.key;

    const newUser = { id, ...value };
    await newUserRef.set(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.error('Failed to create a new user');
    res.status(500).send({ error: error.message });
  }
});

module.exports = usersRouter;
