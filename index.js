const express = require('express');
const app = express();
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const errorMiddleware = require('./middlewares/error');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);
app.post('/products', Products.create);
app.put('/products/:id', Products.update);
app.delete('/products/:id', Products.deleteOne);
app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.findById);
app.post('/sales', Sales.create);
app.put('/sales/:id', Sales.update);
app.delete('/sales/:id', Sales.deleteOne);
app.use(errorMiddleware);

const porta = 3000;
app.listen(porta, () => console.log(`Servidor uvindo na porta ${porta}`));
