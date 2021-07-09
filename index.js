const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controller/productsController');
const SalesController = require('./controller/salesController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.registerProduct);
app.get('/products', ProductsController.listProducts);
app.get('/products/:id', ProductsController.listProducts);
app.put('/products/:id', ProductsController.updateProduct);
app.delete('/products/:id', ProductsController.deleteProduct);

app.post('/sales', SalesController.registerSales);
app.get('/sales', SalesController.listSales);
app.get('/sales/:id', SalesController.listSales);
// app.put('/sales/:id', SalesController.updateProduct);
// app.delete('/sales/:id', SalesController.deleteProduct);

app.listen(PORT, console.log(`Server running in port ${PORT}`));
