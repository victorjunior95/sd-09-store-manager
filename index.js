const express = require('express');
const bodyParser = require('body-parser');
const ControllerProducts = require('./controllers/ControllerProducts');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/products', ControllerProducts.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Online na port: ${PORT}`);
});
