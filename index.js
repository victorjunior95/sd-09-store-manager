const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controller/productsController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.registerProduct);

app.listen(PORT, console.log(`Server running in port ${PORT}`));
