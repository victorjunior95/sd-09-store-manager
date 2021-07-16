const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRoute');
const salesRouter = require('./routes/salesRoute');

const app = express();
app.use(bodyParser.json());
// permite a utilização do parâmetro req.body no formato json

const PORT = 3000;

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json({ err: error.err });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Online on Port: ${PORT}`));
