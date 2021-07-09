const express = require('express');
const bodyParser = require('body-parser');
const {mongoInfos: { PORT }} = require('./utils');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { createProduct } = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProduct);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
