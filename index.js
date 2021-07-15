const bodyParser = require('body-parser');
const express = require('express');
const ErrorController = require('./middlewares/errorMiddleware');
const router = require('./routes/routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(ErrorController);

app.listen(PORT, () => console.log(`Listen port ${PORT}`));
