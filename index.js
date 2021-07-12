require('dotenv/config');
const app = require('express')();
const bodyParser = require('body-parser').json();
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');
const errorMiddleware = require('./middleware/err');
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);
app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);
app.put('/products/:id', ProductsController.update);
app.delete('/products/:id', ProductsController.deleteProduct);
app.post('/sales', SalesController.create);
app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`online na porta: ${PORT}`));
