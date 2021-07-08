const express = require('express');
const bodyParser = require('body-parser');
// const { productsRouter } = require('./router');
const router = require('./routes/router');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.use('/products', productsRouter);
app.use(router);

app.listen(PORT, () => console.log('Ouvindo a porta', PORT));
