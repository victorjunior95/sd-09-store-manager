const express = require('express');
const bodyParser = require('body-parser').json();
const productController = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.productCreate);
//app.get('/', (req, res) => res.send('Estou funcionando'));

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));


