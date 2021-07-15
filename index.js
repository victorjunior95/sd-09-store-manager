const express = require('express');
const bodyParser = require('body-parser');
const product = require('./controllers/productController');
const sale = require('./controllers/saleController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', product.createProduct);
app.get('/products', product.listProduct);
app.get('/products/:id', product.listProductById);
app.put('/products/:id', product.updateProduct);
app.delete('/products/:id', product.deleteProduct);

app.get('/sales', sale.listSales);
app.get('/sales/:id', sale.listSalesById);
app.post('/sales', sale.createSale);
app.put('/sales/:id', sale.updateSale);
app.delete('/sales/:id', sale.deleteSale);


app.listen(PORT, () => console.log(`> Server is up and running on PORT : ${PORT}`));
