const app = require('express')();
const PORT_EXPRESS = 3000;
const { PORT = PORT_EXPRESS } = process.env;
const bodyParser = require('body-parser').json();
const rescue = require('express-rescue');

const productController = require('./controller/productController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser);
app.listen(PORT, () => console.log('Rodando na 3000'));

// PRODUCTS
app.post('/products', rescue(productController.postProduct));
app.get('/products', rescue(productController.getProducts));
app.get('/products/:id', rescue(productController.getProductById));
app.put('/products/:id', rescue(productController.editProduct));
app.delete('/products/:id', rescue(productController.deleteProduct));
