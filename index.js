const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Products
const Products = require('./controllers/Products');
app
  .route('/products')
  .post(Products.create)
  .get(Products.getAll);

app
  .route('/products/:id')
  .get(Products.findById)
  .put(Products.change)
  .delete(Products.exclude);

// Sales
const Sales = require('./controllers/Sales');
app
  .route('/sales')
  .post(Sales.create)
  .get(Sales.getAll);

app
  .route('/sales/:id')
  .get(Sales.findById)
  .put(Sales.change)
  .delete(Sales.exclude);

// Error
const errorMiddleware = require('./controllers/Error');
app.use(errorMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
