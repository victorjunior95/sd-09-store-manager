const express = require('express');
const bodyParser = require('body-parser');
const { responseHelperMiddleware } = require('./middlewares');
const { productController } = require('./controllers');

const app = express();
app.use(bodyParser.json());

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/', (_request, response) => {
  response.send();
});

app.use(responseHelperMiddleware);

app.use('/', productController);

app.listen(PORT, () => console.log(`Api run in port ${PORT}`));
