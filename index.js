const express = require('express');

const app = express();
const bodyParser = require('body-parser').json();

const products = require('./routes/productRouter');
const sales = require('./routes/salesRouter');

const error = require('./middlewares/error');

const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use('/sales', sales);
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
