const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleWare = require('./middlewares/error');
const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./routers/products'));

app.use('/sales', require('./routers/sales'));

app.use(errorMiddleWare);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
