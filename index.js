const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
// const { productValidation } = require('./services/productsServices'); // remover

const app = express();

app.use(bodyParser.json());

app.post('/products', productsController.createProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
