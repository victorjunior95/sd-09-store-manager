const express = require('express');
const bodyParser = require('body-parser');
const ControllerProducts = require('./controllers/ControllerProducts');
const ControllerSales = require('./controllers/ControllerSales');
const Middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// ENDPOINTS PRODUCTS
app.post('/products', Middlewares.validProducts, ControllerProducts.create);
app.get('/products', ControllerProducts.getAllOrById);
app.get('/products/:id', ControllerProducts.getAllOrById);
app.put('/products/:id', Middlewares.validProducts, ControllerProducts.editProduct);
app.delete('/products/:id', ControllerProducts.deleteProduct);

// ENDPOINTS SALES
app.post('/sales', Middlewares.validSales, ControllerSales.create);
app.get('/sales', ControllerSales.getAllOrById);
app.get('/sales/:id', ControllerSales.getAllOrById);
app.put('/sales/:id', Middlewares.validSales, ControllerSales.editSale);

app.use(Middlewares.errorMiddlewares);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Online na port: ${PORT}`);
});
