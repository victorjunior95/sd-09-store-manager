const express = require('express');
const productRoute = require('./routes/productRoute');
const bodyParse = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

