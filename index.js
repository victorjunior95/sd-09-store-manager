const express = require('express');

const app = express();
const bodyParser = require('body-parser').json();

const products = require('./routes/productRouter');
const sales = require('./routes/salesRouter');

const Producterror = require('./middlewares/productError');
const SaleError = require('./middlewares/saleError');

const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use(Producterror);

app.use('/sales', sales);
app.use(SaleError);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
