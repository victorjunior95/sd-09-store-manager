const express = require('express');
const bodyParse = require('body-parser');
require('dotenv/config');
const productController = require('./Controller/productCntroller');

const err = require('./middleware/error');

const app = express();
const port = 3000;

app.use(bodyParse.json());

//não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


app.post('/products', productController.create);

app.get('/products', productController.FindAll);

app.get('/products/:id', productController.FindId);

app.put('/products/:id', productController.update);

app.use(err);

app.listen(port, () => console.log(`rodando na porta ${port}`));

