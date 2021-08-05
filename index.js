const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;
// const STATUS_OK = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

/* ===Vendas=== */
app.post('/sales', salesController.registerSales);

app.get('/sales', salesController.getAllSalesController);

app.get('/sales/:id', salesController.getSalesIdController);

/* ===Produtos=== */
app.post('/products', (productsControllers.createProduct));

app.get('/products', productsControllers.getAllProducts);

app.get('/products/:id', productsControllers.getProductId);

app.put('/products/:id', productsControllers.productUpdate);

app.delete('/products/:id', productsControllers.deleteProduct);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));

