const db = require('../utils/config');

const getAllExpenses = async () => {
  const snapshot = await db.ref('expenses').once('value');
  const expenses = snapshot.val();

  // Firebase returns null or undefined when there is no data; return an empty array instead
  if (!expenses) return [];

  // Convert the resulting object into an array of objects (i.e., array of expenses)
  return Object.values(expenses);
};

const createExpense = async (expenseData) => {
  const expensesRef = db.ref('expenses');
  const newExpenseRef = expensesRef.push();
  const id = newExpenseRef.key;

  const newExpense = { id, ...expenseData };
  await newExpenseRef.set(newExpense);

  return newExpense;
};

const updateExpense = async (expenseId, updateData) => {
  const expenseRef = db.ref(`expenses/${expenseId}`);

  // Check if an expense with this id exists
  const snapshot = await expenseRef.once('value');
  if (!snapshot.exists()) {
    const error = new Error(`Expense with id ${expenseId} has not been found`);
    error.status = 404;
    throw error;
  }

  // Create a new expense object and ensure that id remains consistent
  const updatedExpense = { id: expenseId, ...updateData };

  // Overwite the entire user data
  await expenseRef.set(updatedExpense);

  return updatedExpense;
};

const deleteExpense = async (expenseId) => {
  const expenseRef = db.ref(`expenses/${expenseId}`);

  // Check if an expense with the given id exists
  const snapshot = await expenseRef.once('value');
  if (!snapshot.exists()) {
    const error = new Error(`Expense with id ${expenseId} has not been found`);
    error.status = 404;
    throw error;
  }

  await expenseRef.remove();
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
