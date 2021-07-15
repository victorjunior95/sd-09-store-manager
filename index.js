const express = require('express');
const bodyParser = require('body-parser');
const {
  insertProduct,
  allProducts,
  findProductById,
  updateProductById,
  deleteById,
} = require('./controllers/productsController');
const {
  insertSales,
  allSales,
  findSalesById,
  deleteSaleById,
} = require('./controllers/salesController');

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', insertProduct);
app.get('/products', allProducts);
app.get('/products/:id', findProductById);
app.put('/products/:id', updateProductById);
app.delete('/products/:id', deleteById);

app.post('/sales', insertSales);
app.get('/sales', allSales);
app.get('/sales/:id', findSalesById);
app.delete('/sales/:id', deleteSaleById);

// Começa o jogo
app.listen(PORT, () => {
  console.log(`Ouvidos posicionados na porta ${PORT}`);
});
