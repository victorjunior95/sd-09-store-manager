const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.listen(PORT, () => {
  console.log(`PAI TA ON NA PORTA ${PORT}`);
});
