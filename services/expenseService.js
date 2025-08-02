const db = require('../utils/config');
const { getVerifiedRefById } = require('./commonService');

const EXPENSES_REF = db.ref('expenses');

const getAllExpenses = async () => {
  const snapshot = await EXPENSES_REF.once('value');
  const expenses = snapshot.val();

  // Firebase returns null or undefined when there is no data; return an empty array instead
  if (!expenses) return [];

  // Convert the resulting object into an array of objects (i.e., array of expenses)
  return Object.values(expenses);
};

const createExpense = async (expenseData) => {
  const newExpenseRef = EXPENSES_REF.push();
  const id = newExpenseRef.key;

  const newExpense = { id, ...expenseData };
  await newExpenseRef.set(newExpense);

  return newExpense;
};

const updateExpense = async (expenseId, updateData) => {
  const expenseRef = await getVerifiedRefById('expenses', expenseId);

  // Create a new expense object and ensure that id remains consistent
  const updatedExpense = { id: expenseId, ...updateData };

  // Overwrite the entire expense data
  await expenseRef.set(updatedExpense);

  return updatedExpense;
};

const deleteExpense = async (expenseId) => {
  const expenseRef = await getVerifiedRefById('expenses', expenseId);

  await expenseRef.remove();
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
