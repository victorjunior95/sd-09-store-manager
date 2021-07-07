const app = require('express')();
const bodyParser = require('body-parser');

const productRouter = require('./routes/productsRoute');
// const salesRouter = require('./routes/salesRoute');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use((err, _req, res, _next) => res.status(err.status).json({ err: { ...err.err } }));

app.listen(PORT);
