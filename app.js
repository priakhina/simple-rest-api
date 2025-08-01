const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const usersRouter = require('./routes/users');
const incomeRouter = require('./routes/income');
const expensesRouter = require('./routes/expenses');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/users', usersRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expensesRouter);

app.use(errorHandler);

module.exports = app;
