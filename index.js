const express = require('express');
const bodyParser = require('body-parser');
const {mongoInfos: { PORT }} = require('./utils');
const errorMiddleware = require('./middlewares/errorMiddleware');
const {
  createProduct,
  listAllProducts,
  getByIDController,
  updateOneProductController,
  deleteOneProductController
} = require('./controllers/productsController');
const {
  createSaleController
} = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Daqui pra baixo rotas do product ----------------------
app.post('/products', createProduct);

app.get('/products', listAllProducts);
app.get('/products/:id', getByIDController);

app.put('/products/:id', updateOneProductController);

app.delete('/products/:id', deleteOneProductController);
// Daqui pra cima rotas do product -----------------------

app.post('/sales', createSaleController);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
