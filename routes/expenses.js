const expensesRouter = require('express').Router();
const {
  schemaValidator: validateSchema,
} = require('../middleware/schemaValidator');
const { expensesSchema } = require('../validators/expensesValidator');
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../services/expenseService');

expensesRouter.get('/', async (req, res, next) => {
  try {
    const expenses = await getAllExpenses();
    return res.status(200).send(expenses);
  } catch (error) {
    return next(error);
  }
});

expensesRouter.post(
  '/',
  validateSchema(expensesSchema),
  async (req, res, next) => {
    try {
      const expense = await createExpense(req.body);
      return res
        .status(201)
        .send({ message: 'New expense has been created', expense });
    } catch (error) {
      return next(error);
    }
  }
);

expensesRouter.put(
  '/:id',
  validateSchema(expensesSchema),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const expense = await updateExpense(id, req.body);
      return res
        .status(200)
        .send({ message: 'Expense has been updated', expense });
    } catch (error) {
      return next(error);
    }
  }
);

expensesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteExpense(id);
    return res.status(200).send({ message: 'Expense has been deleted' });
  } catch (error) {
    return next(error);
  }
});

module.exports = expensesRouter;
