const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
