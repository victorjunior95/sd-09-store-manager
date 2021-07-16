const express = require('express');
const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const productController = require('./controllers/Products');
const salesController = require('./controllers/Sales');
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productController.fetchProducts));
app.get('/products/:id', rescue(productController.findById));
app.post('/products', rescue(productController.createProduct));
app.put('/products/:id', rescue(productController.updateProduct));
app.delete('/products/:id', rescue(productController.deleteProduct));

app.get('/sales', rescue(salesController.fetchSales));
app.get('/sales:id', rescue(salesController.findById));
app.post('/sales', rescue(salesController.newSale));
app.put('/sales/:id', rescue(salesController.updateSale));
app.delete('/sales/:id', rescue(salesController.deleteSale));

app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
