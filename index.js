const express = require('express');
const bodyParser = require('body-parser').json();
const productsController = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// produtos
app.post('/products', productsController.newProduct);

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
