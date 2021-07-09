const express = require('express');
const productsRouter = require('./routes/productsRouter');
const bodyParser = require('body-parser');

const PORT = 3000;

// codigo do bodyparser consultado no https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))