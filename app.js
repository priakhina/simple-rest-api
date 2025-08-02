const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('./routes/users');
const incomeRouter = require('./routes/income');
const expensesRouter = require('./routes/expenses');

const app = express();

app.use(bodyParser.json());

// express.static is a built-in middleware from Express that allows to serve static content
// (http://expressjs.com/en/starter/static-files.html)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expensesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
