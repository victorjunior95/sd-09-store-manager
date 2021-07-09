const app = require('express')();
const bodyParser = require('body-parser');
const productController = require('./controllers/productsController');
const errorController = require('./controllers/errorController');
const salesController = require('./controllers/salesController');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

app.use('/sales', salesController);

app.use(errorController);

app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));
