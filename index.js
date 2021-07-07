const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const port = 3000;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


app.listen(port, () => console.log(`App listening on port ${port}!`));