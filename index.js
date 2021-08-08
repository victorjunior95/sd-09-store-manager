const express = require('express');
const { json } = require('body-parser');
const { startServer } = require('./bin');
const routes = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(json());
app.use('/products', routes.products);
app.use('/sales', routes.sales);

app.use(errorMiddleware);

startServer(app);
