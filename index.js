const express = require('express');
const bodyParser = require('body-parser');
const findByName = require('./models/Products');
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const port = 3000;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

async function xablau() {
  console.log(await findByName.findByName('leite'));
}

xablau();



app.listen(port, () => console.log(`App listening on port ${port}!`));