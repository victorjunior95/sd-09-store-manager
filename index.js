const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/productController');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controller.create);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Online NA PORTA 3000');
});
