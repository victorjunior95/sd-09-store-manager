const express = require('express');
const bodyParser = require('body-parser');
const product = require('./models/productModel');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_request, response) => {
  const test = await product.getAll();
  console.log(test);
  response.json();
});

app.listen(PORT, () => console.log(`> Server is up and running on PORT : ${PORT}`));
