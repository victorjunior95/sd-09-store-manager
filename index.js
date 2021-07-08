
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const errorMiddleware = require('./middlewares/error.js');
const { validationName, validationQuantity } = require('./middlewares/products');
const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('foi');
});

app.get('/products', productsController.getAll);
// app.get('/authors/:id', Author.findById);
app.post('/products',validationName, validationQuantity, productsController.create);

// app.get('/books', Book.getAll);
// app.get('/books/author/:id', Book.findByAuthorId);
// app.get('/books/title/:title', Book.findByTitle);
// app.get('/books/:id', Book.findById);
// app.post('/books', Book.create);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('O Pai tá ON lá na 3k!!!'))