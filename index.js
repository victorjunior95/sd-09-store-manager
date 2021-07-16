const express = require('express');
const bodyParser = require('body-parser');
const storeRoutes = require('./routes');
const PORT = 3000;

app = express();

app.use(express.json());

app.use(storeRoutes);
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Ouvindo na porta 3000');
});