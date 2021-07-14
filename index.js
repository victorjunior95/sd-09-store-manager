const express = require('express');
const bodyParser = require('body-parser').json();
const productsModel = require('./models/productsModel');

const app = express();
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// produtos
app.post('/products', productsModel.newProduct);

app.listen(PORT, () => {
  console.log(`Aplicação ouvindo na porta ${PORT}`);
});
