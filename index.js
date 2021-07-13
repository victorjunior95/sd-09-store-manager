const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routers/productsRouter');

const app = express();
app.use(bodyParser.json());
// converte o corpo da requisição de json p/ javascript

const PORT = 3000;

app.use('/products', productsRouter);

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json({ err: error.err });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('A mãe tá On na porta:', PORT);
});
// app esta escutando todas as requisições que rodarem na porta 3000
// app disse: 'eu que cuido da porta 3000'

