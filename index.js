const bodyParser = require('body-parser');
const express = require('express');
const Products = require('./controllers/ProductsController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.post('/products', Products.addNewProduct);
app.get('/products', Products.getAll);
app.get('/products/:id', Products.getOne);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('App Running');
});
