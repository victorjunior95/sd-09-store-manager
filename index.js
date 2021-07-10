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

// lista todos os produtos
app.get('/products', productController.listAllProducts);

// lista por id ou seja, por um único id
app.get('/products/:id', productController.listProductId);

app.put('/products/:id', productController.productCreate);

app.delete('/products/:id', productController.excludeProduct);

//app.get('/', (req, res) => res.send('Estou funcionando'));
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));


