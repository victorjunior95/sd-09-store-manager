const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();

const Products = require('./controllers/Products');

app.use(bodyParser);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.create);

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ err: err.err });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
