const express = require('express');
const bodyParser = require('body-parser');

const {
  createProductController,
  getProducts,
  getProductById,
  createErrorProducts,
  errorProducts,
} = require('./controllers/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductController);
app.get('/products/:id', getProductById);
app.get('/products/', getProducts);

app.use(createErrorProducts);
app.use(errorProducts);

app.listen(PORT, () => console.log('server ON'));