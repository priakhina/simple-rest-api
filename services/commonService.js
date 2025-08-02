const db = require('../utils/config');

const resourceLabels = {
  users: 'User',
  income: 'Income',
  expenses: 'Expense',
};

const getVerifiedRefById = async (resource, id) => {
  const ref = db.ref(`${resource}/${id}`);
  const snapshot = await ref.once('value');

  if (!snapshot.exists()) {
    const label = resourceLabels[resource] || 'Resource';
    const error = new Error(`${label} with id ${id} has not been found`);
    error.status = 404;
    throw error;
  }

  return ref;
};

module.exports = { getVerifiedRefById };
