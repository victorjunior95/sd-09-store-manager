const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();
const PORT = 3000;

const errorVerification = (err, _req, res, _next) => {
  if (err.code === 'invalid_data') {
    return res.status(HTTP_UNPROCESSABLE).json({ err });
  }
  if (err.code === 'not_found' || err.code === 'stock_problem') {
    return res.status(HTTP_NOT_FOUND).json({ err });
  }
  return res.status(HTTP_ERROR).json({
    err: {
      code: 'internal_error',
      message: err.message,
    },
  });
};

// converte o body da req em formato json
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

errorVerification();

app.listen(PORT, () => console.log(`Online on Port: ${PORT}`));
