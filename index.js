const express = require('express');
const bodyParser = require('body-parser').json();
require('dotenv').config();

const PORT = 3000;

const router = require('./routes/routes');

const app = express();
app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
router.get('/', (_request, response) => {
  response.send();  
});

app.use(router);


app.listen(PORT, () => console.log('Online na porta '+ PORT));
