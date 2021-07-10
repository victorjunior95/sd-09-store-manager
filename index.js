const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 3000;

const {
  getAll,
  create,
  getById,
  update,
  deleteOne
} = require('./controllers/productsController');

const {
  getAllSales,
  createSales,
  getSaleById,
  updateSale,
  deleteOneSale,
} = require('./controllers/salesController');

app.use(bodyParser.json());



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', getById);

app.put('/products/:id', update);

app.delete('/products/:id', deleteOne);

app.post('/products', create);

app.get('/sales', getAllSales);

app.get('/sales/:id', getSaleById);

app.post('/sales', createSales);

app.put('/sales/:id', updateSale);

app.delete('/sales/:id', deleteOneSale);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});