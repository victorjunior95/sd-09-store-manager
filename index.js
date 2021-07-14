const express = require('express');
const route = require('./controllers/index');
const { PORT } = require('./utils/constants');

const app = express();

app.use(route);

app.get('/', (_request, response) => {
  response.send();
});


app.listen(PORT, () => {
  console.log('Tudo funcionante');
});
