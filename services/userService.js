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

const updateUser = async (userId, updateData) => {
  const userRef = db.ref(`users/${userId}`);

  // Check if a user with the given id exists
  const snapshot = await userRef.once('value');
  if (!snapshot.exists()) {
    const error = new Error(`User with id ${userId} has not been found`);
    error.status = 404;
    throw error;
  }

  // Create a new user object and ensure that id remains consistent
  const updatedUser = { id: userId, ...updateData };

  // Overwite the entire user data
  await userRef.set(updatedUser);

  return updatedUser;
};

module.exports = { getAllUsers, createUser, updateUser };
