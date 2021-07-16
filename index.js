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

// rota inicial de produtos
app.use('/products', productRoute);

app.listen(PORT, () => console.log(`funfando in the door ${PORT}`));
