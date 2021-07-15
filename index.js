const express = require('express');
const router = require('./routers/router');
const bodyParse = require('body-parser');

const app = express();
app.use(bodyParse.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));
