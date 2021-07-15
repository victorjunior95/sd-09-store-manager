const express = require('express');
const bodyParser = require('body-parser');

const productsRoute = require('./routes/productsRoute');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

//  Como usar rotas > https://www.youtube.com/watch?v=ROL4ylHN47g
//  Rotas

app.use('/products', productsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});

