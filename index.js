require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

const Products = require('./controllers/Products');
const errorMiddleware = require('./middlewares/error');

app.use(express.json());
app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.create);


app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
