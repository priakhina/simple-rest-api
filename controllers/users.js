const usersRouter = require('express').Router();
const db = require('../utils/config');

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body;

    const usersRef = db.ref('users');
    const newUserRef = usersRef.push();
    const id = newUserRef.key;

    const newUser = { id, ...body };
    await newUserRef.set(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.error('Failed to create a new user');
    res.status(500).send(error);
  }
});

module.exports = usersRouter;
