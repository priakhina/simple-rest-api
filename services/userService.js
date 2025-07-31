const db = require('../utils/config');

const getAllUsers = async () => {
  const snapshot = await db.ref('users').once('value');
  const users = snapshot.val();

  return Object.values(users); // coverts the resulting object into an array of objects (i.e., array of users)
};

const createUser = async (userData) => {
  const usersRef = db.ref('users');
  const newUserRef = usersRef.push();
  const id = newUserRef.key;

  const newUser = { id, ...userData };
  await newUserRef.set(newUser);

  return newUser;
};

module.exports = { createUser, getAllUsers };
