const express = require('express');
const bodyParser = require('body-parser').json();

const productController = require('./controllers/productsController');
const saleController = require('./controllers/salesControllers');

const app = express();
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

app.use('/sales', saleController);

app.listen(PORT, () => console.log(`Running on port ${PORT} :]`));
