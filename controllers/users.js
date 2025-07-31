const usersRouter = require('express').Router();
const db = require('../utils/config');
const { userSchema } = require('../validators/userValidator');

usersRouter.post('/', async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
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
