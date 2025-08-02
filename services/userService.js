const db = require('../utils/config');
const { getVerifiedRefById } = require('./commonService');
const ConflictError = require('../errors/ConflictError');

const USERS_REF = db.ref('users');

const doesUserExistByField = async (field, value) => {
  const snapshot = await USERS_REF.orderByChild(field)
    .equalTo(value)
    .once('value');

  return snapshot.exists();
};

const getAllUsers = async () => {
  const snapshot = await USERS_REF.once('value');
  const users = snapshot.val();

  // Firebase returns null or undefined when there is no data; return an empty array instead
  if (!users) return [];

  // Convert the resulting object into an array of objects (i.e., array of users)
  return Object.values(users);
};

const createUser = async (userData) => {
  const { username, email } = userData;

  const errorMessages = [];

  // Check if a user with this username already exists
  if (await doesUserExistByField('username', username)) {
    errorMessages.push(`A user with username ${username} already exists`);
  }

  // Check if a user with this email already exists
  if (await doesUserExistByField('email', email)) {
    errorMessages.push(`A user with email ${email} already exists`);
  }

  if (errorMessages.length > 0) {
    throw new ConflictError(errorMessages);
  }

  const newUserRef = USERS_REF.push();
  const id = newUserRef.key;

  const newUser = { id, ...userData };
  await newUserRef.set(newUser);

  return newUser;
};

const updateUser = async (userId, updateData) => {
  const userRef = await getVerifiedRefById('users', userId);

  // Create a new user object and ensure that id remains consistent
  const updatedUser = { id: userId, ...updateData };

  // Overwrite the entire user data
  await userRef.set(updatedUser);

  return updatedUser;
};

const deleteUser = async (userId) => {
  const userRef = await getVerifiedRefById('users', userId);

  await userRef.remove();
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
