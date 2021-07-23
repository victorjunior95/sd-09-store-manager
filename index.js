const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./rotes/Products');

require('dotenv').config();

const app = express();
// eslint-disable-next-line no-magic-numbers
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(PORT, () => console.log(`Listening at port ${PORT}!`));