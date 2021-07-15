const express = require('express');
const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const controller = require('./controllers/Products');
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(controller.fetchProducts));
app.get('/products/:id', rescue(controller.findById));
app.post('/products', rescue(controller.createProduct));
app.put('/products/:id', rescue(controller.updateProduct));

app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
