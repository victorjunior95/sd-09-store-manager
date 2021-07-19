const express = require('express');
const products = require('./routes/productRoute');
const sales = require('./routes/saleRoute');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(products);
app.use(sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`PAI TA ON NA PORTA: ${PORTA}`);
});