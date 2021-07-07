const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productControllers');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.listen(PORT, console.log(`App running on port ${PORT}`));

app.post('/products', productsController.postProduct);
app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
