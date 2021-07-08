const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productControllers');
const saleControlers = require('./controllers/saleControllers');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.listen(PORT, console.log(`App running on port ${PORT}`));

// products endonpoints
app.post('/products', productsController.postProduct);

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProduct);

app.put('/products/:id', productsController.editProduct);

app.delete('/products/:id', productsController.deleteProduct);

// sales endpoints
app.post('/sales', saleControlers.postSales);

app.get('/sales', saleControlers.getAllSales);

app.get('/sales/:id', saleControlers.getSaleById);

app.put('/sales/:id', saleControlers.editSale);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
