const express = require('express');
const products = require('./routes/productsRoute');
const sales = require('./routes/salesRoutes');

const app = express();

const bodyParser = require('body-parser').json();

app.use(bodyParser);

const PORT = 3000;

app.use('/products', products);

app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, req, res, next) => {
  const internalError = 500;
  res.status(err[1].status ? err[1].status : internalError).json(err[0]);
});

app.listen(PORT, () => {
  console.log('Pai ta ON!');
});
