const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const products = require('./controllers/productController');
const sales = require('./controllers/salesController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.createProduct);
app.get('/products/:id', products.findProductController);
app.get('/products', products.getAll);
app.put('/products/:id', products.editProductController);
app.delete('/products/:id', products.deleteProductController);
app.post('/sales', sales.salesController);
app.get('/sales/:id', sales.findOneSaleController);
app.get('/sales', sales.getAllSalesController);

app.listen(PORT, () => console.log('porta 3000 em uso'));