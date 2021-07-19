const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./controllers/Product');
const Sale = require('./controllers/Sale');
const erro = require('./middlewares/error');
require('dotenv').config();
const PORT_NUMBER = 3000;
const PORT = process.env.PORT || PORT_NUMBER;
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.post('/products', Product.create);
app.get('/products', Product.getAll);
app.get('/products/:id', Product.getOne);
app.put('/products/:id', Product.edit);
app.delete('/products/:id', Product.deleteOne);

app.post('/sales', Sale.create);
app.get('/sales', Sale.getAll);
app.get('/sales/:id', Sale.getOne);
app.put('/sales/:id', Sale.edit);

app.use(erro);

app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}`); 
});
