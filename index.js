const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesControler');
// não remova esse endpoint, e para o avaliador funcionar
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});
// products endpoint
app.post('/products', productController.addProduct);

app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);

// sales endpoint
app.post('/sales', salesController.addSales);

app.use((err, req, res, next) => {
  const errStatus = 422;
  res.status(errStatus).json(err);
});

app.listen(PORT, () => console.log(`listen port ${PORT}`));
