const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 3000;

const { getAll, create, getById, update } = require('./controllers/productsController');

app.use(bodyParser.json());



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', getById);

app.put('/products/:id', update);

app.post('/products', create);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});