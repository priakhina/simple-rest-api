const db = require('../utils/config');

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const usersRef = db.ref('users');
    const newUserRef = usersRef.push();
    const id = newUserRef.key;

    const newUser = { id, ...body };
    await newUserRef.set(newUser);

    return res
      .status(201)
      .send({ message: 'New user has been created', user: newUser });
  } catch (error) {
    console.error('Failed to create a new user');
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createUser };
