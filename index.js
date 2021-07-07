const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const products = require('./controllers/productController');
const sales = require('./controllers/saleController');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.createProduct);
app.get('/products', products.getAllProducts);
app.get('/products/:id', products.getProductById);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);
app.post('/sales', sales.createSale);
app.get('/sales', sales.getAllSales);
app.get('/sales/:id', sales.getSaleById);
app.put('/sales/:id', sales.updateSale);


app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
