const usersRouter = require('express').Router();
const {
  schemaValidator: validateSchema,
} = require('../middleware/schemaValidator');
const { userSchema } = require('../validators/userValidator');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/userService');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/', validateSchema(userSchema), async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).send({ message: 'New user has been created', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put('/:id', validateSchema(userSchema), async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await updateUser(id, req.body);
    return res.status(200).send({ message: 'User has been updated', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    return res.status(200).send({ message: 'User has been deleted' });
  } catch (error) {
    return next(error);
  }
});

module.exports = usersRouter;
