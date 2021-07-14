const express = require('express');
const bodyParser = require('body-parser');
const Sales = require('./controllers/Sales');
const Products = require('./controllers/products');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// Req 1
app.use('/products', Products);
// Req 5
app.use('/sales', Sales);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
