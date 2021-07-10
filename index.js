const bodyParser = require('body-parser');
const express = require('express');
const Products = require('./controllers/ProductsController');
const Sales = require('./controllers/SalesController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.post('/products', Products.addNewProduct);
app.get('/products', Products.getAll);
app.get('/products/:id', Products.getOne);
app.put('/products/:id', Products.updateProduct);
app.delete('/products/:id', Products.deleteProduct);

app.post('/sales', Sales.addNewSale);
app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.getOne);
app.put('/sales/:id', Sales.updateSale);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('App Running');
});
