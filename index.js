const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Products = require('./controllers/productsController');
const Sales = require('./controllers/salesController');
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', Products);
app.use('/sales', Sales);

app.listen(PORT, () => {
  console.log(`Running - PORT ${PORT}`);
});
