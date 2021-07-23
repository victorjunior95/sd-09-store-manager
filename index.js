const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('status-codes');
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
