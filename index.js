const express = require('express');
const bodyParser = require('body-parser');
const { addProduct, getProducts } = require('./controllers/productsControllers');

const app = express();
const PORT = 3000;
const STATUS_OK = 200;

app.use(bodyParser.json);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', addProduct);

app.get('/products', getProducts);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));
