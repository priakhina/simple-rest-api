const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const usersRouter = require('./controllers/users');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/users', usersRouter);

module.exports = app;
