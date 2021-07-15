const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const errorVerification = require('./middlewares/errorVerification');

const app = express();
const PORT = 3000;

// converte o body da req em formato json
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(errorVerification);

app.listen(PORT, () => console.log(`Online on Port: ${PORT}`));
