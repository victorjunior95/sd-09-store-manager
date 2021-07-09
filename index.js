const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const app = express();

app.use(bodyParser.json());

const MY_PORT = 3000;

const PORT = process.env.PORT || MY_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`O pai ta ON na porta ${PORT}`);
});

