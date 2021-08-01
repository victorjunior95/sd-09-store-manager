const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/products', require('./routes/products.routes'));
app.use('/sales', require('./routes/sales.routes'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;

app.listen(port, () => {
  console.log('Store Manager Api Online');
});
