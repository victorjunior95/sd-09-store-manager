const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productsRoute = require('./routes/productsRoute');
const errorController = require('./controllers/errorController');

const HTTP_STATUS_INTERNAL_SERVER_ERROR = 422;

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use((err, _req, res, _next) => {
  if (err.err) return res.status(err.status).json({ err: err.err });
  res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: err.message });
});

app.listen(PORT, () => console.log(`A PORTEIRA ${PORT} TA ABERTA!`));
