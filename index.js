const express = require('express');
const bodyParser = require('body-parser').json();

const productController = require('./controllers/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser);
app.use('/products', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
