require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./utils/config.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.post('/users', async (req, res) => {
  try {
    const body = req.body;

    const usersRef = db.ref('users');
    const newUserRef = usersRef.push();
    const id = newUserRef.key;

    const newUser = { id, ...body };
    await newUserRef.set(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.error('Failed to create a new user');
    res.status(500).send(error);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
