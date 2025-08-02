const db = require('../utils/config');
const { getVerifiedRefById } = require('./commonService');

const INCOME_REF = db.ref('income');

const getAllIncome = async () => {
  const snapshot = await INCOME_REF.once('value');
  const income = snapshot.val();

  // Firebase returns null or undefined when there is no data; return an empty array instead
  if (!income) return [];

  // Convert the resulting object into an array of objects (i.e., array of income records)
  return Object.values(income);
};

const createIncome = async (incomeData) => {
  const newIncomeRef = INCOME_REF.push();
  const id = newIncomeRef.key;

  const newIncome = { id, ...incomeData };
  await newIncomeRef.set(newIncome);

  return newIncome;
};

const updateIncome = async (incomeId, updateData) => {
  const incomeRef = await getVerifiedRefById('income', incomeId);

  // Create a new income object and ensure that id remains consistent
  const updatedIncome = { id: incomeId, ...updateData };

  // Overwrite the entire income data
  await incomeRef.set(updatedIncome);

  return updatedIncome;
};

const deleteIncome = async (incomeId) => {
  const incomeRef = await getVerifiedRefById('income', incomeId);

  await incomeRef.remove();
};

module.exports = { getAllIncome, createIncome, updateIncome, deleteIncome };
