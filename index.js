const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRouter');

const PORT = 3000;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Routes
app.use('/products', productsRouter);
// 

app.use((err, _req, res, _next) => {
  res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: err.message });
}); //middleware error

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
