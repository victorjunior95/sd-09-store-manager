const express = require('express');
const bodyParser = require('body-parser');
const { listAll } = require('./models/productsModel');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_request, response) => {
  const all = await listAll();
  response.send(all);
});

app.listen(PORT);
