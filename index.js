const express = require('express');
const bodyParser = require('body-parser');
const controllerProducts = require('./controllers/products');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controllerProducts.create);

app.get('/products', controllerProducts.getAll);

app.get('/products/:id', controllerProducts.getById);

app.put('/products/:id', controllerProducts.edit);

app.delete('/products/:id', controllerProducts.remove);

app.listen(PORT, () => {
  console.log('Online');
});