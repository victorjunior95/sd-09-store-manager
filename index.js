const express = require('express');
const bodyParser = require('body-parser');

const {
  createProductController,
  getProductsAllController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
} = require('./controllers/productsController');

const {
  createSalesController,
  getSalesAllController,
  getSaleByIdController,
  updateSaleByIdController,
  deleteSaleByIdController,
} = require('./controllers/salesController');

const { get } = require('frisby');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductController);
app.get('/products/:id', getProductByIdController);
app.get('/products', getProductsAllController);
app.put('/products/:id', updateProductByIdController);
app.delete('/products/:id', deleteProductByIdController);

app.post('/sales', createSalesController);
app.get('/sales/:id', getSaleByIdController);
app.get('/sales', getSalesAllController);
app.put('/sales/:id', updateSaleByIdController);
app.delete('/sales/:id', deleteSaleByIdController);

app.listen(PORT, () => console.log('server ONLINE #VQV !!!'));
