const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
const error = require('./middleware/error');

const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');

app.use(bodyParser);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);
app.post('/products', Products.create);
app.put('/products/:id', Products.updateProduct);
app.delete('/products/:id', Products.deleteProduct);

app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.findById);
app.post('/sales', Sales.newSale);
app.put('/sales/:id', Sales.updateSale);
app.delete('/sales/:id', Sales.deleteSale);


app.use(error);

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));