const express = require('express');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
