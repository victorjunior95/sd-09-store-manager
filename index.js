const express = require('express');
const bodyParse = require('body-parser');
require('dotenv/config');
const productController = require('./Controller/productCntroller');
const salesController = require('./Controller/salesController');

const err = require('./middleware/error');

const app = express();
const port = 3000;

app.use(bodyParse.json());

//não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


app.post('/products', productController.create);

app.get('/products', productController.FindAll);

app.get('/products/:id', productController.FindId);

app.put('/products/:id', productController.update);

app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.createSales);

app.get('/sales', salesController.findSales);

app.get('/sales/:id', salesController.findSalesId);

app.put('/sales/:id', salesController.updateSales);

app.use(err);

app.listen(port, () => console.log(`rodando na porta ${port}`));

