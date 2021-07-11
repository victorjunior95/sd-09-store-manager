const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running in ${PORT}`);
});


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);

app.get('/products', ProductsController.listAll);

app.get('/products/:id', ProductsController.findById);


