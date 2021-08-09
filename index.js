const express = require('express');

const app = express();
app.use(bodyParser.json());

const default_port = '3000';

const PORT = process.env.PORT || default_port;

app.listen(PORT, () => {
  console.log(`Online - porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(({ status, error }, _request, response, _next) => {
  response.status(status).json({ error });
});
