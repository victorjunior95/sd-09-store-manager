const express = require('express');
const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const Products = require('./controllers/Products');
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.post('/products', rescue(Products.create));
app.use((err, _req, res, _next) => {
  const { result, status } = err;
  res.status(status).json(result);
});
app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
