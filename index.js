const express = require('express');
const mdwGenericError = require('./middlewares/mdwGenericError');
const router = require('./routes/router');

const app = express();
const PORTFIXED = 3000;
const PORT = process.env.PORT || PORTFIXED;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(mdwGenericError.errorMiddleware);

app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });
