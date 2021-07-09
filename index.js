const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/', routes);

app.use(middlewares.errorTreatment);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
