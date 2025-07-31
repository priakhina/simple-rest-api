const db = require('../utils/config');

const createUser = async (userData) => {
  const usersRef = db.ref('users');
  const newUserRef = usersRef.push();
  const id = newUserRef.key;

  const newUser = { id, ...userData };
  await newUserRef.set(newUser);

  return newUser;
};

module.exports = { createUser };
