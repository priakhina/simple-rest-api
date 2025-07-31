const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const usersRouter = require('./routes/users');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/users', usersRouter);

app.use(errorHandler);

module.exports = app;
