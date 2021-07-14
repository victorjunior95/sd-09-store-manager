const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res) => res.status(200).send('Tudo ok!'));

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);

app.post('/products', productsController.insertProduct);
app.post('/sales', salesController.insertSale);

app.put('/products/:id', productsController.updateProduct);
app.put('/sales/:id', salesController.updateSale);

app.delete('/products/:id', productsController.deleteProduct);
app.delete('/sales/:id', salesController.deleteSale);

app.listen(PORT, () => console.log('Ouvindo a porta 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
