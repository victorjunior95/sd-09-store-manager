const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(router);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

