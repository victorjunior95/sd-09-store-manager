const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const Products = require('./controllers/Products');
const salesController = require('./controllers/Sales');
const errorMiddleware = require('./controllers/Error');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app
  .route('/products')
  .post(Products.create)
  .get(Products.getAll);

app
  .route('/products/:id')
  .get(Products.findById)
  .put(Products.changeById);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
