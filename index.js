const express = require('express');
const bodyParser = require('body-parser').json();

const router = require('./routes/router');
const { errorHandler, serverErrorHandler } = require('./middlewares/errorHandlers');

const PORT = 3000;

const app = express();

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(errorHandler, serverErrorHandler);

app.listen(PORT, () => console.log(`App rodando na porta ${PORT}`));
