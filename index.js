const express = require('express');
const bodyParser = require('body-parser').json();

const {
  getAllProducts,
  addNewProduct,
} = require('./models/productsModel');
const mw = require('./middlewares/index');
const response = require('./middlewares/responseCodes');
const app = express();
app.use(bodyParser);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});

app.get('/products', async(req, res) => {
  const products = await getAllProducts();
  if(products.error) return next(products);
  return res.status(response.STATUS_OK).json(products);
});

app.post('/products',
  mw.validateName,
  mw.validateQuantity,
  async (req, res, next) => {
    const newProduct = await addNewProduct(req.body);
    return res.status(response.STATUS_CREATED).json(newProduct);
  });

app.use((error, _req, res, _next) => {
  return res.status(error.error).json(error.message);
});