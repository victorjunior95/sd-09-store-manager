const express = require('express');
const bodyParser = require('body-parser');
const controllerProducts = require('./controllers/products');
const controllerSales = require('./controllers/sales');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';
const ERR_STATUS = 500;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controllerProducts.create);

app.get('/products', controllerProducts.getAll);

app.get('/products/:id', controllerProducts.getById);

app.delete('/products/:id', controllerProducts.remove);

app.put('/products/:id', controllerProducts.edit);

app.post('/sales', controllerSales.create);

app.get('/sales', controllerSales.getAll);

app.get('/sales/:id', controllerSales.getById);

app.put('/sales/:id', controllerSales.edit);

app.delete('/sales/:id', controllerSales.remove);

app.use( (err, _req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      err: {
        code: err.code,
        message: err.message
      }
    });
  }
  return res.status(ERR_STATUS).json(err);
});

app.listen(PORT, () => {
  console.log('Online');
});