require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { productRouter, salesRouter } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use('/sales', salesRouter);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
