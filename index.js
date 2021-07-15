
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const { validationName, validationQuantity } = require('./middlewares/products');
const app = express();
const {validationSalesQuantity} =require('./middlewares/sales');


app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('foi');
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products',validationName, validationQuantity, productsController.create);
app.put('/products/:id', validationName, validationQuantity, productsController.change);
app.delete('/products/:id', productsController.del);

app.post('/sales', validationSalesQuantity, salesController.create);
app.get('/sales', salesController.getAll);
app.put('/sales/:id', validationSalesQuantity, salesController.change);
app.get('/sales/:id', salesController.getById);
// app.post('/books', Book.create);


const PORT = 3000;

app.listen( process.env.PORT || PORT, () => console.log('O Pai tá ON!!'));