const app = require('express')();
const bodyParser = require('body-parser').json();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser);

// PRODUCTS
app.post('/products');