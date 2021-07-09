const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');
const SalesController = require('./controllers/salesController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => { response.send();});
app.get('/products', ProductController.findAll);
app.get('/products/:id', ProductController.findById);
app.post('/products', ProductController.create);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.exclude);

app.get('/sales', SalesController.findAll);
app.post('/sales', SalesController.create);

app.listen(port, () => console.log(`Example app listening on ${port}!`));