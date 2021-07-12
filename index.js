const express = require('express');
const bodyParser = require('body-parser');
const ControllerProduct = require('./controllers/Product');
const ControllerSales = require('./controllers/Sales');

const app = express();
app.use(bodyParser.json());

const localPort = 3000;

const PORT = process.env.PORT || localPort;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ControllerProduct.createProduct);

app.post('/sales', ControllerSales.createSale);

app.get('/products', ControllerProduct.getAll);

app.get('/products/:id', ControllerProduct.findProductById);

app.get('/sales', ControllerSales.getAll);

app.get('/sales/:id', ControllerSales.findById);

app.put('/products/:id', ControllerProduct.editProducts);

app.put('/sales/:id', ControllerSales.editSale);

app.delete('/products/:id', ControllerProduct.removeProduct);

app.delete('/sales/:id', ControllerSales.removeSale);


app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
