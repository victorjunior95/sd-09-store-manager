const app = require('express')();
const bodyParser = require('body-parser').json();
const rescue = require('express-rescue');

const productsController = require('./controllers/productsController');

const salesController = require('./controllers/salesController');

const magicNumPort = 3000;
const PORT = process.env.PORT || magicNumPort;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', rescue(productsController.createProduct));
app.get('/products', rescue(productsController.getAllProducts));
app.get('/products/:id', rescue(productsController.getByIdProduct));
app.put('/products/:id', rescue(productsController.updateProduct));
app.delete('/products/:id', rescue(productsController.deleteProduct));
app.post('/sales', rescue(salesController.createSales));
app.get('/sales', rescue(salesController.getAllSales));
app.get('/sales/:id', rescue(salesController.getByIdSale));
app.put('/sales/:id', rescue(salesController.updateSale));
app.delete('/sales/:id', rescue(salesController.deleteSale));

app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

app.listen(PORT, () => {
  console.clear();
  console.log(`App listening on port ${PORT}`);
});
