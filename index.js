const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error');
const app = express();
app.use(express.json());
const localPort = 3000;

const PORT = process.env.PORT || localPort;

app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./controllers/productController'));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
