const app = require('express')();
const bodyParser = require('body-parser').json();
const rescue = require('express-rescue');

const { createProduct, deleteProduct, getAllProducts, getByIdProduct,
  updateProduct } = require('./controllers/productsController');

const { createSales, getAllSales,
  getByIdSale } = require('./controllers/salesController');

const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', rescue(createProduct));
app.get('/products', rescue(getAllProducts));
app.get('/products/:id', rescue(getByIdProduct));
app.put('/products/:id', rescue(updateProduct));
app.delete('/products/:id', rescue(deleteProduct));
app.post('/sales', rescue(createSales));
app.get('/sales', rescue(getAllSales));
app.get('/sales/:id', rescue(getByIdSale));

app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

app.listen(PORT, () => {
  console.clear();
  console.log(`App listening on port ${PORT}`);
});
