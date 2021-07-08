const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});
