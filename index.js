const app = require('express')();
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const productRouter = require('./routes/productsRoute');
const salesRouter = require('./routes/salesRoute');

const PORT = 3000;

const INTERNAL_ERROR = 500;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use('/sales', rescue(salesRouter));

app.use(({ err, status, message }, _req, res, _next) => res
  .status(status || INTERNAL_ERROR)
  .json(err ? { err } : ({ message } || { message: 'algo deu ruim' })));

app.listen(PORT);
