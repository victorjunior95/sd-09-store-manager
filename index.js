const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.listen(PORT, () => {
  console.log(`pai ta on na porta ${PORT}`);
});
