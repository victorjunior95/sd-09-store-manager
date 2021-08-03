const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const LOCALHOST = 3000;

const port = process.env.PORT || LOCALHOST;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`);});
