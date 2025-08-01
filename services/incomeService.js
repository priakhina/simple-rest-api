const db = require('../utils/config');

const getAllIncome = async () => {
  const snapshot = await db.ref('income').once('value');
  const income = snapshot.val();

  // Firebase returns null or undefined when there is no data; return an empty array instead
  if (!income) return [];

  // Convert the resulting object into an array of objects (i.e., array of income records)
  return Object.values(income);
};

const createIncome = async (incomeData) => {
  const incomeRef = db.ref('income');
  const newIncomeRef = incomeRef.push();
  const id = newIncomeRef.key;

  const newIncome = { id, ...incomeData };
  await newIncomeRef.set(newIncome);

  return newIncome;
};

const updateIncome = async (incomeId, updateData) => {
  const incomeRef = db.ref(`income/${incomeId}`);

  // Check if income with this id exists
  const snapshot = await incomeRef.once('value');
  if (!snapshot.exists()) {
    const error = new Error(`Income with id ${userId} has not been found`);
    error.status = 404;
    throw error;
  }

  // Create a new income object and ensure that id remains consistent
  const updatedIncome = { id: incomeId, ...updateData };

  // Overwite the entire user data
  await incomeRef.set(updatedIncome);

  return updatedIncome;
};

const deleteIncome = async (incomeId) => {
  const incomeRef = db.ref(`income/${incomeId}`);

  // Check if income with the given id exists
  const snapshot = await incomeRef.once('value');
  if (!snapshot.exists()) {
    const error = new Error(`Income with id ${incomeId} has not been found`);
    error.status = 404;
    throw error;
  }

  await incomeRef.remove();
};

module.exports = { getAllIncome, createIncome, updateIncome, deleteIncome };
