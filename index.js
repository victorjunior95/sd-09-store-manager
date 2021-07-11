const express = require('express');
const app = express();
const ProductController = require('./controllers/productController');
const SaleController = require('./controllers/saleController');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.findById);
app.post('/products', ProductController.create);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.exclude);

app.get('/sales', SaleController.getAll);
app.get('/sales/:id', SaleController.findById);
app.post('/sales', SaleController.create);
app.put('/sales/:id', SaleController.update);
app.delete('/sales/:id', SaleController.exclude);

const PORT = 3000;
app.listen(PORT, () => console.log(`## SERVIDOR RODANDO NA PORTA ${PORT} ##`));
