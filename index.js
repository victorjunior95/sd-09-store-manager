const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 3000;

// const { getAllProducts, createProduct } = require('./models/ProductsModel');
// const { isValid } = require('./services/productsService');
const { getAll, create } = require('./controllers/productsController');

app.use(bodyParser.json());



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

//app.get('/products', getAll);

app.post('/products', create);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});