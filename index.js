const express = require('express');
const bodyParser = require('body-parser');

const APP_ROUTES = require('./routes/AppRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(APP_ROUTES);

app.listen(PORT);
