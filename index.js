const express = require('express');
const bodyParser = require('body-parser');
const routerProducts = require('./routers/products');
const routerSales = require('./routers/sales');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.use('/products', routerProducts);
app.use('/sales', routerSales);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((error, _req, res, _next) => {
  console.log(error, 'olha aqui o erro');
  res.status(error.status).send({err:{code: error.code, message: error.message}});
});

app.listen(PORT, () => {
  console.log('Online');
});
