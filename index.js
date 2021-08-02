const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');

const app = express();
const PORT = 3000;
// const STATUS_OK = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', (productsControllers.createProduct));

app.get('/products', productsControllers.getAllProducts);

app.get('/products/:id', productsControllers.getProductId);

app.put('/products/:id', productsControllers.productUpdate);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));
