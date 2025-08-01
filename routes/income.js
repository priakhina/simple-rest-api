const incomeRouter = require('express').Router();
const {
  schemaValidator: validateSchema,
} = require('../middleware/schemaValidator');
const { incomeSchema } = require('../validators/incomeValidator');
const {
  getAllIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('../services/incomeService');

incomeRouter.get('/', async (req, res, next) => {
  try {
    const income = await getAllIncome();
    return res.status(200).send(income);
  } catch (error) {
    return next(error);
  }
});

incomeRouter.post('/', validateSchema(incomeSchema), async (req, res, next) => {
  try {
    const income = await createIncome(req.body);
    return res
      .status(201)
      .send({ message: 'New income has been created', income });
  } catch (error) {
    return next(error);
  }
});

incomeRouter.put(
  '/:id',
  validateSchema(incomeSchema),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const income = await updateIncome(id, req.body);
      return res
        .status(200)
        .send({ message: 'Income has been updated', income });
    } catch (error) {
      return next(error);
    }
  }
);

incomeRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteIncome(id);
    return res.status(200).send({ message: 'Income has been deleted' });
  } catch (error) {
    return next(error);
  }
});

module.exports = incomeRouter;
