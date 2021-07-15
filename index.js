const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
const Products = require('./controllers/Products');
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.post('./products', Products.create);
app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
