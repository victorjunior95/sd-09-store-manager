const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const productsControllers = require('./controllers/productsControllers');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsControllers.insertProduct);

app.get('/products', productsControllers.getAll);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', productsControllers.updateProductById);

app.listen(PORT, () => console.log(`listening ${PORT}`));
