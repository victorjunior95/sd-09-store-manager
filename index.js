const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const HTTP_OK_STATUS = 200;

app.use(bodyParser.json());

app.get('/teste', (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ message: 'Tested' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const localhost = 3000;

const PORT = process.env.PORT || localhost;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
