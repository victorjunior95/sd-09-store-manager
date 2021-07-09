const express = require('express');
const bodyParser = require('body-parser');
const { products, sales } = require('./routes');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const status_code = { not_found: 404, invalid_data: 422 };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

app.use((error, _req, res, _next) => {
  const { code, message } = error;
  res.status(status_code[code]).json({ err: { code, message } });
});

app.listen(PORT, () => {
  console.log('Online');
});
