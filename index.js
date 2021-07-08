const express = require('express');
const bodyParser = require('body-parser');
const product = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', product.getAll);
app.post('/products', product.postProduct);
app.put('/products', product.putProduct);
app.delete('/products', product.deleteProduct);

app.listen(PORT, () => console.log(`> Server is up and running on PORT : ${PORT}`));
