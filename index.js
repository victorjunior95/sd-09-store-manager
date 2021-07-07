const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router');
const erroMiddleware = require('./middlewares/error');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(router);

app.use(erroMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor Ligado porta ${PORT}!!!`));
