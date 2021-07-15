const express = require('express');
const bodyParser = require('body-parser');

const {
  createProductController,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  createErrorProducts,
  errorProducts,
} = require('./controllers/productsController');

const {
  createSales,
  getSales,
  getSaleById,
  createErrorSales,
  errorSalesResponse,
} = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductController);
app.get('/products/:id', getProductById);
app.get('/products', getProducts);
app.put('/products/:id', updateProductById);
app.delete('/products/:id', deleteProduct);

app.use(createErrorProducts);
app.use(errorProducts);

app.post('/sales', createSales);
app.get('/sales/:id', getSaleById);
app.get('/sales', getSales);

app.use(createErrorSales);
app.use(errorSalesResponse);

app.listen(PORT, () => console.log('server ON'));