const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productsController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res) => res.status(200).send('Tudo ok!'));

app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);

app.post('/products', productController.insertProduct);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);

app.listen(PORT, () => console.log('Ouvindo a porta 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
