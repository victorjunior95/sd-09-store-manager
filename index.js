const express = require('express');
const bodyParser = require('body-parser');

const productsRoute = require('./routes/productsRouter');
const salesRoute = require('./routes/salesRouter');

const app = express();
app.use(bodyParser.json());

app.use('/products', productsRoute);

app.use('/sales', salesRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});