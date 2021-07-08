const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/', routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
