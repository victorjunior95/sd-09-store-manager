const express = require('express');
const bodyParser = require('body-parser').json();
const router = require('./routes/router');

const app = express();
app.use(bodyParser);

const PORT = 3000;

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});

app.use((error, _req, res, _next) => {
  return res.status(error.err).json(error.mes);
});